from fastapi import APIRouter, Depends, status
from pymongo import MongoClient

from src import schemas
from src.db import get_db

router = APIRouter()


@router.get(
    path='/',
    status_code=status.HTTP_200_OK,
    response_model=schemas.Stats
)
def get_stats(
        db: MongoClient = Depends(get_db)
):
    projects = list(db.projects.find())
    projects_by_industry = dict()
    for project in projects:
        if project['industry'] in projects_by_industry.keys():
            projects_by_industry[project['industry']]['count'] += 1
            projects_by_industry[project['industry']]['summaryCost'] += project['totalCost']
        else:
            projects_by_industry.update({
                f'{project["industry"]}':
                    {
                        'count': 1,
                        'summaryCost': project['totalCost'],
                    }
            })

    data = {
        'projectsCount': len(projects),
        'projectsByIndustry': projects_by_industry
    }
    return data
