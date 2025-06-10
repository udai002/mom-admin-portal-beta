import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { saveAs } from "file-saver";
import Papa from "papaparse";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels
);

export default function RevenueLineChart() {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("monthly"); // daily, weekly, monthly

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint that returns time-series revenue data
        const res = await axios.get(`http://localhost:3000/api/revenue?range=${timeRange}`);
        
        if (res.data.success) {
          // Assuming the API returns data in format: { dates: string[], revenues: number[] }
          setChartData({
            labels: res.data.dates,
            datasets: [{
              label: 'Revenue',
              data: res.data.revenues,
              fill: true,
              backgroundColor: 'rgba(0, 169, 157, 0.1)',
              borderColor: '#00A99D',
              tension: 0.3,
              pointBackgroundColor: '#00A99D',
              pointBorderColor: '#fff',
              pointHoverRadius: 6,
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#00A99D',
              pointHoverBorderWidth: 2,
              pointRadius: 4,
              pointHitRadius: 10,
            }]
          });
        } else {
          throw new Error(res.data.message || 'Failed to fetch revenue data');
        }
      } catch (err) {
        console.error("Failed to fetch revenue data:", err);
        setError(err.response?.data?.message || err.message || 'Failed to load revenue data');
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, [timeRange]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        cornerRadius: 6,
        callbacks: {
          label: function(context) {
            return `₹${context.parsed.y.toLocaleString()}`;
          }
        }
      },
      datalabels: {
        display: false // Disable data labels by default to avoid clutter
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#666',
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: '#666',
          callback: function(value) {
            return `₹${value.toLocaleString()}`;
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    }
  };

  const exportCSV = () => {
    if (!chartData) return;
    
    const data = chartData.labels.map((label, index) => ({
      Date: label,
      Revenue: chartData.datasets[0].data[index]
    }));

    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `revenue-${timeRange}.csv`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A99D]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-[#00A99D] text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-auto rounded-lg bg-white p-6 shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Revenue Analytics</h2>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A99D] focus:border-transparent"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button
            onClick={exportCSV}
            className="px-3 py-1.5 bg-[#00A99D] text-white rounded-md text-sm hover:bg-[#00887b] transition-colors"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="h-80">
        {chartData && (
          <Line 
            ref={chartRef}
            data={chartData}
            options={chartOptions}
          />
        )}
      </div>
    </div>
  );
}