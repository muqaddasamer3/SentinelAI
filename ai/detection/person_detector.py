from ultralytics import YOLO
import cv2
import os


class PersonDetector:
    """
    YOLO11n ka use karke video frame mein sirf 'person' class detect karta hai.
    """

    def __init__(self, model_path: str = "yolo11n.pt", confidence: float = 0.5):
        self.model = YOLO(model_path)
        self.confidence = confidence
        self.person_class_id = 0  # COCO dataset mein 'person' ki class ID 0 hoti hai

    def detect(self, frame):
        """
        Ek frame leta hai aur us mein detect hone wale sab persons ki
        bounding boxes + confidence scores return karta hai.

        Returns: list of dicts, e.g.
            [{"bbox": [x1, y1, x2, y2], "confidence": 0.87}, ...]
        """
        results = self.model(frame, verbose=False)[0]
        detections = []

        for box in results.boxes:
            class_id = int(box.cls[0])
            confidence = float(box.conf[0])

            if class_id == self.person_class_id and confidence >= self.confidence:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                detections.append({
                    "bbox": [x1, y1, x2, y2],
                    "confidence": round(confidence, 2)
                })

        return detections

    def draw_detections(self, frame, detections):
        """
        Detections ko frame pe box + confidence ke sath draw karta hai
        (testing/visual verification ke liye).
        """
        for det in detections:
            x1, y1, x2, y2 = det["bbox"]
            conf = det["confidence"]
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(
                frame, f"Person {conf}", (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2
            )
        return frame


if __name__ == "__main__":
    # Webcam nahi hai, is liye video file se test karenge
    video_path = "data/videos/test3.mp4"

    if not os.path.exists(video_path):
        print(f"Error: '{video_path}' nahi mili. Pehle koi test video is path par rakhein.")
    else:
        detector = PersonDetector()
        cap = cv2.VideoCapture(video_path)

        if not cap.isOpened():
            print(f"Error: Video file '{video_path}' open nahi ho saki.")
        else:
            while True:
                ret, frame = cap.read()
                if not ret:
                    print("Video khatam ho gayi.")
                    break

                detections = detector.detect(frame)
                frame = detector.draw_detections(frame, detections)

                cv2.imshow("Person Detection Test", frame)

                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break

            cap.release()
            cv2.destroyAllWindows()
