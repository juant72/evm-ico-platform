import React from "react";
import { TOKEN_METRICS } from "../../constants/tokenomics";
import { formatTokenAmount, formatUSD } from "../../utils/format";

const TokenMetrics: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-6">Token Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOKEN_METRICS.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <p className="text-gray-400 text-sm">{metric.label}</p>
            <p className="text-2xl font-bold text-white">
              {metric.type === "token"
                ? formatTokenAmount(metric.value)
                : metric.type === "usd"
                ? formatUSD(metric.value)
                : metric.type === "percentage"
                ? `${metric.value}%`
                : metric.value}
            </p>
            {metric.change && (
              <p
                className={`text-sm ${
                  metric.change > 0
                    ? "text-green-400"
                    : metric.change < 0
                    ? "text-red-400"
                    : "text-gray-400"
                }`}
              >
                {metric.change > 0 ? "+" : ""}
                {metric.change}%
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenMetrics;
