import React from 'react'
import { Fragment } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import {
    ChevronRightIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link'
import { useLogoutMutation } from '@/Store/slices/auth';

const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
    {
        name: 'Sales Management',
        icon: UsersIcon,
        current: false,
        children: [
            { name: 'Manage Sales', href: '/sales' },
            { name: 'Sales History', href: '/salehistory' },
        ],
    },
    {
        name: 'Orders To Suppliers',
        icon: UsersIcon,
        current: false,
        children: [
            { name: 'Suppliers', href: '/suppliers' },
            { name: 'Manage Orders', href: '/ordertosupplier' },
        ],
    },
    { name: 'Stock Management', href: '/manageStock', icon: UsersIcon, current: false },
    // { name: 'Invoices', href: '/invoices', icon: ChartPieIcon, current: false },
    { name: 'Notifications', href: '/notifications', icon: DocumentDuplicateIcon, current: false },
]

const navigation2 = [
    { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
    {
        name: 'Orders',
        icon: UsersIcon,
        current: false,
        children: [
            { name: 'Manage Orders', href: '/orders' },
            { name: 'Orders History', href: '/orders' },
        ],
    },
    {
        name: 'Stock Management',
        href: '/stock',
        icon: UsersIcon,
        current: false,
    },
    {
        name: 'Manage Station',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'Manage Station', href: '/stations' },
        ],
    },
    // { name: 'sales', href: '/sales', icon: ChartPieIcon, current: false },
    // { name: 'Invoice and Payments', href: '/invoice', icon: ChartPieIcon, current: false },
    { name: 'Notifications', href: '/notifications', icon: DocumentDuplicateIcon, current: false },
    { name: 'Profile Settings', href: '/profile', icon: ChartPieIcon, current: false },
]

const teams = [
    { id: 1, name: 'Employees', href: '/employees', initial: 'H', current: false },
    { name: 'Profile Settings', href: '/profile', icon: ChartPieIcon, initial: 'P', current: false },
]

const userNavigation = [
    { name: 'Your profile', href: '#' },
    { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Sidebar({ sidebarOpen, setSidebarOpen, user }) {
    const [logoutMutation] = useLogoutMutation();
    const role = user?.role;

    return (
        <div>
            <Transition.Root show={sidebarOpen} as={Fragment} >
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen} >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </Transition.Child>
                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex grow flex-col gap-y-5 bg-indigo-600 px-6 pb-4">
                                    <div className="flex h-16 shrink-0 items-center">
                                        <img
                                            className="h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=white"
                                            alt="Your Company"
                                        />
                                    </div>
                                    <nav className="flex flex-1 flex-col">
                                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                            <li>
                                                <ul role="list" className="-mx-2 space-y-1">
                                                    {role === "admin" || "manager" && navigation.map((item) => (
                                                        <li key={item.name}>
                                                            {!item.children ? (
                                                                <Link
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        item.current ? 'bg-indigo-700' : 'hover:bg-indigo-700',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-200'
                                                                    )}
                                                                >
                                                                    <item.icon className="h-6 w-6 shrink-0 text-gray-200" aria-hidden="true" />
                                                                    {item.name}
                                                                </Link>
                                                            ) : (
                                                                <Disclosure as="div">
                                                                    {({ open }) => (
                                                                        <>
                                                                            <Disclosure.Button
                                                                                className={classNames(
                                                                                    item.current ? 'bg-gray-50' : 'hover:bg-indigo-700',
                                                                                    'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-200'
                                                                                )}
                                                                            >
                                                                                <item.icon className="h-6 w-6 shrink-0 text-gray-200" aria-hidden="true" />
                                                                                {item.name}
                                                                                <ChevronRightIcon
                                                                                    className={classNames(
                                                                                        open ? 'rotate-90 text-gray-200' : 'text-gray-200',
                                                                                        'ml-auto h-5 w-5 shrink-0'
                                                                                    )}
                                                                                    aria-hidden="true"
                                                                                />
                                                                            </Disclosure.Button>
                                                                            <Disclosure.Panel as="ul" className="mt-1 px-2">
                                                                                {item.children.map((subItem) => (
                                                                                    <li key={subItem.name}>
                                                                                        <Link
                                                                                            href={subItem.href}
                                                                                            className={classNames(
                                                                                                subItem.current ? 'bg-gray-50' : 'hover:bg-indigo-700',
                                                                                                'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-200'
                                                                                            )}
                                                                                        >
                                                                                            {subItem.name}
                                                                                        </Link>
                                                                                    </li>
                                                                                ))}
                                                                            </Disclosure.Panel>
                                                                        </>
                                                                    )}
                                                                </Disclosure>
                                                            )}
                                                        </li>
                                                    ))}
                                                    {role === "supplier" && navigation2.map((item) => (
                                                        <li key={item.name}>
                                                            {!item.children ? (
                                                                <Link
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        item.current ? 'bg-indigo-700' : 'hover:bg-indigo-700',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-200'
                                                                    )}
                                                                >
                                                                    <item.icon className="h-6 w-6 shrink-0 text-gray-200" aria-hidden="true" />
                                                                    {item.name}
                                                                </Link>
                                                            ) : (
                                                                <Disclosure as="div">
                                                                    {({ open }) => (
                                                                        <>
                                                                            <Disclosure.Button
                                                                                className={classNames(
                                                                                    item.current ? 'bg-gray-50' : 'hover:bg-indigo-700',
                                                                                    'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-200'
                                                                                )}
                                                                            >
                                                                                <item.icon className="h-6 w-6 shrink-0 text-gray-200" aria-hidden="true" />
                                                                                {item.name}
                                                                                <ChevronRightIcon
                                                                                    className={classNames(
                                                                                        open ? 'rotate-90 text-gray-200' : 'text-gray-200',
                                                                                        'ml-auto h-5 w-5 shrink-0'
                                                                                    )}
                                                                                    aria-hidden="true"
                                                                                />
                                                                            </Disclosure.Button>
                                                                            <Disclosure.Panel as="ul" className="mt-1 px-2">
                                                                                {item.children.map((subItem) => (
                                                                                    <li key={subItem.name}>
                                                                                        <Link
                                                                                            href={subItem.href}
                                                                                            className={classNames(
                                                                                                subItem.current ? 'bg-gray-50' : 'hover:bg-indigo-700',
                                                                                                'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-200'
                                                                                            )}
                                                                                        >
                                                                                            {subItem.name}
                                                                                        </Link>
                                                                                    </li>
                                                                                ))}
                                                                            </Disclosure.Panel>
                                                                        </>
                                                                    )}
                                                                </Disclosure>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                            <li>
                                                {role === "admin" && <div className="text-xs font-semibold leading-6 text-indigo-200">Your teams</div>}
                                                <ul role="list" className="-mx-2 mt-2 space-y-1">
                                                    {role === "admin" && teams.map((team) => (
                                                        <li key={team.name}>
                                                            <Link
                                                                href={team.href}
                                                                className={classNames(
                                                                    team.current
                                                                        ? 'bg-indigo-700 text-white'
                                                                        : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                )}
                                                            >
                                                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">
                                                                    {team.initial}
                                                                </span>
                                                                <span className="truncate">{team.name}</span>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                            <li className="mt-auto">
                                                <Link
                                                    href="#"
                                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
                                                >
                                                    <Cog6ToothIcon
                                                        className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                                                        aria-hidden="true"
                                                    />
                                                    Settings
                                                </Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 bg-indigo-600 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                        <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="Your Company" />
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {role === "admin" && navigation.map((item) => (
                                        <li key={item.name}>
                                            {!item.children ? (
                                                <Link
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current ? 'bg-indigo-700' : 'hover:bg-indigo-700',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-200'
                                                    )}
                                                >
                                                    <item.icon className="h-6 w-6 shrink-0 text-gray-200" aria-hidden="true" />
                                                    {item.name}
                                                </Link>
                                            ) : (
                                                <Disclosure as="div">
                                                    {({ open }) => (
                                                        <>
                                                            <Disclosure.Button
                                                                className={classNames(
                                                                    item.current ? 'bg-gray-50' : 'hover:bg-indigo-700',
                                                                    'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-200'
                                                                )}
                                                            >
                                                                <item.icon className="h-6 w-6 shrink-0 text-gray-200" aria-hidden="true" />
                                                                {item.name}
                                                                <ChevronRightIcon
                                                                    className={classNames(
                                                                        open ? 'rotate-90 text-gray-200' : 'text-gray-200',
                                                                        'ml-auto h-5 w-5 shrink-0'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            </Disclosure.Button>
                                                            <Disclosure.Panel as="ul" className="mt-1 px-2">
                                                                {item.children.map((subItem) => (
                                                                    <li key={subItem.name}>
                                                                        <Link
                                                                            href={subItem.href}
                                                                            className={classNames(
                                                                                subItem.current ? 'bg-gray-50' : 'hover:bg-indigo-700',
                                                                                'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-200'
                                                                            )}
                                                                        >
                                                                            {subItem.name}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </Disclosure.Panel>
                                                        </>
                                                    )}
                                                </Disclosure>
                                            )}
                                        </li>
                                    ))}
                                    {role === "supplier" && navigation2.map((item) => (
                                        <li key={item.name}>
                                            {!item.children ? (
                                                <Link
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current ? 'bg-indigo-700' : 'hover:bg-indigo-700',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-200'
                                                    )}
                                                >
                                                    <item.icon className="h-6 w-6 shrink-0 text-gray-200" aria-hidden="true" />
                                                    {item.name}
                                                </Link>
                                            ) : (
                                                <Disclosure as="div">
                                                    {({ open }) => (
                                                        <>
                                                            <Disclosure.Button
                                                                className={classNames(
                                                                    item.current ? 'bg-gray-50' : 'hover:bg-indigo-700',
                                                                    'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-200'
                                                                )}
                                                            >
                                                                <item.icon className="h-6 w-6 shrink-0 text-gray-200" aria-hidden="true" />
                                                                {item.name}
                                                                <ChevronRightIcon
                                                                    className={classNames(
                                                                        open ? 'rotate-90 text-gray-200' : 'text-gray-200',
                                                                        'ml-auto h-5 w-5 shrink-0'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            </Disclosure.Button>
                                                            <Disclosure.Panel as="ul" className="mt-1 px-2">
                                                                {item.children.map((subItem) => (
                                                                    <li key={subItem.name}>
                                                                        <Link
                                                                            href={subItem.href}
                                                                            className={classNames(
                                                                                subItem.current ? 'bg-gray-50' : 'hover:bg-indigo-700',
                                                                                'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-200'
                                                                            )}
                                                                        >
                                                                            {subItem.name}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </Disclosure.Panel>
                                                        </>
                                                    )}
                                                </Disclosure>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li>
                                {role === "admin" && <div className="text-xs font-semibold leading-6 text-indigo-200">Your teams</div>}
                                <ul role="list" className="-mx-2 mt-2 space-y-1">
                                    {role === "admin" && teams.map((team) => (
                                        <li key={team.name}>
                                            <Link
                                                href={team.href}
                                                className={classNames(
                                                    team.current
                                                        ? 'bg-indigo-700 text-white'
                                                        : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                )}
                                            >
                                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">
                                                    {team.initial}
                                                </span>
                                                <span className="truncate">{team.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="mt-auto">
                                <Link
                                    href="settings"
                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
                                >
                                    <Cog6ToothIcon
                                        className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                                        aria-hidden="true"
                                    />
                                    Settings
                                </Link>
                                <p
                                    onClick={() => {
                                        logoutMutation();
                                        localStorage.removeItem('token');
                                        localStorage.removeItem('user');
                                        localStorage.removeItem('role');
                                        window.location.href = '/login';
                                    }}
                                    className="cursor-pointer group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
                                >
                                    <Cog6ToothIcon
                                        className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                                        aria-hidden="true"
                                    />
                                    Logout
                                </p>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}



