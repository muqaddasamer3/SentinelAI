from uuid import UUID

from sqlalchemy.orm import Session

from app.database.models import Camera
from app.schemas.camera import CameraCreate, CameraUpdate


def create_camera(db: Session, camera: CameraCreate):
    """
    Create a new camera.
    """

    db_camera = Camera(
        camera_id=camera.camera_id,
        camera_name=camera.camera_name,
        location=camera.location,
        status=camera.status,
    )

    db.add(db_camera)
    db.commit()
    db.refresh(db_camera)

    return db_camera


def get_camera(db: Session, camera_id: UUID):
    """
    Get camera by ID.
    """

    return db.query(Camera).filter(Camera.id == camera_id).first()


def get_cameras(db: Session):
    """
    Get all cameras.
    """

    return db.query(Camera).all()


def update_camera(
    db: Session,
    camera_id: UUID,
    camera: CameraUpdate,
):
    """
    Update camera.
    """

    db_camera = (
        db.query(Camera)
        .filter(Camera.id == camera_id)
        .first()
    )

    if not db_camera:
        return None

    update_data = camera.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_camera, key, value)

    db.commit()
    db.refresh(db_camera)

    return db_camera


def delete_camera(
    db: Session,
    camera_id: UUID,
):
    """
    Delete camera.
    """

    db_camera = (
        db.query(Camera)
        .filter(Camera.id == camera_id)
        .first()
    )

    if not db_camera:
        return None

    db.delete(db_camera)
    db.commit()

    return db_camera