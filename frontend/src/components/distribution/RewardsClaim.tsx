import React, { useEffect, useState } from "react";
import { useDistribution } from "../../hooks/useDistribution";
import { formatTokenAmount } from "../../utils/format";

interface Reward {
  type: string;
  amount: string;
  timestamp: number;
}

const RewardsClaim: React.FC = () => {
  const { getRewards, claimRewards, isLoading } = useDistribution();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [selectedRewards, setSelectedRewards] = useState<string[]>([]);

  useEffect(() => {
    const fetchRewards = async () => {
      const data = await getRewards();
      setRewards(data);
    };
    fetchRewards();
  }, [getRewards]);

  const handleClaim = async () => {
    try {
      await claimRewards(selectedRewards);
      setSelectedRewards([]);
      // Refresh rewards
      const updatedRewards = await getRewards();
      setRewards(updatedRewards);
    } catch (error) {
      console.error("Failed to claim rewards:", error);
    }
  };

  const totalSelected = rewards
    .filter((reward) => selectedRewards.includes(reward.type))
    .reduce((sum, reward) => sum + Number(reward.amount), 0);

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-6">Available Rewards</h2>

      {isLoading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-700 rounded" />
          ))}
        </div>
      ) : rewards.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No rewards available to claim
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4">
            {rewards.map((reward) => (
              <div
                key={reward.type}
                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedRewards.includes(reward.type)}
                    onChange={(e) => {
                      setSelectedRewards((prev) =>
                        e.target.checked
                          ? [...prev, reward.type]
                          : prev.filter((t) => t !== reward.type)
                      );
                    }}
                    className="h-4 w-4 text-blue-600 rounded border-gray-500 bg-gray-600"
                  />
                  <div className="ml-4">
                    <p className="text-white font-medium">{reward.type}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(reward.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className="text-xl font-bold text-white">
                  {formatTokenAmount(reward.amount)}
                </span>
              </div>
            ))}
          </div>

          {selectedRewards.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
              <span className="text-gray-300">Total Selected</span>
              <span className="text-xl font-bold text-white">
                {formatTokenAmount(totalSelected)}
              </span>
            </div>
          )}

          <button
            onClick={handleClaim}
            disabled={isLoading || selectedRewards.length === 0}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Claim Selected Rewards"}
          </button>
        </div>
      )}
    </div>
  );
};

export default RewardsClaim;
