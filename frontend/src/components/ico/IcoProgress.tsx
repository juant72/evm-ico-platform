import React from "react";
import { useIco } from "../../hooks/useIco";
import { formatTokenAmount, formatUSD } from "../../utils/format";

const IcoProgress: React.FC = () => {
  const { icoStats, currentPhase, isLoading } = useIco();

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-1/3 mb-4" />
        <div className="h-4 bg-gray-700 rounded w-full mb-2" />
      </div>
    );
  }

  const progress = (icoStats.totalRaised / icoStats.hardCap) * 100;

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">ICO Progress</h2>
        <span className="text-blue-400">Phase {currentPhase.number}</span>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Progress</span>
          <span>{progress.toFixed(2)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div
            className="bg-blue-600 rounded-full h-4 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400 text-sm">Raised</p>
          <p className="text-2xl font-bold text-white">
            {formatUSD(icoStats.totalRaised)}
          </p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Hard Cap</p>
          <p className="text-2xl font-bold text-white">
            {formatUSD(icoStats.hardCap)}
          </p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Tokens Sold</p>
          <p className="text-2xl font-bold text-white">
            {formatTokenAmount(icoStats.tokensSold)}
          </p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Participants</p>
          <p className="text-2xl font-bold text-white">
            {icoStats.participants.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IcoProgress;
