import React from "react";
import { useGovernance } from "../../hooks/useGovernance";
import { formatNumber } from "../../utils/format";

const GovernanceStats: React.FC = () => {
  const { governanceStats, isLoading } = useGovernance();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-4" />
            <div className="h-8 bg-gray-700 rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-sm font-medium text-gray-400">Total Proposals</h3>
        <p className="text-3xl font-bold text-white mt-2">
          {formatNumber(governanceStats?.totalProposals || 0)}
        </p>
        <div className="mt-4 flex justify-between text-sm">
          <span className="text-green-400">
            {governanceStats?.passRate || 0}% Pass Rate
          </span>
          <span className="text-gray-400">
            {governanceStats?.activeProposals || 0} Active
          </span>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-sm font-medium text-gray-400">Total Votes Cast</h3>
        <p className="text-3xl font-bold text-white mt-2">
          {formatNumber(governanceStats?.totalVotes || 0)}
        </p>
        <div className="mt-4 flex justify-between text-sm">
          <span className="text-blue-400">
            {governanceStats?.voterParticipation || 0}% Participation
          </span>
          <span className="text-gray-400">
            {governanceStats?.uniqueVoters || 0} Voters
          </span>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-sm font-medium text-gray-400">
          Token Distribution
        </h3>
        <p className="text-3xl font-bold text-white mt-2">
          {formatNumber(governanceStats?.totalDelegated || 0)}
        </p>
        <div className="mt-4 flex justify-between text-sm">
          <span className="text-purple-400">
            {governanceStats?.delegationRate || 0}% Delegated
          </span>
          <span className="text-gray-400">
            {governanceStats?.activeDelegates || 0} Delegates
          </span>
        </div>
      </div>
    </div>
  );
};

export default GovernanceStats;
