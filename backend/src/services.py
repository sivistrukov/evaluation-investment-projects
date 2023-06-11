from os import path

from pandas import DataFrame, ExcelWriter
from pymongo import MongoClient

from src.config import settings


def export_investment_projects_by_excel(db: MongoClient) -> str:
    """
    Generate excel file with investment projects data and save in media folder
    :param db: Mongo Database client
    :return: path to file
    """
    projects = list(db.projects.find())
    project_names = []
    workplace_counts = []
    total_costs = []
    for project in projects:
        project_names.append(project['fullName'])
        workplace_counts.append(project['totalCost'])
        total_costs.append(project['workplaces']['total'])
    projects_data = {
        'Название проекта': project_names,
        'Кол-во создаваемых рабочих мест': workplace_counts,
        'Общая стоимость инвестиционного проекта, млн. руб': total_costs
    }
    projects_df = DataFrame.from_dict(projects_data)

    industry = []
    projects_count = []
    projects_summary_cost = []
    for project in projects:
        if project['industry'] not in industry:
            industry.append(project['industry'])
            projects_count.append(1)
            projects_summary_cost.append(project['totalCost'])
        else:
            industry_index = industry.index(project['industry'])
            projects_count[industry_index] += 1
            projects_summary_cost[industry_index] += project['totalCost']

    statistics_data = {
        'Отрасль': industry,
        'Кол-во проектов': projects_count,
        'Сумма инвестиций по отрасли': projects_summary_cost,
    }
    statistics_df = DataFrame.from_dict(statistics_data)

    npv = []
    pi = []
    irr = []
    discount_payback_period = []
    for project in projects:
        npv.append(project['npv'])
        pi.append(project['pi'])
        irr.append(project['irr'])
        discount_payback_period.append(project['discountPaybackPeriod'])
    projects_indicators_data = {
        'Название проекта': project_names,
        'Чистая приведенная стоимость (NPV),руб': npv,
        'Индекс рентабельности инвестиций (PI)': pi,
        'Внутренняя норма доходности (IRR), %': irr,
        'Дисконтированный срок окупаемости': discount_payback_period,
    }
    projects_indicators_df = DataFrame.from_dict(projects_indicators_data)

    filepath = path.join(settings.MEDIA_FILES_DIR, 'investment_projects.xlsx')
    writer = ExcelWriter(filepath, engine="openpyxl")
    projects_df.to_excel(
        writer, index=False,
        sheet_name='Инвестиционные_проекты'
    )
    statistics_df.to_excel(writer, index=False, sheet_name='Статистика')
    projects_indicators_df.to_excel(
        writer, index=False,
        sheet_name='Показатели_инвестиционных_проектов'
    )
    writer.close()
    return filepath
