import { Chain } from "@thirdweb-dev/react";
import { CHAIN_IDS } from "../utils/constants";

/**
 * Supported chain configurations for the platform
 */
export const SUPPORTED_CHAINS: Chain[] = [
  {
    chainId: CHAIN_IDS.ETHEREUM_MAINNET,
    rpc: [
      "https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}",
      "https://mainnet.infura.io/v3/${INFURA_API_KEY}",
      "https://rpc.ankr.com/eth",
    ],
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    shortName: "eth",
    slug: "ethereum",
    chain: "ETH",
    name: "Ethereum Mainnet",
    testnet: false,
    icon: {
      url: "/images/chains/ethereum.svg",
      height: 32,
      width: 32,
    },
  },
  {
    chainId: CHAIN_IDS.ETHEREUM_SEPOLIA,
    rpc: [
      "https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}",
      "https://sepolia.infura.io/v3/${INFURA_API_KEY}",
    ],
    nativeCurrency: {
      name: "Sepolia Ether",
      symbol: "ETH",
      decimals: 18,
    },
    shortName: "sepolia",
    slug: "sepolia",
    chain: "ETH",
    name: "Sepolia Testnet",
    testnet: true,
    icon: {
      url: "/images/chains/ethereum-test.svg",
      height: 32,
      width: 32,
    },
    explorers: [
      {
        name: "Sepolia Etherscan",
        url: "https://sepolia.etherscan.io",
        standard: "EIP3091",
      },
    ],
  },
];

/**
 * Default chain for the application
 */
export const DEFAULT_CHAIN =
  SUPPORTED_CHAINS.find(
    (chain) => chain.chainId === CHAIN_IDS.ETHEREUM_SEPOLIA
  ) || SUPPORTED_CHAINS[0];

/**
 * Chain metadata with additional information
 */
export const CHAIN_METADATA: {
  [chainId: number]: {
    blockExplorer: string;
    blockTime: number; // Average block time in seconds
    gasPrice: string; // Typical gas price in gwei
    isTestnet: boolean;
    isSupported: boolean;
    logoUrl: string;
    nativeCurrencyPrice: number; // Approximate price in USD
    recommended: boolean;
  };
} = {
  [CHAIN_IDS.ETHEREUM_MAINNET]: {
    blockExplorer: "https://etherscan.io",
    blockTime: 12,
    gasPrice: "15",
    isTestnet: false,
    isSupported: true,
    logoUrl: "/images/chains/ethereum.svg",
    nativeCurrencyPrice: 2500, // Example price, would be fetched dynamically
    recommended: false,
  },
  [CHAIN_IDS.ETHEREUM_SEPOLIA]: {
    blockExplorer: "https://sepolia.etherscan.io",
    blockTime: 12,
    gasPrice: "10",
    isTestnet: true,
    isSupported: true,
    logoUrl: "/images/chains/ethereum-test.svg",
    nativeCurrencyPrice: 2500, // Test ETH has same reference price
    recommended: true,
  },
};

/**
 * RPC configurations by chain ID
 */
export const RPC_URLS: { [chainId: number]: string } = {
  [CHAIN_IDS.ETHEREUM_MAINNET]:
    process.env.NEXT_PUBLIC_MAINNET_RPC_URL ||
    "https://eth-mainnet.g.alchemy.com/v2/demo",
  [CHAIN_IDS.ETHEREUM_SEPOLIA]:
    process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL ||
    "https://eth-sepolia.g.alchemy.com/v2/demo",
};

/**
 * Get chain by chain ID
 * @param chainId Chain ID to look up
 * @returns Chain object or undefined if not found
 */
export const getChainById = (chainId?: number): Chain | undefined => {
  if (!chainId) return undefined;
  return SUPPORTED_CHAINS.find((chain) => chain.chainId === chainId);
};

/**
 * Check if a chain is supported
 * @param chainId Chain ID to check
 * @returns Boolean indicating if the chain is supported
 */
export const isChainSupported = (chainId?: number): boolean => {
  if (!chainId) return false;
  return SUPPORTED_CHAINS.some((chain) => chain.chainId === chainId);
};

/**
 * Get chain name by chain ID
 * @param chainId Chain ID to look up
 * @returns Chain name or "Unknown Network" if not found
 */
export const getChainName = (chainId?: number): string => {
  if (!chainId) return "Unknown Network";
  const chain = getChainById(chainId);
  return chain?.name || "Unknown Network";
};

/**
 * RPC request timeout in milliseconds
 */
export const RPC_TIMEOUT = 10000;
