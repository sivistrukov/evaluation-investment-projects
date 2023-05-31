import React, {useState, useLayoutEffect, useEffect} from 'react';
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import Gap from "../../ui/Gap";
import CustomInput from "../../ui/CustomInput";

function ProductDemandTable({period, callback}) {
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
                value: 0,
            })
        }
        setRows(newRows)
    }, [period])

    useEffect(() => {
        callback && callback({years: rows})
    }, [rows])

    const onFieldChange = (id, field, value) => {
        let row = rows.filter((item) => item.id === id)[0]
        row[field] = value
        setRows(prev => [...prev.map(item => item.id === id ? row : item)])
    }

    return (
        <>
            <label>
                Прогноз общего объема потребления продукции в целевых рыночных
                сегментах
            </label>
            <Gap/>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Год</TableCell>
                            <TableCell>Значение показателя, млн.рублей</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, idx) =>
                            <TableRow key={idx}>
                                <TableCell>{row.year}</TableCell>
                                <TableCell>
                                    <CustomInput
                                        type="number"
                                        value={row.value}
                                        onChange={(e) => onFieldChange(row.id, "value", e.target.value)}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default React.memo(ProductDemandTable);