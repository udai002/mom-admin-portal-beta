import React from 'react'
import {
    FaShoppingCart,
    FaUserPlus,
    FaTruck,
    FaRegDotCircle,
} from 'react-icons/fa'

const BoxStyle = ({ title, value, borderColor = '#00A99D', icon: Icon }) => {
    return (
        <div className='bg-[#D5ECE9] p-4 rounded-lg border-1 h-full flex justify-between items-start'
            style={{ borderColor }}>
            <div>
                <p className='text-[#00A99D] text-sm sm:text-base font-bold'>{title}</p>
                <p className='text-[black] text-xl sm:text-2xl font-bold'>{value}</p>
            </div>
            <Icon className='text-2xl text-[#00A99D]' />
        </div>
    )
}

const TopBar = ({ totalOrders = 0 }) => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-[70%] px-4 sm:px-0 mx-auto my-6'>
            <BoxStyle title="Active Orders" value="109" borderColor='#00A99D' icon={FaRegDotCircle} />
            <BoxStyle title="Total Orders"  value="1,275" borderColor='#00A99D' icon={FaShoppingCart} />
            <BoxStyle title="New Customers" value="422" borderColor='#00A99D' icon={FaUserPlus} />
            <BoxStyle title="Total Delivery" value="1,275" borderColor='#00A99D' icon={FaTruck} />

        </div>
    )
}

export default TopBar