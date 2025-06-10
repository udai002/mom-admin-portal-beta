import React from 'react'
import user from '../../assets/Dashboard/fa--users.png'
import dollar from '../../assets/Dashboard/dollar.png'
import order from '../../assets/Dashboard/order.png'
import delivery from '../../assets/Dashboard/delivery.png'
const TopNavBar = () => {
  return (
    <div class='p-6 m-2 rounded-lg shadow-md flex bg-[#00a99d] text-[#fff] w-[70%] justify-between mx-auto my-6'>
        <div class='flex items-center space-x-4'>
            <img src={user} alt='User-icon' height={50} width={50}/>
            <div>
            <p>Total Users</p>
            <p>12345</p>
            </div>
        </div>
        <div class='flex items-center space-x-4'>
            <img src={dollar} alt='revenue-icon' height={50} width={50}/>
            <div>
            <p>Total Revenue</p>
            <p>12345</p>
            </div>
        </div>
        <div class='flex items-center space-x-4'>
            <img src={order} alt='order-icon' height={50} width={50}/>
            <div>
            <p>Total Orders</p>
            <p>12345</p>
            </div>
        </div>
        <div class='flex items-center space-x-4'>
            <img src={delivery} alt='deliveryboy-icon' height={50} width={50}/>
            <div>
            <p>Total Boys</p>
            <p>12345</p>
            </div>
        </div>
    </div>
  )
}

export default TopNavBar