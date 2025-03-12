import { BigNumber } from "ethers";

/**
 * Investor profile interface
 */
export interface Investor {
  id: string;
  address: string;
  ensName?: string; // ENS name if available
  isWhitelisted: boolean;
  icoParticipation?: IcoParticipation[];
  investments?: Investment[];
  vestingSchedules?: InvestorVestingSchedule[];
  tokens?: TokenBalance[];
  kycStatus?: KycStatus;
  totalInvested: BigNumber | number;
  totalTokensOwned: BigNumber | number;
  totalTokensClaimable: BigNumber | number;
  lastActivity?: number; // Timestamp
  joinedAt: number; // Timestamp
  referrer?: string; // Address of referrer
}

/**
 * KYC status for investors
 */
export type KycStatus =
  | "notStarted"
  | "pending"
  | "approved"
  | "rejected"
  | "expired";

/**
 * ICO participation record
 */
export interface IcoParticipation {
  id: string;
  investor: string;
  icoId: string;
  icoAddress: string;
  tokenAddress: string;
  contributionAmount: BigNumber;
  tokenAmount: BigNumber;
  contributionTimestamp: number;
  price: number; // Price per token in ETH
  transactionHash: string;
  claimedAmount: BigNumber;
  remainingAmount: BigNumber;
  nextClaimDate?: number; // Timestamp
}

/**
 * Investment record
 */
export interface Investment {
  id: string;
  investor: string;
  projectId: string;
  projectName: string;
  tokenSymbol: string;
  tokenAddress: string;
  amount: BigNumber;
  usdValue: number;
  investmentDate: number; // Timestamp
  round: "seed" | "private" | "public" | string;
  status: InvestmentStatus;
  roi?: number; // Return on investment percentage
  currentValue?: number; // Current USD value
}

/**
 * Investment status
 */
export type InvestmentStatus =
  | "active"
  | "completed"
  | "refunded"
  | "canceled"
  | "pending";

/**
 * Vesting schedule for investor
 */
export interface InvestorVestingSchedule {
  id: string;
  investor: string;
  tokenAddress: string;
  tokenSymbol: string;
  totalAmount: BigNumber;
  startDate: number; // Timestamp
  endDate: number; // Timestamp
  cliff: number; // Duration in seconds
  releasedAmount: BigNumber;
  nextRelease: NextTokenRelease;
  releaseHistory: TokenRelease[];
}

/**
 * Next token release
 */
export interface NextTokenRelease {
  date: number; // Timestamp
  amount: BigNumber;
  percentage: number;
}

/**
 * Token release record
 */
export interface TokenRelease {
  id: string;
  amount: BigNumber;
  date: number; // Timestamp
  transactionHash?: string;
  successful: boolean;
}

/**
 * Token balance
 */
export interface TokenBalance {
  tokenAddress: string;
  tokenSymbol: string;
  tokenName: string;
  balance: BigNumber;
  usdValue?: number;
  decimals: number;
}

/**
 * Investor statistics
 */
export interface InvestorStats {
  totalInvestors: number;
  activeInvestors: number; // Investors with non-zero balances
  avgInvestment: number; // In USD
  medianInvestment: number; // In USD
  topInvestors: Investor[]; // Top 10 by amount
  newInvestorsLast30Days: number;
  investmentDistribution: {
    range: string; // e.g., "0-100", "100-1000", etc.
    count: number;
    percentage: number;
  }[];
  kycCompletionRate: number; // Percentage
}
