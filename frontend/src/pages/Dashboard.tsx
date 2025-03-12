import { NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import PageContainer from "../components/layout/PageContainer";
import TokenBalance from "../components/dashboard/TokenBalance";
import InvestmentSummary from "../components/dashboard/InvestmentSummary";
import VestingChart from "../components/dashboard/VestingChart";
import VestingSchedule from "../components/dashboard/VestingSchedule";
import TransactionHistory from "../components/dashboard/TransactionHistory";

/**
 * Dashboard page - User dashboard showing investments and token information
 */
const Dashboard: NextPage = () => {
  const address = useAddress();
  const router = useRouter();

  // Redirect to home if user is not connected
  useEffect(() => {
    if (!address) {
      router.push("/");
    }
  }, [address, router]);

  if (!address) {
    return null; // Don't render anything while redirecting
  }

  return (
    <>
      <Head>
        <title>Dashboard | Encrypia</title>
        <meta name="description" content="Your ICO investment dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer
        title="Dashboard"
        description="Manage your investments and tokens"
        showSidebar={true}
        requiresAuth={true}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <TokenBalance />
          <div className="lg:col-span-2">
            <InvestmentSummary />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">
              Vesting Schedule
            </h2>
            <VestingChart />
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">
              Token Distribution
            </h2>
            <VestingSchedule />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            Transaction History
          </h2>
          <TransactionHistory />
        </div>
      </PageContainer>
    </>
  );
};

export default Dashboard;
