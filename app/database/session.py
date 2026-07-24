from sqlalchemy.orm import Session, sessionmaker

from app.database.connection import engine

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


def get_db():
    """
    Dependency that provides a database session
    to each API request.
    """
    db: Session = SessionLocal()

    try:
        yield db

    finally:
        db.close()