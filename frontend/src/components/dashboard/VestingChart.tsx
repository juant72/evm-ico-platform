import React, { useState, useEffect } from "react";
import Chart from "../common/Chart";
import { ChartData } from "chart.js";

/**
 * Displays a chart showing token vesting schedule over time
 */
const VestingChart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      generateVestingData();
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const generateVestingData = () => {
    // Generate next 12 months labels
    const labels = [];
    const now = new Date();
    const currentMonth = now.getMonth();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    for (let i = 0; i < 12; i++) {
      const month = (currentMonth + i) % 12;
      labels.push(monthNames[month]);
    }

    // Sample vesting schedule (cumulative tokens released)
    const vestingSchedule = [
      0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 10000,
    ];

    setChartData({
      labels,
      datasets: [
        {
          label: "Available Tokens",
          data: vestingSchedule,
          backgroundColor: "rgba(59, 130, 246, 0.7)",
          barPercentage: 0.6,
        },
      ],
    });
  };

  return (
    <div className="relative">
      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-400">Total Allocation</span>
              <p className="text-white font-medium">10,000 ENC</p>
            </div>
            <div>
              <span className="text-sm text-gray-400">Currently Available</span>
              <p className="text-white font-medium">1,000 ENC</p>
            </div>
          </div>

          <Chart
            type="bar"
            data={chartData}
            height={250}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  title: {
                    display: true,
                    text: "Tokens",
                    color: "#9ca3af",
                  },
                },
              },
            }}
          />

          <div className="mt-4 flex justify-between items-center">
            <div className="text-xs text-gray-400">
              Next release: <span className="text-blue-400">1,000 ENC</span> on{" "}
              <span className="text-blue-400">Apr 15</span>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm text-white transition-colors">
              Claim Available
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VestingChart;
