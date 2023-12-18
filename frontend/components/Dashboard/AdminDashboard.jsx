import React, { useEffect } from 'react'
import BarChart from '../Charts/BarChat'
import RecentOrders from '../Charts/RecentOrders'
import TopCards from '../Charts/TopCards'
import PieChartBox from '../PieChartBox/PieChartBox'
import BigChartBox from '../BigChartBox/BigChartBox'
import { useAllFuelStationsMutation, useAllStationStockQuery, useAllmonthlySalesStationMutation } from '@/Store/slices/admin'
import { useAllUsersQuery } from '@/Store/slices/auth'
import { useRouter } from 'next/router'

export default function AdminDashboard() {
  const router = useRouter();
  const { data: stationStockData, isLoading: stationStockIsLoading, isError: stationStockIsError } = useAllStationStockQuery();
  const { data: allUsers, isLoading: UisLoading, isError: UisError } = useAllUsersQuery();

  const [fetchAllFuelStationsMutation, { data, isLoading, isError }] = useAllFuelStationsMutation();
  const [fetchAllmonthlySalesStationMutation, { data: monthlySales, isLoading: MisLoading, isError: MisError }] = useAllmonthlySalesStationMutation();

  useEffect(() => {
    fetchAllFuelStationsMutation();
    fetchAllmonthlySalesStationMutation();
  }, [fetchAllFuelStationsMutation]);



  return (
    <div>
      <TopCards monthlySales={monthlySales} data={data} allUsers={allUsers} />
      <div className=''>
        <div className="md:flex grid py-8">
          <PieChartBox stationStockData={stationStockData} />
          {/* <BarChart /> */}
          <BigChartBox monthlySales={monthlySales} />
        </div>
        {/* <BarChart /> */}
        <RecentOrders />
      </div>
    </div>
  )
}
