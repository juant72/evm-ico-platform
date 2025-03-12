import { BigNumber } from "ethers";

/**
 * Proposal status types
 */
export type ProposalStatus =
  | "pending"
  | "active"
  | "canceled"
  | "defeated"
  | "succeeded"
  | "queued"
  | "expired"
  | "executed";

/**
 * Vote types
 */
export enum VoteType {
  Against = 0,
  For = 1,
  Abstain = 2,
}

/**
 * Governance proposal interface
 */
export interface Proposal {
  id: string | number;
  proposalId: BigNumber | number | string;
  proposer: string;
  targets: string[];
  values: BigNumber[];
  signatures: string[];
  calldatas: string[];
  startBlock: number;
  endBlock: number;
  description: string;
  title: string; // Extracted from description
  summary?: string; // Extracted from description
  status: ProposalStatus;
  forVotes: BigNumber;
  againstVotes: BigNumber;
  abstainVotes: BigNumber;
  quorumVotes: BigNumber;
  createdAt: number; // Timestamp
  updatedAt?: number; // Timestamp
  executedAt?: number; // Timestamp
  canceledAt?: number; // Timestamp
  queuedAt?: number; // Timestamp
  eta?: number; // Timestamp for execution
  discussions?: ProposalDiscussion[];
  tags?: string[];
  votes?: ProposalVote[];
  voteStats?: ProposalVoteStats;
}

/**
 * Proposal discussion comment
 */
export interface ProposalDiscussion {
  id: string;
  proposalId: string | number;
  author: string;
  content: string;
  timestamp: number;
  parentId?: string; // For replies
  upvotes: number;
  downvotes: number;
}

/**
 * Vote on a proposal
 */
export interface ProposalVote {
  id: string;
  proposalId: string | number;
  voter: string;
  support: VoteType;
  weight: BigNumber;
  reason?: string;
  timestamp: number;
  transactionHash: string;
}

/**
 * Proposal vote statistics
 */
export interface ProposalVoteStats {
  totalVotes: BigNumber;
  quorum: number; // Percentage of total supply
  forPercentage: number;
  againstPercentage: number;
  abstainPercentage: number;
  voterCount: number;
  hasReachedQuorum: boolean;
  isPassing: boolean;
  timeRemaining?: number; // In seconds
}

/**
 * Proposal creation parameters
 */
export interface ProposalCreationParams {
  targets: string[];
  values: (BigNumber | number | string)[];
  signatures: string[];
  calldatas: string[];
  description: string;
}

/**
 * Voting strategy
 */
export type VotingStrategy =
  | "simple" // 1 token = 1 vote
  | "quadratic" // sqrt(tokens) = votes
  | "weighted" // Different weights for different token amounts
  | "delegated" // Delegated voting power
  | "conviction"; // Conviction voting

/**
 * Governance settings
 */
export interface GovernanceSettings {
  votingDelay: number; // Blocks before voting starts
  votingPeriod: number; // Blocks that voting is active
  proposalThreshold: BigNumber; // Min tokens to submit proposal
  quorumNumerator: number; // Numerator of quorum fraction
  quorumDenominator: number; // Denominator of quorum fraction
  votingStrategy: VotingStrategy;
  executionDelay: number; // Seconds between queue and execution
}

/**
 * Voting power snapshot
 */
export interface VotingPowerSnapshot {
  address: string;
  blockNumber: number;
  timestamp: number;
  votingPower: BigNumber;
  delegated: BigNumber;
  delegatedTo?: string;
  delegatedFrom: string[];
}

/**
 * Proposal action
 */
export interface ProposalAction {
  target: string;
  value: BigNumber;
  signature: string;
  calldata: string;
  decodedCalldata?: {
    method: string;
    params: {
      name: string;
      type: string;
      value: any;
    }[];
  };
}
