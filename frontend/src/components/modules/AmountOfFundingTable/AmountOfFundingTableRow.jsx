import React from 'react'

import CustomInput from '../../ui/CustomInput';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const AmountOfFundingTableRow = React.memo(({row, onChange, index})=>{
    return (
        <TableRow key={index}>
            <TableCell>
                {row.year}
            </TableCell>
            <TableCell>
                <CustomInput
                    fullWidth='100%'
                    type="number"
                    onChange={(e) => onChange({id:row.id, value:e.target.value})}
                />
            </TableCell>
        </TableRow>
    )
})

export default AmountOfFundingTableRow