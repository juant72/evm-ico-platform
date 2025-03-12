import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useAddress } from "@thirdweb-dev/react";
import { utils } from "ethers";
import PageContainer from "../../components/PageContainer";
import { useDistribution } from "../../hooks/useDistribution";
import { formatTokenAmount } from "../../utils/format";

interface AirdropProof {
  index: number;
  amount: string;
  proof: string[];
}

const Airdrop: NextPage = () => {
  const address = useAddress();
  const { checkAirdropEligibility, claimAirdrop, isLoading, error } =
    useDistribution();
  const [airdropInfo, setAirdropInfo] = useState<{
    isEligible: boolean;
    amount: string;
    proof?: AirdropProof;
    hasClaimed: boolean;
  } | null>(null);

  useEffect(() => {
    const checkEligibility = async () => {
      if (address) {
        const info = await checkAirdropEligibility(address);
        setAirdropInfo(info);
      }
    };

    checkEligibility();
  }, [address, checkAirdropEligibility]);

  const handleClaim = async () => {
    if (!airdropInfo?.proof) return;
    await claimAirdrop(airdropInfo.proof);
  };

  return (
    <PageContainer
      title="Token Airdrop"
      description="Claim your airdropped tokens"
      requiresAuth={true}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Eligibility Status */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            Airdrop Eligibility
          </h2>

          {isLoading ? (
            <p className="text-gray-400">Checking eligibility...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : !airdropInfo?.isEligible ? (
            <div className="text-center py-6">
              <p className="text-xl text-gray-400">
                Your address is not eligible for the airdrop
              </p>
              <p className="mt-2 text-gray-500">
                Make sure you're connected with the correct wallet
              </p>
            </div>
          ) : airdropInfo?.hasClaimed ? (
            <div className="text-center py-6">
              <p className="text-xl text-gray-400">
                You have already claimed your airdrop
              </p>
              <p className="mt-2 text-green-400 text-2xl font-bold">
                {formatTokenAmount(airdropInfo.amount)} Tokens
              </p>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-xl text-white mb-2">
                You are eligible for the airdrop!
              </p>
              <p className="text-3xl font-bold text-green-400 mb-6">
                {formatTokenAmount(airdropInfo.amount)} Tokens
              </p>
              <button
                onClick={handleClaim}
                disabled={isLoading}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {isLoading ? "Claiming..." : "Claim Tokens"}
              </button>
            </div>
          )}
        </div>

        {/* Airdrop Info */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            About the Airdrop
          </h2>
          <div className="space-y-4 text-gray-300">
            <p>
              This airdrop is part of our token distribution strategy to reward
              early supporters and community members.
            </p>
            <div className="space-y-2">
              <h3 className="font-medium text-white">Eligibility Criteria:</h3>
              <ul className="list-disc list-inside text-gray-400">
                <li>Early community members</li>
                <li>Previous testnet participants</li>
                <li>Governance participants</li>
                <li>Early liquidity providers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Airdrop;
