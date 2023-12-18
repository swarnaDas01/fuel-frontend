import React from 'react'

const TopCards = ({ monthlySales, data, allUsers, stationStockData }) => {
    const supplier = allUsers?.filter((user) => user.role === 'supplier');

    const totalRevenue = monthlySales?.reduce((acc, element) => acc + element.totalSales, 0);

    // now calculate last month totalSales
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    // console.log('lastMonth', lastMonth.getMonth());

    // Filter sales for the last month
    const lastMonthSales = monthlySales?.filter((sale) => {
        const saleDate = new Date(sale.month).getMonth();
        if (saleDate === lastMonth.getMonth()) {
            return sale;
        }
    });

    // Calculate the totalSales for the last month
    const lastMonthTotalSales = lastMonthSales?.reduce((acc, element) => acc + element.totalSales, 0);

    const lpg = stationStockData?.filter((stock) => console.log(stock));
    // console.log('lpg------------', lpg);


    return (
        <div>
            <div className='grid lg:grid-cols-6 gap-4 my-4'>
                <div className='col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                    <div className='flex flex-col w-full pb-4'>
                        <p className='text-2xl font-bold text-gray-800'>{totalRevenue} Tk</p>
                        <p className='text-gray-600'>Total Revenue</p>
                    </div>
                    <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                        <span className='text-green-700 text-lg'>+18%</span>
                    </p>
                </div>
                <div className='col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                    <div className='flex flex-col w-full pb-4'>
                        <p className='text-2xl font-bold text-gray-800'>{lastMonthTotalSales} Tk</p>
                        <p className='text-gray-600'>Last Month Profit</p>
                    </div>
                    <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                        <span className='text-green-700 text-lg'>+18%</span>
                    </p>
                </div>
                <div className='col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                    <div className='flex flex-col w-full pb-4'>
                        <p className='text-2xl font-bold text-gray-800'>{stationStockData?.length}</p>
                        <p className='text-gray-600'>Total Stock</p>
                    </div>
                    <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                        <span className='text-green-700 text-lg'>+11%</span>
                    </p>
                </div>
                <div className='col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                    <div className='flex flex-col w-full pb-4'>
                        <p className='text-2xl font-bold text-gray-800'>{data?.length}</p>
                        <p className='text-gray-600'>Fuel Stations</p>
                    </div>
                    <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                        <span className='text-green-700 text-sm col'>All</span>
                    </p>
                </div>
                <div className='col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                    <div className='flex flex-col w-full pb-4'>
                        <p className='text-2xl font-bold text-gray-800'>{supplier?.length}</p>
                        <p className='text-gray-600'>All Suppliers</p>
                    </div>
                    <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                        <span className='text-green-700 text-lg'>+11%</span>
                    </p>
                </div>
                <div className='col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                    <div className='flex flex-col w-full pb-4'>
                        <p className='text-2xl font-bold text-gray-800'>12</p>
                        <p className='text-gray-600'>Employees</p>
                    </div>
                    <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                        <span className='text-green-700 text-lg'>+17%</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TopCards