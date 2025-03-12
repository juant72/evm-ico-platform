import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useGovernance } from "../../hooks/useGovernance";
import PageContainer from "../../components/PageContainer";

const ProposalsList: NextPage = () => {
  const { proposals, isLoading } = useGovernance();

  return (
    <PageContainer
      title="Governance Proposals"
      description="View and vote on governance proposals"
      requiresAuth={true}
    >
      <div className="space-y-6">
        {/* Proposals Filter */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-gray-700 text-white rounded-md">
              All
            </button>
            <button className="px-4 py-2 text-gray-400 hover:bg-gray-700 rounded-md">
              Active
            </button>
            <button className="px-4 py-2 text-gray-400 hover:bg-gray-700 rounded-md">
              Pending
            </button>
            <button className="px-4 py-2 text-gray-400 hover:bg-gray-700 rounded-md">
              Closed
            </button>
          </div>
        </div>

        {/* Proposals List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-400">Loading proposals...</p>
            </div>
          ) : proposals?.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No proposals found</p>
            </div>
          ) : (
            proposals?.map((proposal) => (
              <Link
                key={proposal.id}
                href={`/governance/proposal/${proposal.id}`}
              >
                <a className="block bg-gray-800 rounded-lg p-6 border border-gray-700 hover:bg-gray-700 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {proposal.title}
                      </h3>
                      <p className="text-gray-300 mb-4">{proposal.summary}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-400">ID: {proposal.id}</span>
                        <span className="text-gray-400">
                          Created:{" "}
                          {new Date(
                            proposal.createdAt * 1000
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`
                      px-3 py-1 rounded-full text-sm
                      ${getStatusColor(proposal.status)}
                    `}
                    >
                      {proposal.status}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex justify-between text-sm text-gray-400">
                      <div>For: {proposal.forVotes.toString()}</div>
                      <div>Against: {proposal.againstVotes.toString()}</div>
                      <div>Abstain: {proposal.abstainVotes.toString()}</div>
                    </div>
                  </div>
                </a>
              </Link>
            ))
          )}
        </div>
      </div>
    </PageContainer>
  );
};

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-900 text-green-200";
    case "pending":
      return "bg-yellow-900 text-yellow-200";
    case "succeeded":
      return "bg-blue-900 text-blue-200";
    case "defeated":
      return "bg-red-900 text-red-200";
    case "queued":
      return "bg-purple-900 text-purple-200";
    default:
      return "bg-gray-700 text-gray-200";
  }
};

export default ProposalsList;
