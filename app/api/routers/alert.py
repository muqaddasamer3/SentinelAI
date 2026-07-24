from uuid import UUID

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.alert import (
    AlertCreate,
    AlertUpdate,
    AlertResponse,
)

from app.crud.alert import (
    create_alert,
    get_alert,
    get_alerts,
    update_alert,
    delete_alert,
)

router = APIRouter(
    prefix="/alerts",
    tags=["Alerts"],
)


@router.post(
    "/",
    response_model=AlertResponse,
    status_code=201,
)
def create_new_alert(
    alert: AlertCreate,
    db: Session = Depends(get_db),
):
    return create_alert(db, alert)


@router.get(
    "/",
    response_model=list[AlertResponse],
)
def read_alerts(
    db: Session = Depends(get_db),
):
    return get_alerts(db)


@router.get(
    "/{alert_id}",
    response_model=AlertResponse,
)
def read_alert(
    alert_id: UUID,
    db: Session = Depends(get_db),
):
    db_alert = get_alert(db, alert_id)

    if not db_alert:
        raise HTTPException(
            status_code=404,
            detail="Alert not found",
        )

    return db_alert


@router.put(
    "/{alert_id}",
    response_model=AlertResponse,
)
def update_existing_alert(
    alert_id: UUID,
    alert: AlertUpdate,
    db: Session = Depends(get_db),
):
    db_alert = update_alert(
        db,
        alert_id,
        alert,
    )

    if not db_alert:
        raise HTTPException(
            status_code=404,
            detail="Alert not found",
        )

    return db_alert


@router.delete(
    "/{alert_id}",
    response_model=AlertResponse,
)
def delete_existing_alert(
    alert_id: UUID,
    db: Session = Depends(get_db),
):
    db_alert = delete_alert(
        db,
        alert_id,
    )

    if not db_alert:
        raise HTTPException(
            status_code=404,
            detail="Alert not found",
        )

    return db_alert