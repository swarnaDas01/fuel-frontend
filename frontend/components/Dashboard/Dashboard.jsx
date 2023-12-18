import AdminDashboard from "./AdminDashboard"
import SupplierDashboard from "./SupplierDashboard"

export default function Dashboard({ user }) {
    const role = user?.role;

    return (
        <>
            {role === "admin" && <AdminDashboard />}
            {role === "supplier" && <SupplierDashboard />}
        </>
    )
}
