import React, { useState, useEffect } from "react";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import Card from "../common/Card";

/**
 * Displays the user's token balance with current market value
 */
const TokenBalance = () => {
  const address = useAddress();
  const [isLoading, setIsLoading] = useState(true);
  const [tokenData, setTokenData] = useState({
    balance: "0",
    symbol: "ENC",
    name: "Encrypia",
    value: 0,
    change: 2.4,
    tokenAddress: "0x123...456", // This would be your actual token contract address
  });

  // Mock token contract - replace with your actual token contract
  const { contract } = useContract(tokenData.tokenAddress);
  const { data: tokenBalance } = useTokenBalance(contract, address);

  useEffect(() => {
    // Simulate loading token data
    const timer = setTimeout(() => {
      // In a real app, this data would come from your contract or API
      setTokenData({
        balance: "10,000",
        symbol: "ENC",
        name: "Encrypia",
        value: 1250.0,
        change: 2.4,
        tokenAddress: "0x123...456",
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="h-full">
      <div className={`flex flex-col ${isLoading ? "opacity-50" : ""}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Token Balance</h3>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-xs font-bold">{tokenData.symbol}</span>
            </div>
            <span className="text-sm text-gray-300">{tokenData.name}</span>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center py-6">
            <div className="animate-pulse flex space-x-4">
              <div className="h-8 w-28 bg-gray-700 rounded"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-white">
                {tokenData.balance}
              </span>
              <span className="ml-2 text-sm text-gray-400">
                {tokenData.symbol}
              </span>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">Value</span>
                <span className="text-white font-medium">
                  ${tokenData.value.toFixed(2)} USD
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">24h Change</span>
                <span
                  className={
                    tokenData.change >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {tokenData.change >= 0 ? "+" : ""}
                  {tokenData.change}%
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200">
                View Token Details
              </button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default TokenBalance;
