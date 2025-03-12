import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import { ALLOCATION_DATA } from "../../constants/tokenomics";

const TokenAllocation: React.FC = () => {
  const colorScheme = [
    "#3B82F6", // blue-500
    "#10B981", // emerald-500
    "#F59E0B", // amber-500
    "#EF4444", // red-500
    "#8B5CF6", // violet-500
    "#EC4899", // pink-500
    "#14B8A6", // teal-500
    "#F97316", // orange-500
  ];

  const data = ALLOCATION_DATA.map((item, index) => ({
    ...item,
    color: colorScheme[index % colorScheme.length],
  }));

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-6">Token Allocation</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <PieChart
            data={data}
            lineWidth={60}
            paddingAngle={2}
            rounded
            label={({ dataEntry }) => `${dataEntry.percentage}%`}
            labelStyle={{
              fontSize: "4px",
              fill: "#fff",
            }}
            labelPosition={75}
          />
        </div>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.title} className="flex items-center">
              <div
                className="w-4 h-4 rounded-full mr-3"
                style={{ backgroundColor: item.color }}
              />
              <div>
                <p className="text-white font-medium">{item.title}</p>
                <p className="text-gray-400 text-sm">
                  {item.percentage}% - {item.amount.toLocaleString()} tokens
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenAllocation;
