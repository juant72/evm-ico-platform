import React from "react";
import { useAddress, useConnect } from "@thirdweb-dev/react";
import Link from "next/link";

/**
 * Hero section component for the landing page
 * This is the main banner section with call-to-action buttons
 */
const Hero = () => {
  const address = useAddress();
  const connect = useConnect();

  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-blue-900">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:max-w-2xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="block">Launch your token with</span>
              <span className="block text-blue-400">secure ICO platform</span>
            </h1>
            <p className="mt-6 max-w-lg text-xl text-gray-300">
              A complete solution for launching and participating in Initial
              Coin Offerings with advanced tokenomics, DAO governance, and
              secure token distribution.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              {address ? (
                <>
                  <Link href="/dashboard" passHref>
                    <div className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl inline-block text-center">
                      Dashboard
                    </div>
                  </Link>
                  <Link href="/participate" passHref>
                    <div className="bg-transparent border-2 border-blue-600 hover:border-blue-500 text-blue-400 hover:text-blue-300 px-8 py-4 rounded-lg text-lg font-medium shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl inline-block text-center">
                      Participate in ICO
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={() => connect()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
                  >
                    Connect Wallet
                  </button>
                  <Link href="/tokenomics" passHref>
                    <div className="bg-transparent border-2 border-blue-600 hover:border-blue-500 text-blue-400 hover:text-blue-300 px-8 py-4 rounded-lg text-lg font-medium shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl inline-block text-center">
                      Learn More
                    </div>
                  </Link>
                </>
              )}
            </div>

            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                {/* Mock user avatars */}
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`inline-block h-8 w-8 rounded-full bg-gray-${
                      400 + i * 100
                    } border-2 border-gray-900`}
                  ></div>
                ))}
              </div>
              <span className="ml-3 text-sm font-medium text-gray-300">
                Join 1,200+ investors already participating
              </span>
            </div>
          </div>

          <div className="mt-12 md:mt-0 md:ml-8">
            <div className="relative bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-2xl">
              <div className="text-center mb-4">
                <div className="text-sm font-medium text-gray-400">
                  TOKEN SALE PROGRESS
                </div>
                <div className="text-2xl font-bold text-white mt-1">
                  75% Complete
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>

              <div className="flex justify-between text-sm text-gray-400 mb-6">
                <span>0 ETH</span>
                <span>750/1000 ETH</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-400">Price</div>
                  <div className="text-lg font-bold text-white">0.0001 ETH</div>
                </div>
                <div className="text-center p-3 bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-400">Ending in</div>
                  <div className="text-lg font-bold text-white">14 days</div>
                </div>
              </div>

              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
                onClick={() => !address && connect()}
              >
                {address ? "Participate Now" : "Connect to Participate"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
