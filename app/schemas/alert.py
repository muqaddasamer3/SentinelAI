from uuid import UUID
from datetime import datetime

from pydantic import BaseModel


class AlertBase(BaseModel):
    incident_id: UUID
    alert_type: str
    message: str
    status: str = "Pending"


class AlertCreate(AlertBase):
    pass


class AlertUpdate(BaseModel):
    alert_type: str | None = None
    message: str | None = None
    status: str | None = None


class AlertResponse(AlertBase):
    id: UUID
    created_at: datetime

    model_config = {
        "from_attributes": True
    }