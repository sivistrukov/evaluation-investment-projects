import React from 'react';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

function InvestmentProjectsList() {
    return (
        <div>
            <Link to={'/new/'}>
                <Button type={'button'}>Новый инвестиционный проект</Button>
            </Link>
        </div>
    );
}

export default InvestmentProjectsList;