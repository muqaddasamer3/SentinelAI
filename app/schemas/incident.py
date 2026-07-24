from pydantic import BaseModel


class IncidentRequest(BaseModel):
    person_id: str
    camera_id: str
    incident_type: str
    summary: str


class IncidentResponse(BaseModel):
    message: str