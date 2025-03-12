import React from "react";
import { useGovernance } from "../../hooks/useGovernance";
import { ProposalState } from "../../types/governance";
import { formatAddress, formatDate } from "../../utils/format";
import VotingInterface from "./VotingInterface";

interface ProposalDetailsProps {
  proposalId: string;
}

const ProposalDetails: React.FC<ProposalDetailsProps> = ({ proposalId }) => {
  const { getProposal, getProposalState, isLoading } = useGovernance();
  const proposal = getProposal(proposalId);
  const state = getProposalState(proposalId);

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (!proposal) {
    return <div>Proposal not found</div>;
  }

  const getStateColor = (state: ProposalState) => {
    switch (state) {
      case ProposalState.Active:
        return "bg-green-900 text-green-200";
      case ProposalState.Succeeded:
        return "bg-blue-900 text-blue-200";
      case ProposalState.Defeated:
        return "bg-red-900 text-red-200";
      case ProposalState.Pending:
        return "bg-yellow-900 text-yellow-200";
      default:
        return "bg-gray-900 text-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Proposal Header */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {proposal.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>By {formatAddress(proposal.proposer)}</span>
              <span>Created {formatDate(proposal.createdAt)}</span>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm ${getStateColor(state)}`}
          >
            {state}
          </span>
        </div>
      </div>

      {/* Proposal Content */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="prose prose-invert max-w-none">
          {proposal.description}
        </div>
      </div>

      {/* Voting Stats */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Voting Results</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">For</span>
              <span className="text-green-400">
                {(
                  (Number(proposal.forVotes) / Number(proposal.totalVotes)) *
                  100
                ).toFixed(2)}
                %
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: `${
                    (Number(proposal.forVotes) / Number(proposal.totalVotes)) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Against</span>
              <span className="text-red-400">
                {(
                  (Number(proposal.againstVotes) /
                    Number(proposal.totalVotes)) *
                  100
                ).toFixed(2)}
                %
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{
                  width: `${
                    (Number(proposal.againstVotes) /
                      Number(proposal.totalVotes)) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Abstain</span>
              <span className="text-gray-400">
                {(
                  (Number(proposal.abstainVotes) /
                    Number(proposal.totalVotes)) *
                  100
                ).toFixed(2)}
                %
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gray-500 h-2 rounded-full"
                style={{
                  width: `${
                    (Number(proposal.abstainVotes) /
                      Number(proposal.totalVotes)) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Voting Interface */}
      {state === ProposalState.Active && (
        <VotingInterface proposalId={proposalId} />
      )}
    </div>
  );
};

export default ProposalDetails;
