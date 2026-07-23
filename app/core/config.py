from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "SentinelAI API"
    APP_VERSION: str = "1.0.0"
    APP_DESCRIPTION: str = (
        "AI Multi-Camera Human Tracking and Incident Detection System"
    )

    DATABASE_URL: str

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
    )


settings = Settings()