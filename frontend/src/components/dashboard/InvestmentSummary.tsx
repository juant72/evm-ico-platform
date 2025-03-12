import React, { useState, useEffect } from "react";
import Card from "../common/Card";
import Chart from "../common/Chart";
import { ChartData } from "chart.js";

/**
 * Displays a summary of the user's ICO investments with chart
 */
const InvestmentSummary = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [timeFrame, setTimeFrame] = useState("1M"); // 1W, 1M, 3M, 1Y, ALL

  // Mock data for the chart
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [
      {
        label: "Token Value (USD)",
        data: [],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    // Simulate loading investment data
    const timer = setTimeout(() => {
      generateChartData(timeFrame);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeFrame]);

  const generateChartData = (period: string) => {
    let labels: string[] = [];
    let values: number[] = [];
    const now = new Date();

    switch (period) {
      case "1W":
        // Generate daily data points for 7 days
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(now.getDate() - i);
          labels.push(
            date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
          );
          // Random value between 0.1 and 0.2 with some trend
          values.push(0.12 + Math.random() * 0.02 + i * 0.003);
        }
        break;
      case "1M":
        // Generate 30 days of data
        for (let i = 29; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(now.getDate() - i);
          if (i % 5 === 0) {
            // Show every 5th label
            labels.push(
              date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            );
          } else {
            labels.push("");
          }
          // Random value between 0.1 and 0.2 with upward trend
          values.push(0.1 + Math.random() * 0.02 + i * 0.002);
        }
        break;
      case "3M":
        // Generate 12 weekly data points for 3 months
        for (let i = 11; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(now.getDate() - i * 7);
          labels.push(
            date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
          );
          // Random value with trend
          values.push(0.08 + Math.random() * 0.03 + i * 0.008);
        }
        break;
      default:
        // Default 1M data
        for (let i = 29; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(now.getDate() - i);
          if (i % 5 === 0) {
            labels.push(
              date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            );
          } else {
            labels.push("");
          }
          values.push(0.1 + Math.random() * 0.02 + i * 0.002);
        }
    }

    setChartData({
      labels,
      datasets: [
        {
          label: "Token Value (USD)",
          data: values,
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    });
  };

  return (
    <Card className="h-full">
      <div className={`${isLoading ? "opacity-50" : ""}`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">
            Investment Performance
          </h3>
          <div className="flex space-x-1 bg-gray-700 rounded-md p-1">
            {["1W", "1M", "3M", "1Y", "ALL"].map((period) => (
              <button
                key={period}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  timeFrame === period
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-600"
                }`}
                onClick={() => setTimeFrame(period)}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <>
            <div className="h-64">
              <Chart
                type="line"
                data={chartData}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      beginAtZero: false,
                      ticks: {
                        callback: function (value: number | string): string {
                          return "$" + value;
                        },
                      },
                    },
                  },
                }}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-gray-700 rounded-lg p-3">
                <p className="text-xs text-gray-400">Total Invested</p>
                <p className="text-lg font-semibold text-white">$1,250.00</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-3">
                <p className="text-xs text-gray-400">Current Value</p>
                <p className="text-lg font-semibold text-white">$1,378.50</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-3">
                <p className="text-xs text-gray-400">ROI</p>
                <p className="text-lg font-semibold text-green-400">+10.28%</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-3">
                <p className="text-xs text-gray-400">Realized</p>
                <p className="text-lg font-semibold text-white">$0.00</p>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default InvestmentSummary;
