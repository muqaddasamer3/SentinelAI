from uuid import UUID

from sqlalchemy.orm import Session

from app.database.models import Incident
from app.schemas.incident import (
    IncidentCreate,
    IncidentUpdate,
)


def create_incident(
    db: Session,
    incident: IncidentCreate,
):
    db_incident = Incident(
        tracking_log_id=incident.tracking_log_id,
        person_id=incident.person_id,
        camera_id=incident.camera_id,
        incident_type=incident.incident_type,
        summary=incident.summary,
        severity=incident.severity,
        timestamp=incident.timestamp,
    )

    db.add(db_incident)
    db.commit()
    db.refresh(db_incident)

    return db_incident


def get_incident(
    db: Session,
    incident_id: UUID,
):
    return (
        db.query(Incident)
        .filter(Incident.id == incident_id)
        .first()
    )


def get_incidents(db: Session):
    return db.query(Incident).all()


def update_incident(
    db: Session,
    incident_id: UUID,
    incident: IncidentUpdate,
):
    db_incident = (
        db.query(Incident)
        .filter(Incident.id == incident_id)
        .first()
    )

    if not db_incident:
        return None

    update_data = incident.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_incident, key, value)

    db.commit()
    db.refresh(db_incident)

    return db_incident


def delete_incident(
    db: Session,
    incident_id: UUID,
):
    db_incident = (
        db.query(Incident)
        .filter(Incident.id == incident_id)
        .first()
    )

    if not db_incident:
        return None

    db.delete(db_incident)
    db.commit()

    return db_incident