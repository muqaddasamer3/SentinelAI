import insightface
import cv2
import os
import numpy as np


class FaceRecognizer:
    """
    InsightFace (buffalo_l model) ka use karke faces recognize karta hai —
    detected face ko known faces database se match karta hai.
    """

    def __init__(self, known_faces_dir: str = "data/known_faces", similarity_threshold: float = 0.5):
        self.app = insightface.app.FaceAnalysis(name="buffalo_l")
        self.app.prepare(ctx_id=0, det_size=(320, 320))  # det_size chhota rakha hai speed ke liye

        self.similarity_threshold = similarity_threshold
        self.known_faces = {}  # {person_code: embedding}

        self._load_known_faces(known_faces_dir)

    def _load_known_faces(self, known_faces_dir):
        """
        known_faces folder se saari images load karke unke embeddings nikalta hai.
        """
        if not os.path.exists(known_faces_dir):
            print(f"Warning: '{known_faces_dir}' nahi mila. Koi known face load nahi hui.")
            return

        for filename in os.listdir(known_faces_dir):
            if filename.lower().endswith((".jpg", ".jpeg", ".png")):
                person_code = os.path.splitext(filename)[0]
                image_path = os.path.join(known_faces_dir, filename)

                image = cv2.imread(image_path)
                faces = self.app.get(image)

                if len(faces) > 0:
                    self.known_faces[person_code] = faces[0].embedding
                    print(f"Loaded known face: {person_code}")
                else:
                    print(f"Warning: '{filename}' mein koi face detect nahi hui.")

    def recognize(self, frame):
        """
        Frame leta hai, saare faces detect karta hai, aur har face ko
        known_faces se match karne ki koshish karta hai.

        Returns: list of dicts, e.g.
            [{"bbox": [x1,y1,x2,y2], "person_code": "P001" or "Unknown", "confidence": 0.87}, ...]
        """
        results = []
        faces = self.app.get(frame)

        for face in faces:
            bbox = list(map(int, face.bbox))
            best_match = "Unknown"
            best_score = 0.0

            for person_code, known_embedding in self.known_faces.items():
                similarity = self._cosine_similarity(face.embedding, known_embedding)
                if similarity > best_score:
                    best_score = similarity
                    best_match = person_code

            if best_score < self.similarity_threshold:
                best_match = "Unknown"

            results.append({
                "bbox": bbox,
                "person_code": best_match,
                "confidence": round(float(best_score), 2)
            })

        return results

    @staticmethod
    def _cosine_similarity(a, b):
        return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

    def draw_recognitions(self, frame, results):
        """
        Recognized faces ko naam/code ke sath frame pe draw karta hai.
        """
        for res in results:
            x1, y1, x2, y2 = res["bbox"]
            label = f"{res['person_code']} ({res['confidence']})"
            color = (0, 255, 0) if res["person_code"] != "Unknown" else (0, 0, 255)

            cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
            cv2.putText(
                frame, label, (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2
            )
        return frame


if __name__ == "__main__":
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
            skip_frames = 3  # har 3 frame mein sirf 1 pe recognition chalayenge (speed ke liye)
            last_results = []

            while True:
                ret, frame = cap.read()
                if not ret:
                    print("Video khatam ho gayi.")
                    break

                frame_count += 1

                if frame_count % skip_frames == 0:
                    last_results = recognizer.recognize(frame)

                frame = recognizer.draw_recognitions(frame, last_results)

                cv2.imshow("Face Recognition Test", frame)

                if cv2.waitKey(delay) & 0xFF == ord('q'):
                    break

            cap.release()
            cv2.destroyAllWindows()