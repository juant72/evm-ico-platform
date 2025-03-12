import { useState, useEffect, useCallback } from "react";
import { BigNumber, utils } from "ethers";
import { useAddress, useChainId, useSDK } from "@thirdweb-dev/react";
import { getContractAddress } from "../constants/addresses";
import { formatTokenAmount } from "../utils/format";
import { useAsync } from "./useAsync";
import { StakingContract } from "../types/contracts";

/**
 * Staking position interface
 */
interface StakingPosition {
  amount: BigNumber;
  rewards: BigNumber;
  stakedAt: number;
  lastRewardCalculation: number;
  lockPeriod: number; // in seconds
  lockEndTime: number;
  cooldownStartTime: number;
  isInCooldown: boolean;
  isWithdrawable: boolean;
}

/**
 * Staking rewards interface
 */
interface StakingRewards {
  earned: BigNumber;
  rate: BigNumber; // per token
  apr: number; // annual percentage rate
  nextClaimable: number; // timestamp
}

/**
 * Staking pool interface
 */
interface StakingPool {
  id: string;
  name: string;
  lockPeriod: number; // in seconds
  rewardMultiplier: number;
  totalStaked: BigNumber;
  stakersCount: number;
  minStakeAmount: BigNumber;
}

/**
 * Custom hook for interacting with the staking contract
 * @param contractAddress Optional override for the contract address
 * @returns Functions and state for staking contract interaction
 */
export const useStaking = (contractAddress?: string) => {
  const address = useAddress();
  const chainId = useChainId();
  const sdk = useSDK();
  const { execute, loading: asyncLoading, error: asyncError } = useAsync();

  const [contract, setContract] = useState<StakingContract | null>(null);
  const [stakingPosition, setStakingPosition] =
    useState<StakingPosition | null>(null);
  const [rewards, setRewards] = useState<StakingRewards | null>(null);
  const [totalStaked, setTotalStaked] = useState<BigNumber>(BigNumber.from(0));
  const [pools, setPools] = useState<StakingPool[]>([]);
  const [userPool, setUserPool] = useState<StakingPool | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize contract
  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!sdk) return;

        const stakingAddress =
          contractAddress || getContractAddress("STAKING", chainId);
        if (!stakingAddress) {
          setError("Staking contract address not found for this network");
          return;
        }

        // In a real application, you would use the SDK to get the contract
        // For demo purposes, we'll initialize with mock data

        // Mock contract data
        const mockStakingContract: StakingContract = {
          address: stakingAddress,
          blockNumber: 10000000,
          blockTimestamp: Math.floor(Date.now() / 1000) - 86400 * 30, // 30 days ago
          deployer: "0xD979acD786A92a4Fb8d1046886B68Fc9896a3C25",
          network: {
            chainId: chainId || 11155111, // Default to Sepolia
            name: chainId === 1 ? "Ethereum Mainnet" : "Sepolia Testnet",
          },
          stakingToken: getContractAddress("TOKEN", chainId),
          rewardToken: getContractAddress("TOKEN", chainId), // Same token for staking and rewards
          rewardRate: utils.parseEther("0.000001"), // Rewards per second per token staked
          rewardsDuration: 30 * 24 * 60 * 60, // 30 days
          periodFinish: Math.floor(Date.now() / 1000) + 60 * 24 * 60 * 60, // 60 days from now
          totalSupply: utils.parseEther("500000"), // 500,000 tokens staked
          minimumStake: utils.parseEther("100"), // 100 tokens minimum
          cooldownPeriod: 7 * 24 * 60 * 60, // 7 days
          withdrawalWindow: 3 * 24 * 60 * 60, // 3 days
        };

        setContract(mockStakingContract);
        setTotalStaked(mockStakingContract.totalSupply);

        // Mock staking pools
        const mockPools: StakingPool[] = [
          {
            id: "1",
            name: "Flexible Staking",
            lockPeriod: 0, // No lock
            rewardMultiplier: 1, // Base rate
            totalStaked: utils.parseEther("200000"), // 200,000 tokens
            stakersCount: 150,
            minStakeAmount: utils.parseEther("100"), // 100 tokens
          },
          {
            id: "2",
            name: "30-Day Staking",
            lockPeriod: 30 * 24 * 60 * 60, // 30 days
            rewardMultiplier: 1.5, // 50% higher rewards
            totalStaked: utils.parseEther("150000"), // 150,000 tokens
            stakersCount: 75,
            minStakeAmount: utils.parseEther("250"), // 250 tokens
          },
          {
            id: "3",
            name: "90-Day Staking",
            lockPeriod: 90 * 24 * 60 * 60, // 90 days
            rewardMultiplier: 2, // Double rewards
            totalStaked: utils.parseEther("100000"), // 100,000 tokens
            stakersCount: 40,
            minStakeAmount: utils.parseEther("500"), // 500 tokens
          },
          {
            id: "4",
            name: "180-Day Staking",
            lockPeriod: 180 * 24 * 60 * 60, // 180 days
            rewardMultiplier: 3, // Triple rewards
            totalStaked: utils.parseEther("50000"), // 50,000 tokens
            stakersCount: 15,
            minStakeAmount: utils.parseEther("1000"), // 1000 tokens
          },
        ];

        setPools(mockPools);

        if (address) {
          // Mock user staking position
          const mockPosition: StakingPosition = {
            amount: utils.parseEther("1000"), // 1,000 tokens
            rewards: utils.parseEther("25"), // 25 tokens earned
            stakedAt: Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60, // 30 days ago
            lastRewardCalculation: Math.floor(Date.now() / 1000) - 24 * 60 * 60, // 1 day ago
            lockPeriod: 30 * 24 * 60 * 60, // 30 days
            lockEndTime: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 1 day from now
            cooldownStartTime: 0, // Not in cooldown
            isInCooldown: false,
            isWithdrawable: false,
          };

          setStakingPosition(mockPosition);

          // Mock user rewards
          const mockRewards: StakingRewards = {
            earned: utils.parseEther("25"),
            rate: utils.parseEther("0.0015"), // 0.0015 tokens per token staked per day
            apr: 18.25, // 18.25% APR
            nextClaimable: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 1 day from now
          };

          setRewards(mockRewards);

          // Set user pool
          setUserPool(mockPools[1]); // 30-day staking
        }
      } catch (err: any) {
        console.error("Error initializing staking contract:", err);
        setError(`Failed to initialize staking contract: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [sdk, address, chainId, contractAddress]);

  /**
   * Stake tokens
   * @param amount Amount of tokens to stake
   * @param poolId ID of the pool to stake in
   * @returns Transaction hash if successful
   */
  const stake = async (
    amount: string,
    poolId: string
  ): Promise<string | null> => {
    return (await execute(async () => {
      if (!contract) throw new Error("Contract not initialized");
      if (!address) throw new Error("Wallet not connected");

      const value = utils.parseEther(amount);

      // Find the selected pool
      const pool = pools.find((p) => p.id === poolId);
      if (!pool) throw new Error("Invalid pool selected");

      // Validate stake amount
      if (value.lt(pool.minStakeAmount)) {
        throw new Error(
          `Minimum stake amount is ${formatTokenAmount(
            pool.minStakeAmount
          )} tokens for this pool`
        );
      }

      // In a real application, you would use the contract to stake
      // For demo purposes, we'll simulate staking

      // Create mock position or update existing
      const now = Math.floor(Date.now() / 1000);
      const newPosition: StakingPosition = {
        amount: stakingPosition ? stakingPosition.amount.add(value) : value,
        rewards: stakingPosition?.rewards || BigNumber.from(0),
        stakedAt: stakingPosition ? stakingPosition.stakedAt : now,
        lastRewardCalculation: now,
        lockPeriod: pool.lockPeriod,
        lockEndTime: now + pool.lockPeriod,
        cooldownStartTime: 0,
        isInCooldown: false,
        isWithdrawable: false,
      };

      setStakingPosition(newPosition);
      setUserPool(pool);

      // Update total staked
      setTotalStaked(totalStaked.add(value));

      // Update pool
      setPools(
        pools.map((p) =>
          p.id === poolId
            ? {
                ...p,
                totalStaked: p.totalStaked.add(value),
                stakersCount: !stakingPosition
                  ? p.stakersCount + 1
                  : p.stakersCount,
              }
            : p
        )
      );

      // Transaction hash
      const txHash = `0x${Math.random().toString(16).slice(2, 66)}`;

      return txHash;
    })) as string | null;
  };

  /**
   * Unstake tokens (start cooldown period)
   * @param amount Amount of tokens to unstake, or "max" for all
   * @returns Transaction hash if successful
   */
  const unstake = async (amount: string): Promise<string | null> => {
    return (await execute(async () => {
      if (!contract) throw new Error("Contract not initialized");
      if (!address) throw new Error("Wallet not connected");
      if (!stakingPosition) throw new Error("No staking position found");

      const value =
        amount.toLowerCase() === "max"
          ? stakingPosition.amount
          : utils.parseEther(amount);

      // Validate unstake amount
      if (value.gt(stakingPosition.amount)) {
        throw new Error(
          `Cannot unstake more than your staked amount (${formatTokenAmount(
            stakingPosition.amount
          )} tokens)`
        );
      }

      // Check if in lock period
      const now = Math.floor(Date.now() / 1000);
      if (stakingPosition.lockEndTime > now) {
        throw new Error(
          `Cannot unstake until lock period ends (${new Date(
            stakingPosition.lockEndTime * 1000
          ).toLocaleDateString()})`
        );
      }

      // In a real application, you would use the contract to initiate unstaking
      // For demo purposes, we'll simulate starting the cooldown period

      // Update position
      const newPosition: StakingPosition = {
        ...stakingPosition,
        amount: stakingPosition.amount.sub(value),
        cooldownStartTime: now,
        isInCooldown: true,
        isWithdrawable: false,
      };

      setStakingPosition(newPosition);

      // Transaction hash
      const txHash = `0x${Math.random().toString(16).slice(2, 66)}`;

      return txHash;
    })) as string | null;
  };

  /**
   * Withdraw tokens after cooldown period
   * @returns Transaction hash if successful
   */
  const withdraw = async (): Promise<string | null> => {
    return (await execute(async () => {
      if (!contract) throw new Error("Contract not initialized");
      if (!address) throw new Error("Wallet not connected");
      if (!stakingPosition) throw new Error("No staking position found");

      // Check if cooldown is complete
      const now = Math.floor(Date.now() / 1000);
      const cooldownEndTime =
        stakingPosition.cooldownStartTime + contract.cooldownPeriod;

      if (stakingPosition.cooldownStartTime === 0) {
        throw new Error(
          "You must start the unstaking process before withdrawing"
        );
      }

      if (now < cooldownEndTime) {
        throw new Error(
          `Cooldown period not complete. Available for withdrawal on ${new Date(
            cooldownEndTime * 1000
          ).toLocaleDateString()}`
        );
      }

      // Check if within withdrawal window
      const withdrawalEndTime = cooldownEndTime + contract.withdrawalWindow;
      if (now > withdrawalEndTime) {
        throw new Error(
          "Withdrawal window has expired. You must restart the unstaking process."
        );
      }

      // In a real application, you would use the contract to withdraw
      // For demo purposes, we'll simulate withdrawal

      // Reset position
      setStakingPosition(null);
      setUserPool(null);

      // Update total staked
      setTotalStaked(totalStaked.sub(stakingPosition.amount));

      // Transaction hash
      const txHash = `0x${Math.random().toString(16).slice(2, 66)}`;

      return txHash;
    })) as string | null;
  };

  /**
   * Claim rewards
   * @returns Transaction hash if successful
   */
  const claimRewards = async (): Promise<string | null> => {
    return (await execute(async () => {
      if (!contract) throw new Error("Contract not initialized");
      if (!address) throw new Error("Wallet not connected");
      if (!stakingPosition || !rewards)
        throw new Error("No staking position found");

      // Check if rewards are available
      if (rewards.earned.eq(0)) {
        throw new Error("No rewards available to claim");
      }

      // In a real application, you would use the contract to claim rewards
      // For demo purposes, we'll simulate claiming

      // Update rewards
      const claimedAmount = rewards.earned;
      setRewards({
        ...rewards,
        earned: BigNumber.from(0),
      });

      // Update position
      setStakingPosition({
        ...stakingPosition,
        rewards: BigNumber.from(0),
        lastRewardCalculation: Math.floor(Date.now() / 1000),
      });

      // Transaction hash
      const txHash = `0x${Math.random().toString(16).slice(2, 66)}`;

      return txHash;
    })) as string | null;
  };

  /**
   * Calculate APR for a pool
   * @param poolId Pool ID
   * @returns APR as a percentage
   */
  const calculateApr = useCallback(
    (poolId: string): number => {
      const pool = pools.find((p) => p.id === poolId);
      if (!pool || !contract) return 0;

      // Basic APR calculation
      const baseRewardRate = parseFloat(utils.formatEther(contract.rewardRate));
      const tokensPerYear = baseRewardRate * 365 * 24 * 60 * 60; // Tokens per year per token staked
      return tokensPerYear * 100 * pool.rewardMultiplier; // As percentage, with pool multiplier
    },
    [pools, contract]
  );

  /**
   * Get all staking metrics
   * @returns Object containing all staking metrics
   */
  const getMetrics = useCallback(() => {
    return {
      totalStaked,
      formattedTotalStaked: formatTokenAmount(totalStaked),
      stakingPosition,
      userStaked: stakingPosition?.amount || BigNumber.from(0),
      formattedUserStaked: formatTokenAmount(
        stakingPosition?.amount || BigNumber.from(0)
      ),
      rewards: rewards?.earned || BigNumber.from(0),
      formattedRewards: formatTokenAmount(rewards?.earned || BigNumber.from(0)),
      apr: rewards?.apr || 0,
      pools: pools.map((pool) => ({
        ...pool,
        formattedTotalStaked: formatTokenAmount(pool.totalStaked),
        formattedMinStake: formatTokenAmount(pool.minStakeAmount),
        apr: calculateApr(pool.id),
      })),
      userPool,
      isStaking: Boolean(stakingPosition && stakingPosition.amount.gt(0)),
      isLocked: Boolean(
        stakingPosition &&
          stakingPosition.lockEndTime > Math.floor(Date.now() / 1000)
      ),
      isInCooldown: Boolean(stakingPosition?.isInCooldown),
      isWithdrawable: Boolean(stakingPosition?.isWithdrawable),
      cooldownEndTime: stakingPosition?.cooldownStartTime
        ? stakingPosition.cooldownStartTime + (contract?.cooldownPeriod || 0)
        : 0,
      withdrawalWindowEndTime: stakingPosition?.cooldownStartTime
        ? stakingPosition.cooldownStartTime +
          (contract?.cooldownPeriod || 0) +
          (contract?.withdrawalWindow || 0)
        : 0,
      lockEndTime: stakingPosition?.lockEndTime || 0,
    };
  }, [
    totalStaked,
    stakingPosition,
    rewards,
    pools,
    userPool,
    contract,
    calculateApr,
  ]);

  return {
    contract,
    stakingPosition,
    rewards,
    totalStaked,
    pools,
    userPool,
    isLoading,
    error: error || asyncError,
    stake,
    unstake,
    withdraw,
    claimRewards,
    calculateApr,
    metrics: getMetrics(),
  };
};
