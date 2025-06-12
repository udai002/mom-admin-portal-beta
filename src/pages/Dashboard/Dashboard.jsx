  import React, { useEffect, useState } from 'react';
  import TopNavBar from '../../components/Dashboard/TopNavBar';
  import PieChart from '../../components/Dashboard/Pie';
  import Sales from '../../components/Dashboard/Sales';
  import PolarChart from '../../components/Dashboard/Polar';
  import '../../index.css';

  export const Dashboard = () => {
    const [stats, setStats] = useState({ users: 0, revenue: 0, orders: 0, deliveryBoys: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
      const fetchStats = async () => {
        setError('');
        setLoading(true);
        const newStats = { users: 0, revenue: 0, orders: 0, deliveryBoys: 0 };
        try {
          const res = await fetch('http://localhost:3000/api/user/users');
          const data = await res.json();
          newStats.users = Array.isArray(data) ? data.length : data.count || 0;
        } catch (err) {
          console.error('Failed to fetch users:', err);
          setError('Failed to fetch users');
        }
        try {
          const res = await fetch('http://localhost:3000/api/orderrevenue');
          const data = await res.json();
          newStats.revenue = data.totalRevenue || 0;
        } catch (err) {
          console.error('Failed to fetch revenue:', err);
          setError('Failed to fetch revenue');
        }
        try {
          const res = await fetch('http://localhost:3000/api/all');
          const data = await res.json();
          newStats.orders = data.totalOrders || 0;
        } catch (err) {
          console.error('Failed to fetch orders:', err);
          setError('Failed to fetch orders');
        }
        try {
          const res = await fetch('http://localhost:3000/delivery/alldelivery');
          const data = await res.json();
          newStats.deliveryBoys = Array.isArray(data) ? data.length : data.count || 0;
        } catch (err) {
          console.error('Failed to fetch delivery boys:', err);
          setError('Failed to fetch delivery boys');
        }
        setStats(newStats);
        setLoading(false);
      };

      fetchStats();
      const interval = setInterval(fetchStats, 50000);
      return () => clearInterval(interval);
    }, []);

    return (
      <>
        {loading && <div className="text-center p-4">Loading stats...</div>}
        {error && <div className="text-center text-red-600 p-4">{error}</div>}
        {!loading && !error && <div className='flex justify-center'><TopNavBar stats={stats} /></div>}

        <div className="min-h-screen px-6 py-10 bg-[#f3fdfc] space-y-10">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="bg-[#00a99d] rounded-xl p-6 w-full lg:w-1/2">
              <h3 className="text-center text-white mb-4 text-lg">Sales Chart</h3>
              <Sales />
            </div>

            <div className="bg-[#00a99d] rounded-xl p-6 w-full lg:w-1/2">
              <h3 className="text-center text-white mb-4 text-lg">Revenue Chart</h3>
              <PolarChart />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-[#d5ece9] rounded-xl border-2 border-[#00a99d] p-6 w-full md:w-1/2 lg:w-1/3">
              <h3 className="text-center text-[#00a99d] mb-4">Delivery Boys Available</h3>
              <PieChart />
            </div>
          </div>

        </div>
      </>
    );
  };
