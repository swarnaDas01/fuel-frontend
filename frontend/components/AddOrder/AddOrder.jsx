import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useForm, Controller } from 'react-hook-form';
import { useAddOrderToSupplierMutation, useAllSuppliersMutation, useUpdateOrderToSupplierMutation } from '@/Store/slices/admin';
import { toast } from 'react-toastify';


export default function AddOrder({ open, setOpen, initialdata }) {
    const { handleSubmit, control } = useForm();
    const [keyForQuery, setKeyForQuery] = useState(0); // Used to trigger a refetch when we add/update a sale
    const [fetchAllSuppliersMutation, { data, isLoading, isError }] = useAllSuppliersMutation({ keyForQuery });
    const [addOrderToSupplierMutation] = useAddOrderToSupplierMutation();
    const [updateOrderToSupplierMutation] = useUpdateOrderToSupplierMutation();

    useEffect(() => {
        fetchAllSuppliersMutation();
    }, [fetchAllSuppliersMutation]);
    const cancelButtonRef = useRef(null)



    const onSubmit = async (data) => {
        try {
            let res;
            if (initialdata) {
                // Perform the update if initial data exists (indicating it's an update)
                res = await updateOrderToSupplierMutation({ id: initialdata._id, newData: data })
            } else {
                // Perform the mutation if no initial data exists (indicating it's an add operation)
                res = await addOrderToSupplierMutation(data).unwrap();
            }

            if (res.message || (res.data && res.data.message)) {
                const toastMessage = res.data ? res.data.message || res.message : res.message;
                toast.success(toastMessage);
                setKeyForQuery((prevKey) => prevKey + 1); // Change the key to trigger a refetch
            }
            if (res.data.error) {
                toast.error(res.data.error);
            }
            setOpen(false);
        } catch (error) {
            console.error('Mutation error:', error);
            toast.error(error);
        }
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <div className=" bg-indigo-700 px-4 py-6 sm:px-6">
                                            <div className=" flex items-center justify-between">
                                                <Dialog.Title className="text-base font-semibold leading-6 text-white">
                                                    Add / Edit Order
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
                                        <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col divide-y divide-gray-200 bg-white">
                                            <div className="h-0 flex-1 overflow-y-auto">
                                                <div className="space-y-6 mx-4 pb-5 pt-6">
                                                    <div>
                                                        <label
                                                            htmlFor="project-name"
                                                            className="block text-sm font-medium leading-6 text-gray-900"
                                                        >
                                                            Supplier
                                                        </label>
                                                        <div className="mt-2">
                                                            <Controller
                                                                name="supplier"
                                                                control={control}
                                                                defaultValue={initialdata?.supplier || ''}
                                                                render={({ field }) => (
                                                                    <select
                                                                        {...field}
                                                                        id="project-name"
                                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    >
                                                                        <option>Select One</option>
                                                                        {data?.map(({ supplierId, about }) => (
                                                                            <option value={supplierId}>{about.name}</option>
                                                                        ))}
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
                                                            Pump Name
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
                                                                        <option value="WYE">WYE</option>
                                                                        <option value="HEW">HEW</option>
                                                                        <option value="EXE">EXE</option>
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
                                                                        <option value="Octane">Octane</option>
                                                                        <option value="Gasoline">Gasoline</option>
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
                                                            Order Quantity
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
                                            </div>
                                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                                <button
                                                    type="submit"
                                                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 sm:ml-3 sm:w-auto"
                                                >
                                                    Add Order
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                    onClick={() => setOpen(false)}
                                                    ref={cancelButtonRef}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div >
            </Dialog >
        </Transition.Root >
    )
}
