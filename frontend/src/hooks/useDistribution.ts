import { useState, useEffect, useMemo } from "react";
import { BigNumber, utils } from "ethers";
import { useAddress } from "@thirdweb-dev/react";
import {
  Distribution,
  TokenDistributionStats,
  MonthlyVestingEntry,
  ReleaseProjection,
} from "../types/distribution";
import {
  DEFAULT_TOKEN_DISTRIBUTION,
  TOTAL_SUPPLY,
} from "../constants/tokenomics";
import { useTokenContract } from "./useTokenContract";
import { useVesting } from "./useVesting";

/**
 * Hook to manage token distribution data and operations
 * @returns Distribution-related functions and state
 */
export const useDistribution = () => {
  const address = useAddress();
  const { token } = useTokenContract();
  const { vestingData, refreshVestingData } = useVesting();

  const [distributions, setDistributions] = useState<Distribution[]>(
    DEFAULT_TOKEN_DISTRIBUTION
  );
  const [stats, setStats] = useState<TokenDistributionStats | null>(null);
  const [releaseProjection, setReleaseProjection] =
    useState<ReleaseProjection | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate token distribution statistics
  const calculateStats = async () => {
    try {
      if (!token) return;

      setIsLoading(true);

      // Fetch total supply (would come from contract in real implementation)
      const totalSupply = utils.parseEther(TOTAL_SUPPLY.toString());

      // Calculate initial circulating (tokens released at TGE)
      const initialCirculating = distributions.reduce((sum, dist) => {
        const amountBN = BigNumber.from(dist.amount.toString());
        const tgeUnlockPercentage = dist.tgeUnlock || 0;

        return sum.add(amountBN.mul(tgeUnlockPercentage).div(100));
      }, BigNumber.from(0));

      // Calculate total allocated
      const totalAllocated = distributions.reduce(
        (sum, dist) => sum.add(BigNumber.from(dist.amount.toString())),
        BigNumber.from(0)
      );

      // Calculate locked tokens
      const lockedTokens = totalAllocated.sub(initialCirculating);

      // Calculate percentages
      const initialCirculatingPercent = parseFloat(
        utils.formatEther(initialCirculating.mul(100).div(totalSupply))
      );

      const totalAllocatedPercent = parseFloat(
        utils.formatEther(totalAllocated.mul(100).div(totalSupply))
      );

      const lockedTokensPercent = 100 - initialCirculatingPercent;

      // In a real implementation, currentCirculating would be based on actual released tokens
      // For demo purposes, we'll estimate it based on time passed since launch
      const monthsSinceLaunch = 3; // Mocked: 3 months since launch
      const currentCirculating = await estimateCurrentCirculating(
        initialCirculating,
        monthsSinceLaunch
      );
      const currentCirculatingPercent = parseFloat(
        utils.formatEther(currentCirculating.mul(100).div(totalSupply))
      );

      setStats({
        totalSupply,
        initialCirculating,
        initialCirculatingPercent,
        totalAllocated,
        totalAllocatedPercent,
        maxCirculating: totalAllocated, // After all vesting complete
        currentCirculating,
        currentCirculatingPercent,
        lockedTokens,
        lockedTokensPercent,
      });
    } catch (err: any) {
      setError(err.message || "Error calculating distribution stats");
      console.error("Error calculating distribution stats:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Estimate current circulating supply based on vesting schedules
  const estimateCurrentCirculating = async (
    initialCirculating: BigNumber,
    monthsSinceLaunch: number
  ): Promise<BigNumber> => {
    try {
      let additionalReleased = BigNumber.from(0);

      // For each distribution category that has vesting
      for (const dist of distributions) {
        if (!dist.vestingEnabled || (dist.tgeUnlock || 0) >= 100) continue;

        const amountBN = BigNumber.from(dist.amount.toString());
        const tgeAmount = amountBN.mul(dist.tgeUnlock || 0).div(100);
        const vestingAmount = amountBN.sub(tgeAmount);

        // Calculate cliff and vesting in months
        const cliffMonths = dist.cliff
          ? Math.floor(dist.cliff / (30 * 24 * 60 * 60))
          : 0;
        const vestingMonths = dist.vesting
          ? Math.floor(dist.vesting / (30 * 24 * 60 * 60))
          : 0;

        if (monthsSinceLaunch <= cliffMonths) continue;

        // Calculate months elapsed since cliff
        const monthsElapsedSinceCliff = monthsSinceLaunch - cliffMonths;

        // Calculate number of tokens released so far
        if (vestingMonths > 0) {
          const monthlyRelease = vestingAmount.div(vestingMonths);
          const releasedMonths = Math.min(
            monthsElapsedSinceCliff,
            vestingMonths
          );
          additionalReleased = additionalReleased.add(
            monthlyRelease.mul(releasedMonths)
          );
        }
      }

      return initialCirculating.add(additionalReleased);
    } catch (error) {
      console.error("Error estimating current circulating supply:", error);
      return initialCirculating;
    }
  };

  // Generate monthly vesting schedule
  const generateVestingSchedule = (
    months: number = 36
  ): MonthlyVestingEntry[] => {
    try {
      const schedule: MonthlyVestingEntry[] = [];
      const now = new Date();
      let totalReleased = BigNumber.from(0);

      // Calculate initial release (TGE)
      for (const dist of distributions) {
        const amountBN = BigNumber.from(dist.amount.toString());
        const tgeUnlockPercentage = dist.tgeUnlock || 0;
        totalReleased = totalReleased.add(
          amountBN.mul(tgeUnlockPercentage).div(100)
        );
      }

      // Add TGE entry
      schedule.push({
        month: 0,
        date: new Date(now),
        released: totalReleased,
        releasedPercent: parseFloat(
          utils.formatEther(
            totalReleased
              .mul(100)
              .div(utils.parseEther(TOTAL_SUPPLY.toString()))
          )
        ),
        cumulative: totalReleased,
        cumulativePercent: parseFloat(
          utils.formatEther(
            totalReleased
              .mul(100)
              .div(utils.parseEther(TOTAL_SUPPLY.toString()))
          )
        ),
      });

      // Calculate monthly releases
      for (let month = 1; month <= months; month++) {
        let monthlyReleased = BigNumber.from(0);
        const date = new Date(now);
        date.setMonth(date.getMonth() + month);

        for (const dist of distributions) {
          if (!dist.vestingEnabled || (dist.tgeUnlock || 0) >= 100) continue;

          const amountBN = BigNumber.from(dist.amount.toString());
          const tgeAmount = amountBN.mul(dist.tgeUnlock || 0).div(100);
          const vestingAmount = amountBN.sub(tgeAmount);

          // Calculate cliff and vesting in months
          const cliffMonths = dist.cliff
            ? Math.floor(dist.cliff / (30 * 24 * 60 * 60))
            : 0;
          const vestingMonths = dist.vesting
            ? Math.floor(dist.vesting / (30 * 24 * 60 * 60))
            : 0;

          if (month <= cliffMonths || vestingMonths === 0) continue;

          // If this month is within the vesting period
          if (month <= cliffMonths + vestingMonths) {
            const monthlyRelease = vestingAmount.div(vestingMonths);
            monthlyReleased = monthlyReleased.add(monthlyRelease);
          }
        }

        totalReleased = totalReleased.add(monthlyReleased);

        schedule.push({
          month,
          date,
          released: monthlyReleased,
          releasedPercent: parseFloat(
            utils.formatEther(
              monthlyReleased
                .mul(100)
                .div(utils.parseEther(TOTAL_SUPPLY.toString()))
            )
          ),
          cumulative: totalReleased,
          cumulativePercent: parseFloat(
            utils.formatEther(
              totalReleased
                .mul(100)
                .div(utils.parseEther(TOTAL_SUPPLY.toString()))
            )
          ),
        });
      }

      return schedule;
    } catch (error) {
      console.error("Error generating vesting schedule:", error);
      return [];
    }
  };

  // Generate release projection
  const generateReleaseProjection = (months: number = 36): void => {
    try {
      const schedule = generateVestingSchedule(months);

      const dates: Date[] = schedule.map((entry) => entry.date);
      const amounts: BigNumber[] = schedule.map((entry) => entry.released);
      const percentages: number[] = schedule.map(
        (entry) => entry.releasedPercent
      );
      const cumulative: BigNumber[] = schedule.map((entry) => entry.cumulative);
      const cumulativePercentages: number[] = schedule.map(
        (entry) => entry.cumulativePercent
      );

      setReleaseProjection({
        dates,
        amounts,
        percentages,
        cumulative,
        cumulativePercentages,
      });
    } catch (error) {
      console.error("Error generating release projection:", error);
    }
  };

  // Get personal distribution (for connected wallet)
  const personalDistribution = useMemo(() => {
    if (!address || !vestingData?.schedules) return null;

    // Filter vesting schedules for the connected wallet
    const userSchedules = vestingData.schedules.filter(
      (vs) => vs.recipient.toLowerCase() === address.toLowerCase()
    );

    if (userSchedules.length === 0) return null;

    // Group by category
    const categorizedSchedules: { [category: string]: BigNumber } = {};

    for (const schedule of userSchedules) {
      const category = schedule.category || "Unknown";
      if (!categorizedSchedules[category]) {
        categorizedSchedules[category] = BigNumber.from(0);
      }
      categorizedSchedules[category] = categorizedSchedules[category].add(
        schedule.amount
      );
    }

    // Convert to array
    return Object.entries(categorizedSchedules).map(([category, amount]) => ({
      category,
      amount,
    }));
  }, [address, vestingData?.schedules]);

  // Load distributions and statistics
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // In a real app, you'd fetch the actual distribution from a backend or blockchain
        // For now, we'll use the default distribution

        // Calculate statistics based on the distribution
        await calculateStats();

        // Generate projection for charts
        generateReleaseProjection();

        // Fetch vesting schedules
        if (address) {
          await refreshVestingData();
        }
      } catch (err: any) {
        setError(err.message || "Error loading distribution data");
        console.error("Error loading distribution data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, token?.address]);

  return {
    distributions,
    stats,
    releaseProjection,
    personalDistribution,
    vestingSchedule: generateVestingSchedule(),
    isLoading,
    error,
    calculateStats,
    generateVestingSchedule,
    generateReleaseProjection,
  };
};
