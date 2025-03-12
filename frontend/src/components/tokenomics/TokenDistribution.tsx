import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DISTRIBUTION_SCHEDULE } from "../../constants/tokenomics";

const TokenDistribution: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-6">
        Token Distribution Schedule
      </h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={DISTRIBUTION_SCHEDULE}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="month"
              stroke="#9CA3AF"
              tick={{ fill: "#9CA3AF" }}
            />
            <YAxis
              stroke="#9CA3AF"
              tick={{ fill: "#9CA3AF" }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #374151",
                borderRadius: "0.375rem",
              }}
              labelStyle={{ color: "#9CA3AF" }}
              itemStyle={{ color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="circulating"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
              name="Circulating Supply"
            />
            <Line
              type="monotone"
              dataKey="locked"
              stroke="#EF4444"
              strokeWidth={2}
              dot={false}
              name="Locked Supply"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {DISTRIBUTION_SCHEDULE.slice(-1)[0].highlights.map((highlight) => (
          <div
            key={highlight.label}
            className="bg-gray-700 rounded-lg p-4 border border-gray-600"
          >
            <p className="text-gray-300 text-sm">{highlight.label}</p>
            <p className="text-2xl font-bold text-white">{highlight.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenDistribution;
