import React, { useState, useEffect } from "react";
import { useDistribution } from "../../hooks/useDistribution";
import { formatTokenAmount } from "../../utils/format";

const AirdropClaim: React.FC = () => {
  const { checkEligibility, claimAirdrop, getClaimProof, isLoading } =
    useDistribution();
  const [claimStatus, setClaimStatus] = useState<{
    isEligible: boolean;
    amount: string;
    hasClaimed: boolean;
  }>({ isEligible: false, amount: "0", hasClaimed: false });

  useEffect(() => {
    const checkStatus = async () => {
      const status = await checkEligibility();
      setClaimStatus(status);
    };
    checkStatus();
  }, [checkEligibility]);

  const handleClaim = async () => {
    try {
      const proof = await getClaimProof();
      await claimAirdrop(proof);
      setClaimStatus((prev) => ({ ...prev, hasClaimed: true }));
    } catch (error) {
      console.error("Failed to claim airdrop:", error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-6">Token Airdrop</h2>

      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/3 mb-4" />
          <div className="h-4 bg-gray-700 rounded w-full" />
        </div>
      ) : !claimStatus.isEligible ? (
        <div className="text-center py-8">
          <div className="text-red-400 mb-2">Not Eligible</div>
          <p className="text-gray-400">
            Your address is not eligible for the airdrop
          </p>
        </div>
      ) : claimStatus.hasClaimed ? (
        <div className="text-center py-8">
          <div className="text-green-400 mb-2">Already Claimed</div>
          <p className="text-white text-2xl font-bold">
            {formatTokenAmount(claimStatus.amount)}
          </p>
        </div>
      ) : (
        <div className="text-center space-y-6">
          <div>
            <h3 className="text-lg text-white mb-2">Available to Claim</h3>
            <p className="text-3xl font-bold text-green-400">
              {formatTokenAmount(claimStatus.amount)}
            </p>
          </div>

          <button
            onClick={handleClaim}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Claim Airdrop"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AirdropClaim;
