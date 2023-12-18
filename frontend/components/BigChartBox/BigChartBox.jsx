import { useAllmonthlySalesMutation } from '@/Store/slices/supplier';
import React, { useEffect, useState } from 'react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';


const BigChartBox = ({ monthlySales, supplierMonthlySales }) => {
    const [user, setUser] = useState(null);
    // const { data: supplierMonthlySales, isLoading: supplierIsLoading, isError: supplierIsError } = useAllmonthlySalesMutation();
    // const { data: MonthlyTrackerData, isLoading: MonthlyTrackerIsLoading, isError: MonthlyTrackerIsError } = useAllmonthlySalesStationMutation();

    // console.log("MonthlyTrackerIsLoading:", MonthlyTrackerIsLoading);
    // console.log("MonthlyTrackerData:", MonthlyTrackerData);


    useEffect(() => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        setUser(user);
    }, [])

    const role = user?.role;
    const ndata = role === 'admin' ? monthlySales : supplierMonthlySales;


    console.log("monthlySales --------------- ", monthlySales);


    return (
        <div className="bigChartBox  w-full">
            <h1 className='text-gray-500 text-sm text-center p-3'>Monthly Revenue Analytics</h1>
            <div className="chart">
                <ResponsiveContainer width="99%" height="100%">
                    <AreaChart
                        data={ndata}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 30,
                            bottom: 0,
                            fontSize: 10,
                        }}
                    >
                        <XAxis
                            dataKey="month"
                            tickCount={ndata?.length} // Adjust the tick count based on data length
                            interval={0} // Show every tick
                        />
                        <defs>
                            <linearGradient id="colorOC" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#0088FE" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorGs" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FF8042" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#FF8042" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorDe" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FFBB28" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#FFBB28" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPe" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#00C49F" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="1 3" />
                        <YAxis domain={[0, 20000]} /> {/* Update the Y-axis domain here */}
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="octane"
                            stackId="1"
                            fillOpacity={1}
                            stroke="#0088FE"
                            fill="url(#colorOC)"
                        />
                        <Area
                            type="monotone"
                            dataKey="gasoline"
                            fillOpacity={1}
                            stackId="1"
                            stroke="#FF8042"
                            fill="url(#colorGs)"
                        />
                        <Area
                            type="monotone"
                            dataKey="diesel"
                            fillOpacity={1}
                            stackId="1"
                            stroke="#FFBB28"
                            fill="url(#colorDe)"
                        />
                        <Area
                            type="monotone"
                            dataKey="petrol"
                            fillOpacity={1}
                            stackId="1"
                            stroke="#00C49F"
                            fill="url(#colorPe)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BigChartBox;
