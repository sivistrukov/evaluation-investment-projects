from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.api_router import api_router
from .config import settings

app = FastAPI(
    title=settings.PROJECT_NAME
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

app.include_router(api_router, prefix='/api')
