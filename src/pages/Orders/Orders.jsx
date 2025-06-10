import React from 'react'
import TopBar from '../../components/Orders/topbar'
import TotalOrders from '../../components/Orders/TotalOrders'
import OrderTable from '../../components/Orders/OrderTable'

function Orders() {
  return (
    <>
    <TopBar />
    <TotalOrders />
    <OrderTable />
    </>
  )
}

export default Orders