import { utils } from "ethers";
import { GovernanceSettings, VotingStrategy } from "../types/proposal";
import { CHAIN_IDS } from "../utils/constants";

/**
 * Default governance settings
 */
export const DEFAULT_GOVERNANCE_SETTINGS: GovernanceSettings = {
  votingDelay: 6570, // ~1 day in blocks (13.15s per block)
  votingPeriod: 45818, // ~7 days in blocks
  proposalThreshold: utils.parseEther("100000"), // 100k tokens to create proposal
  quorumNumerator: 4, // 4% of total supply
  quorumDenominator: 100,
  votingStrategy: "simple",
  executionDelay: 172800, // 48 hours in seconds
};

/**
 * Chain-specific governance settings
 */
export const CHAIN_GOVERNANCE_SETTINGS: {
  [chainId: number]: GovernanceSettings;
} = {
  [CHAIN_IDS.ETHEREUM_MAINNET]: {
    ...DEFAULT_GOVERNANCE_SETTINGS,
    // Mainnet may have different settings
    votingDelay: 13140, // ~2 days in blocks
    votingPeriod: 46027, // ~7 days in blocks
    proposalThreshold: utils.parseEther("250000"), // 250k tokens to create proposal
    quorumNumerator: 5, // 5% of total supply
  },
  [CHAIN_IDS.ETHEREUM_SEPOLIA]: DEFAULT_GOVERNANCE_SETTINGS,
};

/**
 * Get governance settings for a specific chain
 * @param chainId Chain ID
 * @returns Governance settings for the specified chain
 */
export const getGovernanceSettings = (
  chainId: number = CHAIN_IDS.ETHEREUM_SEPOLIA
): GovernanceSettings => {
  return CHAIN_GOVERNANCE_SETTINGS[chainId] || DEFAULT_GOVERNANCE_SETTINGS;
};

/**
 * Available voting strategies
 */
export const VOTING_STRATEGIES: {
  id: VotingStrategy;
  name: string;
  description: string;
}[] = [
  {
    id: "simple",
    name: "Simple Voting",
    description: "1 token = 1 vote. Standard voting power calculation.",
  },
  {
    id: "quadratic",
    name: "Quadratic Voting",
    description:
      "Voting power is the square root of token holdings, reducing the influence of large holders.",
  },
  {
    id: "weighted",
    name: "Weighted Voting",
    description: "Different weight multipliers based on token holdings tiers.",
  },
  {
    id: "delegated",
    name: "Delegated Voting",
    description: "Voting power can be delegated to other addresses.",
  },
];

/**
 * Proposal types with execution templates
 */
export const PROPOSAL_TYPES = [
  {
    id: "parameter_change",
    name: "Parameter Change",
    description: "Change a protocol parameter",
    template: {
      title: "Change [Parameter] from [Current Value] to [New Value]",
      description: `# Parameter Change Proposal

## Summary
A brief summary of the parameter change.

## Motivation
Why this parameter should be changed.

## Specification
- Parameter: [Parameter Name]
- Current Value: [Current Value]
- Proposed Value: [New Value]
- Technical Implementation: [Contract/Function to call]

## Benefits
How this change benefits the protocol.

## Risks
Any potential risks associated with this change.
`,
    },
  },
  {
    id: "treasury_spending",
    name: "Treasury Spending",
    description: "Propose spending from the treasury",
    template: {
      title: "Treasury Spending: [Amount] [Token] for [Purpose]",
      description: `# Treasury Spending Proposal

## Summary
A brief summary of the treasury spending proposal.

## Amount
- [Amount] [Token Symbol]
- Approximately $[USD Value]

## Recipient
[Recipient Address or ENS]

## Purpose
Detailed explanation of what the funds will be used for.

## Expected Outcomes
What will be achieved with this funding.

## Accountability
How the recipient will be held accountable.
`,
    },
  },
  {
    id: "contract_upgrade",
    name: "Contract Upgrade",
    description: "Upgrade a smart contract implementation",
    template: {
      title: "Upgrade [Contract Name] to version [New Version]",
      description: `# Contract Upgrade Proposal

## Summary
A brief summary of the contract upgrade.

## Technical Details
- Contract to Upgrade: [Contract Name]
- Current Implementation: [Current Address]
- New Implementation: [New Address]
- Audit Report: [Link to Audit]

## Changes
List of significant changes in the new implementation.

## Benefits
How this upgrade benefits the protocol.

## Risks and Mitigations
Potential risks and how they are mitigated.

## Testing
Details about testing that has been conducted.
`,
    },
  },
];

/**
 * Minimum timelock delay (in seconds)
 */
export const MIN_TIMELOCK_DELAY = 86400; // 24 hours

/**
 * Maximum timelock delay (in seconds)
 */
export const MAX_TIMELOCK_DELAY = 2592000; // 30 days

/**
 * Function selectors for common governance actions
 */
export const GOVERNANCE_FUNCTION_SELECTORS = {
  transfer: "0xa9059cbb", // transfer(address,uint256)
  approve: "0x095ea7b3", // approve(address,uint256)
  upgradeProxy: "0x99a88ec4", // upgradeToAndCall(address,bytes)
  changeQuorum: "0x06f3f9e6", // updateQuorumNumerator(uint256)
  setPause: "0x8456cb59", // pause()
  setUnpause: "0x3f4ba83a", // unpause()
  setFee: "0x69fe0e2d", // setFee(uint256)
  grantRole: "0x2f2ff15d", // grantRole(bytes32,address)
  revokeRole: "0xd547741f", // revokeRole(bytes32,address)
};

/**
 * Maximum proposal description length
 */
export const MAX_PROPOSAL_DESCRIPTION_LENGTH = 10000;

/**
 * Maximum proposal title length
 */
export const MAX_PROPOSAL_TITLE_LENGTH = 100;
