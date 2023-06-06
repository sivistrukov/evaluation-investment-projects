import React, {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

const BarChart = ({title, data, field}) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
    )
    const [barChartData, setBarChartData] = useState({})

    useEffect(() => {
        if (data) {
            let tempBarChartData = {
                labels: [],
                datasets: [{
                    data: [],
                    borderColor: "#3333ff",
                    backgroundColor: "rgba(0, 0, 255, 0.5)",
                    fill: true
                },],
            }
            for (const [key, value] of Object.entries(data)) {
                tempBarChartData.labels.push(key)
                tempBarChartData.datasets[0].data.push(value[field])
            }
            setBarChartData(tempBarChartData)
            console.log(tempBarChartData)
        }
    }, [data])

    if (Object.keys(barChartData).length === 0 || data === undefined) {
        return (<div>HUI</div>)
    }
    return (
        <div style={{}}>
            <Bar
                type="bar"
                options={{
                    title: {
                        display: true,
                        text: title,
                        fontSize: 15
                    },
                }}
                data={barChartData}
            />
        </div>
    );
};

export default React.memo(BarChart);