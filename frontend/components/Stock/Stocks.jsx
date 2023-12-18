import React, { useEffect, useState } from 'react'
import AddStock from './AddStock';
import { useAllStockQuery, useDeleteStockMutation } from '@/Store/slices/supplier';
import { format } from 'date-fns';
import { toast } from 'react-toastify';


export default function Stocks() {
    const [open, setOpen] = useState(false);
    const [keyForQuery, setKeyForQuery] = useState(0); // Key to trigger a refetch
    const { data, isLoading, isError } = useAllStockQuery({ keyForQuery }); // Use keyForQuery in the query for refetching

    const [deleteStockMutation] = useDeleteStockMutation();
    const [initialdata, setInitialData] = useState()

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Something went wrong</div>


    const deleteStock = async (id) => {
        try {
            // Perform the mutation to delete the stock item by ID
            const res = await deleteStockMutation(id);
            console.log('res deleted', res);
            //show success message
            toast.success(res.data.message);

            setKeyForQuery((prevKey) => prevKey + 1); // Change the key to trigger a refetch
        } catch (error) {
            // Handle error (e.g., show error message)
            console.error('Error deleting stock:', error);
            toast.error(error.message);
        }
    };


    return (
        <div>
            <AddStock open={open} setOpen={setOpen} setKeyForQuery={setKeyForQuery} initialdata={initialdata} />
            <div className="sm:flex sm:items-center px-4 pt-4">
                <div className="sm:flex-auto">
                    <h1 className="text-gray-600 font-bold my-6">Stock Report</h1>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        onClick={() => setOpen(true)}
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add Stock
                    </button>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between pb-4">
                    <div>
                        <button id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <svg class="w-3 h-3 text-gray-500 dark:text-gray-400 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                            </svg>
                            Last 30 days
                            <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>

                        <div id="dropdownRadio" className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top">
                            <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                                <li>
                                    <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id="filter-radio-example-1" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="filter-radio-example-1" class="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last day</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input checked="" id="filter-radio-example-2" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="filter-radio-example-2" class="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last 7 days</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id="filter-radio-example-3" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="filter-radio-example-3" class="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last 30 days</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id="filter-radio-example-4" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="filter-radio-example-4" class="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last month</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id="filter-radio-example-5" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="filter-radio-example-5" class="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last year</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <label for="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </div>
                        <input type="text" id="table-search" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
                    </div>
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4">
                                    <input
                                        // id={`checkbox-table-search-${data._id}`}
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </th>
                                <th scope="col" className="p-4">
                                    ID
                                </th>
                                <th scope="col" className="p-4">
                                    Fuel Type
                                </th>
                                <th scope="col" className="p-4">
                                    Quantity
                                </th>
                                <th scope="col" className="p-4">
                                    Unit Price
                                </th>
                                <th scope="col" className="p-4">
                                    Selling Price
                                </th>
                                <th scope="col" className="p-4">
                                    Total Price (tk)
                                </th>
                                <th scope="col" className="p-4">
                                    Date
                                </th>
                                <th scope="col" className="p-4">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item) => (
                                <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input
                                                id={`checkbox-table-search-${item._id}`}
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor={`checkbox-table-search-${item._id}`} className="sr-only">
                                                checkbox
                                            </label>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{item._id}</td>
                                    <td className="px-6 py-4">{item.fuelType}</td>
                                    <td className="px-6 py-4">{item.quantity} L</td>
                                    <td className="px-6 py-4">{item.unitPrice}</td>
                                    <td className="px-6 py-4">{item.sellingPrice}</td>
                                    <td className="px-6 py-4">
                                        {
                                            item.quantity * item.unitPrice
                                        }
                                    </td>
                                    {/* <td className="px-6 py-4">{item?.createdAt}</td> */}
                                    <td className="px-6 py-4">{format(new Date(item?.createdAt), "yyyy-MM-dd | h:mm a")}</td>
                                    <td className="px-6 py-4 flex gap-2">
                                        <button
                                            onClick={() => {
                                                setOpen(true);
                                                setInitialData(item);
                                            }}
                                            type="button"
                                            className="inline-flex items-center text-indigo-500 bg-white border border-indigo-300 focus:outline-none hover:bg-indigo-100 focus:ring-4 focus:ring-indigo-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-indigo-800 dark:text-white dark:border-indigo-600 dark:hover:bg-indigo-700 dark:hover:border-indigo-600 dark:focus:ring-indigo-700"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteStock(item._id)}
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
        </div >
    )
}