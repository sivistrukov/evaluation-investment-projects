from os import path
from typing import List
from pathlib import Path

from pydantic import BaseSettings, validator


class Settings(BaseSettings):
    PROJECT_NAME: str = 'Evaluation Investment Projects Backend'
    BASE_DIR: Path = Path(__file__).resolve().parent
    MEDIA_FILES_DIR: str = str(path.join(BASE_DIR, 'media'))

    BACKEND_CORS_ORIGINS: List[str] = ['*']

    MONGODB_URL: str

    class Config:
        case_sensitive = True


settings = Settings()
