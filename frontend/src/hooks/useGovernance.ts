import { useState, useEffect, useCallback } from "react";
import { BigNumber, utils } from "ethers";
import { useAddress } from "@thirdweb-dev/react";
import {
  Proposal,
  ProposalCreationParams,
  ProposalVote,
  VoteType,
  ProposalStatus,
  GovernanceSettings,
} from "../types/proposal";
import { getContractAddress } from "../constants/addresses";
import { getGovernanceSettings } from "../constants/governanceSettings";
import { useChainId } from "@thirdweb-dev/react";
import {
  hasProposalPassed,
  hasReachedQuorum,
  calculateVotingResults,
} from "../utils/votingCalculations";
import { useTokenContract } from "./useTokenContract";
import { useAsync } from "./useAsync";

/**
 * Hook to interact with the governance system
 * @param governorAddress Optional override for governor contract address
 * @returns Governance functions and state
 */
export const useGovernance = (governorAddress?: string) => {
  const chainId = useChainId();
  const address = useAddress();
  const { token, balance } = useTokenContract();
  const {
    execute,
    loading: executionLoading,
    error: executionError,
  } = useAsync();

  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [userVotes, setUserVotes] = useState<ProposalVote[]>([]);
  const [userVotingPower, setUserVotingPower] = useState<BigNumber>(
    BigNumber.from(0)
  );
  const [governanceSettings, setGovernanceSettings] =
    useState<GovernanceSettings | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const governor = governorAddress || getContractAddress("GOVERNANCE", chainId);

  // Initialize governance settings based on chain
  useEffect(() => {
    setGovernanceSettings(getGovernanceSettings(chainId));
  }, [chainId]);

  // Update user voting power when balance changes
  useEffect(() => {
    if (balance) {
      setUserVotingPower(balance);
    } else {
      setUserVotingPower(BigNumber.from(0));
    }
  }, [balance]);

  // Fetch all proposals
  const fetchProposals = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // In a real implementation, you'd call the contract to get proposals
      // For demo purposes, we'll generate mock data

      // Mock implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockProposals: Proposal[] = [
        {
          id: "1",
          proposalId: "1",
          proposer: "0xD979acD786A92a4Fb8d1046886B68Fc9896a3C25",
          targets: ["0x7c833A71Dd3B6cb96761c444E3D71A9ca1041843"],
          values: [BigNumber.from(0)],
          signatures: ["setPause()"],
          calldatas: ["0x"],
          startBlock: Math.floor(Date.now() / 1000) - 86400 * 3, // 3 days ago
          endBlock: Math.floor(Date.now() / 1000) + 86400 * 4, // 4 days from now
          description:
            "Proposal to temporarily pause the token contract for upgrades.",
          title: "Pause Token Contract",
          summary:
            "This proposal will pause the token contract to apply security upgrades.",
          status: "active",
          forVotes: utils.parseEther("350000"),
          againstVotes: utils.parseEther("125000"),
          abstainVotes: utils.parseEther("25000"),
          quorumVotes: utils.parseEther("500000"),
          createdAt: Math.floor(Date.now() / 1000) - 86400 * 3,
          votes: [],
          tags: ["Security", "Contract Update"],
        },
        {
          id: "2",
          proposalId: "2",
          proposer: "0x8D619cC717f272d8ffc929cc8494db0BbEf933F3",
          targets: ["0x2123050Ac4fa4cEfc1aFf8a4c9593Fc64c2B1980"],
          values: [utils.parseEther("50000")],
          signatures: ["transfer(address,uint256)"],
          calldatas: ["0x"],
          startBlock: Math.floor(Date.now() / 1000) - 86400 * 10, // 10 days ago
          endBlock: Math.floor(Date.now() / 1000) - 86400 * 3, // 3 days ago
          description:
            "Proposal to allocate 50,000 tokens for marketing efforts.",
          title: "Marketing Budget Allocation",
          summary:
            "This proposal will allocate 50,000 tokens to the marketing wallet for Q2 campaigns.",
          status: "succeeded",
          forVotes: utils.parseEther("450000"),
          againstVotes: utils.parseEther("50000"),
          abstainVotes: utils.parseEther("10000"),
          quorumVotes: utils.parseEther("500000"),
          createdAt: Math.floor(Date.now() / 1000) - 86400 * 10,
          votes: [],
          tags: ["Treasury", "Marketing"],
        },
      ];

      setProposals(mockProposals);
    } catch (err: any) {
      setError(err.message || "Error fetching proposals");
      console.error("Error fetching proposals:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch user votes
  const fetchUserVotes = useCallback(async () => {
    if (!address) return;

    try {
      setIsLoading(true);

      // In a real implementation, you'd call the contract to get user votes
      // For demo purposes, we'll generate mock data

      // Mock implementation
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockUserVotes: ProposalVote[] = [
        {
          id: "1",
          proposalId: "1",
          voter: address,
          support: VoteType.For,
          weight: utils.parseEther("75000"),
          reason: "I support the security upgrades",
          timestamp: Math.floor(Date.now() / 1000) - 86400 * 2, // 2 days ago
          transactionHash: `0x${Math.random().toString(16).slice(2, 66)}`,
        },
      ];

      setUserVotes(mockUserVotes);
    } catch (err: any) {
      setError(err.message || "Error fetching user votes");
      console.error("Error fetching user votes:", err);
    } finally {
      setIsLoading(false);
    }
  }, [address]);

  // Get proposal by ID
  const getProposal = useCallback(
    (proposalId: string | number) => {
      return proposals.find(
        (p) =>
          p.id === proposalId ||
          p.proposalId.toString() === proposalId.toString()
      );
    },
    [proposals]
  );

  // Create a new proposal
  const createProposal = async (
    params: ProposalCreationParams
  ): Promise<string | null> => {
    if (!address) {
      setError("Wallet not connected");
      return null;
    }

    try {
      setIsLoading(true);

      // Extract title and summary from description
      const lines = params.description.split("\n");
      let title = lines[0].replace(/^#\s*/, "");
      let summary = "";

      // Extract summary from first paragraph after title
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.length > 0) {
          summary = line;
          break;
        }
      }

      if (title.length > 100) {
        title = `${title.substring(0, 97)}...`;
      }

      if (summary.length > 200) {
        summary = `${summary.substring(0, 197)}...`;
      }

      // In a real implementation, you'd call the contract to create a proposal
      // For demo purposes, we'll generate a mock response

      const newProposalId = `proposal-${Date.now()}`;

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

  // Cast a vote on a proposal
  const castVote = async (
    proposalId: string | number,
    support: VoteType,
    reason?: string
  ): Promise<boolean> => {
    if (!address) {
      setError("Wallet not connected");
      return false;
    }

    return (await execute(async () => {
      const proposal = getProposal(proposalId);

      if (!proposal) {
        throw new Error("Proposal not found");
      }

      if (proposal.status !== "active") {
        throw new Error("Proposal is not active");
      }

      // Check if user has already voted
      const existingVote = userVotes.find(
        (v) => v.proposalId === proposalId.toString()
      );
      if (existingVote) {
        throw new Error("You have already voted on this proposal");
      }

      // In a real implementation, you'd call the contract to cast a vote
      // For demo purposes, we'll update our local state

      const voteWeight = userVotingPower;

      // Create vote record
      const newVote: ProposalVote = {
        id: `vote-${Date.now()}`,
        proposalId: proposalId.toString(),
        voter: address,
        support,
        weight: voteWeight,
        reason,
        timestamp: Math.floor(Date.now() / 1000),
        transactionHash: `0x${Math.random().toString(16).slice(2, 66)}`,
      };

      // Update proposal vote counts
      const updatedProposals = proposals.map((p) => {
        if (
          p.id === proposalId ||
          p.proposalId.toString() === proposalId.toString()
        ) {
          const updatedProposal = { ...p };

          if (support === VoteType.For) {
            updatedProposal.forVotes = BigNumber.from(
              updatedProposal.forVotes
            ).add(voteWeight);
          } else if (support === VoteType.Against) {
            updatedProposal.againstVotes = BigNumber.from(
              updatedProposal.againstVotes
            ).add(voteWeight);
          } else if (support === VoteType.Abstain) {
            updatedProposal.abstainVotes = BigNumber.from(
              updatedProposal.abstainVotes
            ).add(voteWeight);
          }

          return updatedProposal;
        }
        return p;
      });

      // Update state
      setProposals(updatedProposals);
      setUserVotes([...userVotes, newVote]);

      return true;
    })) as boolean;
  };

  // Execute a proposal
  const executeProposal = async (
    proposalId: string | number
  ): Promise<boolean> => {
    return (await execute(async () => {
      const proposal = getProposal(proposalId);

      if (!proposal) {
        throw new Error("Proposal not found");
      }

      if (proposal.status !== "succeeded") {
        throw new Error("Proposal cannot be executed");
      }

      // In a real implementation, you'd call the contract to execute the proposal
      // For demo purposes, we'll update our local state

      const updatedProposals = proposals.map((p) => {
        if (
          p.id === proposalId ||
          p.proposalId.toString() === proposalId.toString()
        ) {
          return {
            ...p,
            status: "executed" as ProposalStatus,
            executedAt: Math.floor(Date.now() / 1000),
          };
        }
        return p;
      });

      setProposals(updatedProposals);

      return true;
    })) as boolean;
  };

  // Queue a proposal for execution
  const queueProposal = async (
    proposalId: string | number
  ): Promise<boolean> => {
    return (await execute(async () => {
      const proposal = getProposal(proposalId);

      if (!proposal) {
        throw new Error("Proposal not found");
      }

      if (proposal.status !== "succeeded") {
        throw new Error("Only succeeded proposals can be queued");
      }

      // In a real implementation, you'd call the contract to queue the proposal
      // For demo purposes, we'll update our local state

      const updatedProposals = proposals.map((p) => {
        if (
          p.id === proposalId ||
          p.proposalId.toString() === proposalId.toString()
        ) {
          return {
            ...p,
            status: "queued" as ProposalStatus,
            queuedAt: Math.floor(Date.now() / 1000),
            eta:
              Math.floor(Date.now() / 1000) +
              (governanceSettings?.executionDelay || 172800),
          };
        }
        return p;
      });

      setProposals(updatedProposals);

      return true;
    })) as boolean;
  };

  // Cancel a proposal
  const cancelProposal = async (
    proposalId: string | number
  ): Promise<boolean> => {
    return (await execute(async () => {
      const proposal = getProposal(proposalId);

      if (!proposal) {
        throw new Error("Proposal not found");
      }

      if (proposal.proposer.toLowerCase() !== address?.toLowerCase()) {
        throw new Error("Only the proposer can cancel this proposal");
      }

      if (
        ["executed", "canceled", "defeated", "expired"].includes(
          proposal.status
        )
      ) {
        throw new Error("Proposal cannot be canceled");
      }

      // In a real implementation, you'd call the contract to cancel the proposal
      // For demo purposes, we'll update our local state

      const updatedProposals = proposals.map((p) => {
        if (
          p.id === proposalId ||
          p.proposalId.toString() === proposalId.toString()
        ) {
          return {
            ...p,
            status: "canceled" as ProposalStatus,
            canceledAt: Math.floor(Date.now() / 1000),
          };
        }
        return p;
      });

      setProposals(updatedProposals);

      return true;
    })) as boolean;
  };

  // Check if user has voted on a proposal
  const hasVoted = useCallback(
    (proposalId: string | number): boolean => {
      return userVotes.some((v) => v.proposalId === proposalId.toString());
    },
    [userVotes]
  );

  // Get user's vote on a proposal
  const getUserVote = useCallback(
    (proposalId: string | number): ProposalVote | null => {
      return (
        userVotes.find((v) => v.proposalId === proposalId.toString()) || null
      );
    },
    [userVotes]
  );

  // Calculate proposal state
  const getProposalState = useCallback(
    (proposalId: string | number) => {
      const proposal = getProposal(proposalId);

      if (!proposal) {
        return null;
      }

      // Calculate voting results - adapt the proposal to match expected type
      const proposalForCalculation = {
        ...proposal,
        executed: proposal.status === "executed",
        canceled: proposal.status === "canceled",
        quorum: proposal.quorumVotes,
      };
      const results = calculateVotingResults(proposalForCalculation);

      // Check if quorum has been reached
      const quorumReached = hasReachedQuorum(
        proposalForCalculation,
        token?.totalSupply || utils.parseEther("100000000")
      );

      // Check if the proposal has passed
      const passed = hasProposalPassed(proposalForCalculation);

      return {
        ...results,
        quorumReached,
        passed,
      };
    },
    [getProposal, token?.totalSupply]
  );

  // Initialize data
  useEffect(() => {
    fetchProposals();
    if (address) {
      fetchUserVotes();
    }
  }, [fetchProposals, fetchUserVotes, address]);

  return {
    proposals,
    userVotes,
    userVotingPower,
    governanceSettings,
    isLoading: isLoading || executionLoading,
    error: error || executionError,
    fetchProposals,
    getProposal,
    createProposal,
    castVote,
    executeProposal,
    queueProposal,
    cancelProposal,
    hasVoted,
    getUserVote,
    getProposalState,
  };
};
