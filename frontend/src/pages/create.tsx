import { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Card from "../components/common/Card";
import { ethers } from "ethers";

/**
 * Create Token page - Interface for deploying a new token and ICO
 */
const Create: NextPage = () => {
  const address = useAddress();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [contractAddress, setContractAddress] = useState("");

  // Form states
  const [tokenForm, setTokenForm] = useState({
    name: "",
    symbol: "",
    decimals: "18",
    totalSupply: "1000000",
    description: "",
  });

  const [icoForm, setIcoForm] = useState({
    rate: "1000", // Tokens per ETH
    softCap: "10", // ETH
    hardCap: "100", // ETH
    minContribution: "0.1", // ETH
    maxContribution: "10", // ETH
    startTime: "",
    endTime: "",
    vestingEnabled: false,
    vestingCliff: "0", // months
    vestingDuration: "12", // months
    teamAllocation: "20", // percent
    marketingAllocation: "10", // percent
    communityAllocation: "10", // percent
  });

  // Calculate tomorrow and 30 days from now for default date values
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextMonth = new Date();
  nextMonth.setDate(nextMonth.getDate() + 30);

  // Format date for input fields
  const formatDateForInput = (date: Date) => {
    return date.toISOString().slice(0, 16);
  };

  // Set default dates if not set
  if (!icoForm.startTime) {
    setIcoForm({
      ...icoForm,
      startTime: formatDateForInput(tomorrow),
      endTime: formatDateForInput(nextMonth),
    });
  }

  // Handle token form changes
  const handleTokenFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTokenForm({
      ...tokenForm,
      [name]: value,
    });
  };

  // Handle ICO form changes
  const handleIcoFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setIcoForm({
      ...icoForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Move to the next step
  const goToNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Go back to previous step
  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Deploy token contract
  const deployToken = async () => {
    setIsLoading(true);
    try {
      // This is a placeholder for actual token deployment
      // In a real application, you would use ThirdWeb SDK or ethers.js
      // to deploy the token contract
      console.log("Deploying token with data:", tokenForm);

      // Simulate token deployment (replace with actual deployment)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate contract address (replace with actual contract address)
      const mockContractAddress =
        "0x" + Math.random().toString(36).substring(2, 14);
      setContractAddress(mockContractAddress);

      // Move to next step after successful deployment
      goToNextStep();
    } catch (error) {
      console.error("Error deploying token:", error);
      alert("Failed to deploy token. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Deploy ICO contract
  const deployIco = async () => {
    setIsLoading(true);
    try {
      // This is a placeholder for actual ICO contract deployment
      console.log("Deploying ICO with data:", icoForm);
      console.log("Using token address:", contractAddress);

      // Simulate ICO deployment (replace with actual deployment)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Move to next step after successful deployment
      goToNextStep();
    } catch (error) {
      console.error("Error deploying ICO:", error);
      alert("Failed to deploy ICO. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Validate token form
  const isTokenFormValid = () => {
    return (
      tokenForm.name.trim() !== "" &&
      tokenForm.symbol.trim() !== "" &&
      tokenForm.decimals !== "" &&
      tokenForm.totalSupply !== ""
    );
  };

  // Validate ICO form
  const isIcoFormValid = () => {
    return (
      icoForm.rate !== "" &&
      icoForm.softCap !== "" &&
      icoForm.hardCap !== "" &&
      icoForm.startTime !== "" &&
      icoForm.endTime !== ""
    );
  };

  if (!address) {
    return (
      <PageContainer
        title="Create Token"
        description="Deploy your own token and ICO"
        requiresAuth={true}
      >
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-400">
            Please connect your wallet to create a token.
          </p>
        </div>
      </PageContainer>
    );
  }

  return (
    <>
      <Head>
        <title>Create Token | Encrypia</title>
        <meta
          name="description"
          content="Create and deploy your own token and ICO"
        />
      </Head>

      <PageContainer
        title="Create Token"
        description="Deploy your own token and ICO"
        showSidebar={true}
        requiresAuth={true}
      >
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div
                className={`flex flex-col items-center ${
                  currentStep >= 1 ? "text-blue-500" : "text-gray-500"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 1 ? "bg-blue-600" : "bg-gray-700"
                  }`}
                >
                  <span className="text-white">1</span>
                </div>
                <span className="mt-2 text-sm">Token Details</span>
              </div>

              <div
                className={`flex-1 h-1 mx-2 ${
                  currentStep >= 2 ? "bg-blue-600" : "bg-gray-700"
                }`}
              ></div>

              <div
                className={`flex flex-col items-center ${
                  currentStep >= 2 ? "text-blue-500" : "text-gray-500"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 2 ? "bg-blue-600" : "bg-gray-700"
                  }`}
                >
                  <span className="text-white">2</span>
                </div>
                <span className="mt-2 text-sm">ICO Configuration</span>
              </div>

              <div
                className={`flex-1 h-1 mx-2 ${
                  currentStep >= 3 ? "bg-blue-600" : "bg-gray-700"
                }`}
              ></div>

              <div
                className={`flex flex-col items-center ${
                  currentStep >= 3 ? "text-blue-500" : "text-gray-500"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 3 ? "bg-blue-600" : "bg-gray-700"
                  }`}
                >
                  <span className="text-white">3</span>
                </div>
                <span className="mt-2 text-sm">Success</span>
              </div>
            </div>
          </div>

          {/* Step 1: Token Details */}
          {currentStep === 1 && (
            <Card title="Token Details" className="mb-6">
              <div className="grid grid-cols-1 gap-6">
                <Input
                  label="Token Name"
                  name="name"
                  value={tokenForm.name}
                  onChange={handleTokenFormChange}
                  placeholder="e.g. Encrypia Token"
                  helpText="The full name of your token"
                  required
                />

                <Input
                  label="Token Symbol"
                  name="symbol"
                  value={tokenForm.symbol}
                  onChange={handleTokenFormChange}
                  placeholder="e.g. ENC"
                  helpText="A short abbreviation (2-6 characters)"
                  required
                  maxLength={6}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Decimals"
                    name="decimals"
                    type="number"
                    value={tokenForm.decimals}
                    onChange={handleTokenFormChange}
                    helpText="Usually 18 for ERC-20 tokens"
                    required
                    min="0"
                    max="18"
                  />

                  <Input
                    label="Total Supply"
                    name="totalSupply"
                    type="number"
                    value={tokenForm.totalSupply}
                    onChange={handleTokenFormChange}
                    helpText="The maximum number of tokens that will exist"
                    required
                    min="1"
                  />
                </div>

                <Input
                  label="Description"
                  name="description"
                  value={tokenForm.description}
                  onChange={handleTokenFormChange}
                  placeholder="Describe your token's purpose"
                  helpText="A brief description of your token's purpose and utility"
                />

                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={deployToken}
                    disabled={!isTokenFormValid() || isLoading}
                    isLoading={isLoading}
                  >
                    Deploy Token
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Step 2: ICO Configuration */}
          {currentStep === 2 && (
            <Card title="ICO Configuration" className="mb-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-blue-900/30 border border-blue-800 rounded-md p-4 mb-4">
                  <p className="text-sm text-blue-300">
                    Token{" "}
                    <strong>
                      {tokenForm.name} ({tokenForm.symbol})
                    </strong>{" "}
                    has been deployed at address: <br />
                    <code className="bg-gray-900 px-2 py-1 rounded text-xs">
                      {contractAddress}
                    </code>
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Token Rate"
                    name="rate"
                    type="number"
                    value={icoForm.rate}
                    onChange={handleIcoFormChange}
                    helpText="Number of tokens per 1 ETH"
                    required
                    min="1"
                  />

                  <Input
                    label="Min Contribution (ETH)"
                    name="minContribution"
                    type="number"
                    value={icoForm.minContribution}
                    onChange={handleIcoFormChange}
                    helpText="Minimum investment amount in ETH"
                    required
                    min="0.01"
                    step="0.01"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Soft Cap (ETH)"
                    name="softCap"
                    type="number"
                    value={icoForm.softCap}
                    onChange={handleIcoFormChange}
                    helpText="Minimum funding goal in ETH"
                    required
                    min="1"
                  />

                  <Input
                    label="Hard Cap (ETH)"
                    name="hardCap"
                    type="number"
                    value={icoForm.hardCap}
                    onChange={handleIcoFormChange}
                    helpText="Maximum funding limit in ETH"
                    required
                    min="1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Start Time"
                    name="startTime"
                    type="datetime-local"
                    value={icoForm.startTime}
                    onChange={handleIcoFormChange}
                    helpText="When the ICO will start"
                    required
                  />

                  <Input
                    label="End Time"
                    name="endTime"
                    type="datetime-local"
                    value={icoForm.endTime}
                    onChange={handleIcoFormChange}
                    helpText="When the ICO will end"
                    required
                  />
                </div>

                <div className="border-t border-gray-700 pt-6 mt-4">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Vesting Configuration
                  </h3>

                  <div className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      id="vestingEnabled"
                      name="vestingEnabled"
                      checked={icoForm.vestingEnabled}
                      onChange={handleIcoFormChange}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label
                      htmlFor="vestingEnabled"
                      className="ml-2 text-sm text-gray-300"
                    >
                      Enable token vesting (gradually release tokens)
                    </label>
                  </div>

                  {icoForm.vestingEnabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Cliff Period (months)"
                        name="vestingCliff"
                        type="number"
                        value={icoForm.vestingCliff}
                        onChange={handleIcoFormChange}
                        helpText="Time before initial token release"
                        required={icoForm.vestingEnabled}
                        min="0"
                      />

                      <Input
                        label="Vesting Duration (months)"
                        name="vestingDuration"
                        type="number"
                        value={icoForm.vestingDuration}
                        onChange={handleIcoFormChange}
                        helpText="Total vesting period"
                        required={icoForm.vestingEnabled}
                        min="1"
                      />
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-700 pt-6 mt-4">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Token Allocation
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Input
                      label="Team (%)"
                      name="teamAllocation"
                      type="number"
                      value={icoForm.teamAllocation}
                      onChange={handleIcoFormChange}
                      helpText="Allocation for team members"
                      required
                      min="0"
                      max="100"
                    />

                    <Input
                      label="Marketing (%)"
                      name="marketingAllocation"
                      type="number"
                      value={icoForm.marketingAllocation}
                      onChange={handleIcoFormChange}
                      helpText="Allocation for marketing"
                      required
                      min="0"
                      max="100"
                    />

                    <Input
                      label="Community (%)"
                      name="communityAllocation"
                      type="number"
                      value={icoForm.communityAllocation}
                      onChange={handleIcoFormChange}
                      helpText="Allocation for community incentives"
                      required
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={goToPrevStep}>
                    Back
                  </Button>

                  <Button
                    onClick={deployIco}
                    disabled={!isIcoFormValid() || isLoading}
                    isLoading={isLoading}
                  >
                    Deploy ICO
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Step 3: Success */}
          {currentStep === 3 && (
            <Card className="mb-6 text-center py-10">
              <div className="flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-green-900/30 border-4 border-green-500 flex items-center justify-center mb-6">
                  <svg
                    className="w-10 h-10 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">Success!</h2>

                <p className="text-gray-300 mb-6 max-w-md">
                  Your token and ICO have been successfully deployed. You can
                  now manage your ICO from the admin panel.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 w-full max-w-md">
                  <div className="bg-gray-900 p-3 rounded-lg">
                    <p className="text-sm text-gray-400 mb-1">Token Address</p>
                    <code className="text-xs text-blue-400 break-all">
                      {contractAddress}
                    </code>
                  </div>

                  <div className="bg-gray-900 p-3 rounded-lg">
                    <p className="text-sm text-gray-400 mb-1">ICO Address</p>
                    <code className="text-xs text-blue-400 break-all">
                      0x{Math.random().toString(36).substring(2, 14)}
                    </code>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => router.push("/admin")}
                    rightIcon={
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                      </svg>
                    }
                  >
                    Go to Admin Panel
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => router.push("/tokenomics")}
                  >
                    View Tokenomics
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </PageContainer>
    </>
  );
};

export default Create;
