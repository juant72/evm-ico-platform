import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import PageContainer from "../../components/PageContainer";
import { useDistribution } from "../../hooks/useDistribution";
import { formatTokenAmount } from "../../utils/format";

const Distribution: NextPage = () => {
  const { distributionStats, isLoading } = useDistribution();

  return (
    <PageContainer
      title="Token Distribution"
      description="Manage your token distribution and rewards"
      requiresAuth={true}
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-200">
              Total Distributed
            </h3>
            <p className="text-3xl font-bold text-white">
              {isLoading
                ? "..."
                : formatTokenAmount(distributionStats?.totalDistributed)}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-200">Your Claims</h3>
            <p className="text-3xl font-bold text-white">
              {isLoading
                ? "..."
                : formatTokenAmount(distributionStats?.userClaims)}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-200">
              Available to Claim
            </h3>
            <p className="text-3xl font-bold text-white">
              {isLoading
                ? "..."
                : formatTokenAmount(distributionStats?.claimable)}
            </p>
          </div>
        </div>

        {/* Distribution Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/distribution/airdrop">
            <a className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:bg-gray-700 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Airdrop</h3>
              <p className="text-gray-300">Claim your airdropped tokens</p>
              {distributionStats?.hasAirdrop && (
                <span className="mt-2 inline-block px-2 py-1 bg-green-900 text-green-200 rounded-full text-sm">
                  Available
                </span>
              )}
            </a>
          </Link>

          <Link href="/distribution/staking">
            <a className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:bg-gray-700 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Staking</h3>
              <p className="text-gray-300">Stake tokens to earn rewards</p>
              <div className="mt-2 text-sm text-gray-400">
                APR: {distributionStats?.stakingApr || 0}%
              </div>
            </a>
          </Link>

          <Link href="/distribution/rewards">
            <a className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:bg-gray-700 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Rewards</h3>
              <p className="text-gray-300">View and claim your rewards</p>
              {distributionStats?.pendingRewards?.gt(0) && (
                <span className="mt-2 inline-block px-2 py-1 bg-yellow-900 text-yellow-200 rounded-full text-sm">
                  Pending Rewards
                </span>
              )}
            </a>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};

export default Distribution;
