import { useContract, useContractRead } from "@thirdweb-dev/react";
import { Line } from "react-chartjs-2";
import Header from "../components/Header";

export default function Dashboard() {
  const { contract } = useContract("0xTuContrato");
  const { data: totalSupply } = useContractRead(contract, "totalSupply");

  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
        <p>Total Supply: {totalSupply?.toString()}</p>
        {/* Gráficos */}
      </div>
    </div>
  );
}
