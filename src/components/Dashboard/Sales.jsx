import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function SalesChart() {
  const chartRef = useRef(null);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/sales");
        if (Array.isArray(res.data?.data)) {
          setSalesData(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching sales data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  const labels = salesData.map((item) => item.month);
  const values = salesData.map((item) => item.sales);

  const data = {
    labels,
    datasets: [
      {
        label: "Sales (Orders)",
        data: values,
        borderColor: "#00a99d",
        backgroundColor: "rgba(0,169,157,0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#00a99d",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        borderWidth: 3,
        datalabels: {
          anchor: "end",
          align: "top",
          color: "#333",
          font: {
            size: 12,
            weight: "bold",
          },
          formatter: (value) => value.toLocaleString(),
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#00a99d",
          font: { size: 14, weight: "bold" },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#00a99d",
        titleColor: "#fff",
        bodyColor: "#d5ece9",
        cornerRadius: 8,
        padding: 12,
        displayColors: false,
      },
      datalabels: {
        display: true,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#333",
          font: { size: 13 },
        },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#333",
          font: { size: 13 },
          callback: (value) => value.toLocaleString(),
        },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
    },
  };

  return (
    <div className="w-full h-80 bg-[#d5ece9] p-4 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-[1.02] hover:shadow-xl">
      {loading ? (
        <p className="text-center text-gray-600">Loading sales chart...</p>
      ) : (
        <Line ref={chartRef} data={data} options={options} />
      )}
    </div>
  );
}
