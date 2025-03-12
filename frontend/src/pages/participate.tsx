import { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import { useAddress } from "@thirdweb-dev/react";
import PageContainer from "../components/layout/PageContainer";
import ParticipationForm from "../components/ico/ParticipationForm";
import IcoProgress from "../components/ico/IcoProgress";
import TokenCalculator from "../components/ico/TokenCalculator";
import WhitelistStatus from "../components/ico/WhitelistStatus";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

/**
 * Participate page - For users to participate in the ICO
 */
const ParticipatePage: NextPage = () => {
  const address = useAddress();
  const [isEligible, setIsEligible] = useState<boolean | null>(null);

  // This would be replaced with actual API call in production
  const checkEligibility = async () => {
    // Simulate API call
    setTimeout(() => {
      // For demo, always eligible if wallet is connected
      setIsEligible(!!address);
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>Participate in ICO | Encrypia</title>
        <meta name="description" content="Participate in our token sale" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer
        title="Participate in ICO"
        description="Join our token sale and become an early investor"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <Card title="Current Sale Status">
              <IcoProgress />
            </Card>

            <div className="mt-8">
              {!address ? (
                <Card title="Connect Wallet to Participate">
                  <p className="text-gray-300 mb-6">
                    Please connect your wallet to participate in our token sale.
                    We support MetaMask, WalletConnect, and other popular
                    wallets.
                  </p>
                  <Button variant="primary" fullWidth>
                    Connect Wallet
                  </Button>
                </Card>
              ) : isEligible === null ? (
                <Card title="Check Eligibility">
                  <p className="text-gray-300 mb-6">
                    Before you can participate, we need to check if you're
                    eligible for this round of the token sale.
                  </p>
                  <Button
                    variant="primary"
                    onClick={checkEligibility}
                    fullWidth
                  >
                    Check Eligibility
                  </Button>
                </Card>
              ) : isEligible ? (
                <Card title="Participate in Token Sale">
                  <ParticipationForm />
                </Card>
              ) : (
                <Card title="Not Eligible">
                  <p className="text-gray-300 mb-4">
                    Unfortunately, you are not eligible to participate in this
                    round of the token sale. This could be due to:
                  </p>
                  <ul className="list-disc pl-5 mb-6 text-gray-300">
                    <li>Your region is restricted</li>
                    <li>You need to complete KYC</li>
                    <li>You're not on the whitelist for this round</li>
                  </ul>
                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsEligible(null)}
                    >
                      Try Again
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => (window.location.href = "/help")}
                    >
                      Get Help
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div>
            <WhitelistStatus />

            <div className="mt-6">
              <Card title="Token Calculator">
                <TokenCalculator />
              </Card>
            </div>

            <div className="mt-6">
              <Card title="Important Dates">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Presale Start</span>
                    <span className="text-white font-medium">
                      March 15, 2025
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Presale End</span>
                    <span className="text-white font-medium">
                      April 15, 2025
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Public Sale</span>
                    <span className="text-white font-medium">
                      April 20, 2025
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Token Distribution</span>
                    <span className="text-white font-medium">May 1, 2025</span>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-6">
              <Card>
                <h3 className="text-lg font-medium text-white mb-3">
                  Need Help?
                </h3>
                <p className="text-gray-300 mb-4">
                  If you have any questions or need assistance with the token
                  purchase process, our team is here to help.
                </p>
                <Button
                  variant="outline"
                  fullWidth
                  rightIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                >
                  Contact Support
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default ParticipatePage;
