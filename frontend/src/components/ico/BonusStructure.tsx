import React from "react";
import { useMemo } from "react";
import { BONUS_TIERS } from "../../constants/ico";

interface BonusBreakdown {
  minAmount: number;
  maxAmount: number | null;
  percentage: number;
}

const BonusStructure: React.FC = () => {
  const bonusBreakdown = useMemo<BonusBreakdown[]>(() => BONUS_TIERS, []);

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4">Bonus Structure</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bonusBreakdown.map((tier, index) => (
          <div
            key={index}
            className="bg-gray-700 p-4 rounded-lg border border-gray-600"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">
                {tier.minAmount.toLocaleString()} -{" "}
                {tier.maxAmount ? tier.maxAmount.toLocaleString() : "∞"} Tokens
              </span>
              <span className="text-green-400 font-bold">
                +{tier.percentage}%
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${tier.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BonusStructure;
