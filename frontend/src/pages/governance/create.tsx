import React, { useState } from "react";
import { NextPage } from "next";
import { useGovernance } from "../../hooks/useGovernance";
import PageContainer from "../../components/PageContainer";

const CreateProposal: NextPage = () => {
  const { createProposal, isLoading, error } = useGovernance();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targets, setTargets] = useState<string[]>([""]);
  const [values, setValues] = useState<string[]>([""]);
  const [signatures, setSignatures] = useState<string[]>([""]);
  const [calldatas, setCalldatas] = useState<string[]>([""]);

  const handleCreateProposal = async () => {
    await createProposal({
      title,
      description,
      targets,
      values,
      signatures,
      calldatas,
    });
  };

  return (
    <PageContainer
      title="Create Proposal"
      description="Create a new governance proposal"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-white">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-white">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        {/* Add inputs for targets, values, signatures, and calldatas */}
        <button
          onClick={handleCreateProposal}
          className="bg-blue-600 text-white p-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Proposal"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </PageContainer>
  );
};

export default CreateProposal;
