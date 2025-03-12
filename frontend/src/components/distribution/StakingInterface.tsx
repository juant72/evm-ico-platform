import React, { useState, useEffect } from "react";
import { useDistribution } from "../../hooks/useDistribution";
import { formatTokenAmount, formatPercentage } from "../../utils/format";

const StakingInterface: React.FC = () => {
  const { getStakingInfo, stake, unstake, claimRewards, isLoading } =
    useDistribution();

  const [stakingInfo, setStakingInfo] = useState({
    stakedAmount: "0",
    rewardsEarned: "0",
    apr: 0,
    lockPeriod: 0,
    totalStaked: "0",
  });

  const [amount, setAmount] = useState("");
  const [action, setAction] = useState<"stake" | "unstake">("stake");

  useEffect(() => {
    const fetchStakingInfo = async () => {
      const info = await getStakingInfo();
      setStakingInfo(info);
    };
    fetchStakingInfo();
  }, [getStakingInfo]);

  const handleAction = async () => {
    try {
      if (action === "stake") {
        await stake(amount);
      } else {
        await unstake(amount);
      }
      setAmount("");
      // Refresh staking info
      const info = await getStakingInfo();
      setStakingInfo(info);
    } catch (error) {
      console.error(`Failed to ${action}:`, error);
    }
  };

  const handleClaimRewards = async () => {
    try {
      await claimRewards();
      // Refresh staking info
      const info = await getStakingInfo();
      setStakingInfo(info);
    } catch (error) {
      console.error("Failed to claim rewards:", error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-6">Staking</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Your Stake</p>
          <p className="text-2xl font-bold text-white">
            {formatTokenAmount(stakingInfo.stakedAmount)}
          </p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Rewards Earned</p>
          <p className="text-2xl font-bold text-green-400">
            {formatTokenAmount(stakingInfo.rewardsEarned)}
          </p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Current APR</p>
          <p className="text-2xl font-bold text-blue-400">
            {formatPercentage(stakingInfo.apr)}%
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setAction("stake")}
            className={`flex-1 py-2 px-4 rounded-lg ${
              action === "stake"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Stake
          </button>
          <button
            onClick={() => setAction("unstake")}
            className={`flex-1 py-2 px-4 rounded-lg ${
              action === "unstake"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Unstake
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
            placeholder={`Enter amount to ${action}...`}
          />
        </div>

        <button
          onClick={handleAction}
          disabled={isLoading || !amount}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading
            ? "Processing..."
            : action === "stake"
            ? "Stake Tokens"
            : "Unstake Tokens"}
        </button>

        {Number(stakingInfo.rewardsEarned) > 0 && (
          <button
            onClick={handleClaimRewards}
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Claim Rewards"}
          </button>
        )}
      </div>
    </div>
  );
};

export default StakingInterface;
