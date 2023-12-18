import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import SalesReport from '@/components/Sales/SalesReport'
import { useAllSalesMutation } from '@/Store/slices/admin';

export default function Index() {
    const [keyForQuery, setKeyForQuery] = useState(0);
    const [fetchAllSalesMutation, { data, isLoading, isError }] = useAllSalesMutation({ keyForQuery });

    useEffect(() => {
        // Fetch data when the component mounts
        fetchAllSalesMutation();
    }, [fetchAllSalesMutation]);

    return (
        <Layout>
            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error fetching data</div>
            ) : (
                <SalesReport data={data} setKeyForQuery={setKeyForQuery} />
            )}
        </Layout>
    )
}
