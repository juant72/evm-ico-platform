import React, { useState } from "react";
import { useDistribution } from "../../hooks/useDistribution";
import { formatTokenAmount } from "../../utils/format";

const LiquidityMinting: React.FC = () => {
  const { mintLiquidity, getLiquidityRatio, isLoading } = useDistribution();
  const [amount, setAmount] = useState("");
  const [ratio, setRatio] = useState(1);

  const handleMint = async () => {
    try {
      await mintLiquidity(amount);
      setAmount("");
    } catch (error) {
      console.error("Failed to mint liquidity:", error);
    }
  };

  const handleAmountChange = async (value: string) => {
    setAmount(value);
    if (value) {
      const newRatio = await getLiquidityRatio(value);
      setRatio(newRatio);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-6">Provide Liquidity</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Token Amount
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
              placeholder="Enter amount..."
            />
            <div className="absolute right-3 top-2 text-gray-400">Tokens</div>
          </div>
        </div>

        {amount && (
          <div className="bg-gray-700 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Exchange Rate</span>
              <span className="text-white">1 Token = {ratio} ETH</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">You Will Get</span>
              <span className="text-white">
                {formatTokenAmount(Number(amount) * ratio)} LP Tokens
              </span>
            </div>
          </div>
        )}

        <button
          onClick={handleMint}
          disabled={isLoading || !amount}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Processing..." : "Provide Liquidity"}
        </button>
      </div>
    </div>
  );
};

export default LiquidityMinting;
