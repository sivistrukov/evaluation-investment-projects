from typing import List

from pydantic import BaseModel


class ImplementationPeriod(BaseModel):
    start: str
    end: str


class AmountFundsRow(BaseModel):
    year: str
    fund: float


class AmountFunds(BaseModel):
    summaryFunds: float
    rows: List[AmountFundsRow]


class Demand(BaseModel):
    year: str
    value: float


class Volume(BaseModel):
    year: str
    natural: float
    cost: float


class Product(BaseModel):
    name: str
    demand: List[Demand]
    volume: List[Volume]


class Stage(BaseModel):
    event: str
    deadline: str
    result: str


class ProjectImplementationStages(BaseModel):
    developmentAndApprovalProjectDocumentation: List[Stage]
    manufacturing: List[Stage]
    constructionAndInstallationWorks: List[Stage]
    purchaseEquipment: List[Stage]
    otherStages: List[Stage]


class WorkPlacesRow(BaseModel):
    year: str
    count: int
    wages: float
    laborProductivity: float


class WorkPlaces(BaseModel):
    total: int
    rows: List[WorkPlacesRow]


class InvestmentProjectPost(BaseModel):
    fullName: str
    ownCapital: float
    loanCoverage: float
    implementationPeriod: ImplementationPeriod
    totalCost: float
    amountFunds: AmountFunds
    products: List[Product]
    projectImplementationStages: ProjectImplementationStages
    discountRate: float
    npv: float
    irr: float
    discountPaybackPeriod: str
    workplaces: WorkPlaces


class InvestmentProjectGetMulti(BaseModel):
    fullName: str
    totalCost: float
    totalWorkplaces: int


class InvestmentProjectGet(BaseModel):
    fullName: str
    ownCapital: float
    loanCoverage: float
    implementationPeriod: ImplementationPeriod
    totalCost: float
    amountFunds: AmountFunds
    products: List[Product]
    projectImplementationStages: ProjectImplementationStages
    discountRate: float
    npv: float
    irr: float
    discountPaybackPeriod: str
    workplaces: WorkPlaces
