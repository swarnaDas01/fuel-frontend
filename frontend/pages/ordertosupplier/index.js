import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import AddOrder from '@/components/AddOrder/AddOrder';
import { MdDeleteSweep } from "react-icons/md";
import { toast } from 'react-toastify';
import { useAllOrderToSuppliersMutation, useDeleteOrderToSupplierMutation } from '@/Store/slices/admin';


export default function Index() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [initialdata, setInitialData] = useState();
    const role = user?.role;

    const [keyForQuery, setKeyForQuery] = useState(0); // Key to trigger a refetch
    const [fetchAllOrderToSuppliersMutation, { data, isLoading, isError }] = useAllOrderToSuppliersMutation({ keyForQuery });
    const [deleteOrderToSupplierMutation] = useDeleteOrderToSupplierMutation();


    useEffect(() => {
        fetchAllOrderToSuppliersMutation();
    }, [fetchAllOrderToSuppliersMutation]);


    useEffect(() => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        setUser(user);
    }, [])



    const deleteOrder = async (id) => {
        try {
            // Perform the mutation to delete the stock item by ID
            const res = await deleteOrderToSupplierMutation(id);
            console.log(' deleted order frontend ------- ', res);

            //show success message
            toast.success(res.data.message);

            setKeyForQuery((prevKey) => prevKey + 1); // Change the key to trigger a refetch
        } catch (error) {
            console.error('Error deleting stock:', error);
            toast.error(error.message);
        }
    };


    return (
        <Layout>
            <AddOrder open={open} setOpen={setOpen} initialdata={initialdata} />
            <div className='bg-gray-100 min-h-screen px-8'>
                {role === "admin" && <div className="sm:flex sm:items-center px-4 pt-4">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Manage Order</h1>
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
                            Add Order
                        </button>
                    </div>
                </div>}
                <div className="relative overflow-x-auto shadow-md sm:rounded-l">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </th>
                                <th scope="col" className="p-4">
                                    Suppliers ID
                                </th>
                                <th scope="col" className="p-4">
                                    Pump Name
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
                                    Total Price (tk)
                                </th>
                                <th scope="col" className="p-4">
                                    Date and Time
                                </th>
                                <th scope="col" className="p-4">
                                    Processing
                                </th>
                                <th scope="col" className="p-4">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((order, inx, id) => (
                                <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input
                                                id={`checkbox-table-search-${order._id}`}
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor={`checkbox-table-search-${order._id}`} className="sr-only">
                                                checkbox
                                            </label>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{order?.supplier}</td>
                                    <td className="px-6 py-4">{order?.pumpName}</td>
                                    <td className="px-6 py-4">{order?.fuelType}</td>
                                    <td className="px-6 py-4">{order?.quantity} L</td>
                                    <td className="px-6 py-4">{order?.unitPrice}</td>
                                    <td className="px-6 py-4">{order?.totalPrice}</td>
                                    <td className="px-6 py-4">{order?.date && new Date(order.date).toLocaleDateString('en-US', {
                                        year: '2-digit',
                                        month: '2-digit',
                                        day: '2-digit',
                                    })}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={
                                                order?.status == 'Cancelled'
                                                    ? 'bg-green-200 p-2 rounded-lg'
                                                    : order?.status == 'Confirmed'
                                                        ? 'bg-blue-200 p-2 rounded-lg'
                                                        : 'bg-yellow-200 p-2 rounded-lg'
                                            }
                                        >
                                            {order?.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className='flex justify-around items-center'>
                                            <>
                                                <button onClick={() => {
                                                    setOpen(true);
                                                    setInitialData(order);
                                                }} className='text-indigo-500 hover:text-indigo-700'>
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteOrder(order?._id)}
                                                    type="button"
                                                    className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-500 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                                    aria-label="Delete"
                                                >
                                                    <MdDeleteSweep style={{ fontSize: "20px", color: "red" }} />
                                                </button>
                                            </>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};
