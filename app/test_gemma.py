# app/gemma_service.py
from google import genai

def analyze_incident(description: str) -> str:
    client = genai.Client()
    response = client.models.generate_content(
        model="gemma-4-26b-a4b-it",
        contents="Describe a person loitering near a restricted entrance for 5 minutes as a security incident summary."
    )
    return response.text

