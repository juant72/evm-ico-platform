import { utils } from "ethers";
import { Distribution } from "../types/distribution";
import { TokenCreationParams } from "../types/contracts";
import { ADDRESSES } from "./addresses";

/**
 * Default token parameters
 */
export const DEFAULT_TOKEN_PARAMS: TokenCreationParams = {
  name: "Encrypia",
  symbol: "ENC",
  initialSupply: "100000000", // 100 million
  decimals: 18,
  burnable: true,
  mintable: true,
  pausable: true,
};

/**
 * Total supply of tokens
 */
export const TOTAL_SUPPLY = 100000000; // 100 million

/**
 * Initial circulating supply (tokens available at launch)
 */
export const INITIAL_CIRCULATING_SUPPLY = 25000000; // 25 million

/**
 * Initial token price in USD
 */
export const INITIAL_TOKEN_PRICE = 0.05; // $0.05 per token

/**
 * Initial market cap (initial circulating supply * initial price)
 */
export const INITIAL_MARKET_CAP =
  INITIAL_CIRCULATING_SUPPLY * INITIAL_TOKEN_PRICE; // $1.25 million

/**
 * Fully diluted valuation (total supply * initial price)
 */
export const FULLY_DILUTED_VALUATION = TOTAL_SUPPLY * INITIAL_TOKEN_PRICE; // $5 million

/**
 * Default token distribution
 */
export const DEFAULT_TOKEN_DISTRIBUTION: Distribution[] = [
  {
    category: "Public Sale",
    percentage: 25,
    amount: utils.parseEther((TOTAL_SUPPLY * 0.25).toString()),
    color: "#4F46E5", // Indigo
    vestingEnabled: true,
    cliff: 0, // No cliff
    vesting: 6 * 30 * 24 * 60 * 60, // 6 months in seconds
    tgeUnlock: 20, // 20% at TGE
    wallet: ADDRESSES.TEAM.MULTISIG,
    description: "Tokens allocated for the public sale.",
  },
  {
    category: "Private Sale",
    percentage: 15,
    amount: utils.parseEther((TOTAL_SUPPLY * 0.15).toString()),
    color: "#2563EB", // Blue
    vestingEnabled: true,
    cliff: 1 * 30 * 24 * 60 * 60, // 1 month cliff
    vesting: 12 * 30 * 24 * 60 * 60, // 12 months vesting
    tgeUnlock: 10, // 10% at TGE
    wallet: ADDRESSES.TEAM.MULTISIG,
    description: "Tokens allocated for private investors.",
  },
  {
    category: "Team",
    percentage: 20,
    amount: utils.parseEther((TOTAL_SUPPLY * 0.2).toString()),
    color: "#7C3AED", // Purple
    vestingEnabled: true,
    cliff: 6 * 30 * 24 * 60 * 60, // 6 months cliff
    vesting: 24 * 30 * 24 * 60 * 60, // 24 months vesting
    tgeUnlock: 0, // 0% at TGE
    wallet: ADDRESSES.TEAM.FOUNDER,
    description: "Tokens allocated to the team and founders.",
  },
  {
    category: "Advisors",
    percentage: 5,
    amount: utils.parseEther((TOTAL_SUPPLY * 0.05).toString()),
    color: "#EC4899", // Pink
    vestingEnabled: true,
    cliff: 3 * 30 * 24 * 60 * 60, // 3 months cliff
    vesting: 18 * 30 * 24 * 60 * 60, // 18 months vesting
    tgeUnlock: 0, // 0% at TGE
    wallet: ADDRESSES.TEAM.MULTISIG,
    description: "Tokens allocated to project advisors.",
  },
  {
    category: "Marketing",
    percentage: 10,
    amount: utils.parseEther((TOTAL_SUPPLY * 0.1).toString()),
    color: "#F59E0B", // Amber
    vestingEnabled: true,
    cliff: 0, // No cliff
    vesting: 18 * 30 * 24 * 60 * 60, // 18 months vesting
    tgeUnlock: 10, // 10% at TGE
    wallet: ADDRESSES.TEAM.MARKETING,
    description: "Tokens allocated for marketing activities.",
  },
  {
    category: "Ecosystem",
    percentage: 15,
    amount: utils.parseEther((TOTAL_SUPPLY * 0.15).toString()),
    color: "#10B981", // Emerald
    vestingEnabled: true,
    cliff: 3 * 30 * 24 * 60 * 60, // 3 months cliff
    vesting: 36 * 30 * 24 * 60 * 60, // 36 months vesting
    tgeUnlock: 5, // 5% at TGE
    wallet: ADDRESSES.TEAM.MULTISIG,
    description: "Tokens allocated for ecosystem development and partnerships.",
  },
  {
    category: "Liquidity",
    percentage: 5,
    amount: utils.parseEther((TOTAL_SUPPLY * 0.05).toString()),
    color: "#0EA5E9", // Sky
    vestingEnabled: false,
    tgeUnlock: 100, // 100% at TGE
    wallet: ADDRESSES.TEAM.MULTISIG,
    description: "Tokens allocated for providing liquidity on DEXes.",
  },
  {
    category: "Treasury",
    percentage: 5,
    amount: utils.parseEther((TOTAL_SUPPLY * 0.05).toString()),
    color: "#6366F1", // Indigo
    vestingEnabled: true,
    cliff: 6 * 30 * 24 * 60 * 60, // 6 months cliff
    vesting: 36 * 30 * 24 * 60 * 60, // 36 months vesting
    tgeUnlock: 0, // 0% at TGE
    wallet: ADDRESSES.TEAM.DEVELOPMENT,
    description: "Tokens allocated for protocol treasury.",
  },
];

/**
 * ICO stages configuration
 */
export const ICO_STAGES = [
  {
    name: "Seed",
    price: INITIAL_TOKEN_PRICE * 0.5, // 50% of public price
    discount: "50%",
    supplyPercentage: 5,
    tokenAmount: TOTAL_SUPPLY * 0.05,
    hardCap: TOTAL_SUPPLY * 0.05 * (INITIAL_TOKEN_PRICE * 0.5),
    minContribution: 5, // in ETH
    maxContribution: 100, // in ETH
    vestingMonths: 12,
    tgeUnlock: 10, // 10% at TGE
    cliff: 1, // 1 month cliff
  },
  {
    name: "Private",
    price: INITIAL_TOKEN_PRICE * 0.75, // 75% of public price
    discount: "25%",
    supplyPercentage: 10,
    tokenAmount: TOTAL_SUPPLY * 0.1,
    hardCap: TOTAL_SUPPLY * 0.1 * (INITIAL_TOKEN_PRICE * 0.75),
    minContribution: 3, // in ETH
    maxContribution: 50, // in ETH
    vestingMonths: 9,
    tgeUnlock: 15, // 15% at TGE
    cliff: 0, // No cliff
  },
  {
    name: "Public",
    price: INITIAL_TOKEN_PRICE, // Full public price
    discount: "0%",
    supplyPercentage: 10,
    tokenAmount: TOTAL_SUPPLY * 0.1,
    hardCap: TOTAL_SUPPLY * 0.1 * INITIAL_TOKEN_PRICE,
    minContribution: 0.1, // in ETH
    maxContribution: 10, // in ETH
    vestingMonths: 6,
    tgeUnlock: 20, // 20% at TGE
    cliff: 0, // No cliff
  },
];

/**
 * Vesting period in months for different allocation categories
 */
export const VESTING_PERIODS = {
  publicSale: 6,
  privateSale: 12,
  seed: 12,
  team: 24,
  advisors: 18,
  marketing: 18,
  ecosystem: 36,
  treasury: 36,
};

/**
 * TGE (Token Generation Event) unlock percentages
 */
export const TGE_UNLOCK_PERCENTAGES = {
  publicSale: 20,
  privateSale: 10,
  seed: 10,
  team: 0,
  advisors: 0,
  marketing: 10,
  ecosystem: 5,
  liquidity: 100,
  treasury: 0,
};

/**
 * Cliff periods in months for different allocation categories
 */
export const CLIFF_PERIODS = {
  publicSale: 0,
  privateSale: 1,
  seed: 1,
  team: 6,
  advisors: 3,
  marketing: 0,
  ecosystem: 3,
  liquidity: 0,
  treasury: 6,
};

/**
 * Calculate the amount of tokens unlocked at TGE
 * @returns The total number of tokens unlocked at TGE
 */
export const calculateInitialUnlock = (): number => {
  return DEFAULT_TOKEN_DISTRIBUTION.reduce((sum, allocation) => {
    return (
      sum + (Number(allocation.amount) * (allocation.tgeUnlock || 0)) / 100
    );
  }, 0);
};

/**
 * Colors for token distribution categories in charts
 */
export const CATEGORY_COLORS = {
  "Public Sale": "#4F46E5",
  "Private Sale": "#2563EB",
  "Seed Sale": "#1D4ED8",
  Team: "#7C3AED",
  Advisors: "#EC4899",
  Marketing: "#F59E0B",
  Ecosystem: "#10B981",
  Liquidity: "#0EA5E9",
  Treasury: "#6366F1",
  Development: "#D946EF",
  Community: "#14B8A6",
  Rewards: "#F97316",
  Airdrop: "#EF4444",
  Partners: "#8B5CF6",
  Reserve: "#64748B",
};

/**
 * Get color for a distribution category
 * @param category Distribution category
 * @returns Color code
 */
export const getCategoryColor = (category: string): string => {
  return CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] || "#64748B";
};
