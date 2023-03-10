import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


const chartStyle = {
    height: 330,
    width: '100%',
    margin: 'auto'
}

ChartJS.register(ArcElement, Tooltip, Legend);


const ClientsAnalytics = () => {

    const data = {
        labels: ['January', 'February', 'March'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    return <Pie data={data} style={chartStyle} />
}

export default ClientsAnalytics

