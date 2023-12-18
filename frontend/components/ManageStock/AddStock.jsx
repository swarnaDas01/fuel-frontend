import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useForm, Controller } from 'react-hook-form';
import { useAddStationStockMutation, useUpdateStationStockMutation } from '@/Store/slices/admin';
import { toast } from 'react-toastify';


export default function AddStock({ open, setOpen, initialdata, setKeyForQuery }) {
    const { handleSubmit, control } = useForm();
    const [addStationStockMutation] = useAddStationStockMutation();
    const [updateStationStockMutation] = useUpdateStationStockMutation();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            let res;
            if (initialdata) {
                // Perform the update if initial data exists (indicating it's an update)
                res = await updateStationStockMutation({ id: initialdata._id, stock: data });
            } else {
                // Perform the mutation if no initial data exists (indicating it's an add operation)
                res = await addStationStockMutation(data).unwrap();
            }

            console.log(res.message);

            if (res.message || (res.data && res.data.message)) {
                const toastMessage = res.data ? res.data.message || res.message : res.message;
                toast.success(toastMessage);
                setKeyForQuery((prevKey) => prevKey + 1); // Change the key to trigger a refetch
            }
            if (res.data.error) {
                toast.error(res.data.message);
            }
            setOpen(false);
        } catch (error) {
            console.error('Mutation error:', error);
            toast.error(error);
        }
    };


    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <div className="fixed inset-0" />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                                        <div className="h-0 flex-1 overflow-y-auto">
                                            <div className=" bg-indigo-700 mt-14 px-4 py-6 sm:px-6">
                                                <div className=" flex items-center justify-between">
                                                    <Dialog.Title className="text-base font-semibold leading-6 text-white">
                                                        Add / Edit New Stock
                                                    </Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span className="absolute -inset-2.5" />
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="mt-1">
                                                    <p className="text-sm text-indigo-300">
                                                        Get started by filling in the information below to create your new project.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="space-y-6 mx-4 pb-5 pt-6">
                                                <div>
                                                    <label
                                                        htmlFor="project-name"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Fuel Pump
                                                    </label>
                                                    <div className="mt-2">
                                                        <Controller
                                                            name="pumpName"
                                                            control={control}
                                                            defaultValue={initialdata?.pumpName || ''}
                                                            render={({ field }) => (
                                                                <select
                                                                    {...field}
                                                                    id="project-name"
                                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                >
                                                                    <option value="ABC">ABC</option>
                                                                    <option value="HEW">HEW</option>
                                                                    <option value="EXE">EXE</option>
                                                                    <option value="WYE">WYE</option>
                                                                </select>
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="project-name"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Fuel Type
                                                    </label>
                                                    <div className="mt-2">
                                                        <Controller
                                                            name="fuelType"
                                                            control={control}
                                                            defaultValue={initialdata?.fuelType || ''}
                                                            render={({ field }) => (
                                                                <select
                                                                    {...field}
                                                                    id="project-name"
                                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                >
                                                                    <option value="Petrol">Petrol</option>
                                                                    <option value="Diesel">Diesel</option>
                                                                    <option value="Octane">Octen</option>
                                                                    <option value="Gasoline">Gasoline</option>
                                                                    <option value="LPG">LPG</option>
                                                                </select>
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="project-name"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Unit Price
                                                    </label>
                                                    <div className="mt-2">
                                                        <Controller
                                                            name="unitPrice"
                                                            control={control}
                                                            defaultValue={initialdata?.unitPrice || ''}
                                                            render={({ field }) => (
                                                                <input
                                                                    {...field}
                                                                    type="number"
                                                                    id="project-price"
                                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="project-name"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Selling Price
                                                    </label>
                                                    <div className="mt-2">
                                                        <Controller
                                                            name="sellingPrice"
                                                            control={control}
                                                            defaultValue={initialdata?.sellingPrice || ''}
                                                            render={({ field }) => (
                                                                <input
                                                                    {...field}
                                                                    type="number"
                                                                    id="project-price"
                                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="project-name"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Quantity
                                                    </label>
                                                    <div className="mt-2">
                                                        <Controller
                                                            name="quantity"
                                                            control={control}
                                                            defaultValue={initialdata?.quantity || ''}
                                                            render={({ field }) => (
                                                                <input
                                                                    {...field}
                                                                    type="number"
                                                                    id="project-quantity"
                                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-shrink-0 justify-end px-4 py-4">
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => setOpen(false)}
                                                    type="submit"
                                                    className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
