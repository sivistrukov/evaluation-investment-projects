import React, {useState, useEffect} from 'react';
import Gap from "../components/ui/Gap";
import {Link} from 'react-router-dom';
import {Button} from "@mui/material";
import Stack from '@mui/material/Stack';
import CustomInput from "../components/ui/CustomInput";
import axios from "axios";
import BarChart from "../components/ui/BarChart";

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
            <div style={{display: "flex", width: "100%", gap: "50px"}}>
                <div style={{width: "100%"}}>
                    <Gap gap={30}/>
                    <label>
                        Количество проектов по отраслям:
                    </label>
                    <BarChart title={'Количество проектов по отраслям'} data={statistics?.projectsByIndustry}
                              field={'count'}/>
                </div>
                <div style={{width: "100%"}}>
                    <Gap gap={30}/>
                    <label>
                        Суммарная стоимость проектов по отраслям:
                    </label>
                    <BarChart title={'Количество проектов по отраслям'} data={statistics?.projectsByIndustry}
                              field={'summaryCost'}/>
                </div>
            </div>
        </div>
    );
};

export default Statistics;