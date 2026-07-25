from uuid import UUID

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)

from sqlalchemy.orm import Session

from app.auth.security import verify_token

from app.crud.camera import (
    create_camera,
    delete_camera,
    get_camera,
    get_cameras,
    update_camera,
)

from app.database.session import get_db

from app.schemas.camera import (
    CameraCreate,
    CameraResponse,
    CameraUpdate,
)


router = APIRouter(
    prefix="/cameras",
    tags=["Cameras"],
)



@router.post(
    "/",
    response_model=CameraResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_new_camera(
    camera: CameraCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(verify_token),
):
    return create_camera(
        db=db,
        camera=camera,
    )



@router.get(
    "/",
    response_model=list[CameraResponse],
)
def read_cameras(
    db: Session = Depends(get_db),
    current_user: dict = Depends(verify_token),
):
    return get_cameras(db)



@router.get(
    "/{camera_id}",
    response_model=CameraResponse,
)
def read_camera(
    camera_id: UUID,
    db: Session = Depends(get_db),
    current_user: dict = Depends(verify_token),
):

    camera = get_camera(
        db,
        camera_id,
    )

    if camera is None:
        raise HTTPException(
            status_code=404,
            detail="Camera not found",
        )

    return camera



@router.put(
    "/{camera_id}",
    response_model=CameraResponse,
)
def edit_camera(
    camera_id: UUID,
    camera: CameraUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(verify_token),
):

    updated_camera = update_camera(
        db,
        camera_id,
        camera,
    )

    if updated_camera is None:
        raise HTTPException(
            status_code=404,
            detail="Camera not found",
        )

    return updated_camera



@router.delete(
    "/{camera_id}",
    response_model=CameraResponse,
)
def remove_camera(
    camera_id: UUID,
    db: Session = Depends(get_db),
    current_user: dict = Depends(verify_token),
):

    deleted_camera = delete_camera(
        db,
        camera_id,
    )

    if deleted_camera is None:
        raise HTTPException(
            status_code=404,
            detail="Camera not found",
        )

    return deleted_camera