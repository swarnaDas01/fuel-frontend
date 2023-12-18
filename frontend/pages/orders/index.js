import React, { useEffect, useState } from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import Layout from '../Layout';
import AddOrder from '@/components/AddOrder/AddOrder';
import { useAllordersQuery } from '@/Store/slices/orders';
import { MdDeleteSweep } from "react-icons/md";
import { toast } from 'react-toastify';
import { useConfirmOrderMutation, useDeleteOrderMutation } from '@/Store/slices/supplier';


export default function Index() {
    const [keyForQuery, setKeyForQuery] = useState(0); // Key to trigger a refetch
    const { data, isLoading, isError } = useAllordersQuery({ keyForQuery }); // Use keyForQuery in the query for refetching
    const [confirmOrderMutation] = useConfirmOrderMutation();
    const [deleteOrderMutation] = useDeleteOrderMutation();

    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);

    const [initialdata, setInitialData] = useState();


    const [selectedStatus, setSelectedStatus] = useState(''); // State to manage the selected status

    // Handler for status change
    const handleStatusChange = (value) => {
        setSelectedStatus(value); // Update the selected status state
    };

    // Handler for form submission
    const handleSubmit = async (orderId) => {
        // Perform actions based on the selected status and orderId
        console.log('Order ID:-----', orderId);
        console.log('Selected Status:-----', selectedStatus);

        // Add your logic here to submit the status or perform any actions
        const id = orderId;
        const status = { status: selectedStatus }
        const res = await confirmOrderMutation({ id, status });
        // console.log('confirm order frontend ------- ', res);

        if (res.data.message) {
            toast.success("Order status updated successfully");
            setKeyForQuery((prevKey) => prevKey + 1); // Change the key to trigger a refetch
        }
        if (res.error) {
            toast.error(res.error.data.error);
        }
    };



    // const handleSubmit = async (itemId, newStatus) => {
    //     setSelectedStatus(value);

    //     const id = itemId[0]._id;
    //     const status = { status: newStatus }
    //     const res = await confirmOrderMutation({ id, status });
    //     console.log('confirm order frontend ------- ', res);

    //     if (res.message) {
    //         toast.success("Order status updated successfully");
    //         setKeyForQuery((prevKey) => prevKey + 1); // Change the key to trigger a refetch
    //     }
    //     if (res.error) {
    //         toast.error(res.error.data.error);
    //     }
    // };


    useEffect(() => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        setUser(user);
    }, [])

    const role = user?.role;


    const deleteOrder = async (id) => {
        try {
            // Perform the mutation to delete the stock item by ID
            const res = await deleteOrderMutation(id);
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
                <div>
                    <h1 className='text-gray-500 mx-4 pt-6 font-bold py-4'>All Orders From Station</h1>
                </div>
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
                                    Total Price (tk)
                                </th>
                                <th scope="col" className="p-4">
                                    Unit Price
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
                                            {/* <select
                                                name="status"
                                                id="status"

                                                value={statuses[id] || ''}
                                                onChange={(e) => handleStatusChange(id, e.target.value)}
                                                className={`${statuses[id] === 'Cancelled' ? 'bg-green-300 text-white' : statuses[id] === 'Confirmed' ? 'bg-blue-500 text-white' : 'bg-yellow-200 text-gray-600'} p-2 rounded-lg`}
                                            >
                                                <option >Select One</option>
                                                <option value="Cancelled">Cancelled</option>
                                                <option value="Confirmed">Confirmed</option>
                                            </select> */}
                                            <div className="flex items-center">
                                                <select
                                                    name="status"
                                                    id="status"
                                                    value={selectedStatus}
                                                    className={`${selectedStatus === 'Cancelled' ? 'bg-green-300 text-white' : selectedStatus === 'Confirmed' ? 'bg-blue-500 text-white' : 'bg-yellow-200 text-gray-600'} p-2 rounded-lg`}
                                                    onChange={(e) => handleStatusChange(e.target.value)}
                                                >
                                                    <option>Select One</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                    <option value="Confirmed">Confirmed</option>
                                                </select>
                                                <button onClick={() => handleSubmit(order._id)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-block ml-2">
                                                    Submit
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => deleteOrder(order._id)}
                                                type="button"
                                                className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-500 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                                aria-label="Delete"
                                            >
                                                <MdDeleteSweep style={{ fontSize: "20px", color: "red" }} />
                                            </button>
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
