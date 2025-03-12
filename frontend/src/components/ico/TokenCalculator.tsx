import React, { useState, useEffect } from "react";
import { useIco } from "../../hooks/useIco";
import { formatTokenAmount, formatUSD } from "../../utils/format";

const TokenCalculator: React.FC = () => {
  const { currentPrice, calculateBonus } = useIco();
  const [investment, setInvestment] = useState("");
  const [result, setResult] = useState({
    baseTokens: 0,
    bonus: 0,
    total: 0,
    price: "0",
  });

  useEffect(() => {
    if (!investment || !currentPrice) {
      setResult({ baseTokens: 0, bonus: 0, total: 0, price: "0" });
      return;
    }

    const amount = Number(investment);
    const baseTokens = amount / currentPrice;
    const bonus = calculateBonus(baseTokens);
    const total = baseTokens + bonus;
    const price = (amount / total).toFixed(4);

    setResult({
      baseTokens,
      bonus,
      total,
      price,
    });
  }, [investment, currentPrice, calculateBonus]);

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-6">Token Calculator</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Investment Amount (USDT)
          </label>
          <input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
            placeholder="Enter amount..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Base Tokens</p>
            <p className="text-xl font-bold text-white">
              {formatTokenAmount(result.baseTokens)}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Bonus Tokens</p>
            <p className="text-xl font-bold text-green-400">
              +{formatTokenAmount(result.bonus)}
            </p>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-300">Total Tokens</p>
              <p className="text-2xl font-bold text-white">
                {formatTokenAmount(result.total)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-300">Price per Token</p>
              <p className="text-2xl font-bold text-white">
                {formatUSD(Number(result.price))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenCalculator;
