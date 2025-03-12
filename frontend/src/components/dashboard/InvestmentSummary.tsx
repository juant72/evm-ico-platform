import React from "react";
import { useInvestment } from "../../hooks/useInvestment";
import { formatTokenAmount, formatUSD } from "../../utils/format";

const InvestmentSummary: React.FC = () => {
  const { investmentStats, isLoading } = useInvestment();

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-1/3 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-700 rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-6">Investment Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Total Invested</p>
          <p className="text-2xl font-bold text-white">
            {formatUSD(investmentStats.totalInvested)}
          </p>
          <p
            className={`text-sm ${
              investmentStats.roi >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            ROI: {investmentStats.roi > 0 ? "+" : ""}
            {investmentStats.roi}%
          </p>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Tokens Purchased</p>
          <p className="text-2xl font-bold text-white">
            {formatTokenAmount(investmentStats.tokensPurchased)}
          </p>
          <p className="text-sm text-gray-400">
            Avg. Price: {formatUSD(investmentStats.averagePrice)}
          </p>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Current Value</p>
          <p className="text-2xl font-bold text-white">
            {formatUSD(investmentStats.currentValue)}
          </p>
          <p
            className={`text-sm ${
              investmentStats.priceChange >= 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            24h: {investmentStats.priceChange > 0 ? "+" : ""}
            {investmentStats.priceChange}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentSummary;
