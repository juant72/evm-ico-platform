import React, { useState } from "react";
import { useGovernance } from "../../hooks/useGovernance";
import { VoteType } from "../../types/governance";

interface VotingInterfaceProps {
  proposalId: string;
}

const VotingInterface: React.FC<VotingInterfaceProps> = ({ proposalId }) => {
  const { castVote, getUserVote, isLoading } = useGovernance();
  const [reason, setReason] = useState("");
  const userVote = getUserVote(proposalId);

  const handleVote = async (support: VoteType) => {
    try {
      await castVote({
        proposalId,
        support,
        reason: reason.trim() || undefined,
      });
    } catch (error) {
      console.error("Failed to cast vote:", error);
    }
  };

  if (userVote) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-medium text-white mb-4">Your Vote</h3>
        <div className="flex items-center space-x-4">
          <span
            className={`
            px-3 py-1 rounded-full text-sm
            ${
              userVote.support === VoteType.For
                ? "bg-green-900 text-green-200"
                : userVote.support === VoteType.Against
                ? "bg-red-900 text-red-200"
                : "bg-gray-900 text-gray-200"
            }
          `}
          >
            {VoteType[userVote.support]}
          </span>
          {userVote.reason && (
            <span className="text-gray-400">Reason: {userVote.reason}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-medium text-white mb-4">Cast Your Vote</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Voting Reason (optional)
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
            placeholder="Explain your vote..."
            rows={3}
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => handleVote(VoteType.For)}
            disabled={isLoading}
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            For
          </button>
          <button
            onClick={() => handleVote(VoteType.Against)}
            disabled={isLoading}
            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            Against
          </button>
          <button
            onClick={() => handleVote(VoteType.Abstain)}
            disabled={isLoading}
            className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50"
          >
            Abstain
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotingInterface;
