from uuid import UUID
from datetime import datetime
from pydantic import BaseModel


class IncidentBase(BaseModel):
    tracking_log_id: UUID
    person_id: UUID
    camera_id: UUID
    incident_type: str
    summary: str
    severity: str


class IncidentCreate(IncidentBase):
    pass


class IncidentUpdate(BaseModel):
    incident_type: str | None = None
    summary: str | None = None
    severity: str | None = None
    timestamp: datetime | None = None

class IncidentResponse(IncidentBase):
    id: UUID
    created_at: datetime
    timestamp: datetime

    camera_name: str | None = None
    camera_location: str | None = None

    model_config = {
        "from_attributes": True
    }