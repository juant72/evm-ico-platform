import React from "react";
import { TIER_BENEFITS } from "../../constants/ico";

const TierSystem: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-6">Investment Tiers</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {TIER_BENEFITS.map((tier) => (
          <div
            key={tier.name}
            className={`
              relative overflow-hidden rounded-lg border
              ${
                tier.highlighted
                  ? "bg-blue-900/20 border-blue-500"
                  : "bg-gray-700 border-gray-600"
              }
            `}
          >
            {tier.highlighted && (
              <div className="absolute top-0 right-0">
                <div className="bg-blue-500 text-white text-xs px-2 py-1 transform rotate-45 translate-x-2 -translate-y-1">
                  Popular
                </div>
              </div>
            )}

            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-3xl font-bold text-white mb-4">
                {tier.minInvestment}
                <span className="text-sm text-gray-400"> USDT</span>
              </p>

              <ul className="space-y-3">
                {tier.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <svg
                      className="h-5 w-5 text-green-400 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TierSystem;
