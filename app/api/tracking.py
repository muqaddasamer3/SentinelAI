from fastapi import APIRouter

from app.schemas.tracking import TrackingRequest
from app.services.tracking_service import (
    save_tracking,
    get_tracking
)

router = APIRouter()


@router.post("/tracking")
def tracking(data: TrackingRequest):

    return save_tracking(data)


@router.get("/tracking")
def tracking_history():

    return get_tracking()