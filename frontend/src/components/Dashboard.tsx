// src/components/Dashboard.tsx
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Equipo", "Preventa", "Liquidez", "Ecosistema"],
  datasets: [
    {
      label: "Distribución de Tokens",
      data: [15, 20, 30, 25],
      backgroundColor: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
    },
  ],
};

export default function Dashboard() {
  return (
    <div className="p-8">
      <Line data={data} />
    </div>
  );
}
