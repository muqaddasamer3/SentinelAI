from uuid import UUID
from datetime import datetime

from pydantic import BaseModel


class TrackingLogBase(BaseModel):
    person_id: UUID
    camera_id: UUID
    event_type: str
    confidence: float
    face_matched: bool
    clothing_color: str | None = None


class TrackingLogCreate(TrackingLogBase):
    pass


class TrackingLogUpdate(BaseModel):
    timestamp: datetime | None = None
    event_type: str | None = None
    confidence: float | None = None
    face_matched: bool | None = None
    clothing_color: str | None = None


class TrackingLogResponse(TrackingLogBase):
    id: UUID
    created_at: datetime
    timestamp: datetime

    person_code: str | None = None
    camera_name: str | None = None
    camera_location: str | None = None

    model_config = {
        "from_attributes": True
    }