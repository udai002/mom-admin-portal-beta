import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaRupeeSign, FaChartLine } from 'react-icons/fa';
import OrdersLineChart from './OrdersLineChart'; // Adjust path as needed

const TotalOrders = () => {
  const [stats, setStats] = useState({
    orders: 0,
    revenue: 0,
    averageRevenue: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      setError('');
      setLoading(true);

      const newStats = { orders: 0, revenue: 0, averageRevenue: 0 };

      try {
        const res = await fetch('http://localhost:3000/api/summary');
        const data = await res.json();

        if (data.success) {
          newStats.orders = data.totalOrders || 0;
          newStats.revenue = data.totalRevenue || 0;
          newStats.averageRevenue = data.averageRevenue || 0;
        } else {
          setError('Failed to fetch summary');
        }
      } catch (err) {
        console.error('Failed to fetch summary:', err);
        setError('Failed to fetch summary');
      }

      setStats(newStats);
      setLoading(false);
    };

    fetchStats();

    const interval = setInterval(fetchStats, 50000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='bg-[#d5ece9] p-6 rounded-lg w-[90%] mx-auto my-6 border border-[#00A99D]'>
      <h2 className='text-xl font-semibold mb-6 text-[#00A99D]'>Order Summary</h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side: Summary Boxes */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className='bg-white p-4 rounded-lg border border-[#00A99D] flex justify-between items-center'>
              <div>
                <p className='text-[#00A99D] text-sm sm:text-base'>Total Orders</p>
                <p className='text-black text-xl sm:text-2xl font-bold'>{stats.orders}</p>
              </div>
              <FaShoppingCart className='text-2xl text-[#00A99D]' />
            </div>

            <div className='bg-white p-4 rounded-lg border border-[#00A99D] flex justify-between items-center'>
              <div>
                <p className='text-[#00A99D] text-sm sm:text-base'>Revenue Generated</p>
                <p className='text-black text-xl sm:text-2xl font-bold flex items-center gap-1'>
                  <FaRupeeSign className='text-xl' />{stats.revenue.toLocaleString()}
                </p>
              </div>
              <FaRupeeSign className='text-xl text-[#00A99D]' />
            </div>

            <div className='bg-white p-4 rounded-lg border border-[#00A99D] flex justify-between items-center'>
              <div>
                <p className='text-[#00A99D] text-sm sm:text-base'>Average Revenue</p>
                <p className='text-black text-xl sm:text-2xl font-bold flex items-center gap-1'>
                  <FaRupeeSign className='text-xl' />{stats.averageRevenue.toFixed(2)}
                </p>
              </div>
              <FaChartLine className='text-xl text-[#00A99D]' />
            </div>
          </div>

          {/* Right Side: Line Chart */}
          <div className="w-full lg:w-1/2">
            <div className='bg-white p-6 rounded-lg border border-[#00A99D] h-full'>
              <h3 className='text-lg font-semibold mb-4 text-[#00A99D]'>Orders Overview</h3>
              <OrdersLineChart />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalOrders;
