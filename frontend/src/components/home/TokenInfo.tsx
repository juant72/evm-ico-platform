import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * Token information component displaying token details and distribution
 */
const TokenInfo = () => {
  // Token distribution data for the chart
  const distributionData = {
    labels: [
      "Team",
      "Private Sale",
      "Public Sale",
      "Liquidity",
      "Marketing",
      "Ecosystem",
    ],
    datasets: [
      {
        data: [15, 10, 20, 25, 10, 20],
        backgroundColor: [
          "#3b82f6", // blue
          "#ef4444", // red
          "#10b981", // green
          "#f59e0b", // amber
          "#8b5cf6", // purple
          "#06b6d4", // cyan
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "60%",
    responsive: true,
    maintainAspectRatio: false,
  };

  // Token metrics
  const tokenMetrics = [
    { name: "Token Name", value: "ENCRYP" },
    { name: "Total Supply", value: "100,000,000" },
    { name: "Initial Market Cap", value: "$1,200,000" },
    { name: "Initial Token Price", value: "$0.012" },
    { name: "Blockchain", value: "Ethereum (ERC-20)" },
  ];

  // Token use cases
  const useCases = [
    {
      title: "Governance",
      description: "Vote on protocol decisions and parameter changes",
      icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
    },
    {
      title: "Staking",
      description: "Stake tokens to earn passive rewards",
      icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4",
    },
    {
      title: "Fee Discounts",
      description: "Reduced transaction fees on the platform",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      title: "Access to Premium Features",
      description: "Unlock advanced platform capabilities",
      icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
    },
  ];

  return (
    <div className="bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Token Information
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            Everything you need to know about our token, its distribution, and
            utility within our ecosystem.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Token Distribution Chart */}
          <div className="mb-12 lg:mb-0">
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg h-full">
              <h3 className="text-xl font-bold text-white mb-6">
                Token Distribution
              </h3>

              <div className="h-80 relative">
                <Doughnut data={distributionData} options={chartOptions} />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-8">
                {distributionData.labels.map((label, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-4 h-4 rounded-full mr-2"
                      style={{
                        backgroundColor:
                          distributionData.datasets[0].backgroundColor[index],
                      }}
                    ></div>
                    <span className="text-sm text-gray-300">
                      {label} ({distributionData.datasets[0].data[index]}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Token Details */}
          <div>
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg mb-8">
              <h3 className="text-xl font-bold text-white mb-6">
                Token Metrics
              </h3>

              <div className="space-y-4">
                {tokenMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b border-gray-700 pb-2"
                  >
                    <span className="text-gray-400">{metric.name}</span>
                    <span className="text-white font-medium">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-6">
                Token Utility
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {useCases.map((useCase, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={useCase.icon}
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-white">
                        {useCase.title}
                      </h4>
                      <p className="mt-1 text-sm text-gray-400">
                        {useCase.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;
