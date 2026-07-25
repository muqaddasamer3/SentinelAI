from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)

from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.auth import (
    LoginRequest,
    TokenResponse,
)

from app.schemas.user import UserCreate

from app.crud.user import (
    create_user,
    get_user_by_email,
)

from app.auth.security import (
    verify_password,
    create_access_token,
    verify_token,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


# ----------------------------
# Login
# ----------------------------
@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(
    credentials: LoginRequest,
    db: Session = Depends(get_db),
):
    user = get_user_by_email(
        db,
        credentials.email,
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not verify_password(
        credentials.password,
        user.password_hash,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    access_token = create_access_token(
        data={
            "sub": str(user.id),
            "email": user.email,
            "role": user.role,
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


# ----------------------------
# Register
# ----------------------------
@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED,
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    existing_user = get_user_by_email(
        db,
        user.email,
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    return create_user(
        db=db,
        user=user,
    )


# ----------------------------
# Current Logged-in User
# ----------------------------
@router.get("/me")
def get_current_user(
    payload: dict = Depends(verify_token),
):
    return payload