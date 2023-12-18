import React, { useState } from 'react';
import MakeOrder from './MakeOrder';
import { MdDeleteSweep } from 'react-icons/md';
import { useDeleteSaleMutation, useUpdateSaleMutation } from '@/Store/slices/admin';
import { toast } from 'react-toastify';
import moment from 'moment';

const SalesReport = ({ data, setKeyForQuery }) => {
    const [open, setOpen] = useState(false);
    const [initialdata, setInitialData] = useState()
    const [deleteSaleMutation] = useDeleteSaleMutation();


    const handleDeleteSale = async (id) => {
        try {
            // Perform the mutation to delete the stock item by ID
            const res = await deleteSaleMutation(id);
            //show success message
            toast.success(res.data.message);

            setKeyForQuery((prevKey) => prevKey + 1); // Change the key to trigger a refetch
        } catch (error) {
            // Handle error (e.g., show error message)
            console.error('Error deleting stock:', error);
            toast.error(error.message);
        }
    }

    const getTimeDifference = (timestamp) => {
        return moment(timestamp).fromNow();
    };


    return (
        <div>
            <MakeOrder open={open} setOpen={setOpen} initialdata={initialdata} setKeyForQuery={setKeyForQuery} />
            <div className="sm:flex sm:items-center px-4 pt-4">
                <div className="sm:flex-auto">
                    <h1 className="text-gray-600 font-bold my-6">Sales Report</h1>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        onClick={() => setOpen(true)}
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Make Sale
                    </button>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                            </th>
                            {/* <th scope="col" className="p-4">
                                ID
                            </th> */}
                            <th scope="col" className="p-4">
                                Fuel Type
                            </th>
                            <th scope="col" className="p-4">
                                Date and Time
                            </th>
                            <th scope="col" className="p-4">
                                Quantity Sold
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
                                Payment Method
                            </th>
                            <th scope="col" className="p-4">
                                Customer Contact
                            </th>
                            <th scope="col" className="p-4">
                                Pump Name
                            </th>
                            <th scope="col" className="p-4">
                                Invoice Number
                            </th>
                            <th scope="col" className="p-4">
                                Payment Status
                            </th>
                            <th scope="col" className="p-4">
                                Tax (tk)
                            </th>
                            <th scope="col" className="p-4">
                                Transaction Status
                            </th>
                            <th scope="col" className="p-4">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((sale) => (
                            <tr key={sale.saleId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input
                                            id={`checkbox-table-search-${sale._id}`}
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor={`checkbox-table-search-${sale.saleId}`} className="sr-only">
                                            checkbox
                                        </label>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{sale.fuelType}</td>
                                <time dateTime={sale?.date}>{getTimeDifference(sale?.date)}</time>
                                <td className="px-6 py-4">{sale.quantity} L</td>
                                <td className="px-6 py-4">{sale.unitPrice}</td>
                                <td className="px-6 py-4">{sale.sellingPrice}</td>
                                <td className="px-6 py-4">{sale.totalPrice}</td>
                                <td className="px-6 py-4">{sale.paymentMethod}</td>
                                <td className="px-6 py-4">{sale.customerContact}</td>
                                <td className="px-6 py-4">{sale.pumpName}</td>
                                <td className="px-6 py-4">{sale.invoiceNumber}</td>
                                <td className="px-6 py-4">{sale.paymentStatus}</td>
                                <td className="px-6 py-4">{sale.salesTax}</td>
                                <td className="px-6 py-4">{sale.transactionStatus}</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => {
                                        setOpen(true);
                                        setInitialData(sale);
                                    }} className='text-indigo-500 hover:text-indigo-700'>
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteSale(sale._id)}
                                        type="button"
                                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-500 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                        aria-label="Delete"
                                    >
                                        <MdDeleteSweep style={{ fontSize: "20px", color: "red" }} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesReport;
