import { BigNumber } from "ethers";

/**
 * Voting proposal interface
 */
export interface Proposal {
  id: number | string;
  title: string;
  description: string;
  proposer: string;
  forVotes: BigNumber | string | number;
  againstVotes: BigNumber | string | number;
  abstainVotes?: BigNumber | string | number;
  startBlock: number;
  endBlock: number;
  executed: boolean;
  canceled: boolean;
  strategy?: "simple" | "quadratic" | "weighted"; // Voting strategy
  quorum: BigNumber | string | number; // Minimum votes required for proposal to pass
  requiredMajority?: number; // Required majority percentage (default: 51)
}

/**
 * Vote types
 */
export enum VoteType {
  Against = 0,
  For = 1,
  Abstain = 2,
}

/**
 * Calculate voting power based on token holdings and strategy
 * @param tokenAmount Token amount
 * @param strategy Voting strategy
 * @returns Calculated voting power
 */
export const calculateVotingPower = (
  tokenAmount: BigNumber | string | number,
  strategy: "simple" | "quadratic" | "weighted" = "simple"
): number => {
  let amount: number;

  // Convert tokenAmount to number
  if (typeof tokenAmount === "string") {
    amount = parseFloat(tokenAmount);
  } else if (BigNumber.isBigNumber(tokenAmount)) {
    // Convert from wei to tokens (assuming 18 decimals)
    amount = parseFloat(tokenAmount.toString()) / 1e18;
  } else {
    amount = tokenAmount as number;
  }

  // Apply voting strategy
  switch (strategy) {
    case "quadratic":
      // Quadratic voting - voting power is the square root of token amount
      return Math.sqrt(amount);

    case "weighted":
      // Weighted voting - different tiers get different boosts
      if (amount >= 1000000) {
        return amount * 2; // 2x for whales (1M+ tokens)
      } else if (amount >= 100000) {
        return amount * 1.5; // 1.5x for dolphins (100K+ tokens)
      } else if (amount >= 10000) {
        return amount * 1.2; // 1.2x for fish (10K+ tokens)
      }
      return amount;

    case "simple":
    default:
      // Simple voting - 1 token = 1 vote
      return amount;
  }
};

/**
 * Check if a proposal has reached quorum
 * @param proposal Proposal to check
 * @param totalSupply Total supply of voting tokens
 * @returns True if proposal has reached quorum
 */
export const hasReachedQuorum = (
  proposal: Proposal,
  totalSupply: BigNumber | string | number
): boolean => {
  let quorum: number;
  let supply: number;

  // Convert quorum to number
  if (typeof proposal.quorum === "string") {
    quorum = parseFloat(proposal.quorum);
  } else if (BigNumber.isBigNumber(proposal.quorum)) {
    quorum = parseFloat(proposal.quorum.toString());
  } else {
    quorum = proposal.quorum as number;
  }

  // Convert total supply to number
  if (typeof totalSupply === "string") {
    supply = parseFloat(totalSupply);
  } else if (BigNumber.isBigNumber(totalSupply)) {
    supply = parseFloat(totalSupply.toString());
  } else {
    supply = totalSupply as number;
  }

  // Calculate total votes
  let forVotes: number;
  let againstVotes: number;
  let abstainVotes: number;

  // Convert for votes to number
  if (typeof proposal.forVotes === "string") {
    forVotes = parseFloat(proposal.forVotes);
  } else if (BigNumber.isBigNumber(proposal.forVotes)) {
    forVotes = parseFloat(proposal.forVotes.toString());
  } else {
    forVotes = proposal.forVotes as number;
  }

  // Convert against votes to number
  if (typeof proposal.againstVotes === "string") {
    againstVotes = parseFloat(proposal.againstVotes);
  } else if (BigNumber.isBigNumber(proposal.againstVotes)) {
    againstVotes = parseFloat(proposal.againstVotes.toString());
  } else {
    againstVotes = proposal.againstVotes as number;
  }

  // Convert abstain votes to number
  if (proposal.abstainVotes) {
    if (typeof proposal.abstainVotes === "string") {
      abstainVotes = parseFloat(proposal.abstainVotes);
    } else if (BigNumber.isBigNumber(proposal.abstainVotes)) {
      abstainVotes = parseFloat(proposal.abstainVotes.toString());
    } else {
      abstainVotes = proposal.abstainVotes as number;
    }
  } else {
    abstainVotes = 0;
  }

  const totalVotes = forVotes + againstVotes + abstainVotes;
  const quorumPercentage = (totalVotes / supply) * 100;

  return quorumPercentage >= quorum;
};

/**
 * Check if a proposal has passed
 * @param proposal Proposal to check
 * @returns True if proposal has passed
 */
export const hasProposalPassed = (proposal: Proposal): boolean => {
  // If proposal hasn't been executed and hasn't been canceled
  if (!proposal.executed && !proposal.canceled) {
    let forVotes: number;
    let againstVotes: number;

    // Convert for votes to number
    if (typeof proposal.forVotes === "string") {
      forVotes = parseFloat(proposal.forVotes);
    } else if (BigNumber.isBigNumber(proposal.forVotes)) {
      forVotes = parseFloat(proposal.forVotes.toString());
    } else {
      forVotes = proposal.forVotes as number;
    }

    // Convert against votes to number
    if (typeof proposal.againstVotes === "string") {
      againstVotes = parseFloat(proposal.againstVotes);
    } else if (BigNumber.isBigNumber(proposal.againstVotes)) {
      againstVotes = parseFloat(proposal.againstVotes.toString());
    } else {
      againstVotes = proposal.againstVotes as number;
    }

    // Calculate total decisive votes (excluding abstains)
    const totalDecisiveVotes = forVotes + againstVotes;

    if (totalDecisiveVotes === 0) {
      return false;
    }

    // Calculate percentage of 'For' votes
    const forPercentage = (forVotes / totalDecisiveVotes) * 100;

    // Check if majority achieved
    const requiredMajority = proposal.requiredMajority || 51; // Default to 51% if not specified
    return forPercentage >= requiredMajority;
  }

  // If already executed, it passed
  return proposal.executed;
};

/**
 * Calculate voting results
 * @param proposal Proposal to calculate results for
 * @returns Object with voting results
 */
export const calculateVotingResults = (proposal: Proposal) => {
  let forVotes: number;
  let againstVotes: number;
  let abstainVotes: number;

  // Convert for votes to number
  if (typeof proposal.forVotes === "string") {
    forVotes = parseFloat(proposal.forVotes);
  } else if (BigNumber.isBigNumber(proposal.forVotes)) {
    forVotes = parseFloat(proposal.forVotes.toString());
  } else {
    forVotes = proposal.forVotes as number;
  }

  // Convert against votes to number
  if (typeof proposal.againstVotes === "string") {
    againstVotes = parseFloat(proposal.againstVotes);
  } else if (BigNumber.isBigNumber(proposal.againstVotes)) {
    againstVotes = parseFloat(proposal.againstVotes.toString());
  } else {
    againstVotes = proposal.againstVotes as number;
  }

  // Convert abstain votes to number
  if (proposal.abstainVotes) {
    if (typeof proposal.abstainVotes === "string") {
      abstainVotes = parseFloat(proposal.abstainVotes);
    } else if (BigNumber.isBigNumber(proposal.abstainVotes)) {
      abstainVotes = parseFloat(proposal.abstainVotes.toString());
    } else {
      abstainVotes = proposal.abstainVotes as number;
    }
  } else {
    abstainVotes = 0;
  }

  // Calculate total votes
  const totalVotes = forVotes + againstVotes + abstainVotes;

  // Calculate percentages
  const forPercentage = totalVotes > 0 ? (forVotes / totalVotes) * 100 : 0;
  const againstPercentage =
    totalVotes > 0 ? (againstVotes / totalVotes) * 100 : 0;
  const abstainPercentage =
    totalVotes > 0 ? (abstainVotes / totalVotes) * 100 : 0;

  // Calculate status
  let status: "Active" | "Passed" | "Failed" | "Executed" | "Canceled";

  if (proposal.canceled) {
    status = "Canceled";
  } else if (proposal.executed) {
    status = "Executed";
  } else if (Date.now() / 1000 < proposal.endBlock) {
    status = "Active";
  } else if (hasProposalPassed(proposal)) {
    status = "Passed";
  } else {
    status = "Failed";
  }

  return {
    forVotes,
    againstVotes,
    abstainVotes,
    totalVotes,
    forPercentage,
    againstPercentage,
    abstainPercentage,
    status,
  };
};

/**
 * Calculate time remaining for a proposal
 * @param endBlock End block or timestamp
 * @param avgBlockTime Average block time in seconds
 * @returns Remaining time in seconds
 */
export const calculateTimeRemaining = (
  endBlock: number,
  avgBlockTime: number = 13.5 // Ethereum average block time in seconds
): number => {
  // Check if endBlock is a timestamp or block number
  if (endBlock > Date.now() / 1000) {
    // It's a timestamp
    return endBlock - Math.floor(Date.now() / 1000);
  }

  // It's a block number
  const currentBlock = Math.floor(Date.now() / 1000 / avgBlockTime);
  const remainingBlocks = endBlock - currentBlock;

  return remainingBlocks > 0 ? remainingBlocks * avgBlockTime : 0;
};
