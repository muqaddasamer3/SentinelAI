from uuid import UUID
from datetime import datetime

from pydantic import BaseModel


class CameraBase(BaseModel):
    camera_id: str
    camera_name: str
    location: str
    status: str = "Active"


class CameraCreate(CameraBase):
    pass


class CameraUpdate(BaseModel):
    camera_name: str | None = None
    location: str | None = None
    status: str | None = None


class CameraResponse(CameraBase):
    id: UUID
    created_at: datetime

    model_config = {
        "from_attributes": True
    }