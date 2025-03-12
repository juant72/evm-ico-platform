import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import PageContainer from "../../components/PageContainer";
import { useGovernance } from "../../hooks/useGovernance";

const GovernanceIndex: NextPage = () => {
  const { governanceStats, isLoading } = useGovernance();

  return (
    <PageContainer
      title="Governance"
      description="Participate in platform governance"
      requiresAuth={true}
    >
      <div className="grid gap-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-200">
              Active Proposals
            </h3>
            <p className="text-3xl font-bold text-white">
              {isLoading ? "..." : governanceStats?.activeProposals || 0}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-200">
              Total Votes Cast
            </h3>
            <p className="text-3xl font-bold text-white">
              {isLoading ? "..." : governanceStats?.totalVotes || 0}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-200">
              Participation Rate
            </h3>
            <p className="text-3xl font-bold text-white">
              {isLoading
                ? "..."
                : `${governanceStats?.participationRate || 0}%`}
            </p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/governance/proposals">
            <a className="block bg-gray-800 rounded-lg p-6 border border-gray-700 hover:bg-gray-700 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">
                View Proposals
              </h3>
              <p className="text-gray-300">
                Browse and vote on active proposals
              </p>
            </a>
          </Link>
          <Link href="/governance/create">
            <a className="block bg-gray-800 rounded-lg p-6 border border-gray-700 hover:bg-gray-700 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">
                Create Proposal
              </h3>
              <p className="text-gray-300">Submit a new governance proposal</p>
            </a>
          </Link>
          <Link href="/governance/delegate">
            <a className="block bg-gray-800 rounded-lg p-6 border border-gray-700 hover:bg-gray-700 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">
                Delegate Votes
              </h3>
              <p className="text-gray-300">Delegate your voting power</p>
            </a>
          </Link>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-2">
              Your Voting Power
            </h3>
            <p className="text-3xl font-bold text-white mb-2">
              {isLoading ? "..." : governanceStats?.userVotingPower || "0"}
            </p>
            <p className="text-gray-300">Tokens available for voting</p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default GovernanceIndex;
