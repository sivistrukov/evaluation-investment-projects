from pymongo import MongoClient

from .config import settings


def get_db_client() -> MongoClient:
    return MongoClient(settings.MONGODB_URL).local
