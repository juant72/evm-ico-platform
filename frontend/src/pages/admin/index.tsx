import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import AdminPageContainer from "../../components/AdminPageContainer";
import { useAdminStats } from "../../hooks/useAdminStats";
import { formatTokenAmount, formatUSD } from "../../utils/format";

const AdminDashboard: NextPage = () => {
  const { stats, isLoading } = useAdminStats();

  return (
    <AdminPageContainer title="Admin Dashboard" requiresAdmin>
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-200">Total Raised</h3>
            <p className="text-3xl font-bold text-white">
              {isLoading ? "..." : formatUSD(stats?.totalRaised)}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-200">Tokens Sold</h3>
            <p className="text-3xl font-bold text-white">
              {isLoading ? "..." : formatTokenAmount(stats?.tokensSold)}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-200">
              Total Investors
            </h3>
            <p className="text-3xl font-bold text-white">
              {isLoading ? "..." : stats?.totalInvestors}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-200">
              Active Proposals
            </h3>
            <p className="text-3xl font-bold text-white">
              {isLoading ? "..." : stats?.activeProposals}
            </p>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/token-distribution">
            <a className="block bg-gray-800 rounded-lg p-6 border border-gray-700 hover:bg-gray-700">
              <h3 className="text-xl font-bold text-white mb-2">
                Token Distribution
              </h3>
              <p className="text-gray-300">
                Manage token distribution and airdrops
              </p>
            </a>
          </Link>
          <Link href="/admin/vesting-setup">
            <a className="block bg-gray-800 rounded-lg p-6 border border-gray-700 hover:bg-gray-700">
              <h3 className="text-xl font-bold text-white mb-2">
                Vesting Setup
              </h3>
              <p className="text-gray-300">Configure vesting schedules</p>
            </a>
          </Link>
          <Link href="/admin/governance-settings">
            <a className="block bg-gray-800 rounded-lg p-6 border border-gray-700 hover:bg-gray-700">
              <h3 className="text-xl font-bold text-white mb-2">Governance</h3>
              <p className="text-gray-300">Manage governance parameters</p>
            </a>
          </Link>
          <Link href="/admin/whitelist">
            <a className="block bg-gray-800 rounded-lg p-6 border border-gray-700 hover:bg-gray-700">
              <h3 className="text-xl font-bold text-white mb-2">Whitelist</h3>
              <p className="text-gray-300">Manage whitelisted addresses</p>
            </a>
          </Link>
          <Link href="/admin/investors">
            <a className="block bg-gray-800 rounded-lg p-6 border border-gray-700 hover:bg-gray-700">
              <h3 className="text-xl font-bold text-white mb-2">Investors</h3>
              <p className="text-gray-300">View and manage investors</p>
            </a>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {stats?.recentActivity?.map((activity) => (
              <div
                key={activity.id}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="text-white">{activity.description}</p>
                  <p className="text-sm text-gray-400">{activity.timestamp}</p>
                </div>
                <Link href={activity.link}>
                  <a className="text-blue-400 hover:text-blue-300">View</a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminPageContainer>
  );
};

export default AdminDashboard;
