import { CHAIN_IDS } from "../utils/constants";

/**
 * Contract addresses organized by network
 */
export const ADDRESSES = {
  // Token contract addresses
  TOKEN: {
    [CHAIN_IDS.ETHEREUM_MAINNET]: "",
    [CHAIN_IDS.ETHEREUM_SEPOLIA]: "0x612BA2875374894Ab9E0BF1d015c9eC4dC0f8757",
  },

  // ICO contract addresses
  ICO: {
    [CHAIN_IDS.ETHEREUM_MAINNET]: "",
    [CHAIN_IDS.ETHEREUM_SEPOLIA]: "0x259a2795624b8a17bc7eb312a94504ad0f615d1e",
  },

  // Vesting contract addresses
  VESTING: {
    [CHAIN_IDS.ETHEREUM_MAINNET]: "",
    [CHAIN_IDS.ETHEREUM_SEPOLIA]: "0x7c833A71Dd3B6cb96761c444E3D71A9ca1041843",
  },

  // Staking contract addresses
  STAKING: {
    [CHAIN_IDS.ETHEREUM_MAINNET]: "",
    [CHAIN_IDS.ETHEREUM_SEPOLIA]: "0x1bE3A2e566cD0d225C5E34Ea0c90A194ac739192",
  },

  // Governance contract addresses
  GOVERNANCE: {
    [CHAIN_IDS.ETHEREUM_MAINNET]: "",
    [CHAIN_IDS.ETHEREUM_SEPOLIA]: "0x3aF7E38Cf35D10962A90E99fF4313D3C67F4a35E",
  },

  // Timelock controller addresses
  TIMELOCK: {
    [CHAIN_IDS.ETHEREUM_MAINNET]: "",
    [CHAIN_IDS.ETHEREUM_SEPOLIA]: "0xfa31095D88B56E4e70C67bfDD68eccE107180675",
  },

  // Treasury contract addresses
  TREASURY: {
    [CHAIN_IDS.ETHEREUM_MAINNET]: "",
    [CHAIN_IDS.ETHEREUM_SEPOLIA]: "0x2123050Ac4fa4cEfc1aFf8a4c9593Fc64c2B1980",
  },

  // Multicall contract addresses (for batched calls)
  MULTICALL: {
    [CHAIN_IDS.ETHEREUM_MAINNET]: "0xcA11bde05977b3631167028862bE2a173976CA11",
    [CHAIN_IDS.ETHEREUM_SEPOLIA]: "0xcA11bde05977b3631167028862bE2a173976CA11",
  },

  // Token price feed (Chainlink)
  PRICE_FEED: {
    [CHAIN_IDS.ETHEREUM_MAINNET]: "",
    [CHAIN_IDS.ETHEREUM_SEPOLIA]: "0x694AA1769357215DE4FAC081bf1f309aDC325306", // ETH/USD price feed
  },

  // Team and deployment addresses
  TEAM: {
    // Team multisig
    MULTISIG: "0x8D619cC717f272d8ffc929cc8494db0BbEf933F3",
    // Project founder
    FOUNDER: "0xD979acD786A92a4Fb8d1046886B68Fc9896a3C25",
    // Marketing wallet
    MARKETING: "0x8B812790afA58C4A9Ae5ce939E4C13b96E9Cf5b3",
    // Development fund
    DEVELOPMENT: "0x1C5bF1cbE42380Bcea491608510955b277Cc8594",
  },

  // Liquidity pools
  LIQUIDITY_POOLS: {
    // Uniswap V3 pool
    UNISWAP_V3: {
      [CHAIN_IDS.ETHEREUM_MAINNET]: "",
      [CHAIN_IDS.ETHEREUM_SEPOLIA]:
        "0x7B309b0dc63B36919c6DFFf93191A53F0FB63c6c",
    },
  },

  // Token price feed (Chainlink)
  WHITELIST: {
    [CHAIN_IDS.ETHEREUM_MAINNET]: "",
    [CHAIN_IDS.ETHEREUM_SEPOLIA]: "0x694AA1769357215DE4FAC081bf1f309aDC325306", // ETH/USD price feed
  },
};

/**
 * Get contract address based on chainId
 * @param contractType Contract type key from ADDRESSES
 * @param chainId Current chain ID
 * @returns Contract address or empty string if not found
 */
export const getContractAddress = (
  contractType: keyof typeof ADDRESSES,
  chainId: number = CHAIN_IDS.ETHEREUM_SEPOLIA
): string => {
  const addressMap = ADDRESSES[contractType];
  if (!addressMap) return "";

  // Cast addressMap to an object with number keys
  const addresses = addressMap as unknown as { [key: number]: string };
  return addresses[chainId] || "";
};

/**
 * Check if all core contracts are deployed on a specific network
 * @param chainId Chain ID to check
 * @returns Boolean indicating if all core contracts are deployed
 */
export const isNetworkFullyDeployed = (chainId: number): boolean => {
  const coreContracts = ["TOKEN", "ICO", "VESTING", "GOVERNANCE"];

  return coreContracts.every((contractType) => {
    const address = getContractAddress(
      contractType as keyof typeof ADDRESSES,
      chainId
    );
    return address !== "" && address.length === 42;
  });
};

/**
 * Get explorer URL for address
 * @param address Contract or wallet address
 * @param chainId Chain ID
 * @returns Explorer URL
 */
export const getExplorerAddressUrl = (
  address: string,
  chainId: number = CHAIN_IDS.ETHEREUM_SEPOLIA
): string => {
  if (!address) return "";

  switch (chainId) {
    case CHAIN_IDS.ETHEREUM_MAINNET:
      return `https://etherscan.io/address/${address}`;
    case CHAIN_IDS.ETHEREUM_SEPOLIA:
      return `https://sepolia.etherscan.io/address/${address}`;
    default:
      return `https://sepolia.etherscan.io/address/${address}`;
  }
};

/**
 * Get explorer URL for transaction
 * @param txHash Transaction hash
 * @param chainId Chain ID
 * @returns Explorer URL
 */
export const getExplorerTxUrl = (
  txHash: string,
  chainId: number = CHAIN_IDS.ETHEREUM_SEPOLIA
): string => {
  if (!txHash) return "";

  switch (chainId) {
    case CHAIN_IDS.ETHEREUM_MAINNET:
      return `https://etherscan.io/tx/${txHash}`;
    case CHAIN_IDS.ETHEREUM_SEPOLIA:
      return `https://sepolia.etherscan.io/tx/${txHash}`;
    default:
      return `https://sepolia.etherscan.io/tx/${txHash}`;
  }
};
