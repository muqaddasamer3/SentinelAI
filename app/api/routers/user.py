from uuid import UUID

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.database.session import get_db

from app.auth.security import verify_token

from app.auth.permissions import require_role

from app.schemas.user import (
    UserCreate,
    UserUpdate,
    UserResponse,
)

from app.crud.user import (
    create_user,
    get_user,
    get_users,
    update_user,
    delete_user,
)


router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.post(
    "/",
    response_model=UserResponse,
    status_code=201,
)
def create_new_user(
    user: UserCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(
        require_role("Administrator")
    ),
):
    return create_user(
        db,
        user,
    )


@router.get(
    "/",
    response_model=list[UserResponse],
)
def read_users(
    db: Session = Depends(get_db),
    current_user: dict = Depends(
        require_role("Administrator")
    ),
):
    return get_users(db)


@router.get(
    "/{user_id}",
    response_model=UserResponse,
)
def read_user(
    user_id: UUID,
    db: Session = Depends(get_db),
    current_user: dict = Depends(
        require_role("Administrator")
    ),
):

    db_user = get_user(
        db,
        user_id,
    )

    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return db_user


@router.put(
    "/{user_id}",
    response_model=UserResponse,
)
def update_existing_user(
    user_id: UUID,
    user: UserUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(
        require_role("Administrator")
    ),
):

    db_user = update_user(
        db,
        user_id,
        user,
    )

    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return db_user


@router.delete(
    "/{user_id}",
    response_model=UserResponse,
)
def delete_existing_user(
    user_id: UUID,
    db: Session = Depends(get_db),
    current_user: dict = Depends(
        require_role("Administrator")
    ),
):

    db_user = delete_user(
        db,
        user_id,
    )

    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return db_user