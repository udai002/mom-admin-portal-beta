import React, { useState } from 'react';
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

const dailyData = [
  { label: 'Mon', orders: 50 },
  { label: 'Tue', orders: 70 },
  { label: 'Wed', orders: 30 },
  { label: 'Thu', orders: 90 },
  { label: 'Fri', orders: 100 },
  { label: 'Sat', orders: 80 },
  { label: 'Sun', orders: 20 },
];

const weeklyData = [
  { label: 'Week 1', orders: 300 },
  { label: 'Week 2', orders: 400 },
  { label: 'Week 3', orders: 350 },
  { label: 'Week 4', orders: 500 },
];

const monthlyData = [
  { label: 'Jan', orders: 400 },
  { label: 'Feb', orders: 300 },
  { label: 'Mar', orders: 500 },
  { label: 'Apr', orders: 200 },
  { label: 'May', orders: 450 },
  { label: 'Jun', orders: 600 },
  { label: 'Jul', orders: 100 },
  { label: 'Aug', orders: 200 },
  { label: 'Sep', orders: 800 },
  { label: 'Oct', orders: 200 },
  { label: 'Nov', orders: 600 },
  { label: 'Dec', orders: 100 },
];

const yearlyData = [
  { label: '2018', orders: 4000 },
  { label: '2019', orders: 3500 },
  { label: '2020', orders: 5000 },
  { label: '2021', orders: 6000 },
  { label: '2022', orders: 4500 },
];

function OrdersLineChart() {
  const [filter, setFilter] = useState('monthly');

  const getData = () => {
    switch (filter) {
      case 'daily':
        return dailyData;
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return monthlyData;
      case 'yearly':
        return yearlyData;
      default:
        return monthlyData;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow w-full    md:w-[70%]">
      <h2 className="text-xl font-semibold mb-4">Orders ( {filter})</h2>
      <div className="mb-4 flex gap-2">
        {['Daily ', 'weekly', 'Monthly', 'Yearly'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1 rounded ${
              filter === type ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={getData()}>
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
    </div>
  );
}

export default OrdersLineChart;
