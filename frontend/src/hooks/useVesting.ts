import { useState, useEffect, useCallback } from "react";
import { BigNumber, utils } from "ethers";
import { useAddress, useChainId, useSDK } from "@thirdweb-dev/react";
import { getContractAddress } from "../constants/addresses";
import { useAsync } from "./useAsync";
import {
  VestingSchedule,
  MonthlyVestingEntry,
  TokenReleaseEvent,
} from "../types/distribution";
import { useTokenContract } from "./useTokenContract";
import { format, addMonths } from "date-fns";

/**
 * Vesting schedule data
 */
interface VestingData {
  schedules: VestingSchedule[];
  totalVested: BigNumber;
  totalReleased: BigNumber;
  totalPending: BigNumber;
  nextRelease: {
    date: Date;
    amount: BigNumber;
  } | null;
  releaseHistory: TokenReleaseEvent[];
  vestingStartDate: Date;
  vestingEndDate: Date;
}

/**
 * Custom hook for interacting with token vesting contract
 * @param contractAddress Optional override for the vesting contract address
 * @returns Functions and state for vesting contract interaction
 */
export const useVesting = (contractAddress?: string) => {
  const address = useAddress();
  const chainId = useChainId();
  const sdk = useSDK();
  const { token } = useTokenContract();
  const { execute, loading: asyncLoading, error: asyncError } = useAsync();

  const [vestingData, setVestingData] = useState<VestingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize vesting data
  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!sdk || !address) return;

        const vestingAddress =
          contractAddress || getContractAddress("VESTING", chainId);
        if (!vestingAddress) {
          setError("Vesting contract address not found for this network");
          return;
        }

        // In a real application, you would use the SDK to get the contract
        // For demo purposes, we'll initialize with mock data

        // Start date is 30 days ago
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);

        // End date is 2 years from start
        const endDate = new Date(startDate);
        endDate.setFullYear(endDate.getFullYear() + 2);

        // Create mock vesting schedules
        const mockSchedules: VestingSchedule[] = [
          {
            id: "1",
            recipient: address,
            tokenAddress: token?.address || "",
            amount: utils.parseEther("10000"), // 10,000 tokens
            startTimestamp: Math.floor(startDate.getTime() / 1000),
            cliff: 30 * 24 * 60 * 60, // 30 days cliff
            duration: 365 * 24 * 60 * 60, // 1 year vesting
            releaseIntervalSecs: 30 * 24 * 60 * 60, // Monthly release
            released: utils.parseEther("2500"), // 2,500 tokens released
            revoked: false,
            category: "Private Sale",
            schedule: generateMonthlySchedule(
              startDate,
              utils.parseEther("10000"),
              utils.parseEther("2500"),
              12,
              1
            ),
          },
          {
            id: "2",
            recipient: address,
            tokenAddress: token?.address || "",
            amount: utils.parseEther("5000"), // 5,000 tokens
            startTimestamp: Math.floor(startDate.getTime() / 1000),
            cliff: 0, // No cliff
            duration: 730 * 24 * 60 * 60, // 2 years vesting
            releaseIntervalSecs: 30 * 24 * 60 * 60, // Monthly release
            released: utils.parseEther("625"), // 625 tokens released
            revoked: false,
            category: "Team",
            schedule: generateMonthlySchedule(
              startDate,
              utils.parseEther("5000"),
              utils.parseEther("625"),
              24,
              0
            ),
          },
        ];

        // Calculate total values
        const totalVested = mockSchedules.reduce(
          (sum, schedule) => sum.add(schedule.amount),
          BigNumber.from(0)
        );

        const totalReleased = mockSchedules.reduce(
          (sum, schedule) => sum.add(schedule.released),
          BigNumber.from(0)
        );

        const totalPending = totalVested.sub(totalReleased);

        // Generate mock release history
        const mockReleaseHistory: TokenReleaseEvent[] = [];
        const now = new Date();

        for (let i = 0; i < 3; i++) {
          const releaseDate = new Date(startDate);
          releaseDate.setDate(releaseDate.getDate() + 30 * (i + 1));

          // Only include releases that have happened
          if (releaseDate <= now) {
            mockReleaseHistory.push({
              id: `release-${i + 1}`,
              vestingScheduleId: i % 2 === 0 ? "1" : "2",
              amount: utils.parseEther(i % 2 === 0 ? "833.33" : "208.33"),
              timestamp: Math.floor(releaseDate.getTime() / 1000),
              recipient: address,
              transactionHash: `0x${Math.random().toString(16).slice(2, 66)}`,
            });
          }
        }

        // Next release date is the next month from now
        const nextReleaseDate = new Date();
        nextReleaseDate.setDate(1); // First day of the month
        nextReleaseDate.setMonth(nextReleaseDate.getMonth() + 1); // Next month

        const nextReleaseAmount = utils.parseEther("1041.66"); // Combined monthly release

        const mockVestingData: VestingData = {
          schedules: mockSchedules,
          totalVested,
          totalReleased,
          totalPending,
          nextRelease: {
            date: nextReleaseDate,
            amount: nextReleaseAmount,
          },
          releaseHistory: mockReleaseHistory,
          vestingStartDate: startDate,
          vestingEndDate: endDate,
        };

        setVestingData(mockVestingData);
      } catch (err: any) {
        console.error("Error initializing vesting:", err);
        setError(`Failed to initialize vesting: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [sdk, address, chainId, contractAddress, token]);

  /**
   * Generate a monthly vesting schedule
   */
  const generateMonthlySchedule = (
    startDate: Date,
    totalAmount: BigNumber,
    releasedAmount: BigNumber,
    months: number,
    cliffMonths: number
  ): MonthlyVestingEntry[] => {
    const schedule: MonthlyVestingEntry[] = [];
    const monthlyAmount = totalAmount.div(months);
    let cumulative = BigNumber.from(0);

    for (let i = 0; i <= months; i++) {
      const date = addMonths(startDate, i);

      // Handle TGE (i=0) and cliff period
      let released = BigNumber.from(0);
      if (i === 0) {
        // Token Generation Event - no tokens
        released = BigNumber.from(0);
      } else if (i <= cliffMonths) {
        // Cliff period - no tokens
        released = BigNumber.from(0);
      } else {
        // Regular vesting period
        released = monthlyAmount;
      }

      cumulative = cumulative.add(released);

      // Calculate percentages
      const releasedPercent =
        (parseFloat(utils.formatEther(released)) /
          parseFloat(utils.formatEther(totalAmount))) *
        100;
      const cumulativePercent =
        (parseFloat(utils.formatEther(cumulative)) /
          parseFloat(utils.formatEther(totalAmount))) *
        100;

      // Don't exceed the total amount
      const adjustedCumulative = cumulative.gt(totalAmount)
        ? totalAmount
        : cumulative;

      schedule.push({
        month: i,
        date,
        released,
        releasedPercent,
        cumulative: adjustedCumulative,
        cumulativePercent: Math.min(cumulativePercent, 100),
      });
    }

    return schedule;
  };

  /**
   * Claim available tokens from vesting schedule
   * @returns Promise resolving to boolean indicating success
   */
  const claimVestedTokens = async (): Promise<boolean> => {
    setIsLoading(true);

    try {
      if (!vestingData || !vestingData.nextRelease || !address) {
        throw new Error("No vesting data or tokens to claim");
      }

      // In a real application, you would call the vesting contract to release tokens
      // For demo purposes, we'll simulate the claim

      // Check if there are tokens to claim
      if (vestingData.nextRelease.amount.isZero()) {
        throw new Error("No tokens available to claim");
      }

      // Check if it's time to claim
      if (vestingData.nextRelease.date > new Date()) {
        throw new Error("Tokens are not yet available to claim");
      }

      // Simulate successful claim
      const claimedAmount = vestingData.nextRelease.amount;
      const timestamp = Math.floor(Date.now() / 1000);

      // Update vesting data with the claim
      const updatedReleaseHistory = [
        {
          id: `release-${vestingData.releaseHistory.length + 1}`,
          vestingScheduleId: "1",
          amount: claimedAmount,
          timestamp,
          recipient: address,
          transactionHash: `0x${Math.random().toString(16).slice(2, 66)}`,
        },
        ...vestingData.releaseHistory,
      ];

      // Update schedules with the released amount
      const updatedSchedules = vestingData.schedules.map((schedule) => ({
        ...schedule,
        released: schedule.released.add(
          claimedAmount.div(vestingData.schedules.length)
        ),
      }));

      // Calculate next release
      const nextReleaseDate = new Date();
      nextReleaseDate.setMonth(nextReleaseDate.getMonth() + 1);

      // Calculate next release amount based on remaining vesting schedule
      const remainingMonths = calculateRemainingMonths(updatedSchedules);
      const nextReleaseAmount =
        remainingMonths > 0
          ? vestingData.totalPending.sub(claimedAmount).div(remainingMonths)
          : BigNumber.from(0);

      // Update vesting data
      setVestingData({
        ...vestingData,
        schedules: updatedSchedules,
        totalReleased: vestingData.totalReleased.add(claimedAmount),
        totalPending: vestingData.totalPending.sub(claimedAmount),
        nextRelease: {
          date: nextReleaseDate,
          amount: nextReleaseAmount,
        },
        releaseHistory: updatedReleaseHistory,
      });

      return true;
    } catch (err: any) {
      console.error("Error claiming vested tokens:", err);
      setError(err.message || "Error claiming vested tokens");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Calculate remaining vesting months
   */
  const calculateRemainingMonths = (schedules: VestingSchedule[]): number => {
    const now = Math.floor(Date.now() / 1000);
    let totalRemainingMonths = 0;

    for (const schedule of schedules) {
      const endTime = schedule.startTimestamp + schedule.duration;
      if (now < endTime) {
        // Convert remaining time to months
        const remainingSeconds = endTime - now;
        const remainingMonths = Math.ceil(
          remainingSeconds / (30 * 24 * 60 * 60)
        );
        totalRemainingMonths += remainingMonths;
      }
    }

    return totalRemainingMonths;
  };

  /**
   * Refresh vesting data
   */
  const refreshVestingData = async (): Promise<VestingData | null> => {
    return await execute(async () => {
      if (!vestingData) throw new Error("Vesting data not initialized");

      // In a real application, you would fetch fresh vesting data
      // For demo purposes, we'll return the existing data

      return vestingData;
    });
  };

  /**
   * Format vesting progress for display
   */
  const getVestingProgress = useCallback(() => {
    if (!vestingData) return { percent: 0, released: "0", total: "0" };

    const totalAmount = vestingData.totalVested;
    const releasedAmount = vestingData.totalReleased;

    // Calculate percentage released
    const releasedPercent = releasedAmount.mul(100).div(totalAmount).toNumber();

    // Format amounts for display
    const releasedFormatted = utils.formatEther(releasedAmount);
    const totalFormatted = utils.formatEther(totalAmount);

    return {
      percent: releasedPercent,
      released: releasedFormatted,
      total: totalFormatted,
    };
  }, [vestingData]);

  return {
    vestingData,
    isLoading: isLoading || asyncLoading,
    error: error || asyncError,
    claimVestedTokens,
    refreshVestingData,
    getVestingProgress,
  };
};
