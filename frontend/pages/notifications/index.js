import Suppliernotify from "@/components/Notifications/Suppliernotify";
import Layout from "../Layout"
import AdminNotify from "@/components/Notifications/AdminNotify";
import { useEffect, useState } from "react";


export default function Index() {

    const [user, setUser] = useState(null);
    useEffect(() => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        setUser(user);
    }, [])

    const role = user?.role;

    return (
        <Layout>
            {
                role === 'supplier' ? <Suppliernotify /> : <AdminNotify />
            }
        </Layout>
    );
}
