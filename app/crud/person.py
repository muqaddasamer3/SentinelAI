from sqlalchemy.orm import Session

from app.database.models import Person


def create_person(db: Session, person: Person):
    """
    Create a new person.
    """
    db.add(person)
    db.commit()
    db.refresh(person)
    return person


def get_person(db: Session, person_id):
    """
    Get a person by ID.
    """
    return db.query(Person).filter(Person.id == person_id).first()


def get_persons(db: Session):
    """
    Get all persons.
    """
    return db.query(Person).all()


def update_person(db: Session, person_id, updated_data: dict):
    """
    Update a person.
    """
    person = db.query(Person).filter(Person.id == person_id).first()

    if not person:
        return None

    for key, value in updated_data.items():
        setattr(person, key, value)

    db.commit()
    db.refresh(person)

    return person


def delete_person(db: Session, person_id):
    """
    Delete a person.
    """
    person = db.query(Person).filter(Person.id == person_id).first()

    if not person:
        return None

    db.delete(person)
    db.commit()

    return person