import cv2
import os
import json
from datetime import datetime

from ai.detection.tracker import PersonTracker
from ai.face.face_recognizer import FaceRecognizer
from ai.reid.reid_matcher import ReIDMatcher
from ai.gemma.gemma_service import analyze_incident

from app.database.session import SessionLocal
from app.database.models import Camera, Person, TrackingLog, Incident


class SentinelPipeline:
    """
    Poora AI pipeline combine karta hai:
    Detection + Tracking -> Face Recognition -> ReID (fallback) -> Gemma 4 summary
    Performance ke liye: face recognition/ReID sirf har N frame pe chalte hain.

    Note: ReID (TorchReID generic weights) abhi discriminative nahi hai,
    is liye track_id ko hi stable identity ke tor par use kar rahe hain
    jab tak face na mile. BoT-SORT tracking already reliable hai isi camera ke andar.
    """

    def __init__(self, camera_id: str = "Cam-01", heavy_process_every: int = 5):
        self.camera_id = camera_id
        self.tracker = PersonTracker()
        self.face_recognizer = FaceRecognizer()
        self.reid_matcher = ReIDMatcher()

        self.track_entry_times = {}
        self.track_person_codes = {}  # cache: track_id -> person_code
        self.heavy_process_every = heavy_process_every
        self.frame_count = 0

    def process_frame(self, frame):
        self.frame_count += 1
        tracked_persons = self.tracker.track(frame)  # ye har frame pe chalega (halka hai)
        frame_results = []

        run_heavy = (self.frame_count % self.heavy_process_every == 0)

        face_results = self.face_recognizer.recognize(frame) if run_heavy else []

        for person in tracked_persons:
            track_id = person["track_id"]
            x1, y1, x2, y2 = person["bbox"]

            if track_id not in self.track_entry_times:
                self.track_entry_times[track_id] = datetime.now().isoformat()

            person_crop = frame[max(0, y1):y2, max(0, x1):x2]
            if person_crop.size == 0:
                continue

            # Agar heavy processing is frame pe chali, to naya pehchan karo
            if run_heavy:
                person_code = "Unknown"
                for face in face_results:
                    fx1, fy1, fx2, fy2 = face["bbox"]
                    if fx1 >= x1 and fy1 >= y1 and fx2 <= x2 and fy2 <= y2:
                        person_code = face["person_code"]
                        break

                # Face se pehchan nahi hui to track_id ko hi stable identity banao
                # (ReID generic weights abhi discriminative nahi hain, isi liye track_id use kar rahe hain)
                if person_code == "Unknown":
                    person_code = f"P_{track_id}"

                self.track_person_codes[track_id] = person_code  # cache update
            else:
                # Purana cached result use karo (heavy processing skip)
                person_code = self.track_person_codes.get(track_id, f"P_{track_id}")

            frame_results.append({
                "person_code": person_code,
                "track_id": track_id,
                "camera_id": self.camera_id,
                "bbox": [x1, y1, x2, y2],
                "entry_time": self.track_entry_times[track_id],
                "confidence": person["confidence"]
            })

        return frame_results

    def generate_incident_json(self, person_data, zone="restricted_entrance", severity="medium"):
        description = (
            f"Person {person_data['person_code']} detected on {person_data['camera_id']} "
            f"in zone '{zone}' since {person_data['entry_time']}."
        )
        summary = analyze_incident(description)

        return {
            "person_code": person_data["person_code"],
            "camera_id": person_data["camera_id"],
            "entry_time": person_data["entry_time"],
            "exit_time": datetime.now().isoformat(),
            "zone": zone,
            "confidence": person_data["confidence"],
            "incident_summary": summary,
            "severity": severity
        }

    # ==========================================
    # DATABASE METHODS (Supabase / PostgreSQL)
    # ==========================================

    def _get_or_create_camera(self, db):
        camera = db.query(Camera).filter(Camera.camera_id == self.camera_id).first()
        if not camera:
            camera = Camera(
                camera_id=self.camera_id,
                camera_name=self.camera_id,
                location="Unknown",
                status="Active",
            )
            db.add(camera)
            db.commit()
            db.refresh(camera)
        return camera

    def _get_or_create_person(self, db, person_code, entry_time):
        person = db.query(Person).filter(Person.person_code == person_code).first()
        if not person:
            person = Person(
                person_code=person_code,
                first_seen=entry_time,
            )
            db.add(person)
            db.commit()
            db.refresh(person)
        return person

    def save_tracking_log(self, person_data):
        """
        Ek tracked person ka record 'tracking_logs' table mein save karta hai.
        Returns the saved TrackingLog object (with its id).
        """
        db = SessionLocal()
        try:
            camera = self._get_or_create_camera(db)
            person = self._get_or_create_person(
                db, person_data["person_code"], person_data["entry_time"]
            )

            log = TrackingLog(
                person_id=person.id,
                camera_id=camera.id,
                timestamp=datetime.now(),
                event_type="detected",
                confidence=person_data["confidence"],
                face_matched=not person_data["person_code"].startswith("P_"),
            )
            db.add(log)
            db.commit()
            db.refresh(log)
            return log
        finally:
            db.close()

    def save_incident(self, incident_data, tracking_log_id):
        """
        Incident ka record 'incidents' table mein save karta hai.
        """
        db = SessionLocal()
        try:
            camera = self._get_or_create_camera(db)
            person = self._get_or_create_person(
                db, incident_data["person_code"], incident_data["entry_time"]
            )

            incident = Incident(
                tracking_log_id=tracking_log_id,
                person_id=person.id,
                camera_id=camera.id,
                incident_type="unauthorized_access",
                summary=incident_data["incident_summary"],
                severity=incident_data["severity"],
                timestamp=datetime.now(),
            )
            db.add(incident)
            db.commit()
            db.refresh(incident)
            return incident
        finally:
            db.close()


if __name__ == "__main__":
    video_path = "data/videos/test2.mp4"

    if not os.path.exists(video_path):
        print(f"Error: '{video_path}' nahi mili.")
    else:
        pipeline = SentinelPipeline(camera_id="Cam-01", heavy_process_every=5)
        cap = cv2.VideoCapture(video_path)

        if not cap.isOpened():
            print(f"Error: Video file '{video_path}' open nahi ho saki.")
        else:
            fps = cap.get(cv2.CAP_PROP_FPS)
            delay = int(1000 / fps) if fps > 0 else 33
            frame_count = 0

            while True:
                ret, frame = cap.read()
                if not ret:
                    print("Video khatam ho gayi.")
                    break

                frame_count += 1
                results = pipeline.process_frame(frame)

                for res in results:
                    x1, y1, x2, y2 = res["bbox"]
                    label = f"{res['person_code']} (ID:{res['track_id']})"
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                    cv2.putText(frame, label, (x1, y1 - 10),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

                    # 👇 Database mein tracking log save karna
                    try:
                        pipeline.save_tracking_log(res)
                    except Exception as e:
                        print(f"⚠️ DB save error (tracking_log): {e}")

                cv2.imshow("SentinelAI Pipeline", frame)

                if frame_count % 100 == 0 and results:
                    incident = pipeline.generate_incident_json(results[0])
                    print(json.dumps(incident, indent=2))

                    # 👇 Database mein incident save karna
                    try:
                        log = pipeline.save_tracking_log(results[0])
                        pipeline.save_incident(incident, log.id)
                        print("✅ Incident saved to database.")
                    except Exception as e:
                        print(f"⚠️ DB save error (incident): {e}")

                if cv2.waitKey(delay) & 0xFF == ord('q'):
                    break

            cap.release()
            cv2.destroyAllWindows()
