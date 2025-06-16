import React, { useEffect, useState } from 'react';
import {
  FaShoppingCart,
  FaUserPlus,
  FaTruck,
  FaRegDotCircle,
} from 'react-icons/fa';
import apiClient from '../../utils/apiClient';

const BoxStyle = ({ title, value, borderColor = '#00A99D', icon: Icon }) => {
  return (
    <div
      className='bg-[#D5ECE9] p-4 rounded-lg border-1 h-full flex justify-between items-start'
      style={{ borderColor }}
    >
      <div>
        <p className='text-[#00A99D] text-sm sm:text-base font-bold'>{title}</p>
        <p className='text-[black] text-xl sm:text-2xl font-bold'>{value}</p>
      </div>
      <Icon className='text-2xl text-[#00A99D]' />
    </div>
  );
};

const TopBar = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    activeOrders: 0,
    customers: 0,
    totalDelivery: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiClient('/api/summary'); 
        

        if (res.success) {
          setStats({
            totalOrders: res.totalOrders,
            activeOrders: res.activeOrders || 0,
            customers: res.totalCustomers || 0,
            totalDelivery: res.totalDelivery || 0,
          });
        }
      } catch (error) {
        console.error('Error fetching topbar stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 50000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-[70%] px-4 sm:px-0 mx-auto my-6'>
      <BoxStyle title='Active Orders' value={stats.activeOrders} icon={FaRegDotCircle} />
      <BoxStyle title='Total Orders' value={stats.totalOrders} icon={FaShoppingCart} />
      <BoxStyle title='Customers' value={stats.customers} icon={FaUserPlus} />
      <BoxStyle title='Total Delivery' value={stats.totalDelivery} icon={FaTruck} />
    </div>
  );
};

export default TopBar;
