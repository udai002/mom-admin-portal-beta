import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const [deliveryData, setDeliveryData] = useState({ active: 0, inactive: 0 });

  useEffect(() => {
  const fetchDeliveryStatus = async () => {
    try {
      const response = await fetch("http://localhost:3000/delivery/status");
      const data = await response.json();
      console.log("Fetched data:", data);

      setDeliveryData({
        active: data.active || 0,
        inactive: data.inactive || 0,
      });
    } catch (error) {
      console.error("Failed to fetch delivery boy status:", error);
    }
  };

  fetchDeliveryStatus();
}, []);


  const data = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        label: "Delivery Boy Status",
        data: [deliveryData.active, deliveryData.inactive],
        backgroundColor: ["#00a99d", "#ffffff"],
        borderColor: ["#ffffff", "#00a99d"],
        borderWidth: 2,
      },
    ],
  };

  return <Pie data={data} />;
}
