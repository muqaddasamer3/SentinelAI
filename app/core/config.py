import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

load_dotenv()


class Settings(BaseSettings):
    APP_NAME: str = "SentinelAI API"
    APP_VERSION: str = "1.0.0"
    APP_DESCRIPTION: str = (
        "AI Multi-Camera Human Tracking and Incident Detection System"
    )
    DATABASE_URL: str
    GEMMA_API_KEY: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
    )


settings = Settings()