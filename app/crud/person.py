from uuid import UUID

from sqlalchemy.orm import Session

from sqlalchemy import func

from app.database.models import (
    Person,
    TrackingLog,
)
from app.schemas.person import PersonCreate, PersonUpdate


def create_person(db: Session, person: PersonCreate):
    """
    Create a new person.
    """

    db_person = Person(
        person_code=person.person_code,
        face_embedding=person.face_embedding,
        first_seen=person.first_seen,
    )

    db.add(db_person)
    db.commit()
    db.refresh(db_person)

    return db_person


def get_person(
    db: Session,
    person_id: UUID,
):

    person = (
        db.query(Person)
        .filter(Person.id == person_id)
        .first()
    )

    if not person:
        return None

    logs = (
        db.query(TrackingLog)
        .filter(
            TrackingLog.person_id == person.id
        )
        .order_by(
            TrackingLog.timestamp.desc()
        )
        .all()
    )

    person.last_seen = (
        logs[0].timestamp if logs else None
    )

    person.total_detections = len(logs)

    person.cameras_visited = len(
        {
            log.camera_id
            for log in logs
        }
    )

    person.status = (
        "Inside"
        if logs
        else "Unknown"
    )

    return person


def get_persons(db: Session):

    persons = db.query(Person).all()

    result = []

    for person in persons:

        logs = (
            db.query(TrackingLog)
            .filter(
                TrackingLog.person_id == person.id
            )
            .order_by(
                TrackingLog.timestamp.desc()
            )
            .all()
        )

        person.last_seen = (
            logs[0].timestamp if logs else None
        )

        person.total_detections = len(logs)

        person.cameras_visited = len(
            {
                log.camera_id
                for log in logs
            }
        )

        if logs:
            person.status = "Inside"
        else:
            person.status = "Unknown"

        result.append(person)

    return result


def update_person(
    db: Session,
    person_id: UUID,
    person: PersonUpdate,
):
    """
    Update person.
    """

    db_person = (
        db.query(Person)
        .filter(Person.id == person_id)
        .first()
    )

    if not db_person:
        return None

    update_data = person.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_person, key, value)

    db.commit()
    db.refresh(db_person)

    return db_person


def delete_person(
    db: Session,
    person_id: UUID,
):
    """
    Delete person.
    """

    db_person = (
        db.query(Person)
        .filter(Person.id == person_id)
        .first()
    )

    if not db_person:
        return None

    db.delete(db_person)
    db.commit()

    return db_person