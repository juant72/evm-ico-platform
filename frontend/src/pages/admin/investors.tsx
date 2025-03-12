import React, { useState } from "react";
import { NextPage } from "next";
import AdminPageContainer from "../../components/AdminPageContainer";
import { useInvestors } from "../../hooks/useInvestors";
import {
  formatTokenAmount,
  formatAddress,
  formatDate,
} from "../../utils/format";

const Investors: NextPage = () => {
  const { investors, exportInvestors, isLoading } = useInvestors();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const handleExport = async () => {
    await exportInvestors();
  };

  const filteredInvestors = investors?.filter((investor) => {
    if (search) {
      return (
        investor.address.toLowerCase().includes(search.toLowerCase()) ||
        investor.email?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filter !== "all") {
      return investor.tier === filter;
    }
    return true;
  });

  return (
    <AdminPageContainer title="Investors Management" requiresAdmin>
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search by address or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
            >
              <option value="all">All Tiers</option>
              <option value="seed">Seed</option>
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Investors Table */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Tier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Tokens Purchased
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Investment Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {filteredInvestors?.map((investor) => (
                  <tr key={investor.address}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-white">
                          {formatAddress(investor.address)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-900 text-blue-200">
                        {investor.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {formatTokenAmount(investor.tokensPurchased)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatDate(investor.investmentDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          investor.status === "active"
                            ? "bg-green-900 text-green-200"
                            : "bg-red-900 text-red-200"
                        }`}
                      >
                        {investor.status}
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

export default Investors;
