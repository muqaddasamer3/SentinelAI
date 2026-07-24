from fastapi import APIRouter

from app.schemas.incident import IncidentRequest
from app.services.incident_service import (
    save_incident,
    get_incidents
)

router = APIRouter()


@router.post("/incident")
def create_incident(data: IncidentRequest):

    return save_incident(data)


@router.get("/incident")
def incident_history():

    return get_incidents()