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
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Tooltip,Legend,Filler,ChartDataLabels);
export default function PolarChart() {
  const chartRef = useRef(null);
  const [gradient, setGradient] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("this-month");
  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/api/rev?range=${range}`);
        if (Array.isArray(res.data?.data)) {
          setRevenueData(res.data.data);
        } else {
          console.error("Unexpected response:", res.data);
        }
      } catch (err) {
        console.error("Failed to fetch revenue:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRevenue();
  }, [range]);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = chartRef.current;
    const ctx = chart.canvas?.getContext("2d");
    if (!ctx) return;

    const gradientFill = ctx.createLinearGradient(0, 0, 0, chart.height);
    gradientFill.addColorStop(0, "rgba(0, 169, 157, 0.5)");
    gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.3)");
    setGradient(gradientFill);
  }, [chartRef.current]);

  const labels = revenueData.map((item) => item.label);
  const revenues = revenueData.map((item) => item.revenue);

  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: revenues,
        fill: true,
        backgroundColor: gradient || "rgba(0,169,157,0.3)",
        borderColor: "#00a99d",
        tension: 0.2,
        pointRadius: 3,
        pointBackgroundColor: "#00a99d",
        datalabels: {
          align: "top",
          anchor: "end",
          color: "#333",
          font: {
            weight: "bold",
            size: 12,
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
        position: "bottom",
        labels: {
          color: "#00a99d",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#00a99d",
        titleColor: "#ffffff",
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
        grid: { display: false },
        ticks: { color: "#00a99d" },
      },
      y: {
        grid: { color: "rgba(0,169,157,0.1)" },
        ticks: {
          color: "#00a99d",
          callback: (value) => value.toLocaleString(),
        },
      },
    },
  };

  const exportCSV = () => {
    const csv = Papa.unparse(
      revenueData.map(({ label, revenue }) => ({ Date: label, Revenue: revenue }))
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "revenue.csv");
  };

  const exportPDF = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    doc.text("Revenue Report", 14, 20);
    revenueData.forEach((item, index) => {
      doc.text(`${item.label}: ₹${item.revenue.toLocaleString()}`, 14, 30 + index * 10);
    });
    doc.save("revenue.pdf");
  };

  return (
    <div className="w-full h-auto rounded-lg bg-[#d5ece9] p-4 shadow-md transition-transform duration-300 hover:scale-[1.02]">
      <div className="flex justify-between items-center mb-4">
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700 shadow-sm focus:outline-none"
        >
          <option value="this-month">This Month (Daily)</option>
          <option value="12m">Last 12 Months</option>
          <option value="3y">Last 3 Years</option>
          <option value="all">All Time</option>
        </select>

        <div className="space-x-2">
          <button
            onClick={exportCSV}
            className="px-3 py-1 bg-[#00a99d] text-white rounded-md shadow-md hover:bg-[#00887b]"
          >
            Export CSV
          </button>
          <button
            onClick={exportPDF}
            className="px-3 py-1 bg-[#00a99d] text-white rounded-md shadow-md hover:bg-[#00887b]"
          >
            Export PDF
          </button>
        </div>
      </div>
      <div className="w-full h-80">
        {loading ? (
          <div className="text-center text-gray-600">Loading revenue chart...</div>
        ) : (
          <Line ref={chartRef} data={data} options={options} />
        )}
      </div>
    </div>
  );
}
