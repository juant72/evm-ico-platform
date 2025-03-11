// src/components/TokenWizard.tsx
import { useState } from "react";
import { useCreateToken } from "../context/TokenContext";

export default function TokenWizard() {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    totalSupply: 0,
    blockchain: "ethereum",
  });
  const createToken = useCreateToken();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <input
        type="text"
        placeholder="Nombre del token"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full p-4 mb-4 border rounded"
      />
      {/* Más campos para symbol, supply, blockchain */}
      <button
        onClick={() => createToken(formData)}
        className="bg-blue-500 text-white px-6 py-3 rounded"
      >
        Crear Token
      </button>
    </div>
  );
}
