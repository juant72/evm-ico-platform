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
  LineElement,
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
