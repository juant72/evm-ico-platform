import React, { useState } from "react";
import { NextPage } from "next";
import { utils } from "ethers";
import PageContainer from "../../components/PageContainer";
import { useStaking } from "../../hooks/useStaking";
import { formatTokenAmount, formatPercentage } from "../../utils/format";

const Staking: NextPage = () => {
  const { stakingData, stake, unstake, claimRewards, isLoading, error } =
    useStaking();

  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");

  const handleStake = async () => {
    if (!stakeAmount) return;
    await stake(utils.parseEther(stakeAmount));
    setStakeAmount("");
  };

  const handleUnstake = async () => {
    if (!unstakeAmount) return;
    await unstake(utils.parseEther(unstakeAmount));
    setUnstakeAmount("");
  };

  const handleClaimRewards = async () => {
    await claimRewards();
  };

  return (
    <PageContainer
      title="Token Staking"
      description="Stake your tokens to earn rewards"
      requiresAuth={true}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Staking Stats */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-medium text-gray-200">
                Total Staked
              </h3>
              <p className="text-3xl font-bold text-white">
                {isLoading
                  ? "..."
                  : formatTokenAmount(stakingData?.totalStaked)}
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-medium text-gray-200">Your Stake</h3>
              <p className="text-3xl font-bold text-white">
                {isLoading ? "..." : formatTokenAmount(stakingData?.userStake)}
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-medium text-gray-200">APR</h3>
              <p className="text-3xl font-bold text-white">
                {isLoading ? "..." : formatPercentage(stakingData?.apr)}
              </p>
            </div>
          </div>

          {/* Rewards Info */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Your Rewards</h2>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400">Pending Rewards</p>
                <p className="text-2xl font-bold text-white">
                  {isLoading
                    ? "..."
                    : formatTokenAmount(stakingData?.pendingRewards)}
                </p>
              </div>
              <button
                onClick={handleClaimRewards}
                disabled={isLoading || !stakingData?.pendingRewards?.gt(0)}
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Claim Rewards
              </button>
            </div>
          </div>
        </div>

        {/* Staking Actions */}
        <div className="space-y-6">
          {/* Stake Form */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Stake Tokens</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200">
                  Amount to Stake
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
                    placeholder="0.0"
                  />
                </div>
              </div>
              <button
                onClick={handleStake}
                disabled={isLoading || !stakeAmount}
                className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {isLoading ? "Processing..." : "Stake"}
              </button>
            </div>
          </div>

          {/* Unstake Form */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">
              Unstake Tokens
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200">
                  Amount to Unstake
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    value={unstakeAmount}
                    onChange={(e) => setUnstakeAmount(e.target.value)}
                    className="block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
                    placeholder="0.0"
                  />
                </div>
              </div>
              <button
                onClick={handleUnstake}
                disabled={isLoading || !unstakeAmount}
                className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {isLoading ? "Processing..." : "Unstake"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Staking;
