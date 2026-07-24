from uuid import UUID

from sqlalchemy.orm import Session

from app.database.models import Person
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


def get_person(db: Session, person_id: UUID):
    """
    Get person by ID.
    """

    return db.query(Person).filter(Person.id == person_id).first()


def get_persons(db: Session):
    """
    Get all persons.
    """

    return db.query(Person).all()


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