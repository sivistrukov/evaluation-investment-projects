import React, {useState, useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Gap from "../../ui/Gap";

function LaborProductivityTable({period, products = [], employers = [], setLaborRows = []}) {
    const [rows, setRows] = useState([])

    useEffect(() => {
        let startYear = Number(period.split('-')[0])
        let endYear = Number(period.split('-')[1])
        let difference = endYear - startYear
        let newRows = []


        let sumEmployersByYear = []
        if (employers.length > 0) {
            for (let i = 0; i < employers.length; i++) {
                sumEmployersByYear.push(0)
                sumEmployersByYear[i] = i === 0 ? Number(employers[i].count) : sumEmployersByYear[i - 1] + Number(employers[i].count)
            }
        }

        let sumProductivityVolume = []
        if (products.length > 0) {
            for (let i = 0; i <= difference; i++) {
                sumProductivityVolume.push(0)
            }
            products.forEach((product) => {
                for (let i = 0; i <= difference; i++) {
                    sumProductivityVolume[i] += Number(product?.volume?.years[i]?.cost)
                }
            })
        }


        if (sumEmployersByYear.length > 0 && sumProductivityVolume.length > 0) {
            for (let index = 0; index <= difference; index++) {
                newRows.push({
                    id: index,
                    year: startYear + index,
                    value: sumEmployersByYear[index] ? sumProductivityVolume[index] / sumEmployersByYear[index] : sumProductivityVolume[index]
                })
            }
        }
        setRows(newRows)
        setLaborRows(newRows)
    }, [period, employers, products])

    return (
        <>
            <label>
                Производительность труда заемщика в расчете на одного работника за каждый
                год прогнозного периода реализации инвестиционного проекта (в стоимостном
                выражении)
            </label>
            <Gap/>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Год</TableCell>
                            <TableCell>
                                Производительность труда, млн. рублей на 1 работника в год
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.map((row) =>
                                <TableRow>
                                    <TableCell>{row.year}</TableCell>
                                    <TableCell>{row.value.toFixed(3)}</TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default LaborProductivityTable;