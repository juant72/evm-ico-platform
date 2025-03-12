import React, { useState } from "react";
import { NextPage } from "next";
import { useGovernance } from "../../hooks/useGovernance";
import PageContainer from "../../components/PageContainer";

const DelegateVotes: NextPage = () => {
  const { delegateVotes, userVotingPower, delegatedTo, isLoading } =
    useGovernance();
  const [delegateAddress, setDelegateAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelegate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await delegateVotes(delegateAddress);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer
      title="Delegate Votes"
      description="Delegate your voting power to another address"
      requiresAuth={true}
    >
      <div className="grid gap-6">
        {/* Current Delegation Status */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-medium text-gray-200 mb-4">
            Current Delegation
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Your Voting Power</p>
              <p className="text-xl font-bold text-white">
                {isLoading ? "..." : userVotingPower?.toString() || "0"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Delegated To</p>
              <p className="text-xl font-bold text-white">
                {isLoading ? "..." : delegatedTo || "Self"}
              </p>
            </div>
          </div>
        </div>

        {/* Delegation Form */}
        <form
          onSubmit={handleDelegate}
          className="bg-gray-800 rounded-lg p-6 border border-gray-700"
        >
          <h3 className="text-lg font-medium text-gray-200 mb-4">
            Delegate Your Votes
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Delegate Address
              </label>
              <input
                type="text"
                value={delegateAddress}
                onChange={(e) => setDelegateAddress(e.target.value)}
                placeholder="0x..."
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
                required
              />
              <p className="mt-2 text-sm text-gray-400">
                Enter the Ethereum address you want to delegate your votes to
              </p>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !delegateAddress}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? "Delegating..." : "Delegate Votes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </PageContainer>
  );
};

export default DelegateVotes;
