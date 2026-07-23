from google import genai
from app.core.config import GEMMA_API_KEY

client = genai.Client(api_key=GEMMA_API_KEY)


def ask_gemma(question: str):

    prompt = f"""
You are SentinelAI.

You are an AI Security Assistant.

Answer the question based on CCTV tracking logs.

Question:
{question}
"""

    response = client.models.generate_content(
        model="gemma-4-26b-a4b-it",
        contents=prompt
    )

    return {
        "answer": response.text
    }