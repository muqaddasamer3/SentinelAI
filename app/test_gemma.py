from google import genai

def analyze_incident(description: str) -> str:
    client = genai.Client()
    response = client.models.generate_content(
        model="gemma-4-26b-a4b-it",
        contents=description
    )
    return response.text


if __name__ == "__main__":
    # Test karne ke liye sample call
    sample = "Describe a person loitering near a restricted entrance for 5 minutes as a security incident summary."
    print(analyze_incident(sample))
