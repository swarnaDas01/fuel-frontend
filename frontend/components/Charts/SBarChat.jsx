import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const SBarChat = () => {
    const [chartData, setChartData] = useState({
        datasets: [],
    });

    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        setChartData({
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Sales $',
                    data: [18127, 22201, 19490, 17938, 24182, 17842, 22475, 18127, 22201, 19490, 17938, 24182],
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgb(53, 162, 235, 0.4)',
                },
            ],
        });
        setChartOptions({
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Monthly Revenue',
                },
            },
            maintainAspectRatio: false,
            responsive: true,
        });
    }, []);

    return (
        <>
            <div className='w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white'>
                <h2 className='text-xl font-bold text-gray-600'>Revenue</h2>
                <Bar data={chartData} options={chartOptions} />
            </div>
        </>
    );
};

export default SBarChat;
