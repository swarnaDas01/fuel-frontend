import React from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';

export default function NotificationModal({ open, setOpen }) {
    console.log(open);
    return (
        <div class="mt-[400px] ml-[-200px] absolute z-20 w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700">
            <div class="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-indigo-100 dark:bg-gray-800 dark:text-white">
                Notifications
            </div>
            <div class="divide-y divide-gray-100 dark:divide-gray-700">
                <a href="#" class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <div class="flex-shrink-0">
                        <img class="rounded-full w-11 h-11" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image" />
                        <div class="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                            <svg class="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                                <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                            </svg>
                        </div>
                    </div>
                    <div class="w-full pl-3">
                        <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">New message from <span class="font-semibold text-gray-900 dark:text-white">Jese Leos</span>: "Hey, what's up? All set for the presentation?"</div>
                        <div class="text-xs text-blue-600 dark:text-blue-500">a few moments ago</div>
                    </div>
                </a>
                <a href="#" class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <div class="flex-shrink-0">
                        <img class="rounded-full w-11 h-11" src="/docs/images/people/profile-picture-2.jpg" alt="Joseph image" />
                        <div class="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-gray-900 border border-white rounded-full dark:border-gray-800">
                            <svg class="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                            </svg>
                        </div>
                    </div>
                    <div class="w-full pl-3">
                        <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span class="font-semibold text-gray-900 dark:text-white">Joseph Mcfall</span> and <span class="font-medium text-gray-900 dark:text-white">5 others</span> started following you.</div>
                        <div class="text-xs text-blue-600 dark:text-blue-500">10 minutes ago</div>
                    </div>
                </a>
                <a href="#" class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <div class="flex-shrink-0">
                        <img class="rounded-full w-11 h-11" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image" />
                        <div class="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-red-600 border border-white rounded-full dark:border-gray-800">
                            <svg class="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                            </svg>
                        </div>
                    </div>
                    <div class="w-full pl-3">
                        <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span class="font-semibold text-gray-900 dark:text-white">Bonnie Green</span> and <span class="font-medium text-gray-900 dark:text-white">141 others</span> love your story. See it and view more stories.</div>
                        <div class="text-xs text-blue-600 dark:text-blue-500">44 minutes ago</div>
                    </div>
                </a>
            </div>
            <Link href="/notifications" class="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-indigo-100 hover:bg-indigo-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                <div class="inline-flex items-center ">
                    <svg class="w-4 h-4 mr-2 text-indigo-500 dark:text-indigo-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                        <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                    </svg>
                    View all
                </div>
            </Link>
        </div>
    )
}
