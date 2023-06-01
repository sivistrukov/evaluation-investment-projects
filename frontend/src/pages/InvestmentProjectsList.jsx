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

    useEffect(() => {
        getInvestmentProjects().then((data) => {
            setInvestmentProjects(data.data)
        })
    }, [])

    const getInvestmentProjects = async () => {
        return await axios.get('http://localhost:8080/api/projects')
    }
    return (
        <div>
            <Link to={'/new/'}>
                <Button type={'button'}>Новый инвестиционный проект</Button>
            </Link>
            <Gap/>
            <CustomInput label={'Название проекта'}/>
            <Gap/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Название проекта</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {investmentProjects.map((item, index) =>
                            <TableRow key={index}>
                                <TableCell>{index}</TableCell>
                                <TableCell>
                                    HUI - {item.fullName}
                                </TableCell>
                                <TableCell>
                                    <Link to={`/${index}`}>
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