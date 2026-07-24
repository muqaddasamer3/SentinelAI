import os
from pathlib import Path
from dotenv import load_dotenv
from google import genai


# .env file ko project root se load karo (chahe script kahin se bhi chalayen)
env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(dotenv_path=env_path)


def analyze_incident(description: str) -> str:
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

    prompt = (
        "You are a CCTV security monitoring system generating a brief incident log entry. "
        "Write ONE short, factual summary (maximum 2 sentences) based only on the information given below. "
        "Vary your sentence structure and word choice naturally each time — do not always start with the same phrase "
        "or reuse the same wording as previous entries. Write it the way a human security operator would phrase "
        "a quick log note, with some natural variation. "
        "Do NOT provide multiple options, templates, placeholders, or writing tips. "
        "Do NOT ask for more information. Just output the final summary text directly.\n\n"
        f"Incident details: {description}"
    )

    response = client.models.generate_content(
        model="gemma-4-26b-a4b-it",
        contents=prompt
    )
    return response.text.strip()

if __name__ == "__main__":
    # Test karne ke liye sample call
    sample = "Describe a person loitering near a restricted entrance for 5 minutes as a security incident summary."
    print(analyze_incident(sample))
