import React, { useState } from "react";
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useCoinbaseWallet,
  useWalletConnect,
} from "@thirdweb-dev/react";
import Button from "../common/Button";
import Modal from "../common/Modal";

/**
 * WalletConnect component for connecting to various wallets
 */
const WalletConnect = () => {
  const address = useAddress();
  const disconnect = useDisconnect();
  const connectMetamask = useMetamask();
  const connectCoinbaseWallet = useCoinbaseWallet();
  const connectWalletConnect = useWalletConnect();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Connect wallet handlers
  const handleConnect = async (
    connectMethod: () => Promise<any>,
    walletName: string
  ) => {
    setIsConnecting(true);
    setError(null);

    try {
      await connectMethod();
      setIsModalOpen(false);
    } catch (err: any) {
      console.error(`Error connecting to ${walletName}:`, err);
      setError(err.message || `Failed to connect to ${walletName}`);
    } finally {
      setIsConnecting(false);
    }
  };

  // Handle disconnect
  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (err) {
      console.error("Error disconnecting wallet:", err);
    }
  };

  // Wallet options
  const walletOptions = [
    {
      name: "MetaMask",
      icon: "/images/wallets/metamask.svg",
      description: "Connect to your MetaMask wallet",
      connectMethod: () => handleConnect(connectMetamask, "MetaMask"),
    },
    {
      name: "Coinbase Wallet",
      icon: "/images/wallets/coinbase.svg",
      description: "Connect to your Coinbase wallet",
      connectMethod: () =>
        handleConnect(connectCoinbaseWallet, "Coinbase Wallet"),
    },
    {
      name: "WalletConnect",
      icon: "/images/wallets/walletconnect.svg",
      description: "Connect to your mobile wallet",
      connectMethod: () => handleConnect(connectWalletConnect, "WalletConnect"),
    },
  ];

  if (address) {
    return (
      <Button variant="outline" size="sm" onClick={handleDisconnect}>
        Disconnect
      </Button>
    );
  }

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} size="sm">
        Connect Wallet
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => !isConnecting && setIsModalOpen(false)}
        title="Connect Wallet"
        closeOnEsc={!isConnecting}
        closeOnOutsideClick={!isConnecting}
        showCloseButton={!isConnecting}
      >
        <div className="p-2">
          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded mb-4">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="flex flex-col gap-4">
            {walletOptions.map((wallet, index) => (
              <button
                key={index}
                onClick={wallet.connectMethod}
                disabled={isConnecting}
                className="flex items-center p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-left"
              >
                <div className="w-10 h-10 bg-gray-800 rounded-full p-2 mr-3">
                  <img
                    src={wallet.icon}
                    alt={wallet.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://via.placeholder.com/40?text=Wallet";
                    }}
                    className="w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">{wallet.name}</h3>
                  <p className="text-gray-300 text-sm">{wallet.description}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 text-center text-sm text-gray-400">
            <p>
              By connecting your wallet, you agree to our{" "}
              <a href="/terms" className="text-blue-400 hover:text-blue-300">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-400 hover:text-blue-300">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default WalletConnect;
