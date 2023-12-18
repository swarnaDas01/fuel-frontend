import React from 'react';
import { BsPersonFill } from 'react-icons/bs';

const Suppliers = ({ data }) => {
    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='flex justify-between p-4'>
                <h2 className='text-gray-700 font-bold'>Suppliers</h2>
            </div>
            <div className='p-4'>
                <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-x-auto'>
                    <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Availability of Fuel</th>
                                <th className='hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Contact</th>
                                <th className='hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {data?.map((supplier) => (
                                <tr key={supplier._id} className='hover:bg-gray-100'>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='flex items-center'>
                                            <div className='bg-purple-100 p-3 rounded-lg'>
                                                <BsPersonFill className='text-purple-800' />
                                            </div>
                                            <div className='text-start'>
                                                <p className='pl-2 text-gray-600'>{supplier.about.name}</p>
                                                <p className='pl-2 text-indigo-400 text-sm'>{supplier.about.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        {supplier?.fuelQuantities?.map((fuelQuen) => (
                                            <div key={fuelQuen.fuelType} className='flex gap-4'>
                                                <p className='text-gray-700 '>
                                                    {fuelQuen.fuelType} - {fuelQuen.quantity} L
                                                </p>
                                            </div>
                                        ))}
                                    </td>
                                    <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-gray-600'>{supplier.about.phone}</td>
                                    <td className='hidden sm:table-cell px-6 py-4 whitespace-nowrap text-red-400'>Delete</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Suppliers;
