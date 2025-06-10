import React from 'react'
import TopBar from '../../components/Orders/topbar'
import TotalOrders from '../../components/Orders/TotalOrders'
import OrderTable from '../../components/Orders/OrderTable'
import RevenueLineChart from '../../components/Orders/OrdersLineChart'

function Orders() {
  return (
    <>
    <TopBar />
    <TotalOrders />
    <OrderTable />
    <RevenueLineChart />
    </>
  )
}

export default Orders