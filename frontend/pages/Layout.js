// import Navbar from '@/components/Navbar/Navbar'
import Dashboard from '@/components/Dashboard/Dashboard'
import DashboardNav from '@/components/Dashboard/DashboardNav'
import Sidebar from '@/components/Dashboard/Sidebar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
        setUser(user);
        if (!user && !token) {
            router.push("/login");
        }
    }, [])


    return (
        <>
            <div className="min-h-full">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user} />
                <div className="lg:pl-72">
                    <DashboardNav setSidebarOpen={setSidebarOpen} user={user} />

                    <main className="py-10">
                        <div className="px-4 sm:px-6 lg:px-8">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}