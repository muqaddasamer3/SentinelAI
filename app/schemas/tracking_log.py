from uuid import UUID
from datetime import datetime

from pydantic import BaseModel


class TrackingLogBase(BaseModel):
    person_id: UUID
    camera_id: UUID
    timestamp: datetime
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

    model_config = {
        "from_attributes": True
    }