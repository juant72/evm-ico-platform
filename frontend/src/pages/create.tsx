// pages/create.tsx
import { useState } from "react";
import { useContract, useCreateToken } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

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

  // Función para crear el token (usa Thirdweb SDK)
  const createToken = async () => {
    // Lógica para desplegar el contrato
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Pasos del Wizard */}
      <div className="flex justify-center mb-8 space-x-4">
        <div
          className={`step ${step === 1 ? "active" : ""}`}
          onClick={() => setStep(1)}
        >
          1. Detalles del Token
        </div>
        <div
          className={`step ${step === 2 ? "active" : ""}`}
          onClick={() => setStep(2)}
        >
          2. Vesting
        </div>
        <div
          className={`step ${step === 3 ? "active" : ""}`}
          onClick={() => setStep(3)}
        >
          3. Confirmar
        </div>
      </div>

      {/* Contenido del Paso */}
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
          {/* Más campos para symbol, supply, etc */}
        </div>
      )}

      <button
        onClick={createToken}
        className="bg-blue-600 text-white px-6 py-3 rounded mt-8"
      >
        Crear Token
      </button>
    </div>
  );
}
