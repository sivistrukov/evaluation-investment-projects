import React, {useState, useLayoutEffect, useEffect} from 'react'
import CustomInput from '../../ui/CustomInput';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const AverageWagesOfWorkersTable = ({period, callback}) => {
    const [rows, setRows] = useState([])


    useLayoutEffect(() => {
        let startYear = Number(period.split('-')[0])
        let endYear = Number(period.split('-')[1])
        let difference = endYear - startYear
        let newRows = []

        for (let index = 0; index <= difference; index++) {
            newRows.push({
                id: index,
                year: startYear + index,
                wages: 0
            })
        }
        setRows(newRows)
    }, [period])



    useEffect(() => {
        callback && callback(rows)
    }, [rows])

    const onInputChange = (id, value) => {
        setRows(rows => [...rows.map(row =>
            row.id === id ?
                {...row, wages: value}
                : row
        )])
    }
    
    
    return(
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Год</TableCell>
                        <TableCell>Средняя заработная плата, рублей:</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.map((row, index) =>
                            <TableRow key={index}>
                                <TableCell>
                                    {row.year}
                                </TableCell>
                                <TableCell>
                                    <CustomInput
                                        fullWidth='100%'
                                        type="number"
                                        onChange={(e) => onInputChange(row.id, e.target.value)}
                                        value={row.wages}
                                    />
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>

            </Table>
        </TableContainer>
    )
}
export default React.memo(AverageWagesOfWorkersTable)