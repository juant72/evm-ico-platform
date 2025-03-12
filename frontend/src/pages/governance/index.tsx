import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAddress } from "@thirdweb-dev/react";
import PageContainer from "../../components/layout/PageContainer";
import ProposalList from "../../components/governance/ProposalList";
import GovernanceStats from "../../components/governance/GovernanceStats";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

/**
 * Governance page - DAO governance dashboard
 */
const GovernancePage: NextPage = () => {
  const router = useRouter();
  const address = useAddress();

  return (
    <>
      <Head>
        <title>Governance | Encrypia</title>
        <meta name="description" content="DAO governance and proposals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer
        title="Governance"
        description="Participate in decentralized governance decisions"
        showSidebar={true}
        requiresAuth={true}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Governance Portal
            </h2>
            <p className="text-gray-400">
              Vote on proposals and help shape the future of the platform
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => router.push("/governance/create")}
            rightIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            }
          >
            Create Proposal
          </Button>
        </div>

        <GovernanceStats />

        <div className="mt-8">
          <Card title="Active Proposals">
            <ProposalList status="active" />
          </Card>
        </div>

        <div className="mt-8">
          <Card title="Recent Proposals">
            <ProposalList status="recent" />
          </Card>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Your Voting Power">
            <div className="p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Current voting power</span>
                <span className="text-xl font-semibold text-white">
                  {address ? "14,752 votes" : "Connect wallet"}
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-400">Delegated to you</span>
                <span className="text-white">1,235 votes</span>
              </div>

              <div className="flex space-x-3 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => router.push("/governance/delegate")}
                >
                  Delegate Votes
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  onClick={() => router.push("/distribution/staking")}
                >
                  Stake to Increase Power
                </Button>
              </div>
            </div>
          </Card>

          <Card title="Governance Resources">
            <ul className="divide-y divide-gray-700">
              <li className="py-3 px-4 hover:bg-gray-700">
                <a
                  href="/docs/governance.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="text-white font-medium">
                      Governance Documentation
                    </p>
                    <p className="text-sm text-gray-400">
                      Learn how our governance process works
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </li>
              <li className="py-3 px-4 hover:bg-gray-700">
                <a
                  href="/docs/voting.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="text-white font-medium">Voting Guidelines</p>
                    <p className="text-sm text-gray-400">
                      Best practices for responsible voting
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </li>
              <li className="py-3 px-4 hover:bg-gray-700">
                <a href="/forum" className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">Governance Forum</p>
                    <p className="text-sm text-gray-400">
                      Discuss proposals before they go to vote
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </li>
            </ul>
          </Card>
        </div>
      </PageContainer>
    </>
  );
};

export default GovernancePage;
