from sqlalchemy.orm import Session

from app.database.models import TrackingLog


def create_tracking_log(db: Session, tracking_log: TrackingLog):
    """
    Create a new tracking log.
    """
    db.add(tracking_log)
    db.commit()
    db.refresh(tracking_log)
    return tracking_log


def get_tracking_log(db: Session, tracking_log_id):
    """
    Get a tracking log by ID.
    """
    return (
        db.query(TrackingLog)
        .filter(TrackingLog.id == tracking_log_id)
        .first()
    )


def get_tracking_logs(db: Session):
    """
    Get all tracking logs.
    """
    return db.query(TrackingLog).all()


def update_tracking_log(
    db: Session,
    tracking_log_id,
    updated_data: dict,
):
    """
    Update a tracking log.
    """
    tracking_log = (
        db.query(TrackingLog)
        .filter(TrackingLog.id == tracking_log_id)
        .first()
    )

    if not tracking_log:
        return None

    for key, value in updated_data.items():
        setattr(tracking_log, key, value)

    db.commit()
    db.refresh(tracking_log)

    return tracking_log


def delete_tracking_log(db: Session, tracking_log_id):
    """
    Delete a tracking log.
    """
    tracking_log = (
        db.query(TrackingLog)
        .filter(TrackingLog.id == tracking_log_id)
        .first()
    )

    if not tracking_log:
        return None

    db.delete(tracking_log)
    db.commit()

    return tracking_log