from sqlalchemy.orm import Session

from app.database.models import Incident


def create_incident(db: Session, incident: Incident):
    """
    Create a new incident.
    """
    db.add(incident)
    db.commit()
    db.refresh(incident)
    return incident


def get_incident(db: Session, incident_id):
    """
    Get an incident by ID.
    """
    return (
        db.query(Incident)
        .filter(Incident.id == incident_id)
        .first()
    )


def get_incidents(db: Session):
    """
    Get all incidents.
    """
    return db.query(Incident).all()


def update_incident(
    db: Session,
    incident_id,
    updated_data: dict,
):
    """
    Update an incident.
    """
    incident = (
        db.query(Incident)
        .filter(Incident.id == incident_id)
        .first()
    )

    if not incident:
        return None

    for key, value in updated_data.items():
        setattr(incident, key, value)

    db.commit()
    db.refresh(incident)

    return incident


def delete_incident(db: Session, incident_id):
    """
    Delete an incident.
    """
    incident = (
        db.query(Incident)
        .filter(Incident.id == incident_id)
        .first()
    )

    if not incident:
        return None

    db.delete(incident)
    db.commit()

    return incident