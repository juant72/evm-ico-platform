import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { BigNumber, utils } from "ethers";
import {
  Proposal,
  ProposalStatus,
  VoteType,
  ProposalVote,
  GovernanceSettings,
  ProposalCreationParams,
  ProposalAction,
} from "../types/proposal";
import {
  hasProposalPassed,
  hasReachedQuorum,
  calculateVotingResults,
} from "../utils/votingCalculations";

// Context state interface
interface GovernanceContextState {
  proposals: Proposal[];
  activeProposals: Proposal[];
  userVotes: Record<string, ProposalVote>;
  governanceSettings: GovernanceSettings | null;
  votingPower: BigNumber;
  delegatedPower: BigNumber;
  isLoading: boolean;
  error: string | null;
  createProposal: (params: ProposalCreationParams) => Promise<string | null>;
  castVote: (
    proposalId: string | number,
    support: VoteType,
    reason?: string
  ) => Promise<boolean>;
  delegateVotes: (delegatee: string) => Promise<boolean>;
  executeProposal: (proposalId: string | number) => Promise<boolean>;
  loadProposals: () => Promise<void>;
  getProposal: (proposalId: string | number) => Proposal | null;
  hasVoted: (proposalId: string | number) => boolean;
  decodeCalldata: (action: ProposalAction) => Promise<ProposalAction>;
}

// Default context state
const defaultContext: GovernanceContextState = {
  proposals: [],
  activeProposals: [],
  userVotes: {},
  governanceSettings: null,
  votingPower: BigNumber.from(0),
  delegatedPower: BigNumber.from(0),
  isLoading: false,
  error: null,
  createProposal: async () => null,
  castVote: async () => false,
  delegateVotes: async () => false,
  executeProposal: async () => false,
  loadProposals: async () => {},
  getProposal: () => null,
  hasVoted: () => false,
  decodeCalldata: async () => ({
    target: "",
    value: BigNumber.from(0),
    signature: "",
    calldata: "",
  }),
};

// Create context
const GovernanceContext = createContext<GovernanceContextState>(defaultContext);

// Governance Provider Props
interface GovernanceProviderProps {
  children: ReactNode;
  governorAddress?: string;
  tokenAddress?: string;
}

/**
 * Governance Provider Component
 */
export const GovernanceProvider: React.FC<GovernanceProviderProps> = ({
  children,
  governorAddress,
  tokenAddress,
}) => {
  const address = useAddress();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [userVotes, setUserVotes] = useState<Record<string, ProposalVote>>({});
  const [governanceSettings, setGovernanceSettings] =
    useState<GovernanceSettings | null>(null);
  const [votingPower, setVotingPower] = useState<BigNumber>(BigNumber.from(0));
  const [delegatedPower, setDelegatedPower] = useState<BigNumber>(
    BigNumber.from(0)
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Contract hooks
  const { contract: governorContract } = useContract(governorAddress);
  const { contract: tokenContract } = useContract(tokenAddress);

  // Read contract data
  const { data: tokenName } = useContractRead(tokenContract, "name");
  const { data: tokenSymbol } = useContractRead(tokenContract, "symbol");
  const { data: votingDelay } = useContractRead(
    governorContract,
    "votingDelay"
  );
  const { data: votingPeriod } = useContractRead(
    governorContract,
    "votingPeriod"
  );
  const { data: proposalThreshold } = useContractRead(
    governorContract,
    "proposalThreshold"
  );
  const { data: quorumNumerator } = useContractRead(
    governorContract,
    "quorumNumerator"
  );
  const { data: quorumDenominator } = useContractRead(
    governorContract,
    "quorumDenominator"
  );

  // Get active proposals
  const activeProposals = proposals.filter(
    (p) =>
      p.status === "active" || p.status === "pending" || p.status === "queued"
  );

  /**
   * Load user voting power
   */
  const loadVotingPower = async () => {
    if (!address || !tokenContract) return;

    try {
      // In a real app, you'd get this from the token contract
      const mockVotingPower = utils.parseEther("100000"); // 100K tokens
      const mockDelegatedPower = utils.parseEther("50000"); // 50K delegated tokens

      setVotingPower(mockVotingPower);
      setDelegatedPower(mockDelegatedPower);
    } catch (err) {
      console.error("Error loading voting power:", err);
    }
  };

  /**
   * Load governance settings
   */
  const loadGovernanceSettings = async () => {
    try {
      // In a real app, you'd get these from contract calls above
      // Here using mock data if contract calls don't return values
      const settings: GovernanceSettings = {
        votingDelay: votingDelay || 1, // 1 block
        votingPeriod: votingPeriod || 45818, // ~1 week at 13s block time
        proposalThreshold: proposalThreshold || utils.parseEther("100000"), // 100K tokens
        quorumNumerator: quorumNumerator || 4, // 4%
        quorumDenominator: quorumDenominator || 100,
        votingStrategy: "simple",
        executionDelay: 172800, // 48 hours
      };

      setGovernanceSettings(settings);
    } catch (err) {
      console.error("Error loading governance settings:", err);
    }
  };

  /**
   * Load proposals from governance contract
   */
  const loadProposals = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // In a real implementation, you would fetch from your governance contract
      // This is a placeholder with mock data
      const mockProposals: Proposal[] = [
        {
          id: "1",
          proposalId: "1",
          proposer: "0x1234567890123456789012345678901234567890",
          targets: ["0xabcdef1234567890abcdef1234567890abcdef12"],
          values: [BigNumber.from(utils.parseEther("1"))],
          signatures: ["transfer(address,uint256)"],
          calldatas: [
            "0x000000000000000000000000abcdef1234567890abcdef1234567890abcdef1200000000000000000000000000000000000000000000000de0b6b3a7640000",
          ],
          startBlock: Math.floor(Date.now() / 1000) - 172800,
          endBlock: Math.floor(Date.now() / 1000) + 345600,
          description:
            "# Proposal to allocate treasury funds\n\nThis proposal allocates 1 ETH from treasury to the development fund.",
          title: "Allocate Treasury Funds",
          summary:
            "This proposal allocates 1 ETH from treasury to the development fund.",
          status: "active",
          forVotes: utils.parseEther("250000"),
          againstVotes: utils.parseEther("50000"),
          abstainVotes: utils.parseEther("25000"),
          quorumVotes: utils.parseEther("500000"),
          createdAt: Math.floor(Date.now() / 1000) - 172800,
          tags: ["Treasury", "Funding"],
        },
        {
          id: "2",
          proposalId: "2",
          proposer: "0x0987654321098765432109876543210987654321",
          targets: ["0xfedcba0987654321fedcba0987654321fedcba09"],
          values: [BigNumber.from(0)],
          signatures: ["setFee(uint256)"],
          calldatas: [
            "0x0000000000000000000000000000000000000000000000000000000000000064",
          ],
          startBlock: Math.floor(Date.now() / 1000) - 345600,
          endBlock: Math.floor(Date.now() / 1000) - 172800,
          description:
            "# Proposal to reduce platform fees\n\nThis proposal reduces the platform fee from 2% to 1%.",
          title: "Reduce Platform Fees",
          summary: "This proposal reduces the platform fee from 2% to 1%.",
          status: "succeeded",
          forVotes: utils.parseEther("500000"),
          againstVotes: utils.parseEther("100000"),
          abstainVotes: utils.parseEther("50000"),
          quorumVotes: utils.parseEther("500000"),
          createdAt: Math.floor(Date.now() / 1000) - 345600,
          tags: ["Fees", "Platform"],
        },
        {
          id: "3",
          proposalId: "3",
          proposer: "0x5678901234567890123456789012345678901234",
          targets: ["0xabcdef1234567890abcdef1234567890abcdef12"],
          values: [BigNumber.from(0)],
          signatures: ["addWhitelist(address[])"],
          calldatas: [
            "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000001111111111111111111111111111111111111111000000000000000000000000222222222222222222222222222222222222222",
          ],
          startBlock: Math.floor(Date.now() / 1000) - 86400,
          endBlock: Math.floor(Date.now() / 1000) + 432000,
          description:
            "# Proposal to add strategic partners to whitelist\n\nThis proposal adds two strategic partner addresses to the platform whitelist.",
          title: "Add Strategic Partners to Whitelist",
          summary:
            "This proposal adds two strategic partner addresses to the platform whitelist.",
          status: "active",
          forVotes: utils.parseEther("300000"),
          againstVotes: utils.parseEther("150000"),
          abstainVotes: utils.parseEther("50000"),
          quorumVotes: utils.parseEther("500000"),
          createdAt: Math.floor(Date.now() / 1000) - 86400,
          tags: ["Whitelist", "Partners"],
        },
      ];

      // Add some user votes for the current address
      if (address) {
        const mockUserVotes: Record<string, ProposalVote> = {
          "1": {
            id: `vote-${address}-1`,
            proposalId: "1",
            voter: address,
            support: VoteType.For,
            weight: utils.parseEther("100000"),
            reason: "I support funding the development team",
            timestamp: Math.floor(Date.now() / 1000) - 86400,
            transactionHash:
              "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
          },
        };
        setUserVotes(mockUserVotes);
      }

      setProposals(mockProposals);
    } catch (err: any) {
      console.error("Error loading proposals:", err);
      setError(err.message || "Error loading proposals");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Get a specific proposal by ID
   */
  const getProposal = (proposalId: string | number): Proposal | null => {
    return (
      proposals.find(
        (p) => p.id === proposalId || p.proposalId === proposalId
      ) || null
    );
  };

  /**
   * Check if user has voted on a proposal
   */
  const hasVoted = (proposalId: string | number): boolean => {
    return !!userVotes[proposalId.toString()];
  };

  /**
   * Create a new proposal
   */
  const createProposal = async (
    params: ProposalCreationParams
  ): Promise<string | null> => {
    if (!address || !governorContract) {
      setError("Wallet not connected or contract not available");
      return null;
    }

    try {
      setIsLoading(true);

      // In a real app, you'd call the governor contract to create the proposal
      // This is just a mock implementation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create a mock proposal
      const newProposalId = (proposals.length + 1).toString();
      const title = params.description.split("\n")[0].replace("# ", "");
      const summary = params.description.split("\n\n")[1] || "";

      const newProposal: Proposal = {
        id: newProposalId,
        proposalId: newProposalId,
        proposer: address,
        targets: params.targets,
        values: params.values.map((v) =>
          BigNumber.isBigNumber(v) ? v : BigNumber.from(v)
        ),
        signatures: params.signatures,
        calldatas: params.calldatas,
        startBlock:
          Math.floor(Date.now() / 1000) +
          (governanceSettings?.votingDelay || 1) * 13,
        endBlock:
          Math.floor(Date.now() / 1000) +
          ((governanceSettings?.votingDelay || 1) +
            (governanceSettings?.votingPeriod || 45818)) *
            13,
        description: params.description,
        title: title,
        summary: summary,
        status: "pending",
        forVotes: BigNumber.from(0),
        againstVotes: BigNumber.from(0),
        abstainVotes: BigNumber.from(0),
        quorumVotes: utils.parseEther("500000"),
        createdAt: Math.floor(Date.now() / 1000),
        tags: [],
      };

      setProposals([...proposals, newProposal]);
      return newProposalId;
    } catch (err: any) {
      console.error("Error creating proposal:", err);
      setError(err.message || "Error creating proposal");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Cast a vote on a proposal
   */
  const castVote = async (
    proposalId: string | number,
    support: VoteType,
    reason?: string
  ): Promise<boolean> => {
    if (!address || !governorContract) {
      setError("Wallet not connected or contract not available");
      return false;
    }

    try {
      setIsLoading(true);

      // In a real app, you'd call the governor contract to cast a vote
      // This is just a mock implementation
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create a mock vote
      const vote: ProposalVote = {
        id: `vote-${address}-${proposalId}`,
        proposalId: proposalId.toString(),
        voter: address,
        support,
        weight: votingPower,
        reason,
        timestamp: Math.floor(Date.now() / 1000),
        transactionHash: `0x${Math.random()
          .toString(36)
          .substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      };

      // Update user votes
      setUserVotes({
        ...userVotes,
        [proposalId.toString()]: vote,
      });

      // Update proposal vote counts
      setProposals(
        proposals.map((p) => {
          if (p.id === proposalId || p.proposalId === proposalId) {
            const updatedProposal = { ...p };

            if (support === VoteType.For) {
              updatedProposal.forVotes =
                updatedProposal.forVotes.add(votingPower);
            } else if (support === VoteType.Against) {
              updatedProposal.againstVotes =
                updatedProposal.againstVotes.add(votingPower);
            } else if (support === VoteType.Abstain) {
              updatedProposal.abstainVotes =
                updatedProposal.abstainVotes.add(votingPower);
            }

            return updatedProposal;
          }

          return p;
        })
      );

      return true;
    } catch (err: any) {
      console.error("Error casting vote:", err);
      setError(err.message || "Error casting vote");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Delegate votes to another address
   */
  const delegateVotes = async (delegatee: string): Promise<boolean> => {
    if (!address || !tokenContract) {
      setError("Wallet not connected or contract not available");
      return false;
    }

    try {
      setIsLoading(true);

      // In a real app, you'd call the token contract to delegate votes
      // This is just a mock implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you'd update the voting power after delegation
      // For now, we'll just simulate the change
      setVotingPower(BigNumber.from(0));
      setDelegatedPower(BigNumber.from(0));

      return true;
    } catch (err: any) {
      console.error("Error delegating votes:", err);
      setError(err.message || "Error delegating votes");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Execute a successful proposal
   */
  const executeProposal = async (
    proposalId: string | number
  ): Promise<boolean> => {
    if (!address || !governorContract) {
      setError("Wallet not connected or contract not available");
      return false;
    }

    try {
      setIsLoading(true);

      // In a real app, you'd call the governor contract to execute the proposal
      // This is just a mock implementation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update proposal status
      setProposals(
        proposals.map((p) => {
          if (p.id === proposalId || p.proposalId === proposalId) {
            return {
              ...p,
              status: "executed",
              executedAt: Math.floor(Date.now() / 1000),
            };
          }

          return p;
        })
      );

      return true;
    } catch (err: any) {
      console.error("Error executing proposal:", err);
      setError(err.message || "Error executing proposal");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Decode calldata for a proposal action
   */
  const decodeCalldata = async (
    action: ProposalAction
  ): Promise<ProposalAction> => {
    try {
      // In a real app, you'd use ethers or similar to decode the calldata
      // This is just a mock implementation that returns a formatted version

      // Define the parameter type
      type DecodedParam = {
        name: string;
        type: string;
        value: string | BigNumber;
      };

      // Create a mock decoded calldata
      const mockDecodedCalldata = {
        method: action.signature.split("(")[0],
        params: [] as DecodedParam[],
      };

      // Mock some parameter parsing based on common signatures
      if (action.signature === "transfer(address,uint256)") {
        mockDecodedCalldata.params = [
          {
            name: "recipient",
            type: "address",
            value: "0x" + action.calldata.substring(34, 74),
          },
          {
            name: "amount",
            type: "uint256",
            value: BigNumber.from("0x" + action.calldata.substring(74)),
          },
        ];
      } else if (action.signature === "setFee(uint256)") {
        mockDecodedCalldata.params = [
          {
            name: "fee",
            type: "uint256",
            value: BigNumber.from("0x" + action.calldata.substring(2)),
          },
        ];
      }

      return {
        ...action,
        decodedCalldata: mockDecodedCalldata,
      };
    } catch (error) {
      console.error("Error decoding calldata:", error);
      return action;
    }
  };

  // Load data when dependencies change
  useEffect(() => {
    if (address) {
      loadVotingPower();
      loadGovernanceSettings();
      loadProposals();
    }
  }, [address, governorAddress, tokenAddress]);

  // Context value
  const value = {
    proposals,
    activeProposals,
    userVotes,
    governanceSettings,
    votingPower,
    delegatedPower,
    isLoading,
    error,
    createProposal,
    castVote,
    delegateVotes,
    executeProposal,
    loadProposals,
    getProposal,
    hasVoted,
    decodeCalldata,
  };

  return (
    <GovernanceContext.Provider value={value}>
      {children}
    </GovernanceContext.Provider>
  );
};

/**
 * Custom hook to use the governance context
 */
export const useGovernance = () => {
  const context = useContext(GovernanceContext);
  if (context === undefined) {
    throw new Error("useGovernance must be used within a GovernanceProvider");
  }
  return context;
};
