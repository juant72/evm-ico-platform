import React, { useState, useEffect } from "react";
import { useAddress, useBalance, useDisconnect } from "@thirdweb-dev/react";
import Card from "../common/Card";
import Button from "../common/Button";
import Tooltip from "../common/Tooltip";
import { formatUnits } from "ethers/lib/utils";

/**
 * WalletDetails component displays connected wallet information
 */
const WalletDetails = () => {
  const address = useAddress();
  const disconnect = useDisconnect();
  const { data: balanceData, isLoading: isBalanceLoading } = useBalance();
  const [isCopied, setIsCopied] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // ENS resolution - In a real app, you'd fetch the ENS name
  const [ensName, setEnsName] = useState<string | null>(null);

  useEffect(() => {
    // Mock implementation - in a real app, you'd use an ENS library to resolve this
    const mockResolveEns = async () => {
      if (!address) return;

      // Simulate ENS lookup
      if (Math.random() > 0.7) {
        // 30% chance of having an ENS name
        await new Promise((resolve) => setTimeout(resolve, 500));
        const mockNames = [
          "crypt0.eth",
          "ico-lover.eth",
          "blockchain-dev.eth",
          "hodler.eth",
        ];
        setEnsName(mockNames[Math.floor(Math.random() * mockNames.length)]);
      }
    };

    mockResolveEns();
  }, [address]);

  // Handle address copy
  const copyAddressToClipboard = () => {
    if (!address) return;

    navigator.clipboard.writeText(address);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  // Format address for display
  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle disconnect
  const handleDisconnect = async () => {
    try {
      await disconnect();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  if (!address) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg px-3 py-2 border border-gray-700"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-2">
          <span className="text-sm font-bold text-white">
            {address.slice(2, 4).toUpperCase()}
          </span>
        </div>

        <div className="text-left">
          <div className="text-white text-sm font-medium">
            {ensName || formatAddress(address)}
          </div>
          {!isBalanceLoading && balanceData && (
            <div className="text-gray-400 text-xs">
              {parseFloat(
                formatUnits(balanceData.value, balanceData.decimals)
              ).toFixed(4)}{" "}
              {balanceData.symbol}
            </div>
          )}
        </div>

        <svg
          className={`ml-2 w-5 h-5 text-gray-400 ${
            isDropdownOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50 animate-fade-in">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium">Wallet</h3>
              <Button variant="outline" size="sm" onClick={handleDisconnect}>
                Disconnect
              </Button>
            </div>

            <div className="bg-gray-900 rounded-md p-3 mb-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Address</span>
                <Tooltip content={isCopied ? "Copied!" : "Copy Address"}>
                  <button
                    onClick={copyAddressToClipboard}
                    className="text-gray-400 hover:text-blue-400"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </button>
                </Tooltip>
              </div>
              <div className="text-sm text-white font-mono break-all mt-1">
                {address}
              </div>
            </div>

            <div className="bg-gray-900 rounded-md p-3">
              <div className="text-gray-400 text-sm mb-1">Balance</div>
              {isBalanceLoading ? (
                <div className="h-5 bg-gray-700 rounded animate-pulse"></div>
              ) : balanceData ? (
                <div className="flex items-baseline">
                  <span className="text-white font-medium mr-1">
                    {parseFloat(
                      formatUnits(balanceData.value, balanceData.decimals)
                    ).toFixed(6)}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {balanceData.symbol}
                  </span>
                </div>
              ) : (
                <div className="text-gray-400">Unable to load balance</div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-700">
              <a
                href={`https://sepolia.etherscan.io/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-blue-400 hover:text-blue-300"
              >
                <span>View on Etherscan</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletDetails;
