from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth.security import verify_token

from app.crud.person import (
    create_person,
    delete_person,
    get_person,
    get_persons,
    update_person,
)

from app.database.session import get_db

from app.schemas.person import (
    PersonCreate,
    PersonResponse,
    PersonUpdate,
)

router = APIRouter(
    prefix="/persons",
    tags=["Persons"],
)


@router.post(
    "/",
    response_model=PersonResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_new_person(
    person: PersonCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(verify_token),
):
    return create_person(db=db, person=person)


@router.get(
    "/",
    response_model=list[PersonResponse],
)
def read_persons(
    db: Session = Depends(get_db),
    current_user: dict = Depends(verify_token),
):
    return get_persons(db)


@router.get(
    "/{person_id}",
    response_model=PersonResponse,
)
def read_person(
    person_id: UUID,
    db: Session = Depends(get_db),
    current_user: dict = Depends(verify_token),
):
    person = get_person(db, person_id)

    if person is None:
        raise HTTPException(
            status_code=404,
            detail="Person not found",
        )

    return person


@router.put(
    "/{person_id}",
    response_model=PersonResponse,
)
def edit_person(
    person_id: UUID,
    person: PersonUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(verify_token),
):
    updated_person = update_person(
        db,
        person_id,
        person,
    )

    if updated_person is None:
        raise HTTPException(
            status_code=404,
            detail="Person not found",
        )

    return updated_person


@router.delete(
    "/{person_id}",
    response_model=PersonResponse,
)
def remove_person(
    person_id: UUID,
    db: Session = Depends(get_db),
    current_user: dict = Depends(verify_token),
):
    deleted_person = delete_person(
        db,
        person_id,
    )

    if deleted_person is None:
        raise HTTPException(
            status_code=404,
            detail="Person not found",
        )

    return deleted_person