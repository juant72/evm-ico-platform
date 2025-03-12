import { BigNumber } from "ethers";

/**
 * Token interface representing an ERC20 token
 */
export interface Token {
  id: string;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: BigNumber;
  owner: string;
  circulatingSupply?: BigNumber;
  logo?: string;
  website?: string;
  socials?: TokenSocials;
  description?: string;
  launchDate?: number; // Timestamp
  marketData?: TokenMarketData;
  stats?: TokenStats;
  features?: TokenFeatures;
  tags?: string[];
}

/**
 * Token social links
 */
export interface TokenSocials {
  twitter?: string;
  telegram?: string;
  discord?: string;
  github?: string;
  medium?: string;
  reddit?: string;
  linkedin?: string;
}

/**
 * Token market data
 */
export interface TokenMarketData {
  price?: number; // In USD
  priceChange24h?: number; // Percentage
  priceChange7d?: number; // Percentage
  marketCap?: number; // In USD
  fullyDilutedValuation?: number; // In USD
  volume24h?: number; // In USD
  liquidity?: number; // In USD
  ath?: number; // All-time high in USD
  atl?: number; // All-time low in USD
  athDate?: number; // Timestamp
  atlDate?: number; // Timestamp
  pairAddress?: string; // DEX pair address
}

/**
 * Token statistics
 */
export interface TokenStats {
  holders?: number;
  transactions?: number;
  transfers?: number;
  averageHolding?: BigNumber;
  largestHolding?: BigNumber;
  largestHolder?: string;
  creationDate?: number; // Timestamp
  tokenomics?: TokenTokenomics;
}

/**
 * Token tokenomics
 */
export interface TokenTokenomics {
  initialSupply: BigNumber;
  maxSupply?: BigNumber;
  genesisDistribution?: {
    category: string;
    amount: BigNumber;
    percentage: number;
  }[];
  inflationRate?: number; // Annual inflation percentage
  burnMechanism?: string;
  vestingSchedules?: {
    category: string;
    amount: BigNumber;
    cliff: number; // Duration in seconds
    vesting: number; // Duration in seconds
  }[];
}

/**
 * Token features
 */
export interface TokenFeatures {
  isMintable: boolean;
  isBurnable: boolean;
  isPausable: boolean;
  isUpgradeable: boolean;
  hasTransferFee: boolean;
  transferFeePercentage?: number;
  hasReflection: boolean;
  reflectionPercentage?: number;
  isDeflationary: boolean;
  burnPercentage?: number;
  isGovernance: boolean;
  hasTimeLock: boolean;
  isStakeable: boolean;
  stakingRewardType?: "fixed" | "variable" | "lp";
  stakingAPY?: number;
}

/**
 * Token transaction
 */
export interface TokenTransaction {
  id: string;
  hash: string;
  blockNumber: number;
  timestamp: number;
  from: string;
  to: string;
  value: BigNumber;
  fee: BigNumber;
  successful: boolean;
  type: TokenTransactionType;
}

/**
 * Token transaction type
 */
export type TokenTransactionType =
  | "transfer"
  | "mint"
  | "burn"
  | "approve"
  | "transferFrom"
  | "stake"
  | "unstake"
  | "claim"
  | "addLiquidity"
  | "removeLiquidity"
  | "swap";

/**
 * Token holder
 */
export interface TokenHolder {
  address: string;
  ensName?: string;
  balance: BigNumber;
  percentage: number;
  value?: number; // USD value
  lastActivity?: number; // Timestamp
}

/**
 * Token price history point
 */
export interface TokenPricePoint {
  timestamp: number;
  price: number; // In USD
  volume?: number; // In USD
}

/**
 * Token creation parameters
 */
export interface TokenCreationParams {
  name: string;
  symbol: string;
  decimals: number;
  initialSupply: string | number;
  maxSupply?: string | number;
  isMintable: boolean;
  isBurnable: boolean;
  isPausable: boolean;
  isUpgradeable: boolean;
  hasTransferFee: boolean;
  transferFeePercentage?: number;
  description?: string;
  website?: string;
  logo?: string;
  socials?: TokenSocials;
}
