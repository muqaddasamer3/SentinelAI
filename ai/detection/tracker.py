from ultralytics import YOLO
import cv2
import os


class PersonTracker:
    """
    YOLO11n + BoT-SORT ka use karke video frame mein persons detect aur
    track karta hai — har person ko ek consistent unique ID (track ID) deta hai.
    """

    def __init__(self, model_path: str = "yolo11n.pt", confidence: float = 0.5):
        self.model = YOLO(model_path)
        self.confidence = confidence
        self.person_class_id = 0  # COCO dataset mein 'person' ki class ID 0

    def track(self, frame):
        """
        Ek frame leta hai aur tracked persons ki list return karta hai,
        har entry mein unique track_id hota hai.

        Returns: list of dicts, e.g.
            [{"track_id": 1, "bbox": [x1, y1, x2, y2], "confidence": 0.87}, ...]
        """
        results = self.model.track(
            frame,
            persist=True,
            tracker="botsort.yaml",
            verbose=False
        )[0]

        tracked_persons = []

        if results.boxes.id is not None:
            for box, track_id in zip(results.boxes, results.boxes.id):
                class_id = int(box.cls[0])
                confidence = float(box.conf[0])

                if class_id == self.person_class_id and confidence >= self.confidence:
                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    tracked_persons.append({
                        "track_id": int(track_id),
                        "bbox": [x1, y1, x2, y2],
                        "confidence": round(confidence, 2)
                    })

        return tracked_persons

    def draw_tracks(self, frame, tracked_persons):
        """
        Tracked persons ko box + track ID ke sath frame pe draw karta hai.
        """
        for person in tracked_persons:
            x1, y1, x2, y2 = person["bbox"]
            track_id = person["track_id"]
            conf = person["confidence"]

            cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)
            cv2.putText(
                frame, f"ID:{track_id} ({conf})", (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2
            )
        return frame


if __name__ == "__main__":
    video_path = "data/videos/test1.mp4"

    if not os.path.exists(video_path):
        print(f"Error: '{video_path}' nahi mili. Pehle test video is path par rakhein.")
    else:
        tracker = PersonTracker()
        cap = cv2.VideoCapture(video_path)

        if not cap.isOpened():
            print(f"Error: Video file '{video_path}' open nahi ho saki.")
        else:
            while True:
                ret, frame = cap.read()
                if not ret:
                    print("Video khatam ho gayi.")
                    break

                tracked_persons = tracker.track(frame)
                frame = tracker.draw_tracks(frame, tracked_persons)

                cv2.imshow("Person Tracking Test", frame)

                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break

            cap.release()
            cv2.destroyAllWindows()