import React, { useState } from "react";
import { NextPage } from "next";
import { utils } from "ethers";
import AdminPageContainer from "../../components/AdminPageContainer";
import { useTokenDistribution } from "../../hooks/useTokenDistribution";
import { formatTokenAmount } from "../../utils/format";

const TokenDistribution: NextPage = () => {
  const {
    distributionData,
    createAirdrop,
    addToWhitelist,
    updateVesting,
    isLoading,
  } = useTokenDistribution();

  const [airdropData, setAirdropData] = useState({
    addresses: "",
    amount: "",
    merkleRoot: "",
  });

  const handleCreateAirdrop = async (e: React.FormEvent) => {
    e.preventDefault();
    const addresses = airdropData.addresses.split("\n").map((a) => a.trim());
    await createAirdrop({
      addresses,
      amount: utils.parseEther(airdropData.amount),
      merkleRoot: airdropData.merkleRoot,
    });
  };

  return (
    <AdminPageContainer title="Token Distribution Management" requiresAdmin>
      <div className="space-y-6">
        {/* Distribution Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-200">
              Total Distributed
            </h3>
            <p className="text-3xl font-bold text-white">
              {formatTokenAmount(distributionData?.totalDistributed)}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-200">Remaining</h3>
            <p className="text-3xl font-bold text-white">
              {formatTokenAmount(distributionData?.remaining)}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-200">Recipients</h3>
            <p className="text-3xl font-bold text-white">
              {distributionData?.totalRecipients}
            </p>
          </div>
        </div>

        {/* Create Airdrop */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Create Airdrop</h2>
          <form onSubmit={handleCreateAirdrop} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Recipient Addresses (one per line)
              </label>
              <textarea
                value={airdropData.addresses}
                onChange={(e) =>
                  setAirdropData({ ...airdropData, addresses: e.target.value })
                }
                rows={5}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Amount per Recipient
              </label>
              <input
                type="text"
                value={airdropData.amount}
                onChange={(e) =>
                  setAirdropData({ ...airdropData, amount: e.target.value })
                }
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? "Creating..." : "Create Airdrop"}
              </button>
            </div>
          </form>
        </div>

        {/* Distribution History */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            Distribution History
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Recipients
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {distributionData?.history.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {item.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {formatTokenAmount(item.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {item.recipients}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          item.status === "completed"
                            ? "bg-green-900 text-green-200"
                            : "bg-yellow-900 text-yellow-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminPageContainer>
  );
};

export default TokenDistribution;
