import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

function OrdersLineChart() {
  const [filter, setFilter] = useState('monthly');
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchChartData = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/orders-graph?filter=${filter}`);
      const result = await res.json();
      if (result.success) {
        setChartData(result.data || []);
      } else {
        setError('Failed to fetch chart data');
      }
    } catch (err) {
      console.error('Error fetching chart data:', err);
      setError('Failed to fetch chart data');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchChartData();

    const interval = setInterval(fetchChartData, 50000); // Refresh every 50 seconds
    return () => clearInterval(interval);
  }, [filter]);

  return (
    <div className="bg-white p-6 rounded-xl shadow w-full md:w-[70%]">
      <h2 className="text-xl font-semibold mb-4">Orders ({filter})</h2>

      <div className="mb-4 flex gap-2">
        {['daily', 'weekly', 'monthly', 'yearly'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1 rounded ${
              filter === type ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading chart data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#e0e0e0" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#00A99D"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default OrdersLineChart;
