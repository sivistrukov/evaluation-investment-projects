import React, {useState, useEffect} from 'react';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import axios from "axios";
import Gap from '../components/ui/Gap';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CustomInput from "../components/ui/CustomInput";
import Stack from '@mui/material/Stack';

function InvestmentProjectsList() {
    const [investmentProjects, setInvestmentProjects] = useState([])
    const [currInvestmentProjects, setCurrInvestmentProjects] = useState(investmentProjects)

    useEffect(() => {
        setTimeout(
            () => getInvestmentProjects().then((data) => {
                setInvestmentProjects(data.data)
            }), 500
        )
    }, [])

    useEffect(() => {
        setCurrInvestmentProjects(investmentProjects)
    }, [investmentProjects])

    const getInvestmentProjects = async () => {
        return await axios.get('http://localhost:8080/api/projects')
    }

    const onSearchFieldChange = (value) => {
        if (value) {
            setCurrInvestmentProjects(
                investmentProjects.filter((item) => item.fullName.includes(value))
            )
        } else {
            setCurrInvestmentProjects(investmentProjects)
        }
    }

    const onDownloadButtonClick = () => {
        axios({
            url: 'http://localhost:8080/api/projects/download',
            method: 'GET',
            responseType: 'blob', // Important
        }).then((response) => {
            const href = URL.createObjectURL(response.data);

            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', 'инвестиционные_проекты.xlsx'); //or any other extension
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        });
    }

    return (
        <div>
            <Stack direction={'row'}>
                <Link to={'/new-investment-project/'}>
                    <Button type={'button'}>Новый инвестиционный проект</Button>
                </Link>
                <Gap/>
                <Link to={'/stats/'}>
                    <Button type={'button'}>Статистика</Button>
                </Link>
                <Gap/>
                <Button type={'button'} onClick={onDownloadButtonClick}>
                    Выгрузить
                </Button>
            </Stack>
            <Gap/>
            <CustomInput
                label={'Название проекта'}
                onChange={(e) => onSearchFieldChange(e.target.value)}
            />
            <Gap/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Название проекта</TableCell>
                            <TableCell>
                                Отрасль
                            </TableCell>
                            <TableCell>
                                Кол-во создаваемых рабочих мест
                            </TableCell>
                            <TableCell>
                                Общая стоимость инвестиционного проекта, млн.
                                руб
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currInvestmentProjects.map((item, index) =>
                            <TableRow key={index}>
                                <TableCell>
                                    {item.fullName}
                                </TableCell>
                                <TableCell>
                                    {item.industry}
                                </TableCell>
                                <TableCell>{item.totalWorkplaces}</TableCell>
                                <TableCell>{item.totalCost}</TableCell>
                                <TableCell>
                                    <Link to={`/${item.fullName}`}>
                                        <Button type={'button'}>паспорт</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default InvestmentProjectsList;