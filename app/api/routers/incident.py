from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.crud.incident import (
    create_incident,
    get_incident,
    get_incidents,
    update_incident,
    delete_incident,
)

from app.schemas.incident import (
    IncidentCreate,
    IncidentUpdate,
    IncidentResponse,
)

router = APIRouter(
    prefix="/incidents",
    tags=["Incidents"],
)


@router.post(
    "/",
    response_model=IncidentResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_new_incident(
    incident: IncidentCreate,
    db: Session = Depends(get_db),
):
    return create_incident(db, incident)


@router.get(
    "/",
    response_model=list[IncidentResponse],
)
def read_incidents(
    db: Session = Depends(get_db),
):
    return get_incidents(db)


@router.get(
    "/{incident_id}",
    response_model=IncidentResponse,
)
def read_incident(
    incident_id: UUID,
    db: Session = Depends(get_db),
):
    incident = get_incident(db, incident_id)

    if incident is None:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    return incident


@router.put(
    "/{incident_id}",
    response_model=IncidentResponse,
)
def edit_incident(
    incident_id: UUID,
    incident: IncidentUpdate,
    db: Session = Depends(get_db),
):
    updated = update_incident(
        db,
        incident_id,
        incident,
    )

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    return updated


@router.delete(
    "/{incident_id}",
    response_model=IncidentResponse,
)
def remove_incident(
    incident_id: UUID,
    db: Session = Depends(get_db),
):
    deleted = delete_incident(
        db,
        incident_id,
    )

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    return deleted