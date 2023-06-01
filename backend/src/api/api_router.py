from fastapi import APIRouter

from .endpoints import investment_projects

api_router = APIRouter()
api_router.include_router(investment_projects.router, tags=['Investment Projects'])


@api_router.get('/')
def root():
    return {'message': 'working'}
