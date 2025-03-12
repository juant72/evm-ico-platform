import React, { useState, useEffect } from "react";
import Card from "../common/Card";

interface VestingStage {
  date: Date;
  amount: number;
  status: "claimed" | "upcoming" | "claimable";
  percentage: number;
}

/**
 * Displays the user's token vesting schedule and unlocking stages
 */
const VestingSchedule = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [vestingStages, setVestingStages] = useState<VestingStage[]>([]);
  const [totalTokens, setTotalTokens] = useState(0);
  const [claimedTokens, setClaimedTokens] = useState(0);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      generateVestingData();
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const generateVestingData = () => {
    const total = 10000;
    setTotalTokens(total);

    const now = new Date();
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(now.getMonth() - 2);

    const nextMonth = new Date();
    nextMonth.setMonth(now.getMonth() + 1);

    const twoMonths = new Date();
    twoMonths.setMonth(now.getMonth() + 2);

    const fourMonths = new Date();
    fourMonths.setMonth(now.getMonth() + 4);

    const sixMonths = new Date();
    sixMonths.setMonth(now.getMonth() + 6);

    const stages: VestingStage[] = [
      {
        date: twoMonthsAgo,
        amount: total * 0.2, // 20%
        status: "claimed",
        percentage: 20,
      },
      {
        date: now,
        amount: total * 0.3, // 30%
        status: "claimable",
        percentage: 30,
      },
      {
        date: nextMonth,
        amount: total * 0.1, // 10%
        status: "upcoming",
        percentage: 10,
      },
      {
        date: twoMonths,
        amount: total * 0.1, // 10%
        status: "upcoming",
        percentage: 10,
      },
      {
        date: fourMonths,
        amount: total * 0.1, // 10%
        status: "upcoming",
        percentage: 10,
      },
      {
        date: sixMonths,
        amount: total * 0.2, // 20%
        status: "upcoming",
        percentage: 20,
      },
    ];

    setVestingStages(stages);
    setClaimedTokens(total * 0.2); // 20% already claimed
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const claimTokens = () => {
    alert(
      "Claiming tokens... This would trigger a blockchain transaction in production."
    );
  };

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gray-900 p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400">Total Allocation</p>
            <p className="text-xl font-bold text-white">
              {totalTokens.toLocaleString()} ENC
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Claimed</p>
            <p className="text-xl font-bold text-white">
              {claimedTokens.toLocaleString()} ENC (
              {Math.round((claimedTokens / totalTokens) * 100)}%)
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600"
            style={{ width: `${(claimedTokens / totalTokens) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-4 mb-4">
        {vestingStages.map((stage, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                {stage.status === "claimed" && (
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                )}
                {stage.status === "claimable" && (
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                )}
                {stage.status === "upcoming" && (
                  <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                )}
                <h3 className="text-white font-medium">
                  {stage.status === "claimed"
                    ? "Claimed"
                    : stage.status === "claimable"
                    ? "Ready to Claim"
                    : "Upcoming Release"}
                </h3>
              </div>
              <span className="text-sm text-gray-400">
                {formatDate(stage.date)}
              </span>
            </div>
            <p className="text-lg font-bold text-white mb-1">
              {stage.amount.toLocaleString()} ENC ({stage.percentage}%)
            </p>

            {stage.status === "claimable" && (
              <button
                onClick={claimTokens}
                className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900"
              >
                Claim Tokens
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-400 uppercase mb-2">
          Vesting Schedule
        </h3>
        <div className="bg-gray-900 p-4 rounded-lg">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Start: {formatDate(vestingStages[0].date)}</span>
            <span>
              End: {formatDate(vestingStages[vestingStages.length - 1].date)}
            </span>
          </div>

          <div className="relative h-2 bg-gray-800 rounded-full mb-4">
            {vestingStages.map((stage, index) => {
              // Calculate position as percentage
              const startPosition = vestingStages
                .slice(0, index)
                .reduce((sum, s) => sum + s.percentage, 0);

              return (
                <div
                  key={index}
                  className={`absolute h-full ${
                    stage.status === "claimed"
                      ? "bg-green-500"
                      : stage.status === "claimable"
                      ? "bg-blue-500"
                      : "bg-gray-600"
                  }`}
                  style={{
                    left: `${startPosition}%`,
                    width: `${stage.percentage}%`,
                  }}
                ></div>
              );
            })}
          </div>

          <div className="flex text-xs">
            <div className="flex items-center mr-4">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
              <span className="text-gray-400">Claimed</span>
            </div>
            <div className="flex items-center mr-4">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
              <span className="text-gray-400">Claimable</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-gray-600 mr-1"></div>
              <span className="text-gray-400">Upcoming</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VestingSchedule;
