from typing import List

from pydantic import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = 'Evaluation Investment Projects Backend'
    BACKEND_CORS_ORIGINS: List[str] = ['*']

    MONGODB_URL: str

    class Config:
        case_sensitive = True


settings = Settings()
