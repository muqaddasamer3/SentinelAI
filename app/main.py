from fastapi import FastAPI
from app.api.routers.health import router as health_router
from app.api.routers.camera import router as camera_router
from app.core.config import settings
from app.api.routers.person import router as person_router
from app.api.routers.tracking_log import router as tracking_log_router
from app.api.routers.incident import router as incident_router
from app.api.routers.alert import router as alert_router
from app.api.routers import auth
from fastapi.middleware.cors import CORSMiddleware
from app.api.routers.user import router as user_router

app = FastAPI(
    title=settings.APP_NAME,
    description=settings.APP_DESCRIPTION,
    version=settings.APP_VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["Root"])
def root():
    return {
        "message": f"Welcome to {settings.APP_NAME}",
        "status": "Running",
    }


# Routers
app.include_router(health_router)
app.include_router(camera_router)
app.include_router(person_router)
app.include_router(tracking_log_router)
app.include_router(incident_router)
app.include_router(alert_router)
app.include_router(auth.router)
app.include_router(user_router)
