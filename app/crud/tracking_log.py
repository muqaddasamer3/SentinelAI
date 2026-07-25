from uuid import UUID

from sqlalchemy.orm import Session

from app.database.models import TrackingLog, Camera, Person

from app.schemas.tracking_log import (
    TrackingLogCreate,
    TrackingLogUpdate,
)


def create_tracking_log(
    db: Session,
    tracking_log: TrackingLogCreate,
):
    """
    Create a new tracking log.
    """

    db_tracking_log = TrackingLog(
        person_id=tracking_log.person_id,
        camera_id=tracking_log.camera_id,
        event_type=tracking_log.event_type,
        confidence=tracking_log.confidence,
        face_matched=tracking_log.face_matched,
        clothing_color=tracking_log.clothing_color,
    )

    db.add(db_tracking_log)
    db.commit()
    db.refresh(db_tracking_log)

    return db_tracking_log


def get_tracking_log(
    db: Session,
    tracking_log_id: UUID,
):
    """
    Get a tracking log by ID.
    """

    return (
        db.query(TrackingLog)
        .filter(TrackingLog.id == tracking_log_id)
        .first()
    )


def get_tracking_logs(db: Session):

    tracking_logs = (
        db.query(
            TrackingLog,
            Camera,
            Person
        )
        .join(
            Camera,
            TrackingLog.camera_id == Camera.id
        )
        .join(
            Person,
            TrackingLog.person_id == Person.id
        )
        .all()
    )


    result = []


    for log, camera, person in tracking_logs:

        log.camera_name = camera.camera_name
        log.camera_location = camera.location

        log.person_code = person.person_code

        result.append(log)


    return result


def update_tracking_log(
    db: Session,
    tracking_log_id: UUID,
    tracking_log: TrackingLogUpdate,
):
    """
    Update a tracking log.
    """

    db_tracking_log = (
        db.query(TrackingLog)
        .filter(TrackingLog.id == tracking_log_id)
        .first()
    )

    if not db_tracking_log:
        return None

    update_data = tracking_log.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_tracking_log, key, value)

    db.commit()
    db.refresh(db_tracking_log)

    return db_tracking_log


def delete_tracking_log(
    db: Session,
    tracking_log_id: UUID,
):
    """
    Delete a tracking log.
    """

    db_tracking_log = (
        db.query(TrackingLog)
        .filter(TrackingLog.id == tracking_log_id)
        .first()
    )

    if not db_tracking_log:
        return None

    db.delete(db_tracking_log)
    db.commit()

    return db_tracking_log