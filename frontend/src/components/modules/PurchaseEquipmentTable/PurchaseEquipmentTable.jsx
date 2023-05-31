import {useState, useEffect} from 'react'
import CustomInput from '../../ui/CustomInput';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const PurchaseEquipmentTable = ({ callback }) => {
    const [rows, setRows] = useState([{id:0, event: "", deadline: "", result: ""}])


    const addRow=()=>{
        const emptyRow = {id:rows.at(-1).id + 1 ?? 0, event: "", deadline: "", result: ""}
        setRows(rows=>[...rows, emptyRow])
    }

    useEffect(() => {
        callback && callback({Table: rows})
    }, [rows])

    const onFieldChange = (id, field, value) => {
        let row = rows.filter((item) => item.id === id)[0]
        row[field] = value
        setRows(prev => [...prev.map(item => item.id === id ? row : item)])
    }

    const deleteRow = (id) => {
        let row = rows.filter((item) => item.id !== id);
        console.log(row)
        setRows(row)
    }


    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={4} align="center"><h3>Этап "Приобретение оборудования"</h3></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Ключевые события</TableCell>
                        <TableCell>Срок выполнения</TableCell>
                        <TableCell>Результат</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    rows.map((row, index) =>
                        <TableRow key={index}>
                            <TableCell>
                                <CustomInput
                                    fullWidth='100%'
                                    label="Ключевые события"
                                    onChange={(e) => onFieldChange(row.id, "event", e.target.value)}
                                    type="text"
                                />
                            </TableCell>
                            <TableCell>
                                <CustomInput
                                    fullWidth='100%'
                                    type="date"
                                    onChange={(e) => onFieldChange(row.id, "deadline", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <CustomInput
                                    fullWidth='100%'
                                    label="Результат"
                                    onChange={(e) => onFieldChange(row.id, "result", e.target.value)}
                                    type="text"
                                />
                            </TableCell>
                            <TableCell style={{cursor: "pointer"}} onClick={()=>deleteRow(row.id)}>x</TableCell>
                        </TableRow>
                    )
                }
                <TableRow onClick={addRow}>
                    <TableCell colSpan={3}>
                        <div className='addAndDeleteRow'>
                            +
                        </div>
                    </TableCell>
                </TableRow>
                </TableBody>

            </Table>
        </TableContainer>
    )
}

export default PurchaseEquipmentTable