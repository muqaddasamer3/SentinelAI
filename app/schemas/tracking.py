from pydantic import BaseModel


class TrackingRequest(BaseModel):
    person_id: str
    camera: str
    timestamp: str