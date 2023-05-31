import {useState, useLayoutEffect, useEffect} from 'react'
import CustomInput from '../../ui/CustomInput';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ListOfCapitalConstructionObjectsTable = ({callback=()=>{}}) => {
    const [rows, setRows] = useState([])
    const [result, setResult] = useState(0)

    useLayoutEffect(() => {
        let startYear = Number(period.split('-')[0])
        let endYear = Number(period.split('-')[1])
        let difference = endYear - startYear
        let newRows = []

        for (let index = 0; index <= difference; index++) {
            newRows.push({
                id: index,
                year: startYear + index,
                fund: 0
            })
        }
        setRows(newRows)
    }, [period])

    const addRow=()=>{
        setRows(rows=>[...rows, emptyRow])
    }

    useEffect(() => {
        let sum = 0
        rows.forEach(row => {
            sum += Number(row?.fund)
        })
        setResult(sum)
        callback && callback({years: rows, summary: sum})
    }, [rows])

    const onInputChange = (id, value) => {
        setRows(rows => [...rows.map(row =>
            row.id === id ?
                {...row, fund: value}
                : row
        )])
    }
    return(
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Год</TableCell>
                        <TableCell>Объем финансирования, млн. рублей</TableCell>
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
                                        value={row.fund}
                                    />
                                </TableCell>
                            </TableRow>
                        )
                    }
                    <TableRow onClick={addRow} style={{
                        width: '100%',
                        height: '25px',
                        paddingBottom:'20px',                        
                        position: 'relative',
                    }}>
                    <div className='addRow'>
                        <h2>+</h2>
                    </div>
                </TableRow>
                    <TableRow>
                        <TableCell>
                            <h3>Итого:</h3>
                        </TableCell>
                        <TableCell>{result}</TableCell>
                    </TableRow>
                </TableBody>

            </Table>
        </TableContainer>
    )
}