import React from 'react';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import axios from "axios";

const test = async () => {
    let data = await axios.get('http://localhost:8080/api')
    console.log(data)
}

function InvestmentProjectsList() {
    return (
        <div>
            <Link to={'/new/'}>
                <Button type={'button'}>Новый инвестиционный проект</Button>
            </Link>
            <Button onClick={test}>test</Button>
        </div>
    );
}

export default InvestmentProjectsList;