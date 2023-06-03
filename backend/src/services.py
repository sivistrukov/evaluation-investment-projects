from os import path

from pandas import DataFrame
from pymongo import MongoClient

from src.config import settings


def export_investment_projects_by_excel(db: MongoClient) -> str:
    """
    Generate excel file with investment projects data and save in media folder
    :param db: Mongo Database client
    :return: path to file
    """
    projects = db.projects.find()
    project_names = []
    workplace_counts = []
    total_costs = []
    for project in projects:
        project_names.append(project['fullName'])
        workplace_counts.append(project['totalCost'])
        total_costs.append(project['workplaces']['total'])
    data = {
        'Название проекта': project_names,
        'Кол-во создаваемых рабочих мест': workplace_counts,
        'Общая стоимость инвестиционного проекта, млн. руб': total_costs
    }
    df = DataFrame.from_dict(data)
    filepath = path.join(settings.MEDIA_FILES_DIR, 'investment_projects.xlsx')
    df.to_excel(filepath, index=False, sheet_name='Инвестиционные_проекты')
    return filepath
