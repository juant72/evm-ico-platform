import React from "react";
import Link from "next/link";
import { useGovernance } from "../../hooks/useGovernance";
import { ProposalState } from "../../types/governance";
import { formatDate } from "../../utils/format";

const ProposalList: React.FC = () => {
  const { proposals, isLoading } = useGovernance();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700 animate-pulse"
          >
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-700 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {proposals.map((proposal) => (
        <Link key={proposal.id} href={`/governance/proposal/${proposal.id}`}>
          <a className="block bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium text-white">
                {proposal.title}
              </h3>
              <span
                className={`px-2 py-1 text-sm rounded-full ${
                  proposal.state === ProposalState.Active
                    ? "bg-green-900 text-green-200"
                    : proposal.state === ProposalState.Succeeded
                    ? "bg-blue-900 text-blue-200"
                    : proposal.state === ProposalState.Defeated
                    ? "bg-red-900 text-red-200"
                    : "bg-gray-900 text-gray-200"
                }`}
              >
                {proposal.state}
              </span>
            </div>

            <p className="text-gray-400 text-sm mb-4">
              {proposal.description.slice(0, 150)}...
            </p>

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>ID: {proposal.id}</span>
              <span>Created: {formatDate(proposal.createdAt)}</span>
              <span>{proposal.totalVotes.toString()} votes</span>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default ProposalList;
