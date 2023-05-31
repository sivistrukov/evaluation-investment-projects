import React, {useState, useLayoutEffect, useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useDebounce from '../../../hooks/useDebounce';
import AmountOfFundingTableRow from './AmountOfFundingTableRow';

const AmountOfFundingTable = ({period, callback}) => {
    const [rows, setRows] = useState([])
    const [result, setResult] = useState(0)
    const [editableField, setEditableField] = useState({})

    
    const debouncedTotalSum = useDebounce(rows, 1000);
    const debouncedField = useDebounce(editableField, 1000);

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
  

    useEffect(() => {
        if(debouncedTotalSum){
            let sum = 0
            rows.forEach(row => {
                sum += Number(row?.fund)
            })
            setResult(sum)
            callback && callback({years: rows, summary: sum})
        }
       

    }, [debouncedTotalSum])

    useEffect(()=>{
        if(debouncedField){
            onInputChange(editableField.id, editableField.value)
        }
    }, [debouncedField])

    const onInputChange = (id, value) => {
            setRows(rows => [...rows.map(row =>
                row.id === id ?
                    {...row, fund: value}
                    : row
            )])
    }

    return (
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
                            <AmountOfFundingTableRow index={index} row={row} onChange={setEditableField} />
                        )
                    }
                    
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




export default React.memo(AmountOfFundingTable)