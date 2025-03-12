import React, { useState } from "react";
import { NextPage } from "next";
import { useWhitelist } from "../../hooks/useWhitelist";
import AdminPageContainer from "../../components/AdminPageContainer";
import { formatAddress, formatTokenAmount } from "../../utils/format";

const WhitelistManagement: NextPage = () => {
  const {
    whitelistData,
    addToWhitelist,
    removeFromWhitelist,
    updateTier,
    isLoading,
    error,
    tiers,
  } = useWhitelist();

  const [newAddresses, setNewAddresses] = useState("");
  const [selectedTier, setSelectedTier] = useState(tiers[0]?.id || 1);

  const handleAddToWhitelist = async (e: React.FormEvent) => {
    e.preventDefault();
    const addresses = newAddresses
      .split("\n")
      .map((addr) => addr.trim())
      .filter(Boolean);
    await addToWhitelist(addresses, selectedTier);
    setNewAddresses("");
  };

  return (
    <AdminPageContainer title="Whitelist Management" requiresAdmin>
      <div className="space-y-6">
        {/* Whitelist Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-200">
              Total Whitelisted
            </h3>
            <p className="text-3xl font-bold text-white">
              {whitelistData?.totalAddresses || 0}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-200">
              Total Allocation
            </h3>
            <p className="text-3xl font-bold text-white">
              {formatTokenAmount(whitelistData?.totalAllocation)}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-200">
              Claimed Allocation
            </h3>
            <p className="text-3xl font-bold text-white">
              {formatTokenAmount(whitelistData?.claimedAllocation)}
            </p>
          </div>
        </div>

        {/* Add to Whitelist Form */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            Add Addresses to Whitelist
          </h2>
          <form onSubmit={handleAddToWhitelist} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Addresses (one per line)
              </label>
              <textarea
                value={newAddresses}
                onChange={(e) => setNewAddresses(e.target.value)}
                rows={5}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
                placeholder="0x..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Tier
              </label>
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(Number(e.target.value))}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
              >
                {tiers.map((tier) => (
                  <option key={tier.id} value={tier.id}>
                    {tier.name} - {tier.discount}% discount
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !newAddresses.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? "Adding..." : "Add to Whitelist"}
              </button>
            </div>
          </form>
        </div>

        {/* Whitelisted Addresses */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            Whitelisted Addresses
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Tier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Allocation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Used
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {whitelistData?.addresses.map((entry) => (
                  <tr key={entry.address}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatAddress(entry.address)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <select
                        value={entry.tier}
                        onChange={(e) =>
                          updateTier(entry.address, Number(e.target.value))
                        }
                        className="bg-gray-700 border border-gray-600 rounded text-white px-2 py-1"
                      >
                        {tiers.map((tier) => (
                          <option key={tier.id} value={tier.id}>
                            {tier.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatTokenAmount(entry.allocation)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${
                              (Number(entry.used) / Number(entry.allocation)) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => removeFromWhitelist(entry.address)}
                        className="text-red-400 hover:text-red-300"
                        disabled={isLoading}
                      >
                        Remove
                      </button>
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

export default WhitelistManagement;
