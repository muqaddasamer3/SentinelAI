from sqlalchemy.orm import Session

from app.database.models import Camera


def create_camera(db: Session, camera: Camera):
    """
    Create a new camera.
    """
    db.add(camera)
    db.commit()
    db.refresh(camera)
    return camera


def get_camera(db: Session, camera_id):
    """
    Get a camera by its ID.
    """
    return db.query(Camera).filter(Camera.id == camera_id).first()

def get_cameras(db: Session):
    """
    Get all cameras.
    """

    return db.query(Camera).all()

def update_camera(db: Session, camera_id, updated_data: dict):
    """
    Update a camera.
    """

    camera = db.query(Camera).filter(Camera.id == camera_id).first()

    if not camera:
        return None

    for key, value in updated_data.items():
        setattr(camera, key, value)

    db.commit()
    db.refresh(camera)

    return camera

def delete_camera(db: Session, camera_id):
    """
    Delete a camera.
    """

    camera = db.query(Camera).filter(Camera.id == camera_id).first()

    if not camera:
        return None

    db.delete(camera)
    db.commit()

    return camera