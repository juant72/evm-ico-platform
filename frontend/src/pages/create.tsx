import { useState } from "react";
import { useContract, useDeployContract } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import Header from "../components/Header";

export default function Create() {
  const [step, setStep] = useState(1);
  const [tokenData, setTokenData] = useState({
    name: "",
    symbol: "",
    totalSupply: 0,
    vesting: {
      cliff: 0,
      duration: 0,
    },
  });

  const deployContract = async () => {
    try {
      const { contract } = await useDeployContract(
        "0xTuWallet",
        "MyToken",
        tokenData.name,
        tokenData.symbol,
        tokenData.totalSupply
      );
      console.log("Contrato desplegado en:", contract?.getAddress());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto p-8">
        {/* Pasos */}
        <div className="flex justify-center mb-8 space-x-4">
          {/* ... (código similar al anterior) */}
        </div>

        {/* Formulario */}
        {step === 1 && (
          <div>
            <input
              type="text"
              placeholder="Nombre del token"
              value={tokenData.name}
              onChange={(e) =>
                setTokenData({ ...tokenData, name: e.target.value })
              }
              className="w-full p-4 mb-4 border rounded"
            />
            {/* Más campos */}
          </div>
        )}

        <button
          onClick={deployContract}
          className="bg-blue-600 text-white px-6 py-3 rounded mt-8"
        >
          Crear Token
        </button>
      </div>
    </div>
  );
}
