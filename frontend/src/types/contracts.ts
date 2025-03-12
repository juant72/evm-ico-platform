import { BigNumber } from "ethers";

/**
 * Base contract interface with common properties
 */
export interface BaseContract {
  address: string;
  blockNumber: number;
  blockTimestamp: number;
  deployer: string;
  network: {
    chainId: number;
    name: string;
  };
}

/**
 * Token contract interface representing an ERC20 token
 */
export interface TokenContract extends BaseContract {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: BigNumber;
  owner: string;
  implementation?: string; // For proxy contracts
}

/**
 * ICO contract interface representing a token sale
 */
export interface IcoContract extends BaseContract {
  token: string;
  rate: BigNumber; // Tokens per ETH
  weiRaised: BigNumber;
  startTime: number;
  endTime: number;
  softCap: BigNumber;
  hardCap: BigNumber;
  minContribution: BigNumber;
  maxContribution: BigNumber;
  whitelistEnabled: boolean;
  vestingEnabled: boolean;
  vestingCliff: number; // In seconds
  vestingDuration: number; // In seconds
  tokensSold: BigNumber;
  tokensAvailable: BigNumber;
  status: "upcoming" | "active" | "ended" | "finalized";
}

/**
 * Vesting contract interface for token vesting
 */
export interface VestingContract extends BaseContract {
  token: string;
  beneficiary: string;
  startTime: number;
  cliff: number; // In seconds
  duration: number; // In seconds
  revocable: boolean;
  revoked: boolean;
  released: BigNumber;
  releasable: BigNumber;
  vestedAmount: BigNumber;
  totalAmount: BigNumber;
}

/**
 * Staking contract interface
 */
export interface StakingContract extends BaseContract {
  stakingToken: string;
  rewardToken: string;
  rewardRate: BigNumber;
  rewardsDuration: number; // In seconds
  periodFinish: number;
  totalSupply: BigNumber;
  minimumStake: BigNumber;
  cooldownPeriod: number; // In seconds
  withdrawalWindow: number; // In seconds
}

/**
 * Governance contract interface
 */
export interface GovernanceContract extends BaseContract {
  token: string;
  votingDelay: number; // In blocks
  votingPeriod: number; // In blocks
  proposalThreshold: BigNumber;
  quorumNumerator: number;
  quorumDenominator: number;
  proposalCount: number;
}

/**
 * Timelock contract interface
 */
export interface TimelockContract extends BaseContract {
  minDelay: number; // In seconds
  proposers: string[];
  executors: string[];
  admin: string;
}

/**
 * Treasury contract interface
 */
export interface TreasuryContract extends BaseContract {
  token: string;
  governor: string;
  balance: BigNumber;
}

/**
 * Contract ABI item interface
 */
export interface ContractAbiItem {
  inputs: {
    internalType: string;
    name: string;
    type: string;
    indexed?: boolean;
  }[];
  name: string;
  outputs?: {
    internalType: string;
    name: string;
    type: string;
  }[];
  stateMutability?: string;
  type: string;
  anonymous?: boolean;
}

/**
 * Contract creation parameters for token
 */
export interface TokenContractParams {
  name: string;
  symbol: string;
  initialSupply: string | number;
  decimals: number;
  burnable: boolean;
  mintable: boolean;
  pausable: boolean;
}

/**
 * Contract creation parameters for ICO
 */
export interface IcoContractParams {
  token: string;
  rate: string | number;
  softCap: string | number;
  hardCap: string | number;
  startTime: number;
  endTime: number;
  minContribution: string | number;
  maxContribution: string | number;
  whitelistEnabled: boolean;
  vestingEnabled: boolean;
  vestingCliff: number; // In seconds
  vestingDuration: number; // In seconds
}
