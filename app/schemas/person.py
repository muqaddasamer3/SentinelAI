from uuid import UUID
from datetime import datetime

from pydantic import BaseModel


class PersonBase(BaseModel):
    person_code: str
    first_seen: datetime | None = None


class PersonCreate(PersonBase):
    face_embedding: bytes | None = None


class PersonUpdate(BaseModel):
    person_code: str | None = None
    face_embedding: bytes | None = None
    first_seen: datetime | None = None


class PersonResponse(PersonBase):
    id: UUID
    created_at: datetime

    last_seen: datetime | None = None
    total_detections: int = 0
    cameras_visited: int = 0
    status: str = "Unknown"

    model_config = {
        "from_attributes": True
    }