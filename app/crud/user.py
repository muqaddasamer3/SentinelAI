from uuid import UUID

from sqlalchemy.orm import Session

from app.database.models import User
from app.schemas.user import (
    UserCreate,
    UserUpdate,
)
from app.auth.security import hash_password


def create_user(
    db: Session,
    user: UserCreate,
):
    db_user = User(
        full_name=user.full_name,
        email=user.email,
        password_hash=hash_password(user.password),
        role=user.role,
        is_active=user.is_active,
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def get_user(
    db: Session,
    user_id: UUID,
):
    return (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )


def get_users(
    db: Session,
):
    return db.query(User).all()


def get_user_by_email(
    db: Session,
    email: str,
):
    return (
        db.query(User)
        .filter(User.email == email)
        .first()
    )


def update_user(
    db: Session,
    user_id: UUID,
    user: UserUpdate,
):
    db_user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not db_user:
        return None

    update_data = user.model_dump(exclude_unset=True)

    # Hash password if it is being updated
    if "password" in update_data:
        update_data["password_hash"] = hash_password(
            update_data.pop("password")
        )

    # Update remaining fields
    for key, value in update_data.items():
        setattr(db_user, key, value)

    db.commit()
    db.refresh(db_user)

    return db_user


def delete_user(
    db: Session,
    user_id: UUID,
):
    db_user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not db_user:
        return None

    db.delete(db_user)
    db.commit()

    return db_user