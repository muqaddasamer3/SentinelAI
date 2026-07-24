from uuid import UUID

from sqlalchemy.orm import Session

from app.database.models import Alert
from app.schemas.alert import (
    AlertCreate,
    AlertUpdate,
)


def create_alert(
    db: Session,
    alert: AlertCreate,
):
    db_alert = Alert(
        incident_id=alert.incident_id,
        alert_type=alert.alert_type,
        message=alert.message,
        status=alert.status,
    )

    db.add(db_alert)
    db.commit()
    db.refresh(db_alert)

    return db_alert


def get_alert(
    db: Session,
    alert_id: UUID,
):
    return (
        db.query(Alert)
        .filter(Alert.id == alert_id)
        .first()
    )


def get_alerts(db: Session):
    return db.query(Alert).all()


def update_alert(
    db: Session,
    alert_id: UUID,
    alert: AlertUpdate,
):
    db_alert = (
        db.query(Alert)
        .filter(Alert.id == alert_id)
        .first()
    )

    if not db_alert:
        return None

    update_data = alert.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_alert, key, value)

    db.commit()
    db.refresh(db_alert)

    return db_alert


def delete_alert(
    db: Session,
    alert_id: UUID,
):
    db_alert = (
        db.query(Alert)
        .filter(Alert.id == alert_id)
        .first()
    )

    if not db_alert:
        return None

    db.delete(db_alert)
    db.commit()

    return db_alert