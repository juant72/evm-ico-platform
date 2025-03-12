import React from "react";
import { useVesting } from "../../hooks/useVesting";
import { formatTokenAmount, formatDate } from "../../utils/format";

const VestingSchedule: React.FC = () => {
  const { vestingDetails, isLoading } = useVesting();

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-1/3 mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-700 rounded" />
          ))}
        </div>
      </div>
    );
  }

  const progress = (vestingDetails?.released / vestingDetails?.total) * 100;

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-6">Vesting Details</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Total Allocation</p>
            <p className="text-2xl font-bold text-white">
              {formatTokenAmount(vestingDetails?.total)}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Released</p>
            <p className="text-2xl font-bold text-green-400">
              {formatTokenAmount(vestingDetails?.released)}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Locked</p>
            <p className="text-2xl font-bold text-blue-400">
              {formatTokenAmount(vestingDetails?.locked)}
            </p>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Vesting Progress</span>
            <span className="text-white">{progress.toFixed(2)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Upcoming Releases</h3>
          {vestingDetails?.schedule.map((release) => (
            <div
              key={release.date}
              className="bg-gray-700 p-4 rounded-lg flex items-center justify-between"
            >
              <div>
                <p className="text-white font-medium">
                  {formatTokenAmount(release.amount)}
                </p>
                <p className="text-sm text-gray-400">
                  {formatDate(release.date)}
                </p>
              </div>
              <div className="text-sm text-gray-400">
                {release.cliffPeriod ? "Cliff Period" : "Linear Release"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VestingSchedule;
