import React from "react";
import { useTokenBalance } from "../../hooks/useTokenBalance";
import { formatTokenAmount, formatUSD } from "../../utils/format";

const TokenBalance: React.FC = () => {
  const { balance, price, isLoading } = useTokenBalance();

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-1/4 mb-4" />
        <div className="h-12 bg-gray-700 rounded w-1/2" />
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Token Balance</h2>
          <p className="text-3xl font-bold text-white">
            {formatTokenAmount(balance)}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            ≈ {formatUSD(Number(balance) * price)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Token Price</p>
          <p className="text-lg font-bold text-white">{formatUSD(price)}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <button
          onClick={() => window.open("/trade", "_blank")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Trade
        </button>
        <button
          onClick={() => window.open("/stake", "_blank")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Stake
        </button>
      </div>
    </div>
  );
};

export default TokenBalance;
