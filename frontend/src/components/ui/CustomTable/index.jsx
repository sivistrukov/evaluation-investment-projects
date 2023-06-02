import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Gap from "../Gap";

const CustomTable = ({label, tableHeaders: headers, tableRows}) => {
    return (
        <>
            <label>{label}</label>
            <Gap/>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headers.map((item, index) =>
                                <TableCell key={index}>
                                    {item}
                                </TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableRows?.map((item, index) =>
                            <TableRow key={index}>
                                {Object.entries(item).map((item, index) =>
                                    <TableCell>
                                        {item[1]}
                                    </TableCell>)}
                            </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default CustomTable;