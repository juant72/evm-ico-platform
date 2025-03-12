import React from "react";
import { useDistribution } from "../../hooks/useDistribution";
import { formatTokenAmount } from "../../utils/format";

const ClaimableTokens: React.FC = () => {
  const { claimableTokens, claimTokens, isLoading } = useDistribution();

  const handleClaim = async (type: string) => {
    try {
      await claimTokens(type);
    } catch (error) {
      console.error("Failed to claim tokens:", error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-6">Claimable Tokens</h2>

      <div className="space-y-4">
        {claimableTokens.map((token) => (
          <div
            key={token.type}
            className="bg-gray-700 p-4 rounded-lg flex items-center justify-between"
          >
            <div>
              <h3 className="text-white font-medium">{token.type}</h3>
              <p className="text-2xl font-bold text-green-400">
                {formatTokenAmount(token.amount)}
              </p>
              {token.nextUnlock && (
                <p className="text-sm text-gray-400">
                  Next unlock: {new Date(token.nextUnlock).toLocaleDateString()}
                </p>
              )}
            </div>
            <button
              onClick={() => handleClaim(token.type)}
              disabled={isLoading || token.amount === "0"}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Claiming..." : "Claim"}
            </button>
          </div>
        ))}

        {claimableTokens.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No tokens available to claim
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimableTokens;
