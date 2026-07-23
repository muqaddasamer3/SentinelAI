from sqlalchemy.orm import Session

from app.database.models import Alert


def create_alert(db: Session, alert: Alert):
    """
    Create a new alert.
    """
    db.add(alert)
    db.commit()
    db.refresh(alert)
    return alert


def get_alert(db: Session, alert_id):
    """
    Get an alert by ID.
    """
    return (
        db.query(Alert)
        .filter(Alert.id == alert_id)
        .first()
    )


def get_alerts(db: Session):
    """
    Get all alerts.
    """
    return db.query(Alert).all()


def update_alert(
    db: Session,
    alert_id,
    updated_data: dict,
):
    """
    Update an alert.
    """
    alert = (
        db.query(Alert)
        .filter(Alert.id == alert_id)
        .first()
    )

    if not alert:
        return None

    for key, value in updated_data.items():
        setattr(alert, key, value)

    db.commit()
    db.refresh(alert)

    return alert


def delete_alert(db: Session, alert_id):
    """
    Delete an alert.
    """
    alert = (
        db.query(Alert)
        .filter(Alert.id == alert_id)
        .first()
    )

    if not alert:
        return None

    db.delete(alert)
    db.commit()

    return alert