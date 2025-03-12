import React, { useState, useEffect } from "react";
import { useChain, useSwitchChain, useChainId } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import Button from "../common/Button";
import Tooltip from "../common/Tooltip";

/**
 * Network Switch component for changing between blockchain networks
 */
const NetworkSwitch = () => {
  const chainId = useChainId();
  const chain = useChain();
  const switchChain = useSwitchChain();
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  // Define supported networks
  const supportedNetworks = [
    {
      ...Sepolia,
      name: "Sepolia",
      icon: "/images/networks/sepolia.svg",
      isTestnet: true,
      isRecommended: true,
    },
  ];

  // Check if user is on a supported network
  useEffect(() => {
    if (!chainId) return;

    const isSupported = supportedNetworks.some(
      (network) => network.chainId === chainId
    );
    setIsWrongNetwork(!isSupported);
  }, [chainId]);

  // Handle network switch
  const handleNetworkSwitch = async (networkChainId: number) => {
    try {
      setIsSwitching(true);
      await switchChain(networkChainId);
    } catch (error) {
      console.error("Error switching network:", error);
    } finally {
      setIsSwitching(false);
    }
  };

  // Current network display
  const getCurrentNetworkDisplay = () => {
    if (!chain) {
      return (
        <div className="flex items-center px-4 py-2 bg-gray-800 rounded-md border border-gray-700">
          <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
          <span className="text-gray-400 text-sm">Not Connected</span>
        </div>
      );
    }

    const currentNetwork = supportedNetworks.find(
      (network) => network.chainId === chain.chainId
    );
    const isTestnet = currentNetwork?.isTestnet || false;

    return (
      <div className="flex items-center px-4 py-2 bg-gray-800 rounded-md border border-gray-700 cursor-pointer hover:border-gray-600">
        <div
          className={`w-3 h-3 ${
            isWrongNetwork ? "bg-red-500" : "bg-green-500"
          } rounded-full mr-2`}
        ></div>
        <span className="text-white text-sm mr-1">{chain.name}</span>
        {isTestnet && (
          <span className="text-xs py-0.5 px-1.5 bg-purple-900 text-purple-200 rounded">
            Testnet
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="relative">
      {isWrongNetwork && (
        <div className="absolute -top-10 left-0 right-0 bg-red-900/70 text-red-200 text-xs text-center py-1 px-2 rounded-md">
          Please switch to a supported network
        </div>
      )}

      <div className="dropdown inline-block relative">
        <div className="select-none">{getCurrentNetworkDisplay()}</div>

        <div className="dropdown-menu absolute right-0 hidden pt-2 group-hover:block hover:block z-10 min-w-[200px]">
          <div className="bg-gray-800 border border-gray-700 rounded-md shadow-xl p-2 animate-fade-in">
            <div className="text-xs text-gray-400 px-3 py-2">
              Select Network
            </div>

            {supportedNetworks.map((network) => (
              <div
                key={network.chainId}
                onClick={() => handleNetworkSwitch(network.chainId)}
                className={`flex items-center p-2 rounded hover:bg-gray-700 cursor-pointer ${
                  chain && chain.chainId === network.chainId
                    ? "bg-gray-700"
                    : ""
                }`}
              >
                <div className="flex-shrink-0 w-6 h-6 mr-2">
                  <img
                    src={network.icon}
                    alt={network.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://via.placeholder.com/24?text=Chain";
                    }}
                    className="w-6 h-6 rounded-full"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">{network.name}</span>
                    {network.isRecommended && (
                      <span className="text-xs py-0.5 px-1.5 bg-green-900 text-green-200 rounded ml-2">
                        Recommended
                      </span>
                    )}
                  </div>

                  {network.isTestnet && (
                    <span className="text-xs text-gray-400">Testnet</span>
                  )}
                </div>

                {chain && chain.chainId === network.chainId && (
                  <svg
                    className="w-5 h-5 text-green-500 ml-2"
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
                )}
              </div>
            ))}

            {isWrongNetwork && (
              <div className="p-2 mt-2 border-t border-gray-700">
                <Button
                  size="sm"
                  fullWidth
                  onClick={() =>
                    handleNetworkSwitch(supportedNetworks[0].chainId)
                  }
                  isLoading={isSwitching}
                >
                  Switch to {supportedNetworks[0].name}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkSwitch;
