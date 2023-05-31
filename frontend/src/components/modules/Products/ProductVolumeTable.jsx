import React, {useEffect, useLayoutEffect, useState} from 'react';
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import Gap from "../../ui/Gap";
import CustomInput from "../../ui/CustomInput";

function ProductVolumeTable({period, callback}) {
    const [rows, setRows] = useState([])
    const [naturalResult, setNaturalResult] = useState(0)
    const [costResult, setCostResult] = useState(0)

    useLayoutEffect(() => {
        let startYear = Number(period.split('-')[0])
        let endYear = Number(period.split('-')[1])
        let difference = endYear - startYear
        let newRows = []

        for (let index = 0; index <= difference; index++) {
            newRows.push({
                id: index,
                year: startYear + index,
                natural: 0,
                cost: 0,
            })
        }
        setRows(newRows)
    }, [period])

    useEffect(() => {
        let naturalSum = 0
        let costSum = 0
        rows.forEach(row => {
            naturalSum += Number(row.natural)
            costSum += Number(row.cost)
        })
        setNaturalResult(naturalSum)
        setCostResult(costSum)
        callback && callback({
            years: rows,
            summaryNatural: naturalSum,
            summaryCost: costSum
        })
    }, [rows])

    const onFieldChange = (id, field, value) => {
        let row = rows.filter((item) => item.id === id)[0]
        row[field] = value
        setRows(prev => [...prev.map(item => item.id === id ? row : item)])
    }

    return (
        <>
            <label>
                Объем отгруженной приоритетной продукции или объем произведенной
                приоритетной
                продукции, непосредственно использованной в технологическом процессе
                производства другой продукции, заявленной в инвестиционном проекте,
                накопленным итогом (в натуральном и стоимостном выражении) по годам
                реализации
                инвестиционного проекта и на дату окончания срока реализации
                инвестиционного
                проекта
            </label>
            <Gap/>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Год</TableCell>
                            <TableCell>
                                Объем продукции в натуральном выражении, шт. (тонн и т.п.)
                            </TableCell>
                            <TableCell>
                                Объем продукции в стоимостном выражении, млн. рублей
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, idx) =>
                            <TableRow key={idx}>
                                <TableCell>
                                    {row.year}
                                </TableCell>
                                <TableCell>
                                    <CustomInput
                                        type="number"
                                        value={row.natural}
                                        onChange={(e) => onFieldChange(row.id, "natural", e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <CustomInput
                                        type="number"
                                        value={row.cost}
                                        onChange={(e) => onFieldChange(row.id, "cost", e.target.value)}
                                    />
                                </TableCell>
                            </TableRow>)}
                        <TableRow>
                            <TableCell><h3>Итого:</h3></TableCell>
                            <TableCell>{naturalResult}</TableCell>
                            <TableCell>{costResult}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default React.memo(ProductVolumeTable);