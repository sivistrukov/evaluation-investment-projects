import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import Stack from '@mui/material/Stack';
import CustomInput from '../components/ui/CustomInput';
import CustomSelect from '../components/ui/CustomSelect'
import AmountOfFundingTable from '../components/modules/AmountOfFundingTable';
import Gap from '../components/ui/Gap';
import {Button} from "@mui/material";
import Product from "../components/modules/Products/Product";
import AverageWagesOfWorkers from '../components/modules/AverageWagesOfWorkers';
import WorkPlaces from '../components/modules/Workplaces';
import DevelopmentAndApprovalProjectDocumentationTable
    from '../components/modules/DevelopmentAndApprovalProjectDocumentationTable/DevelopmentAndApprovalProjectDocumentationTable';
import ConstructionAndInstallationWorksTable
    from '../components/modules/ConstructionAndInstallationWorksTable/ConstructionAndInstallationWorksTable';
import PurchaseEquipmentTable
    from '../components/modules/PurchaseEquipmentTable/PurchaseEquipmentTable';
import ProductionTable
    from '../components/modules/ProductionTable/ProductionTable';
import OtherStagesTable
    from '../components/modules/OtherStagesTable/OtherStagesTable';
import LaborProductivityTable
    from "../components/modules/LaborProductivityTable";
import axios from "axios";

function NewInvestmentProject() {
    const [projectImplementationPeriodStart, setProjectImplementationPeriodStart] = useState(new Date());
    const [projectImplementationPeriodEnd, setProjectImplementationPeriodEnd] = useState(new Date());
    const [period, setPeriod] = useState(`${projectImplementationPeriodStart.getFullYear()}-${projectImplementationPeriodEnd.getFullYear()}`);
    const [projectTotalCost, setProjectTotalCost] = useState(0);
    const [ownCapital, setOwnCapital] = useState(0);
    const [borrowedFunds, setBorrowedFunds] = useState(0);
    const [amountFunds, setAmountFunds] = useState({})
    const [developmentAndApprovalProjectDocumentation, setDevelopmentAndApprovalProjectDocumentation] = useState({})
    const [otherStages, setOtherStages] = useState({})
    const [manufacturing, setManufacturing] = useState({})
    const [purchaseEquipment, setPurchaseEquipment] = useState({})
    const [constructionAndInstallationWorks, setConstructionAndInstallationWorks] = useState({})
    const [products, setProducts] = useState([{
        index: 0,
        name: "",
    }])
    const [laborProductivity, setLaborProductivity] = useState([])
    const [workPlaces, setWorkPlaces] = useState([])
    const [averageWagesOfWorkers, setAverageWagesOfWorkers] = useState([])
    const [discountRate, setDiscountRate] = useState(0)
    const [npv, setNpv] = useState(0)
    const [pi, setPi] = useState(0)
    const [irr, setIrr] = useState(0)
    const [discountPaybackPeriod, setDiscountPaybackPeriod] = useState('-')

    const [isShowMainFactors, setIsShowMainFactors] = useState(false)


    const debouncedPeriodStart = useDebounce(projectImplementationPeriodStart, 1500);
    const debouncedPeriodEnd = useDebounce(projectImplementationPeriodEnd, 1500);


    const onOwnCapitalChange = (value) => {
        setOwnCapital(value);
    }

    const onBorrowedFundsChange = (value) => {
        setBorrowedFunds(value);
    }

    const getAmountOfFunding = (data) => {
        setAmountFunds(data)
    }

    const getDevelopmentAndApprovalProjectDocumentation = (data) => {
        setDevelopmentAndApprovalProjectDocumentation(data)
    }

    const getOtherStages = (data) => {
        setOtherStages(data)
    }

    const getProduction = (data) => {
        setManufacturing(data)
    }

    const getPurchaseEquipment = (data) => {
        setPurchaseEquipment(data)
    }

    const getConstructionAndInstallationWorks = (data) => {
        setConstructionAndInstallationWorks(data)
    }

    const getProduct = (idx, data) => {
        setProducts(prev => [
            ...prev.map(item => (
                item.index === idx ? data : item
            ))
        ])
    }

    const getWorkPlaces = (value) => {
        setWorkPlaces(value)
    }

    const getAverageWagesOfWorkers = (value) => {
        setAverageWagesOfWorkers(value)
    }

    const calculateMainFactors = () => {
        const calculateDiscountedProfit = (rate) => {
            let income = []
            let expense = []
            let diff = projectImplementationPeriodEnd.getFullYear() - projectImplementationPeriodStart.getFullYear()
            for (let year = 0; year <= diff; year++) {
                let exp = 0
                let inc = 0
                if (year === 0) exp += Number(borrowedFunds) + Number(ownCapital)
                exp += Number(amountFunds.years[year].fund)
                products.forEach(product => {
                    exp += Number(product.volume.years[year].cost)
                    inc += Number(product.demand.years[year].value)
                })
                workPlaces?.years?.slice(0, year + 1).forEach((item, idx) => {
                    exp += Number(item.count) * Number(averageWagesOfWorkers[idx].wages)
                })
                expense.push(exp)

                income.push(inc)
            }
            let incomeWithDiscount = [...income.map((item, idx) => item / ((1 + rate / 100) ** idx))]
            let expenseWithDiscount = [...expense.map((item, idx) => item / ((1 + rate / 100) ** idx))]
            return [...incomeWithDiscount.map((item, idx) => item - expenseWithDiscount[idx])]
        }

        let profit = calculateDiscountedProfit(Number(discountRate))

        const calculateNpv = (profit) => {
            let sum = 0
            profit.forEach((item, idx) => {
                sum += Number(item)
            })
            return sum
        }
        setNpv(calculateNpv(profit))

        let sumProfit = 0;
        for (let i = 0; i < profit.length; i++) {
            sumProfit += profit[i]
            if (sumProfit > 0) {
                setDiscountPaybackPeriod(String(i + 1))
                break
            }
        }

        let tempNpv = Number(npv)
        let rate = Number(discountRate)
        if (npv > 0) {
            while (tempNpv > 0) {
                rate += .01
                let tempProfit = calculateDiscountedProfit(Number(rate))
                tempNpv = calculateNpv(tempProfit)
            }
        } else {
            while (tempNpv < 0) {
                rate -= .01
                let tempProfit = calculateDiscountedProfit(Number(rate))
                tempNpv = calculateNpv(tempProfit)
            }
        }
        setIrr(rate)
        setPi(Number(projectTotalCost) === 0 ? 0 : Number(npv) / Number(projectTotalCost))


        setIsShowMainFactors(true)
    }

    const onBackBtnClick = () => {
        setIsShowMainFactors(false)
    }
    useEffect(() => {
        setProjectTotalCost(Number(ownCapital) + Number(borrowedFunds) + Number(amountFunds.summary))
    }, [ownCapital, borrowedFunds, amountFunds])

    useEffect(() => {
        if (debouncedPeriodStart && debouncedPeriodEnd) {
            setPeriod(`${projectImplementationPeriodStart.getFullYear()}-${projectImplementationPeriodEnd.getFullYear()}`)
        }
    }, [debouncedPeriodStart, debouncedPeriodEnd])

    const onSendData = async () => {
        let form = document.getElementById('form')
        let formData = new FormData(form)

        let workplacesRows = []
        for (let i = 0; i < laborProductivity.length; i++) {
            workplacesRows.push({
                year: laborProductivity[i].year,
                count: Number(workPlaces.years[i].count),
                wages: Number(averageWagesOfWorkers[i].wages),
                laborProductivity: Number(laborProductivity[i].value),
            })
        }

        let data = {
            fullName: formData.get('projectName'),
            ownCapital: Number(formData.get('ownCapital')),
            loanCoverage: Number(formData.get('loanCoverage')),
            implementationPeriod: {
                start: projectImplementationPeriodStart,
                end: projectImplementationPeriodEnd,
            },
            totalCost: Number(projectTotalCost),
            amountFunds: {
                summaryFunds: Number(amountFunds.summary),
                rows: amountFunds.years.map((item) => ({
                    year: item.year,
                    fund: Number(item.fund)
                })),
            },
            products: products.map((item) => ({
                name: item.name,
                demand: item.demand.years.map((i) => ({
                    year: i.year,
                    value: Number(i.value)
                })),
                volume: item.volume.years.map((i) => ({
                    year: i.year,
                    natural: Number(i.natural),
                    cost: Number(i.cost)
                })),
            })),

            projectImplementationStages: {
                developmentAndApprovalProjectDocumentation: developmentAndApprovalProjectDocumentation.Table.map((item) => ({
                    event: item.event,
                    deadline: item.deadline,
                    result: item.result
                })),
                manufacturing: manufacturing.Table.map((item) => ({
                    event: item.event,
                    deadline: item.deadline,
                    result: item.result
                })),
                constructionAndInstallationWorks: constructionAndInstallationWorks.Table.map((item) => ({
                    event: item.event,
                    deadline: item.deadline,
                    result: item.result
                })),
                purchaseEquipment: purchaseEquipment.Table.map((item) => ({
                    event: item.event,
                    deadline: item.deadline,
                    result: item.result
                })),
                otherStages: otherStages.Table.map((item) => ({
                    event: item.event,
                    deadline: item.deadline,
                    result: item.result
                }))
            },

            discountRate: Number(discountRate),
            npv: Number(npv),
            pi: Number(pi),
            irr: Number(irr),
            discountPaybackPeriod: discountPaybackPeriod,
            workplaces: {
                total: Number(workPlaces.summary),
                rows: workplacesRows,
            }
        }
        await axios.post('http://localhost:8080/api/projects', data, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
    }

    return (
        <>
            <Link to={'/'}>
                <Button type={'button'}>На главную</Button>
            </Link>
            <Gap/>
            <form id={'form'}>
                <div style={{display: isShowMainFactors ? "none" : "block"}}>
                    <div>
                        <CustomInput
                            fullWidth='100%'
                            label="Полное наименование инвестиционного проекта:"
                            type="text"
                            name="projectName"
                        />
                    </div>
                    <Gap gap={30}/>
                    <div>
                        <Stack spacing={3}>
                            <CustomInput
                                fullWidth='100%'
                                label="Размер собственных средств (собственный капитал) заемщика, млн. руб:"
                                onChange={(e) => onOwnCapitalChange(e.target.value)}
                                type="number"
                                name="ownCapital"
                                required
                            />
                            <CustomInput
                                fullWidth='100%'
                                label="Размер требуемых заемных средств (заемное финансирование), млн. руб.:"
                                onChange={(e) => onBorrowedFundsChange(e.target.value)}
                                type="number"
                                name="loanCoverage"
                                required

                            />

                        </Stack>
                    </div>
                    <Gap gap={30}/>
                    <div>
                        <label>Срок реализации проекта: </label>
                        <Gap/>
                        <Stack direction="row" spacing={2}>
                            <CustomInput
                                fullWidth='100%'
                                type="date"
                                name="projectImplementationPeriodStart"
                                InputProps={{inputProps: {min: "1986-01-01"}}}

                                onChange={(e) => {
                                    setProjectImplementationPeriodStart(new Date(e.target.value))
                                }}
                            />
                            <CustomInput
                                fullWidth='100%'
                                type="date"
                                min="2018-01-01"
                                max="2018-12-31"
                                InputProps={{inputProps: {min: "1986-01-01"}}}
                                name="projectImplementationPeriodEnd"
                                onChange={(e) => {
                                    setProjectImplementationPeriodEnd(new Date(e.target.value))
                                }}
                            />
                        </Stack>
                    </div>
                    <Gap gap={30}/>
                    <div>
                        <label>
                            Объем финансирования инвестиционного проекта по
                            годам и на дату
                            окончания срока реализации
                        </label>
                        <Gap/>
                        <AmountOfFundingTable callback={getAmountOfFunding}
                                              period={period}
                        />
                    </div>
                    <Gap gap={30}/>
                    <label>Общая стоимость инвестиционного проекта, млн.
                        руб:</label>
                    <Gap/>
                    <CustomInput
                        fullWidth='100%'
                        type="number"
                        value={projectTotalCost}
                        name="ownCapital"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <Gap/>
                    <label>
                        Отраслевая принадлежность инвестиционного проекта в
                        соответствии со следующей отраслевой
                        классификацией
                    </label>
                    <Gap/>
                    <CustomSelect>
                        
                    </CustomSelect>
                    <hr/>
                    <Stack direction={"row"} alignItems="center">
                        Количество продуктов:
                        <Button onClick={() => {
                            setProducts(prev =>
                                products.length > 1 ? [...prev.slice(0, -1)] : [...prev])
                        }}>
                            -
                        </Button>
                        {products.length}
                        <Button onClick={() => {
                            setProducts(prev => [
                                ...prev, {
                                    index: prev.at(-1).index + 1,
                                    name: "",
                                }
                            ])
                        }}>
                            +
                        </Button>
                    </Stack>
                    <Stack spacing={3}>
                        {products.map((product) =>
                            <div key={product.index}>
                                <Product period={period} product={product}
                                         callback={getProduct}/>
                            </div>
                        )}
                    </Stack>
                    <Gap gap={30}/>
                    <WorkPlaces period={period} callback={getWorkPlaces}/>
                    <Gap gap={30}/>
                    <AverageWagesOfWorkers period={period}
                                           callback={getAverageWagesOfWorkers}/>
                    <Gap gap={30}/>
                    <DevelopmentAndApprovalProjectDocumentationTable
                        callback={getDevelopmentAndApprovalProjectDocumentation}/>
                    <Gap gap={30}/>
                    <ConstructionAndInstallationWorksTable
                        callback={getConstructionAndInstallationWorks}/>
                    <Gap gap={30}/>
                    <PurchaseEquipmentTable callback={getPurchaseEquipment}/>
                    <Gap gap={30}/>
                    <ProductionTable callback={getProduction}/>
                    <Gap gap={30}/>
                    <OtherStagesTable callback={getOtherStages}/>
                    <Gap gap={30}/>
                    <CustomInput
                        type="number"
                        label="Ставка дисконтирования"
                        onChange={(e) => setDiscountRate(e.target.value)}
                    />
                    <Gap/>
                    <Button type="button"
                            variant="contained"
                            onClick={calculateMainFactors}
                    >
                        Рассчитать основные показатели
                    </Button>
                </div>
                <div style={{display: isShowMainFactors ? "block" : "none"}}>
                    <Button type="button"
                            variant="contained"
                            onClick={onBackBtnClick}
                    >
                        Назад
                    </Button>
                    <Gap gap={30}/>
                    <Stack>
                        <label>NPV, руб.:</label>
                        <Gap/>
                        <CustomInput
                            fullWidth='100%'
                            value={npv.toFixed(2)}
                            name="npv"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <Gap/>
                        <label>PI:</label>
                        <Gap/>
                        <CustomInput
                            fullWidth='100%'
                            value={pi.toFixed(2)}
                            name="pi"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <Gap/>
                        <Gap/>
                        <label>IRR:</label>
                        <Gap/>
                        <CustomInput
                            fullWidth='100%'
                            value={irr.toFixed(2) + ' %'}
                            name="irr"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <Gap/>
                        <label>Дисконтированный срок окупаемости (в
                            годах):</label>
                        <Gap/>
                        <CustomInput
                            fullWidth='100%'
                            value={discountPaybackPeriod}
                            name="discountPaybackPeriod"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <Gap/>
                        <LaborProductivityTable period={period}
                                                employers={workPlaces.years}
                                                products={products}
                                                setLaborRows={setLaborProductivity}/>
                        <Gap/>
                        <Link to={'/'}>
                            <Button type="button"
                                    variant="contained"
                                    onClick={onSendData}
                            >
                                Отправить
                            </Button>
                        </Link>
                    </Stack>
                </div>
            </form>
        </>
    );
}

export default NewInvestmentProject;