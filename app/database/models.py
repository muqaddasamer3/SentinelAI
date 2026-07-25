import uuid
from sqlalchemy import Boolean

from sqlalchemy import (
    String,
    Text,
    DateTime,
    LargeBinary,
    Float,
    Boolean,
    ForeignKey,
    Column,
)

from sqlalchemy.dialects.postgresql import UUID

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from sqlalchemy.sql import func

from app.database.base import Base

from sqlalchemy.orm import relationship

# Define the Camera model

class Camera(Base):
    __tablename__ = "cameras"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    camera_id: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False,
    )

    camera_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    location: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    status: Mapped[str] = mapped_column(
        String(20),
        default="Active",
    )

    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    ) 
    
# Define the person model

class Person(Base):
    __tablename__ = "persons"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    person_code: Mapped[str] = mapped_column(
        String(20),
        unique=True,
        nullable=False,
    )

    face_embedding: Mapped[bytes | None] = mapped_column(
        LargeBinary,
        nullable=True,
    )

    first_seen: Mapped[DateTime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

# Define the TrackingLog model

class TrackingLog(Base):
    __tablename__ = "tracking_logs"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    person_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("persons.id"),
        nullable=False,
    )

    camera_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("cameras.id"),
        nullable=False,
    )

    timestamp: Mapped[DateTime] = mapped_column(
    DateTime(timezone=True),
    server_default=func.now(),
    nullable=False,
)

    event_type: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    confidence: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    face_matched: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    clothing_color: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )
    person = relationship("Person")
    camera = relationship("Camera")
    
# Define the Incident model

class Incident(Base):
    __tablename__ = "incidents"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    tracking_log_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("tracking_logs.id"),
        nullable=False,
    )

    person_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("persons.id"),
        nullable=False,
    )

    camera_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("cameras.id"),
        nullable=False,
    )

    incident_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    summary: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    severity: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    timestamp: Mapped[DateTime] = mapped_column(
    DateTime(timezone=True),
    server_default=func.now(),
    nullable=False,
)

    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )
    
    tracking_log = relationship("TrackingLog")
    person = relationship("Person")
    camera = relationship("Camera")
    
# Define the Alert model

class Alert(Base):
    __tablename__ = "alerts"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    incident_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("incidents.id"),
        nullable=False,
    )

    alert_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    message: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    status: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        default="Pending",
    )

    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    incident = relationship("Incident")
    
# Define the User model

class User(Base):
    __tablename__ = "users"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    full_name = Column(
        String(255),
        nullable=False
    )

    email = Column(
        String(255),
        unique=True,
        nullable=False
    )

    password_hash = Column(
        String(255),
        nullable=False
    )

    role = Column(
        String(50),
        nullable=False,
        default="Security Officer"
    )

    is_active = Column(
        Boolean,
        default=True,
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
