import React, { useState } from "react";
import { useGovernance } from "../../hooks/useGovernance";
import { ProposalType, ProposalAction } from "../../types/governance";

const CreateProposal: React.FC = () => {
  const { createProposal, isLoading } = useGovernance();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "GENERAL" as ProposalType,
    actions: [] as ProposalAction[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProposal(formData);
  };

  const addAction = () => {
    setFormData((prev) => ({
      ...prev,
      actions: [
        ...prev.actions,
        { target: "", value: "0", signature: "", calldata: "0x" },
      ],
    }));
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-6">Create Proposal</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Proposal Type
          </label>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value as ProposalType })
            }
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
          >
            <option value="GENERAL">General</option>
            <option value="PARAMETER">Parameter Change</option>
            <option value="TREASURY">Treasury</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
            placeholder="Enter proposal title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white h-32"
            placeholder="Describe your proposal..."
            required
          />
        </div>

        {/* Actions Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-white">Actions</h3>
            <button
              type="button"
              onClick={addAction}
              className="text-blue-400 hover:text-blue-300"
            >
              + Add Action
            </button>
          </div>

          {formData.actions.map((action, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Target Address
                </label>
                <input
                  type="text"
                  value={action.target}
                  onChange={(e) => {
                    const newActions = [...formData.actions];
                    newActions[index].target = e.target.value;
                    setFormData({ ...formData, actions: newActions });
                  }}
                  className="w-full bg-gray-600 border border-gray-500 rounded px-4 py-2 text-white"
                  placeholder="0x..."
                />
              </div>
              {/* Add other action fields */}
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Create Proposal"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProposal;
