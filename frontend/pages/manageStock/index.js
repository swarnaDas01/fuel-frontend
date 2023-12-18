import { useEffect, useState } from "react"
import Layout from "../Layout"
import AddStock from "@/components/ManageStock/AddStock"
import PieChartBox from "@/components/PieChartBox/PieChartBox"
import BigChartBox from "@/components/BigChartBox/BigChartBox"
import { useAllStationStockQuery, useAllmonthlySalesStationMutation, useDeleteStationStockMutation } from "@/Store/slices/admin"
import { format } from "date-fns"
import { toast } from "react-toastify"

export default function Index() {
    const [open, setOpen] = useState(false)
    const [keyForQuery, setKeyForQuery] = useState(0); // Key to trigger a refetch
    const [initialdata, setInitialData] = useState()
    const [deleteStationStockMutation] = useDeleteStationStockMutation();

    const { data: stationStockData, isLoading: stationIsLoading, isError: stationIsError } = useAllStationStockQuery({ keyForQuery });
    const [fetchAllmonthlySalesStationMutation, { data: monthlySales, isLoading: MisLoading, isError: MisError }] = useAllmonthlySalesStationMutation();

    useEffect(() => {
        fetchAllmonthlySalesStationMutation();
    }, [fetchAllmonthlySalesStationMutation]);


    const deleteStock = async (id) => {
        try {
            // Perform the mutation to delete the stock item by ID
            const res = await deleteStationStockMutation(id);
            console.log('res deleted', res);

            //show success message
            toast.success(res.data.message);

            if (res.error.status === 500) {
                toast.error(res.error.data);
            }
            setKeyForQuery((prevKey) => prevKey + 1); // Change the key to trigger a refetch

        } catch (error) {
            // Handle error (e.g., show error message)
            console.error('Error deleting stock:', error);
            toast.error(error.data);
        }
    };

    // addition all the stationStockData quantity according to fuelType
    const totalFuel = stationStockData?.reduce((acc, curr) => {
        if (acc[curr.fuelType]) {
            acc[curr.fuelType] += curr.quantity;
        } else {
            acc[curr.fuelType] = curr.quantity;
        }
        return acc;
    }, {});


    return (
        <Layout>
            {<AddStock open={open} setOpen={setOpen} initialdata={initialdata} setInitialData={setInitialData} setKeyForQuery={setKeyForQuery} />}
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className='text-gray-700 font-bold'>Available Stocks</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the stocks in your account including their name, price, quantity and date.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add Stock
                        </button>
                    </div>
                </div>

                <div className='grid lg:grid-cols-4 gap-4 my-4'>
                    {
                        totalFuel &&
                        Object.entries(totalFuel).map(([fuelType, quantity]) => (
                            <div key={fuelType} className='col-span-1 bg-white flex justify-between w-full border p-6 rounded-lg'>
                                <div className='flex flex-col'>
                                    <p className={`text-lg font-bold ${quantity < 50 ? 'text-red-800' : 'text-gray-800'}`}>{`${quantity} L`}</p>
                                    <p className='text-gray-600'>{fuelType}</p>
                                </div>
                                <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                                    <span className='text-green-700 text-lg'>+18%</span>
                                </p>
                            </div>
                        ))
                    }
                </div>

                <div className="flex">
                    <PieChartBox stationStockData={stationStockData} />
                    <BigChartBox monthlySales={monthlySales} />
                </div>

                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            Fuel Type
                                        </th>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            Pump Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Per Liter
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Selling Price
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Quantity
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Total Price
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            last Stock Update
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {stationStockData?.map((stock) => (
                                        <tr key={stock.email}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                {stock.fuelType}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"> {stock.pumpName}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"> {stock.unitPrice} tk</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"> {stock.sellingPrice} tk</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stock.quantity} L</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"> {stock.totalPrice} tk</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{format(new Date(stock?.lastStockUpdate), "yyyy-MM-dd | h:mm a")}</td>
                                            <td className="px-6 py-4 flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setOpen(true);
                                                        setInitialData(stock);
                                                    }}
                                                    type="button"
                                                    className="inline-flex items-center text-indigo-500 bg-white border border-indigo-300 focus:outline-none hover:bg-indigo-100 focus:ring-4 focus:ring-indigo-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-indigo-800 dark:text-white dark:border-indigo-600 dark:hover:bg-indigo-700 dark:hover:border-indigo-600 dark:focus:ring-indigo-700"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteStock(stock._id)}
                                                    type="button"
                                                    className="inline-flex items-center text-red-500 bg-white border border-gray-300 focus:outline-none hover:bg-red-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-red-800 dark:text-white dark:border-red-600 dark:hover:bg-red-700 dark:hover:border-red-600 dark:focus:ring-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}
