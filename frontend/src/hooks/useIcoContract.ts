import { useState, useEffect, useCallback } from "react";
import { BigNumber, utils } from "ethers";
import { useAddress, useChainId, useSDK } from "@thirdweb-dev/react";
import { getContractAddress } from "../constants/addresses";
import { useAsync } from "./useAsync";
import { IcoContract } from "../types/contracts";
import { ICO_STAGES } from "../constants/tokenomics";
import { formatTokenAmount } from "../utils/format";

/**
 * ICO stage information
 */
interface IcoStage {
  name: string;
  startTime: number;
  endTime: number;
  rate: number;
  cap: BigNumber;
  minContribution: BigNumber;
  maxContribution: BigNumber;
  raised: BigNumber;
  tokensSold: BigNumber;
  active: boolean;
}

/**
 * Contribution information
 */
interface Contribution {
  id: string;
  address: string;
  amount: BigNumber;
  tokens: BigNumber;
  timestamp: number;
  txHash: string;
}

/**
 * Custom hook for interacting with the ICO contract
 * @param contractAddress Optional override for the contract address
 * @returns Functions and state for ICO contract interaction
 */
export const useIcoContract = (contractAddress?: string) => {
  const address = useAddress();
  const chainId = useChainId();
  const sdk = useSDK();
  const { execute, loading: asyncLoading, error: asyncError } = useAsync();

  const [contract, setContract] = useState<IcoContract | null>(null);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [userContribution, setUserContribution] = useState<BigNumber>(
    BigNumber.from(0)
  );
  const [userTokens, setUserTokens] = useState<BigNumber>(BigNumber.from(0));
  const [stage, setStage] = useState<IcoStage | null>(null);
  const [totalRaised, setTotalRaised] = useState<BigNumber>(BigNumber.from(0));
  const [softCap, setSoftCap] = useState<BigNumber>(BigNumber.from(0));
  const [hardCap, setHardCap] = useState<BigNumber>(BigNumber.from(0));
  const [rate, setRate] = useState<BigNumber>(BigNumber.from(0));
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [minContribution, setMinContribution] = useState<BigNumber>(
    BigNumber.from(0)
  );
  const [maxContribution, setMaxContribution] = useState<BigNumber>(
    BigNumber.from(0)
  );
  const [isActive, setIsActive] = useState<boolean>(false);
  const [icoStatus, setIcoStatus] = useState<
    "upcoming" | "active" | "ended" | "finalized"
  >("upcoming");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize contract
  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!sdk) return;

        const icoAddress =
          contractAddress || getContractAddress("ICO", chainId);
        if (!icoAddress) {
          setError("ICO contract address not found for this network");
          return;
        }

        // In a real application, you would use the SDK to get the contract
        // For demo purposes, we'll initialize with mock data

        // Mock contract data
        const mockIcoContract: IcoContract = {
          address: icoAddress,
          blockNumber: 10000000,
          blockTimestamp: Math.floor(Date.now() / 1000) - 86400 * 30, // 30 days ago
          deployer: "0xD979acD786A92a4Fb8d1046886B68Fc9896a3C25",
          network: {
            chainId: chainId || 11155111, // Default to Sepolia
            name: chainId === 1 ? "Ethereum Mainnet" : "Sepolia Testnet",
          },
          token: getContractAddress("TOKEN", chainId),
          rate: utils.parseEther("0.001"), // 1 ETH = 1000 tokens
          weiRaised: utils.parseEther("125"),
          startTime: Math.floor(Date.now() / 1000) - 86400 * 14, // 14 days ago
          endTime: Math.floor(Date.now() / 1000) + 86400 * 16, // 16 days from now
          softCap: utils.parseEther("100"),
          hardCap: utils.parseEther("500"),
          minContribution: utils.parseEther("0.1"),
          maxContribution: utils.parseEther("10"),
          whitelistEnabled: true,
          vestingEnabled: true,
          vestingCliff: 30 * 24 * 60 * 60, // 30 days
          vestingDuration: 180 * 24 * 60 * 60, // 180 days
          tokensSold: utils.parseEther("125000"), // 125,000 tokens sold
          tokensAvailable: utils.parseEther("500000"), // 500,000 tokens available
          status: "active",
        };

        setContract(mockIcoContract);
        setSoftCap(mockIcoContract.softCap);
        setHardCap(mockIcoContract.hardCap);
        setRate(mockIcoContract.rate);
        setStartTime(mockIcoContract.startTime);
        setEndTime(mockIcoContract.endTime);
        setMinContribution(mockIcoContract.minContribution);
        setMaxContribution(mockIcoContract.maxContribution);
        setTotalRaised(mockIcoContract.weiRaised);

        // Set ICO status
        const now = Math.floor(Date.now() / 1000);
        if (now < mockIcoContract.startTime) {
          setIcoStatus("upcoming");
          setIsActive(false);
        } else if (now > mockIcoContract.endTime) {
          setIcoStatus("ended");
          setIsActive(false);
        } else {
          setIcoStatus("active");
          setIsActive(true);
        }

        // Mock current stage
        const mockStage: IcoStage = {
          name: "Public",
          startTime: mockIcoContract.startTime,
          endTime: mockIcoContract.endTime,
          rate: parseFloat(utils.formatEther(mockIcoContract.rate)) * 1000, // 1 ETH = 1000 tokens
          cap: mockIcoContract.hardCap,
          minContribution: mockIcoContract.minContribution,
          maxContribution: mockIcoContract.maxContribution,
          raised: mockIcoContract.weiRaised,
          tokensSold: mockIcoContract.tokensSold,
          active:
            now >= mockIcoContract.startTime && now <= mockIcoContract.endTime,
        };
        setStage(mockStage);

        // If user is connected, fetch their contribution
        if (address) {
          // Mock user contribution
          const mockUserContribution = utils.parseEther("1.5"); // 1.5 ETH
          const mockUserTokens = mockUserContribution.mul(1000); // 1.5 ETH * 1000 tokens/ETH = 1500 tokens

          setUserContribution(mockUserContribution);
          setUserTokens(mockUserTokens);
        }

        // Mock contributions list
        const mockContributions: Contribution[] = [
          {
            id: "1",
            address: "0x1234567890123456789012345678901234567890",
            amount: utils.parseEther("5"),
            tokens: utils.parseEther("5000"),
            timestamp: Math.floor(Date.now() / 1000) - 86400 * 10, // 10 days ago
            txHash:
              "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
          },
          {
            id: "2",
            address: "0x0987654321098765432109876543210987654321",
            amount: utils.parseEther("2.5"),
            tokens: utils.parseEther("2500"),
            timestamp: Math.floor(Date.now() / 1000) - 86400 * 7, // 7 days ago
            txHash:
              "0x0987654321098765432109876543210987654321098765432109876543210987654",
          },
          {
            id: "3",
            address: address || "0x5555555555555555555555555555555555555555",
            amount: utils.parseEther("1.5"),
            tokens: utils.parseEther("1500"),
            timestamp: Math.floor(Date.now() / 1000) - 86400 * 3, // 3 days ago
            txHash:
              "0x5555555555555555555555555555555555555555555555555555555555555555",
          },
        ];
        setContributions(mockContributions);
      } catch (err: any) {
        console.error("Error initializing ICO contract:", err);
        setError(`Failed to initialize ICO contract: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [sdk, address, chainId, contractAddress]);

  /**
   * Contribute to the ICO
   * @param amount Amount in ETH to contribute
   * @returns Transaction hash if successful
   */
  const contribute = async (amount: string): Promise<string | null> => {
    return (await execute(async (): Promise<string | null> => {
      if (!contract) throw new Error("Contract not initialized");
      if (!address) throw new Error("Wallet not connected");
      if (!isActive) throw new Error("ICO is not active");

      const value = utils.parseEther(amount);

      // Validate contribution amount
      if (value.lt(minContribution)) {
        throw new Error(
          `Contribution must be at least ${utils.formatEther(
            minContribution
          )} ETH`
        );
      }

      if (value.gt(maxContribution)) {
        throw new Error(
          `Contribution cannot exceed ${utils.formatEther(maxContribution)} ETH`
        );
      }

      // Check if user would exceed their max contribution
      const newTotalContribution = userContribution.add(value);
      if (newTotalContribution.gt(maxContribution)) {
        throw new Error(
          `Maximum contribution limit reached. You can contribute up to ${utils.formatEther(
            maxContribution.sub(userContribution)
          )} ETH more.`
        );
      }

      // Check if contribution would exceed hard cap
      const newTotalRaised = totalRaised.add(value);
      if (newTotalRaised.gt(hardCap)) {
        const remaining = hardCap.sub(totalRaised);
        if (remaining.lte(0)) {
          throw new Error("Hard cap reached. ICO is now closed.");
        }
        throw new Error(
          `Contribution would exceed hard cap. Maximum contribution at this time is ${utils.formatEther(
            remaining
          )} ETH.`
        );
      }

      // In a real application, you would use the contract to contribute
      // For demo purposes, we'll simulate the contribution

      // Calculate tokens received
      const tokensReceived = value.mul(1000); // 1 ETH = 1000 tokens

      // Create new contribution
      const newContribution: Contribution = {
        id: `contribution-${Date.now()}`,
        address: address,
        amount: value,
        tokens: tokensReceived,
        timestamp: Math.floor(Date.now() / 1000),
        txHash: `0x${Math.random().toString(16).slice(2, 66)}`,
      };

      // Update state
      setContributions([newContribution, ...contributions]);
      setUserContribution(userContribution.add(value));
      setUserTokens(userTokens.add(tokensReceived));
      setTotalRaised(totalRaised.add(value));

      // If stage is defined, update it too
      if (stage) {
        setStage({
          ...stage,
          raised: stage.raised.add(value),
          tokensSold: stage.tokensSold.add(tokensReceived),
        });
      }

      return newContribution.txHash;
    })) as Promise<string | null>;
  };

  /**
   * Get ICO progress as a percentage
   * @returns Progress percentage (0-100)
   */
  const getProgress = useCallback((): number => {
    if (!hardCap || hardCap.eq(0)) return 0;
    return Math.min(
      100,
      (parseFloat(utils.formatEther(totalRaised)) /
        parseFloat(utils.formatEther(hardCap))) *
        100
    );
  }, [totalRaised, hardCap]);

  /**
   * Get time remaining in the ICO
   * @returns Time remaining in seconds, or 0 if ICO is over
   */
  const getTimeRemaining = useCallback((): number => {
    const now = Math.floor(Date.now() / 1000);
    return now >= endTime ? 0 : endTime - now;
  }, [endTime]);

  /**
   * Get ICO stages information
   * @returns Array of ICO stages
   */
  const getStages = useCallback((): typeof ICO_STAGES => {
    return ICO_STAGES;
  }, []);

  /**
   * Get user's claimable tokens
   * @returns User's claimable tokens
   */
  const getClaimableTokens = useCallback((): BigNumber => {
    if (!userTokens || !address) return BigNumber.from(0);

    // In a real application, you would check the vesting schedule
    // For demo purposes, we'll assume 20% of tokens are claimable at TGE
    return userTokens.mul(20).div(100);
  }, [userTokens, address]);

  /**
   * Claim available tokens
   * @returns Transaction hash if successful
   */
  const claimTokens = async (): Promise<string | null> => {
    return (await execute(async () => {
      if (!contract) throw new Error("Contract not initialized");
      if (!address) throw new Error("Wallet not connected");

      const claimable = getClaimableTokens();
      if (claimable.eq(0)) {
        throw new Error("No tokens available to claim");
      }

      // In a real application, you would use the contract to claim tokens
      // For demo purposes, we'll simulate the claim

      // Transaction hash
      const txHash = `0x${Math.random().toString(16).slice(2, 66)}`;

      return txHash;
    })) as Promise<string | null>;
  };

  /**
   * Get current ICO metrics
   * @returns ICO metrics including progress, participation, etc.
   */
  const getMetrics = useCallback(() => {
    return {
      totalRaised: totalRaised,
      formattedTotalRaised: utils.formatEther(totalRaised || BigNumber.from(0)),
      hardCap: hardCap,
      formattedHardCap: utils.formatEther(hardCap || BigNumber.from(0)),
      softCap: softCap,
      formattedSoftCap: utils.formatEther(softCap || BigNumber.from(0)),
      progress: getProgress(),
      tokensSold: stage?.tokensSold || BigNumber.from(0),
      formattedTokensSold: formatTokenAmount(
        stage?.tokensSold || BigNumber.from(0),
        18,
        0
      ),
      participants: new Set(contributions.map((c) => c.address)).size,
      userContribution: userContribution,
      formattedUserContribution: utils.formatEther(
        userContribution || BigNumber.from(0)
      ),
      userTokens: userTokens,
      formattedUserTokens: formatTokenAmount(
        userTokens || BigNumber.from(0),
        18,
        0
      ),
      timeRemaining: getTimeRemaining(),
      isActive: isActive,
      status: icoStatus,
      startTime: startTime,
      endTime: endTime,
      rate: rate ? parseFloat(utils.formatEther(rate)) * 1000 : 0, // 1 ETH = 1000 tokens
    };
  }, [
    totalRaised,
    hardCap,
    softCap,
    getProgress,
    stage,
    contributions,
    userContribution,
    userTokens,
    getTimeRemaining,
    isActive,
    icoStatus,
    startTime,
    endTime,
    rate,
  ]);

  return {
    contract,
    contributions,
    userContribution,
    userTokens,
    stage,
    totalRaised,
    softCap,
    hardCap,
    rate,
    startTime,
    endTime,
    minContribution,
    maxContribution,
    isActive,
    icoStatus,
    progress: getProgress(),
    timeRemaining: getTimeRemaining(),
    claimableTokens: getClaimableTokens(),
    metrics: getMetrics(),
    isLoading,
    error: error || asyncError,
    contribute,
    getProgress,
    getTimeRemaining,
    getStages,
    getClaimableTokens,
    claimTokens,
    getMetrics,
  };
};
