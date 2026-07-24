import insightface
import cv2
import numpy as np


class FaceRecognizer:
    """
    InsightFace (buffalo_l model) ka use karke frame mein saare faces detect karta hai
    aur har face ka embedding (512-d vector) nikalta hai.

    Matching (kaunsa embedding kis person se belong karta hai) ab is class ke bahar,
    pipeline mein hoti hai — kyunke known persons ab database se aate hain,
    kisi static folder se nahi.
    """

    def __init__(self, det_size: tuple = (320, 320)):
        self.app = insightface.app.FaceAnalysis(name="buffalo_l")
        self.app.prepare(ctx_id=0, det_size=det_size)

    def detect_faces(self, frame):
        """
        Frame leta hai, saare faces detect karta hai aur har face ka
        bbox + embedding + detection confidence return karta hai.

        Returns: list of dicts, e.g.
            [{"bbox": [x1,y1,x2,y2], "embedding": np.ndarray(512,), "det_score": 0.93}, ...]
        """
        results = []
        faces = self.app.get(frame)

        for face in faces:
            bbox = list(map(int, face.bbox))
            results.append({
                "bbox": bbox,
                "embedding": face.embedding,
                "det_score": float(face.det_score)
            })

        return results

    def draw_faces(self, frame, results, labels=None):
        """
        Detected faces ko frame pe draw karta hai. Agar labels di ho
        (results ke hi order mein) to wo bhi dikhata hai.
        """
        for i, res in enumerate(results):
            x1, y1, x2, y2 = res["bbox"]
            label = labels[i] if labels else f"{res['det_score']:.2f}"
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(
                frame, label, (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2
            )
        return frame


if __name__ == "__main__":
    import os

    video_path = "data/videos/test3.mp4"

    if not os.path.exists(video_path):
        print(f"Error: '{video_path}' nahi mili.")
    else:
        recognizer = FaceRecognizer()
        cap = cv2.VideoCapture(video_path)

        if not cap.isOpened():
            print(f"Error: Video file '{video_path}' open nahi ho saki.")
        else:
            fps = cap.get(cv2.CAP_PROP_FPS)
            delay = int(1000 / fps) if fps > 0 else 33
            frame_count = 0
            skip_frames = 3
            last_results = []

            while True:
                ret, frame = cap.read()
                if not ret:
                    print("Video khatam ho gayi.")
                    break

                frame_count += 1

                if frame_count % skip_frames == 0:
                    last_results = recognizer.detect_faces(frame)

                frame = recognizer.draw_faces(frame, last_results)
                cv2.imshow("Face Detection Test", frame)

                if cv2.waitKey(delay) & 0xFF == ord('q'):
                    break

            cv2.destroyAllWindows()
