import React from "react";
import { useWhitelist } from "../../hooks/useWhitelist";
import { formatTokenAmount } from "../../utils/format";

const WhitelistStatus: React.FC = () => {
  const { whitelistData, isLoading } = useWhitelist();

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-1/3 mb-4" />
        <div className="h-4 bg-gray-700 rounded w-full mb-2" />
      </div>
    );
  }

  if (!whitelistData?.isWhitelisted) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Whitelist Status</h2>
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
          <p className="text-red-300">
            Your address is not whitelisted for the ICO.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-6">Whitelist Status</h2>

      <div className="space-y-6">
        <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
          <p className="text-green-300">
            Your address is whitelisted - Tier {whitelistData.entry?.tier}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-400">Total Allocation</p>
            <p className="text-xl font-bold text-white">
              {formatTokenAmount(whitelistData.totalAllocated)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Purchased</p>
            <p className="text-xl font-bold text-white">
              {formatTokenAmount(whitelistData.totalPurchased)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Remaining</p>
            <p className="text-xl font-bold text-white">
              {formatTokenAmount(whitelistData.totalRemaining)}
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-2">Purchase Progress</p>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div
              className="bg-blue-600 rounded-full h-4"
              style={{
                width: `${
                  (Number(whitelistData.totalPurchased) /
                    Number(whitelistData.totalAllocated)) *
                  100
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhitelistStatus;
