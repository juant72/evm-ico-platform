import React, { useState } from "react";
import { useGovernance } from "../../hooks/useGovernance";
import { isAddress } from "ethers/lib/utils";

const DelegateVotes: React.FC = () => {
  const { delegateVotes, userVotingPower, delegatedTo, isLoading } =
    useGovernance();
  const [delegateAddress, setDelegateAddress] = useState("");
  const [error, setError] = useState("");

  const handleDelegate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isAddress(delegateAddress)) {
      setError("Invalid address format");
      return;
    }

    try {
      await delegateVotes(delegateAddress);
      setDelegateAddress("");
    } catch (err: any) {
      setError(err.message || "Failed to delegate votes");
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-6">
        Delegate Voting Power
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Your Voting Power</p>
          <p className="text-2xl font-bold text-white">
            {userVotingPower?.toString() || "0"}
          </p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Currently Delegated To</p>
          <p className="text-2xl font-bold text-white">
            {delegatedTo || "Self"}
          </p>
        </div>
      </div>

      <form onSubmit={handleDelegate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Delegate Address
          </label>
          <input
            type="text"
            value={delegateAddress}
            onChange={(e) => setDelegateAddress(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
            placeholder="Enter address (0x...)"
          />
          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading || !delegateAddress}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Processing..." : "Delegate Votes"}
        </button>
      </form>
    </div>
  );
};

export default DelegateVotes;
