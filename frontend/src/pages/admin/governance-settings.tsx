import React, { useState } from "react";
import { NextPage } from "next";
import AdminPageContainer from "../../components/AdminPageContainer";
import { useGovernanceSettings } from "../../hooks/useGovernanceSettings";
import { formatTokenAmount } from "../../utils/format";

const GovernanceSettings: NextPage = () => {
  const { settings, updateSettings, isLoading } = useGovernanceSettings();
  const [formData, setFormData] = useState({
    votingDelay: settings?.votingDelay || "0",
    votingPeriod: settings?.votingPeriod || "0",
    proposalThreshold: settings?.proposalThreshold || "0",
    quorumPercentage: settings?.quorumPercentage || "4",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(formData);
  };

  return (
    <AdminPageContainer title="Governance Settings" requiresAdmin>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            Voting Parameters
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Voting Delay (blocks)
              </label>
              <input
                type="number"
                value={formData.votingDelay}
                onChange={(e) =>
                  setFormData({ ...formData, votingDelay: e.target.value })
                }
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Voting Period (blocks)
              </label>
              <input
                type="number"
                value={formData.votingPeriod}
                onChange={(e) =>
                  setFormData({ ...formData, votingPeriod: e.target.value })
                }
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            Proposal Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Proposal Threshold
              </label>
              <input
                type="text"
                value={formData.proposalThreshold}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    proposalThreshold: e.target.value,
                  })
                }
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
              />
              <p className="mt-1 text-sm text-gray-400">
                Minimum tokens required to submit a proposal
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Quorum Percentage
              </label>
              <input
                type="number"
                value={formData.quorumPercentage}
                onChange={(e) =>
                  setFormData({ ...formData, quorumPercentage: e.target.value })
                }
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
              />
              <p className="mt-1 text-sm text-gray-400">
                Percentage of total supply that must vote for proposal to pass
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update Settings"}
          </button>
        </div>
      </form>
    </AdminPageContainer>
  );
};

export default GovernanceSettings;
