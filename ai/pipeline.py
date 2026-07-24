import cv2
import os
import json
from datetime import datetime

from ai.detection.tracker import PersonTracker
from ai.face.face_recognizer import FaceRecognizer
from ai.reid.reid_matcher import ReIDMatcher
from ai.gemma.gemma_service import analyze_incident


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


if __name__ == "__main__":
    video_path = "data/videos/test1.mp4"

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

                cv2.imshow("SentinelAI Pipeline", frame)

                if frame_count % 100 == 0 and results:
                    incident = pipeline.generate_incident_json(results[0])
                    print(json.dumps(incident, indent=2))

                if cv2.waitKey(delay) & 0xFF == ord('q'):
                    break

            cap.release()
            cv2.destroyAllWindows()
