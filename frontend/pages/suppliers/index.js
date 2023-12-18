
import React, { useEffect } from 'react'
import Layout from '../Layout'
import Suppliers from '@/components/Suppliers/Suppliers'
import { useAllSuppliersMutation } from '@/Store/slices/admin';

export default function Index() {

    const [fetchAllSuppliersMutation, { data, isLoading, isError }] = useAllSuppliersMutation();

    useEffect(() => {
        fetchAllSuppliersMutation();
    }, [fetchAllSuppliersMutation]);

    return (
        <Layout>
            <Suppliers data={data} />
        </Layout>
    )
}
