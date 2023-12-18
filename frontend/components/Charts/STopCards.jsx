import React from 'react'

const STopCards = ({ supplierMonthlySales, supplierStocks }) => {
    // console.log('Fetched data inside: ', supplierMonthlySales);


    const totalRevenue = supplierMonthlySales?.reduce((acc, element) => acc + element.totalSales, 0);

    // now calculate last month totalSales
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    console.log('lastMonth', lastMonth.getMonth());

    // Filter sales for the last month
    const lastMonthSales = supplierMonthlySales?.filter((sale) => {
        const saleDate = new Date(sale.month).getMonth();
        if (saleDate === lastMonth.getMonth()) {
            return sale;
        }
    });

    // Calculate the totalSales for the last month
    const lastMonthTotalSales = lastMonthSales?.reduce((acc, element) => acc + element.totalSales, 0);

    console.log('lastMonthTotalSales ---------', lastMonthTotalSales);

    return (
        <div>
            <div className='grid lg:grid-cols-3 gap-4 my-4'>
                <div className='col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                    <div className='flex flex-col w-full pb-4'>
                        <p className='text-2xl font-bold text-gray-800'>${supplierMonthlySales ? supplierMonthlySales[0]?.totalSales : null}</p>
                        <p className='text-gray-600'>Total Revenue</p>
                    </div>
                </div>
                <div className='col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                    <div className='flex flex-col w-full pb-4'>
                        <p className='text-2xl font-bold text-gray-800'>1,437</p>
                        <p className='text-gray-600'>Total Orders</p>
                    </div>
                </div>
                <div className='col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                    <div className='flex flex-col w-full pb-4'>
                        <p className='text-2xl font-bold text-gray-800'>1</p>
                        <p className='text-gray-600'>Stations</p>
                    </div>
                </div>
            </div>
            <h1 className='text-gray-700 font-bold mx-2'>STOCKS</h1>
            <div className='grid lg:grid-cols-5 gap-4 my-4'>
                {
                    supplierStocks?.map((stock, index) => (
                        <div className='col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                            <div className='flex flex-col w-full pb-4'>
                                <p className='text-2xl font-bold text-gray-800'>{stock.quantity} L</p>
                                <p className='text-gray-600'>{stock.fuelType}</p>
                            </div>
                            <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                                <span className='text-green-700 text-lg'>+18%</span>
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default STopCards