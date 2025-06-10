import React from 'react'
import TopBar from '../../components/Orders/topbar'
import TotalOrders from '../../components/Orders/TotalOrders'
import OrdersTable from '../../components/Orders/OrderTable'

function Orders() {
  return (
    <>
    <TopBar />
    <TotalOrders />
    <OrdersTable/>
    </>
  )
}

export default Orders