from app.database.models import (
    Camera,
    Person,
    TrackingLog,
    Incident,
    Alert,
    User,
)

print("Models imported successfully!\n")

print(Camera.__tablename__)
print(Person.__tablename__)
print(TrackingLog.__tablename__)
print(Incident.__tablename__)
print(Alert.__tablename__)
print(User.__tablename__)