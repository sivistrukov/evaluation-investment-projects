from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from pymongo import MongoClient

from src.db import get_db
from src import schemas

router = APIRouter()


@router.get(
    path='/',
    status_code=status.HTTP_200_OK,
    response_model=List[schemas.InvestmentProjectGetMulti]
)
def get_list_of_investment_projects(
        db: MongoClient = Depends(get_db)
):
    projects = [{
        'fullName': project['fullName'],
        'totalCost': project['totalCost'],
        'totalWorkplaces': project['workplaces']['total']
    } for project in list(db.projects.find())]
    return projects


@router.post(path='/', status_code=status.HTTP_201_CREATED)
def create_new_investment_project(
        payload: schemas.InvestmentProjectPost,
        db: MongoClient = Depends(get_db)
):
    db.projects.insert_one(payload.dict())
    return


@router.get(
    path='/{project_name}',
    status_code=status.HTTP_200_OK,
    response_model=schemas.InvestmentProjectGet
)
def get_investment_project(
        project_name: str,
        db: MongoClient = Depends(get_db)
):
    project = db.projects.find_one({'fullName': project_name})
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Project not found'
        )
    return project