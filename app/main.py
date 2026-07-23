from fastapi import FastAPI

from app.api.health import router as health_router
from app.api.tracking import router as tracking_router
from app.api.chat import router as chat_router
from app.api.incident import router as incident_router

app = FastAPI(
    title="SentinelAI Backend",
    version="1.0.0"
)

app.include_router(health_router)
app.include_router(tracking_router)
app.include_router(chat_router)
app.include_router(incident_router)


@app.get("/")
def root():
    return {
        "message": "SentinelAI Backend Running 🚀"
    }