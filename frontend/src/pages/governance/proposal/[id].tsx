import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useGovernance } from "../../../hooks/useGovernance";
import PageContainer from "../../../components/PageContainer";
import { VoteType } from "../../../types/proposal";
import { formatAddress } from "../../../utils/format";

const ProposalDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    getProposal,
    castVote,
    executeProposal,
    queueProposal,
    getProposalState,
    hasVoted,
    getUserVote,
    isLoading,
    error,
  } = useGovernance();
  const [proposal, setProposal] = useState(null);
  const [userVoteStatus, setUserVoteStatus] = useState<{
    hasVoted: boolean;
    vote: VoteType | null;
  }>({
    hasVoted: false,
    vote: null,
  });

  useEffect(() => {
    const loadProposal = async () => {
      if (id) {
        const proposalData = await getProposal(id);
        setProposal(proposalData);

        if (proposalData) {
          const voted = await hasVoted(id);
          if (voted) {
            const vote = await getUserVote(id);
            setUserVoteStatus({ hasVoted: true, vote });
          } else {
            setUserVoteStatus({ hasVoted: false, vote: null });
          }
        }
      }
    };

    loadProposal();
  }, [id, getProposal, hasVoted, getUserVote]);

  const handleVote = async (support: VoteType) => {
    try {
      await castVote(id, support);
      setUserVoteStatus({ hasVoted: true, vote: support });
    } catch (error) {
      console.error("Failed to cast vote:", error);
    }
  };

  const handleQueue = async () => {
    try {
      await queueProposal(id);
    } catch (error) {
      console.error("Failed to queue proposal:", error);
    }
  };

  const handleExecute = async () => {
    try {
      await executeProposal(id);
    } catch (error) {
      console.error("Failed to execute proposal:", error);
    }
  };

  if (!proposal && !isLoading) {
    return (
      <PageContainer
        title="Proposal Not Found"
        description="The requested proposal could not be found"
      >
        <div className="text-center py-8">
          <p className="text-gray-400">Proposal not found</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={proposal?.title || "Loading..."}
      description="View and vote on the proposal"
      requiresAuth={true}
    >
      {isLoading && <p className="text-white">Loading proposal...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {proposal && (
        <div className="space-y-6">
          {/* Proposal Header */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-white">
                {proposal.title}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-sm ${getStatusBadgeColor(
                  proposal.status
                )}`}
              >
                {proposal.status}
              </span>
            </div>
            <div className="text-sm text-gray-400 space-y-2">
              <p>Proposer: {formatAddress(proposal.proposer)}</p>
              <p>
                Created: {new Date(proposal.createdAt * 1000).toLocaleString()}
              </p>
              <p>End Block: {proposal.endBlock}</p>
            </div>
          </div>

          {/* Proposal Content */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Description</h2>
            <div className="prose prose-invert max-w-none">
              {proposal.description}
            </div>
          </div>

          {/* Voting Status */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Voting Status</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-green-400 text-2xl font-bold">
                  {proposal.forVotes.toString()}
                </p>
                <p className="text-gray-400">For</p>
              </div>
              <div>
                <p className="text-red-400 text-2xl font-bold">
                  {proposal.againstVotes.toString()}
                </p>
                <p className="text-gray-400">Against</p>
              </div>
              <div>
                <p className="text-gray-400 text-2xl font-bold">
                  {proposal.abstainVotes.toString()}
                </p>
                <p className="text-gray-400">Abstain</p>
              </div>
            </div>
          </div>

          {/* Voting Actions */}
          {!userVoteStatus.hasVoted && proposal.status === "active" && (
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">
                Cast Your Vote
              </h2>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleVote(VoteType.For)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  disabled={isLoading}
                >
                  Vote For
                </button>
                <button
                  onClick={() => handleVote(VoteType.Against)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  disabled={isLoading}
                >
                  Vote Against
                </button>
                <button
                  onClick={() => handleVote(VoteType.Abstain)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  disabled={isLoading}
                >
                  Abstain
                </button>
              </div>
            </div>
          )}

          {/* Execution Actions */}
          {proposal.status === "succeeded" && (
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleQueue}
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={isLoading}
              >
                Queue Proposal
              </button>
            </div>
          )}

          {proposal.status === "queued" && (
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleExecute}
                className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
                disabled={isLoading}
              >
                Execute Proposal
              </button>
            </div>
          )}
        </div>
      )}
    </PageContainer>
  );
};

const getStatusBadgeColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-900 text-green-200";
    case "succeeded":
      return "bg-blue-900 text-blue-200";
    case "defeated":
      return "bg-red-900 text-red-200";
    case "pending":
      return "bg-yellow-900 text-yellow-200";
    case "queued":
      return "bg-purple-900 text-purple-200";
    case "executed":
      return "bg-gray-900 text-gray-200";
    default:
      return "bg-gray-700 text-gray-200";
  }
};

export default ProposalDetail;
