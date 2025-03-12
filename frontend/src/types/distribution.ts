import { BigNumber } from "ethers";

/**
 * Token distribution category types
 */
export type DistributionCategory =
  | "Public Sale"
  | "Private Sale"
  | "Seed Sale"
  | "Team"
  | "Advisors"
  | "Marketing"
  | "Ecosystem"
  | "Development"
  | "Liquidity"
  | "Treasury"
  | "Rewards"
  | "Airdrop"
  | "Community"
  | "Partners"
  | "Reserve";

/**
 * Token distribution allocation interface
 */
export interface Distribution {
  id?: string;
  category: DistributionCategory | string;
  percentage: number;
  amount: BigNumber | number;
  color?: string;
  vestingEnabled: boolean;
  cliff?: number; // Duration in seconds
  vesting?: number; // Duration in seconds
  tgeUnlock?: number; // Percentage released at TGE
  wallet?: string; // Wallet receiving the tokens
  description?: string;
}

/**
 * Monthly vesting schedule entry
 */
export interface MonthlyVestingEntry {
  month: number;
  date: Date;
  released: BigNumber | number;
  releasedPercent: number;
  cumulative: BigNumber | number;
  cumulativePercent: number;
}

/**
 * Vesting schedule interface
 */
export interface VestingSchedule {
  id: string;
  recipient: string;
  tokenAddress: string;
  amount: BigNumber;
  startTimestamp: number;
  cliff: number; // Duration in seconds
  duration: number; // Duration in seconds
  releaseIntervalSecs: number;
  released: BigNumber;
  revoked: boolean;
  category?: DistributionCategory | string;
  schedule?: MonthlyVestingEntry[];
}

/**
 * Token statistics for distribution
 */
export interface TokenDistributionStats {
  totalSupply: BigNumber | number;
  initialCirculating: BigNumber | number;
  initialCirculatingPercent: number;
  totalAllocated: BigNumber | number;
  totalAllocatedPercent: number;
  maxCirculating: BigNumber | number; // After all vesting complete
  currentCirculating: BigNumber | number;
  currentCirculatingPercent: number;
  lockedTokens: BigNumber | number;
  lockedTokensPercent: number;
}

/**
 * Token Release Event
 */
export interface TokenReleaseEvent {
  id: string;
  vestingScheduleId: string;
  amount: BigNumber;
  timestamp: number;
  recipient: string;
  transactionHash: string;
}

/**
 * Upcoming token release
 */
export interface UpcomingTokenRelease {
  date: Date;
  amount: BigNumber | number;
  percentage: number;
  recipients: number;
  categories: (DistributionCategory | string)[];
}

/**
 * Release projection for the next N months
 */
export interface ReleaseProjection {
  dates: Date[];
  amounts: (BigNumber | number)[];
  percentages: number[];
  cumulative: (BigNumber | number)[];
  cumulativePercentages: number[];
}

/**
 * Vesting type
 */
export type VestingType = "Linear" | "Cliff" | "Custom";

/**
 * Vesting configuration
 */
export interface VestingConfig {
  type: VestingType;
  cliff: number; // Duration in seconds
  duration: number; // Duration in seconds
  tgeUnlock: number; // Percentage released at TGE
  releaseInterval: number; // Seconds between releases
}
