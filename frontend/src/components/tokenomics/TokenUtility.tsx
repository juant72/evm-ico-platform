import React from "react";
import { TOKEN_UTILITIES } from "../../constants/tokenomics";

const TokenUtility: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-6">Token Utility</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOKEN_UTILITIES.map((utility) => (
          <div
            key={utility.title}
            className="bg-gray-700 rounded-lg p-6 border border-gray-600"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                {utility.icon}
              </div>
              <h3 className="ml-3 text-lg font-medium text-white">
                {utility.title}
              </h3>
            </div>
            <p className="text-gray-300">{utility.description}</p>
            {utility.benefits && (
              <ul className="mt-4 space-y-2">
                {utility.benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-start text-sm text-gray-400"
                  >
                    <svg
                      className="h-5 w-5 text-blue-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenUtility;
