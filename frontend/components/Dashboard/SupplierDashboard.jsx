import React, { useEffect, useState } from 'react'
import RecentOrders from '../Charts/RecentOrders'
import STopCards from '../Charts/STopCards'
import SBarChat from '../Charts/SBarChat'
import { useAllStockQuery, useAllmonthlySalesMutation } from '@/Store/slices/supplier';
import BigChartBox from '../BigChartBox/BigChartBox';

export default function SupplierDashboard() {
  const [fetchAllMonthlySales, { data: supplierMonthlySales, isLoading, isError }] = useAllmonthlySalesMutation();
  const { data: supplierStocks, isLoading: supplierIsLoading, isError: supplierIsError } = useAllStockQuery();

  useEffect(() => {
    // Fetch data when the component mounts
    fetchAllMonthlySales();
  }, [fetchAllMonthlySales]);


  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }


  return (
    <div>

      <STopCards supplierMonthlySales={supplierMonthlySales} supplierStocks={supplierStocks} />
      <div className=''>
        {/* <SBarChat /> */}
        <BigChartBox supplierMonthlySales={supplierMonthlySales} />
        <RecentOrders />
      </div>
    </div>
  )
}
