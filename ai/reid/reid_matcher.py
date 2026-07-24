import torchreid
import torch
import cv2
import numpy as np
from torchvision import transforms


class ReIDMatcher:
    """
    TorchReID (OSNet) ka use karke person ke appearance-based embeddings
    nikalta hai — taake ek person ko alag cameras ke darmiyan bhi
    re-identify kiya ja sake (chahe face na dikhe).
    """

    def __init__(self, similarity_threshold: float = 0.6):
        self.model = torchreid.models.build_model(
            name="osnet_x1_0",
            num_classes=1000,
            pretrained=True
        )
        self.model.eval()

        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model.to(self.device)

        self.similarity_threshold = similarity_threshold
        self.known_persons = {}  # {person_code: embedding}

        self.transform = transforms.Compose([
            transforms.ToPILImage(),
            transforms.Resize((256, 128)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ])

    def extract_embedding(self, person_crop):
        """
        Person ki cropped image (bounding box se cut ki hui) leta hai
        aur uska appearance embedding return karta hai.
        """
        img_tensor = self.transform(person_crop).unsqueeze(0).to(self.device)

        with torch.no_grad():
            embedding = self.model(img_tensor)

        return embedding.cpu().numpy().flatten()

    def match_or_register(self, person_crop, track_id):
        """
        Person crop ka embedding nikalta hai, existing known_persons se
        compare karta hai. Match mile to wahi person_code return karta hai,
        warna naya register kar deta hai.
        """
        embedding = self.extract_embedding(person_crop)

        best_match = None
        best_score = 0.0

        for person_code, known_embedding in self.known_persons.items():
            similarity = self._cosine_similarity(embedding, known_embedding)
            if similarity > best_score:
                best_score = similarity
                best_match = person_code

        if best_score >= self.similarity_threshold:
            return best_match, round(float(best_score), 2)
        else:
            new_code = f"P{len(self.known_persons) + 1:03d}"
            self.known_persons[new_code] = embedding
            return new_code, 1.0

    @staticmethod
    def _cosine_similarity(a, b):
        return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


if __name__ == "__main__":
    # Quick test — ek dummy crop banake embedding test karte hain
    reid = ReIDMatcher()

    dummy_crop = np.random.randint(0, 255, (256, 128, 3), dtype=np.uint8)
    person_code, score = reid.match_or_register(dummy_crop, track_id=1)

    print(f"Assigned person_code: {person_code}, confidence: {score}")