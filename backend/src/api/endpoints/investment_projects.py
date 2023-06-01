from typing import List

from fastapi import APIRouter, Depends, status
from pymongo import MongoClient

from src.db import get_db_client
from src import schemas

router = APIRouter()


@router.get('/', response_model=List[schemas.InvestmentProjectGetMulti])
def get_list_of_investment_projects(client: MongoClient = Depends(get_db_client)):
    return list(client.projects.find())


@router.post('/', status_code=status.HTTP_201_CREATED)
def create_new_investment_project(
        payload: schemas.InvestmentProjectPost,
        client: MongoClient = Depends(get_db_client)
):
    client.projects.insert_one(payload.dict())
    return
