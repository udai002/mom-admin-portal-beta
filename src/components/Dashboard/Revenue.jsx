import React, { useRef, useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
ChartJS.register(RadialLinearScale,PointElement,LineElement,Filler,Tooltip,Legend);
export default function RadarChart(){
    const chartRef = useRef(null);
      const [gradient, setGradient] = useState(null);
    
      useEffect(() => {
        if (!chartRef.current) return;
        const ctx = chartRef.current.ctx;
        const gradientFill = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
        gradientFill.addColorStop(0, "rgba(255, 255, 255, 0.6)");
        gradientFill.addColorStop(1, "rgba(213, 236, 233, 0.3)");
        setGradient(gradientFill);
      }, []);
    
    const data={
        labels:["Jan", "Feb", "Mar", "Apr", "May"],
        datasets:[
            {
                label:"Revenue ",
                data:[100000,250000,200000,300000,500000],
                backgroundColor:"#d5ece9",
                // backgroundColor: gradient || "rgba(255, 255, 255, 0.3)",
                fill: true,
                tension: 0.3,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: "#ffffff",
                pointBorderColor: "#00a99d",
                pointBorderWidth: 2,
                pointHoverBackgroundColor: "#00a99d",
                pointHoverBorderColor: "#ffffff",
                borderWidth: 3,
                hoverBorderWidth: 4,
            },
        ],
    };
     const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1200,
          easing: "easeOutQuart",
        },
        plugins: {
          legend: {
            labels: {
              color: "#00a99d",
              font: { size: 16, weight: "bold" },
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
            mode: "nearest",
            intersect: false,
            animation: {
              duration: 300,
              easing: "easeOutQuart",
            },
          },
        },
        interaction: {
          mode: "nearest",
          intersect: false,
        },
        scales: {
          x: {
            ticks: {
              color: "#000000",
              font: { size: 14 },
            },
            grid: {
              display: false,
              color:"#00a99d"
            },
          },
          y: {
            ticks: {
              color: "#000000",
              font: { size: 14 },
            },
            grid: {
            //   color: "rgba(213, 236, 233, 0.3)",
            color:"#00a99d",
            },
            beginAtZero: true,
          },
        },
      };
    
      return (
        <div
          className="w-full h-80 rounded-lg cursor-pointer bg-[#d5ece9] p-4 shadow-md transform transition-transform duration-300 hover:scale-[1.04] hover:shadow-xl"
        >
          <Radar ref={chartRef} data={data} options={options} />
        </div>
      );
    
}