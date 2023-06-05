import React, {useState, useEffect} from 'react';
import Gap from "../components/ui/Gap";
import {Link} from 'react-router-dom';
import {Button} from "@mui/material";
import Stack from '@mui/material/Stack';
import CustomInput from "../components/ui/CustomInput";
import axios from "axios";

const Statistics = () => {
    const [statistics, setStatistics] = useState({})

    useEffect(() => {
        getStatistics().then((data) => {
            setStatistics(data.data)
        })
    }, [])

    const getStatistics = async () => {
        return await axios.get(`http://localhost:8080/api/stats/`)
    }

    return (
        <div>
            <Link to={'/'}>
                <Button type={'button'}>На главную</Button>
            </Link>
            <Gap gap={30}/>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                <label>
                    Количество проектов:
                </label>
                <CustomInput value={statistics?.projectsCount}
                             InputProps={{
                                 readOnly: true,
                             }}
                />
            </Stack>
            <Gap gap={30}/>
            <label>
                Количество проектов по отраслям:
            </label>
            <Gap gap={30}/>
            <label>
                Суммарная стоимость проектов по отраслям:
            </label>
        </div>
    );
};

export default Statistics;