from fastapi import Depends, HTTPException, status

from app.auth.security import verify_token


def require_role(required_role: str):

    def role_checker(
        current_user: dict = Depends(verify_token)
    ):

        if current_user.get("role") != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions",
            )

        return current_user

    return role_checker