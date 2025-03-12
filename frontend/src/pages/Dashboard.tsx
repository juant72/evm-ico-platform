// src/components/Dashboard.tsx
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,// pages/dashboard.tsx
  import { useContract, useContractRead } from "@thirdweb-dev/react";
  import { Line } from "react-chartjs-2";
  
  export default function Dashboard() {
    const { contract } = useContract("TU_CONTRATO_ADDRESS");
    const { data: totalSupply } = useContractRead(contract, "totalSupply");
  
    const tokenDistributionData = {
      labels: ["Equipo", "Preventa", "Liquidez", "Ecosistema"],
      datasets: [
        {
          label: "Distribución",
          data: [15, 20, 30, 25],
          backgroundColor: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
        },
      ],
    };
  
    return (
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
  
        {/* Token Supply */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4">Total Supply</h3>
          <p className="text-2xl">{totalSupply?.toString()}</p>
        </div>
  
        {/* Gráfico de Distribución */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Line data={tokenDistributionData} />
        </div>
      </div>
    );
  }
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Equipo", "Preventa", "Liquidez", "Ecosistema"],
  datasets: [
    {
      label: "Distribución de Tokens",
      data: [15, 20, 30, 25],
      backgroundColor: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
      borderColor: "#4ECDC4",
      tension: 0.1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Distribución de Tokens",
    },
  },
};

export default function Dashboard() {
  return (
    <div className="p-8">
      <Line data={data} options={options} />
    </div>
  );
}
