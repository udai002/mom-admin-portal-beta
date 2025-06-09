    import { Pie } from "react-chartjs-2";
    import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    } from "chart.js";

    ChartJS.register(ArcElement, Tooltip, Legend);

    export default function PieChart() {
   const data = {
  labels: ["Active", "Inactive"],
  datasets: [
    {
      label: "DeliveryBoy Status",
      data: [60, 25],
      backgroundColor: ["#00a99d", "#ffffff"], 
      borderColor: ["#ffffff", "#00a99d"],      
      borderWidth: 2,
    },
  ],
};


    return <Pie data={data}/>;
    }
