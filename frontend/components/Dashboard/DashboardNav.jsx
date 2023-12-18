import { Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import React, { Fragment, useState } from 'react'
import NotificationModal from './NotificationModal'
import Link from 'next/link'
import { useLogoutMutation } from '@/Store/slices/auth'

const userNavigation = [
    { name: 'My profile', href: '/profile' },
    { name: '', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function DashboardNav({ setSidebarOpen, user }) {
    const [isOpen, setIsOpen] = useState(false);
    const [logoutMutation] = useLogoutMutation();

    const role = user?.role;

    return (
        <div>
            <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

                <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                    <div className="relative flex flex-1"></div>
                    <div className="flex items-center gap-x-4 lg:gap-x-6">
                        <button onClick={() => setIsOpen(!isOpen)} class="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400" type="button">
                            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
                                <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
                            </svg>
                            <div class="relative flex">
                                <div class="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-3 dark:border-gray-900"></div>
                            </div>
                        </button>

                        {isOpen && <NotificationModal />}

                        {/* Separator */}
                        <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative">
                            <Menu.Button className="-m-1.5 flex items-center p-1.5">
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="h-8 w-8 rounded-full bg-gray-50"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                                <span className="hidden lg:flex lg:items-center">
                                    <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                                        {user?.name}
                                    </span>
                                    <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </Menu.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                    {userNavigation.map((item) => (
                                        <Menu.Item key={item.name}>
                                            {({ active }) => (
                                                <Link
                                                    href={item.href}
                                                    className={classNames(
                                                        active ? 'bg-gray-50' : '',
                                                        'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                    )}
                                                >
                                                    {item.name}
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    ))}
                                    <button
                                        onClick={() => {
                                            logoutMutation();
                                            localStorage.removeItem('token');
                                            localStorage.removeItem('user');
                                            localStorage.removeItem('role');
                                            window.location.href = '/login';
                                        }}
                                        className='block hover:bg-gray-50 px-3 py-1 text-sm leading-6 text-gray-900'
                                    >
                                        Sign out
                                    </button>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
    )
}
