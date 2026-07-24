from uuid import UUID
from datetime import datetime

from pydantic import BaseModel


class PersonBase(BaseModel):
    person_code: str
    face_embedding: bytes | None = None
    first_seen: datetime | None = None


class PersonCreate(PersonBase):
    pass


class PersonUpdate(BaseModel):
    person_code: str | None = None
    face_embedding: bytes | None = None
    first_seen: datetime | None = None


class PersonResponse(PersonBase):
    id: UUID
    created_at: datetime

    model_config = {
        "from_attributes": True
    }