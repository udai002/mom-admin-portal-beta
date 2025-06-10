import React, { useRef, useEffect, useState } from "react";
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

export default function PolarChart() {
  const chartRef = useRef(null);
  const [gradient, setGradient] = useState(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = chartRef.current;
    const ctx = chart.ctx;
    const gradientFill = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    gradientFill.addColorStop(0, "rgba(0, 169, 157, 0.5)");
    gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.3)");
    setGradient(gradientFill);
  }, []);

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Revenue",
        data: [100000, 250000, 200000, 300000, 500000],
        fill: true,
        backgroundColor: gradient || "rgba(0,169,157,0.3)",
        borderColor: "#00a99d",
        tension: 0, // Sharp edges
        pointRadius: 3,
        pointBackgroundColor: "#00a99d",
        datalabels: {
          align: 'top',
          anchor: 'end',
          color: '#333',
          font: {
            weight: 'bold',
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
        grid: {
          display: false,
        },
        ticks: {
          color: "#00a99d",
        },
      },
      y: {
        grid: {
          color: "rgba(0,169,157,0.1)",
        },
        ticks: {
          color: "#00a99d",
          stepSize: 100000,
        },
      },
    },
  };

  return (
    <div className="w-full h-80 rounded-lg cursor-pointer bg-[#d5ece9] p-4 shadow-md transform transition-transform duration-300 hover:scale-[1.04] hover:shadow-xl">
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
}
