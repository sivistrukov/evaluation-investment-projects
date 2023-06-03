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

function InvestmentProjectsList() {
    const [investmentProjects, setInvestmentProjects] = useState([])
    const [currInvestmentProjects, setCurrInvestmentProjects] = useState(investmentProjects)

    useEffect(() => {
        getInvestmentProjects().then((data) => {
            setInvestmentProjects(data.data)
        })
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

    return (
        <div>
            <Link to={'/new-investment-project/'}>
                <Button type={'button'}>Новый инвестиционный проект</Button>
            </Link>
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
                                <TableCell>{item.totalWorkplaces}</TableCell>
                                <TableCell>{item.totalCost}</TableCell>
                                <TableCell>
                                    <Link to={`/${item.fullName}`}>
                                        <Button type={'button'}>детали</Button>
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