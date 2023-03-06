import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const chartStyle = {
    height: 330,
    width: '100%',
    margin: 'auto'
}

const TeamsAnalytics = () => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Clients per month',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [1, 2, 3, 4],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: [1, 2, 3, 4],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };


    return (
        <Bar options={options} data={data} style={chartStyle} />
    )
}

export default TeamsAnalytics;