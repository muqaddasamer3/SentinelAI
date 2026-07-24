import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
import cv2
import os


class FaceDetector:
    """
    MediaPipe Tasks API (BlazeFace - full_range) ka use karke frame mein faces detect karta hai.
    full_range model door/CCTV-jaisi situations ke liye better hai (short_range sirf close-range faces ke liye tha).
    Note: Legacy mp.solutions broken hai mediapipe 0.10.35+ mein, isi liye Tasks API use kar rahe hain.
    """

    def __init__(self, model_path: str = "ai/models/blaze_face_full_range.tflite", confidence: float = 0.3):
        base_options = python.BaseOptions(model_asset_path=model_path)
        options = vision.FaceDetectorOptions(
            base_options=base_options,
            min_detection_confidence=confidence
        )
        self.detector = vision.FaceDetector.create_from_options(options)

    def detect(self, frame):
        """
        Ek frame (BGR, OpenCV format) leta hai aur detect hone wale
        faces ki bounding boxes return karta hai.

        Returns: list of dicts, e.g.
            [{"bbox": [x1, y1, x2, y2], "confidence": 0.92}, ...]
        """
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb_frame)

        result = self.detector.detect(mp_image)
        faces = []

        for detection in result.detections:
            bbox = detection.bounding_box
            x1 = bbox.origin_x
            y1 = bbox.origin_y
            x2 = x1 + bbox.width
            y2 = y1 + bbox.height
            confidence = detection.categories[0].score

            faces.append({
                "bbox": [x1, y1, x2, y2],
                "confidence": round(confidence, 2)
            })

        return faces

    def draw_faces(self, frame, faces):
        """
        Detected faces ko frame pe box ke sath draw karta hai.
        """
        for face in faces:
            x1, y1, x2, y2 = face["bbox"]
            conf = face["confidence"]
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 255), 2)
            cv2.putText(
                frame, f"Face {conf}", (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2
            )
        return frame


if __name__ == "__main__":
    video_path = "data/videos/test1.mp4"

    if not os.path.exists(video_path):
        print(f"Error: '{video_path}' nahi mili.")
    else:
        detector = FaceDetector()
        cap = cv2.VideoCapture(video_path)

        if not cap.isOpened():
            print(f"Error: Video file '{video_path}' open nahi ho saki.")
        else:
            fps = cap.get(cv2.CAP_PROP_FPS)
            delay = int(1000 / fps) if fps > 0 else 33  # fallback ~30fps agar FPS na mile

            while True:
                ret, frame = cap.read()
                if not ret:
                    print("Video khatam ho gayi.")
                    break

                faces = detector.detect(frame)
                frame = detector.draw_faces(frame, faces)

                cv2.imshow("Face Detection Test", frame)

                if cv2.waitKey(delay) & 0xFF == ord('q'):
                    break

            cap.release()
            cv2.destroyAllWindows()
