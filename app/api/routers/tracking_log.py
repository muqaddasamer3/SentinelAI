from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.tracking_log import (
    TrackingLogCreate,
    TrackingLogUpdate,
    TrackingLogResponse,
)
from app.crud.tracking_log import (
    create_tracking_log,
    get_tracking_log,
    get_tracking_logs,
    update_tracking_log,
    delete_tracking_log,
)

router = APIRouter(
    prefix="/tracking-logs",
    tags=["Tracking Logs"],
)


@router.post("/", response_model=TrackingLogResponse)
def create_new_tracking_log(
    tracking_log: TrackingLogCreate,
    db: Session = Depends(get_db),
):
    return create_tracking_log(db=db, tracking_log=tracking_log)


@router.get("/", response_model=list[TrackingLogResponse])
def read_tracking_logs(
    db: Session = Depends(get_db),
):
    return get_tracking_logs(db)


@router.get("/{tracking_log_id}", response_model=TrackingLogResponse)
def read_tracking_log(
    tracking_log_id: UUID,
    db: Session = Depends(get_db),
):
    tracking_log = get_tracking_log(db, tracking_log_id)

    if not tracking_log:
        raise HTTPException(
            status_code=404,
            detail="Tracking log not found",
        )

    return tracking_log


@router.put("/{tracking_log_id}", response_model=TrackingLogResponse)
def update_existing_tracking_log(
    tracking_log_id: UUID,
    tracking_log: TrackingLogUpdate,
    db: Session = Depends(get_db),
):
    updated_tracking_log = update_tracking_log(
        db,
        tracking_log_id,
        tracking_log,
    )

    if not updated_tracking_log:
        raise HTTPException(
            status_code=404,
            detail="Tracking log not found",
        )

    return updated_tracking_log


@router.delete("/{tracking_log_id}")
def delete_existing_tracking_log(
    tracking_log_id: UUID,
    db: Session = Depends(get_db),
):
    tracking_log = delete_tracking_log(db, tracking_log_id)

    if not tracking_log:
        raise HTTPException(
            status_code=404,
            detail="Tracking log not found",
        )

    return {
        "message": "Tracking log deleted successfully"
    }