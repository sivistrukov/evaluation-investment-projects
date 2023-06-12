import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import Gap from "../components/ui/Gap";
import {Button} from "@mui/material";
import CustomTable from "../components/ui/CustomTable";
import axios from "axios";
import CustomInput from "../components/ui/CustomInput";
import Stack from '@mui/material/Stack';
import ReactToPrint from "react-to-print";

const InvestmentProjectDetail = () => {
    const [investmentProject, setInvestmentProject] = useState({})
    let {projectName} = useParams()

    useEffect(() => {
        getInvestmentProjectDetail().then((data) => {
            setInvestmentProject(data.data)
        })
    }, [])

    const getInvestmentProjectDetail = async () => {
        return await axios.get(`http://localhost:8080/api/projects/${projectName}`)
    }

    const getPageMargins = () => {
        return `@page { margin: 20px 40px !important; }`;
    };

    return (<>
        <style>{getPageMargins()}</style>
        <Stack direction={'row'}>
            <Link to={'/'}>
                <Button type={'button'}>На главную</Button>
            </Link>
            <Gap/>
            <ReactToPrint
                trigger={() =>
                    <Button>
                        Скачать
                    </Button>}
                content={() => document.getElementById('passport')}
            />
        </Stack>
        <div id={'passport'}>
            <Gap gap={30}/>
            <label>Полное наименование инвестиционного проекта:</label>
            <Gap/>
            <CustomInput value={investmentProject.fullName}
                         InputProps={{
                             readOnly: true,
                         }}
            />
            <Gap gap={30}/>
            <label style={{color: Number(investmentProject?.irr) < 0 && 'red'}}>Ставка дисконтирования:</label>
            <Gap/>
            <CustomInput
                value={investmentProject?.discountRate?.toFixed(2)}
                InputProps={{
                    readOnly: true,
                }}
            />
            <Gap gap={30}/>
            <label style={{color: Number(investmentProject?.npv) < 0 && 'red'}}>Чистая приведенная стоимость (NPV),
                млн.руб:</label>
            <Gap/>
            <CustomInput
                value={investmentProject?.npv?.toFixed(2)}
                InputProps={{
                    readOnly: true,
                }}
            />
            <Gap gap={30}/>
            <label style={{color: Number(investmentProject?.pi) < 0 && 'red'}}>Индекс рентабельности инвестиций
                (PI):</label>
            <Gap/>
            <CustomInput
                value={investmentProject?.pi?.toFixed(2)}
                InputProps={{
                    readOnly: true,
                }}
            />
            <Gap gap={30}/>
            <label>Внутренняя норма доходности (IRR), %:</label>
            <Gap/>
            <CustomInput
                value={investmentProject?.irr?.toFixed(2)}
                InputProps={{
                    readOnly: true,
                }}
            />
            <Gap gap={30}/>
            <label>Дисконтированный срок окупаемости:</label>
            <Gap/>
            <CustomInput
                value={investmentProject?.discountPaybackPeriod}
                InputProps={{
                    readOnly: true,
                }}
            />
            <hr/>
            <Gap gap={30}/>
            <label>Размер собственных средств (собственный капитал) заемщика, млн. руб.:</label>
            <Gap/>
            <CustomInput value={investmentProject?.ownCapital?.toFixed(2)}
                         InputProps={{
                             readOnly: true,
                         }}
            />
            <Gap gap={30}/>
            <label>Размер требуемых заемных средств (заемное финансирование), млн. руб.:</label>
            <Gap/>
            <CustomInput value={investmentProject?.loanCoverage?.toFixed(2)}
                         InputProps={{
                             readOnly: true,
                         }}
            />
            <Gap/>
            <Gap gap={30}/>
            <label>Срок реализации проекта: </label>
            <Gap/>
            <Stack direction="row" spacing={2}>
                <CustomInput
                    fullWidth='100%'
                    type="date"
                    value={investmentProject?.implementationPeriod?.start?.split('T')[0]}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <CustomInput
                    fullWidth='100%'
                    type="date"
                    value={investmentProject?.implementationPeriod?.end?.split('T')[0]}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Stack>
            <Gap gap={30}/>
            <CustomTable
                label={'Объем финансирования инвестиционного проекта по годам и на дату окончания срока реализации'}
                tableHeaders={['Год', 'Объем финансирования, млн.рублей']}
                tableRows={investmentProject?.amountFunds?.rows}
            />
            <Gap gap={30}/>
            <label>Общая стоимость инвестиционного проекта, млн. руб:</label>
            <Gap/>
            <CustomInput
                value={investmentProject?.totalCost?.toFixed(2)}
                InputProps={{
                    readOnly: true,
                }}
            />
            <Gap gap={30}/>
            <label>
                Отраслевая принадлежность инвестиционного проекта в
                соответствии со следующей отраслевой
                классификацией:
            </label>
            <Gap/>
            <CustomInput
                value={investmentProject?.industry}
                InputProps={{
                    readOnly: true,
                }}
            />
            <hr/>
            <Gap gap={30}/>
            {investmentProject?.products?.map((product, index) => <div key={index}>
                <label>Наименование продукта:</label>
                <Gap/>
                <CustomInput
                    value={product.name}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <Gap gap={30}/>
                <CustomTable
                    label={'Объем отгруженной приоритетной продукции или объем произведенной приоритетной продукции,' + ' непосредственно использованной в технологическом процессе производства другой продукции, ' + 'заявленной в инвестиционном проекте, накопленным итогом (в натуральном и стоимостном выражении)' + ' по годам реализации инвестиционного проекта и на дату окончания срока реализации инвестиционного' + ' проекта'}
                    tableHeaders={['Год', 'Объем продукции в натуральном выражении, шт. (тонн и т.п.)', 'Объем продукции в стоимостном выражении, млн. рублей']}
                    tableRows={product.volume}
                />
                <Gap gap={30}/>
                <CustomTable
                    label={'Прогноз общего объема потребления продукции в целевых рыночных сегментах'}
                    tableHeaders={['Год', 'Значение показателей, млн. рублей']}
                    tableRows={product.demand}
                />
            </div>)}
            <hr/>
            <Gap gap={30}/>
            <CustomTable label={'Количество создаваемых высокопроизводительных рабочих мест (с разбивкой по годам):'}
                         tableHeaders={['Год', 'Количество рабочих мест', 'Средняя заработная плата, рублей:', 'Производительность труда, млн. рублей на 1 работника в год']}
                         tableRows={investmentProject?.workplaces?.rows}
            />
            {investmentProject?.projectImplementationStages?.developmentAndApprovalProjectDocumentation.length > 0 && <>
                <Gap gap={30}/>
                <CustomTable label={'Этап "Разработка и утверждение проектной документации"'}
                             tableHeaders={['Ключевые события', 'Срок выполнения', 'Результат']}
                             tableRows={investmentProject?.projectImplementationStages?.developmentAndApprovalProjectDocumentation}
                />
            </>}
            {investmentProject?.projectImplementationStages?.constructionAndInstallationWorks.length > 0 && <>
                <Gap gap={30}/>
                <CustomTable label={'Этап "Строительно-монтажные работы"'}
                             tableHeaders={['Ключевые события', 'Срок выполнения', 'Результат']}
                             tableRows={investmentProject?.projectImplementationStages?.constructionAndInstallationWorks}
                />
            </>}
            {investmentProject?.projectImplementationStages?.purchaseEquipment.length > 0 && <>
                <Gap gap={30}/>
                <CustomTable label={'Этап "Приобретение оборудования"'}
                             tableHeaders={['Ключевые события', 'Срок выполнения', 'Результат']}
                             tableRows={investmentProject?.projectImplementationStages?.purchaseEquipment}
                />
            </>}
            {investmentProject?.projectImplementationStages?.manufacturing.length > 0 && <>
                <Gap gap={30}/>
                <CustomTable label={'Этап "Производство"'}
                             tableHeaders={['Ключевые события', 'Срок выполнения', 'Результат']}
                             tableRows={investmentProject?.projectImplementationStages?.manufacturing}
                />
            </>}
            {investmentProject?.projectImplementationStages?.otherStages.length > 0 && <>
                <Gap gap={30}/>
                <CustomTable label={'Иные этапы'}
                             tableHeaders={['Ключевые события', 'Срок выполнения', 'Результат']}
                             tableRows={investmentProject?.projectImplementationStages?.otherStages}
                />
            </>}
        </div>
    </>);
};

export default InvestmentProjectDetail;