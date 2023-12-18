import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";


const PieChartBox = ({ stationStockData }) => {

    return (
        <div className="pieChartBox md:w-[40%] w-full border p-6 rounded-md">
            <h1>Leads by Source</h1>
            <div className="chart">
                <ResponsiveContainer width="99%" height={300}>
                    <PieChart>
                        <Tooltip
                            contentStyle={{ background: "white", borderRadius: "5px" }}
                        />
                        <Pie
                            data={stationStockData}
                            innerRadius={"70%"}
                            outerRadius={"90%"}
                            paddingAngle={5}
                            dataKey="quantity"
                        >
                            {stationStockData?.map((item) => (
                                <Cell key={item.fuelType} fill={
                                    item.fuelType === 'Octane' ? '#0088FE' :
                                        item.fuelType === 'Petrol' ? '#00C49F' :
                                            item.fuelType === 'Diesel' ? '#FFBB28' :
                                                item.fuelType === 'Gasoline' ? '#FF8042' : 'red'
                                } />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="options flex gap-6">
                {stationStockData?.map((item) => (
                    <div className="option flex text-gray-600" key={item.fuelType}>
                        <div className="title">
                            <div className="dot" style={{
                                backgroundColor:
                                    item.fuelType === 'Octane' ? '#0088FE' :
                                        item.fuelType === 'Petrol' ? '#00C49F' :
                                            item.fuelType === 'Diesel' ? '#FFBB28' :
                                                item.fuelType === 'Gasoline' ? '#FF8042' : 'red'
                            }} />
                            <span>{item.fuelType}</span>
                        </div>
                        <span>{item.quantity}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PieChartBox;