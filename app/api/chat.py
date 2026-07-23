from fastapi import APIRouter
from app.schemas.chat import ChatRequest
from app.services.gemma_service import ask_gemma

router = APIRouter()


@router.post("/chat")
def chat(data: ChatRequest):

    return ask_gemma(data.question)