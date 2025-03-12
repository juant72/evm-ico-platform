import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import {
  Distribution,
  VestingSchedule,
  TokenDistributionStats,
  UpcomingTokenRelease,
  MonthlyVestingEntry,
} from "../types/distribution";
import { formatTokenAmount } from "../utils/format";
import { calculateVestingSchedule } from "../utils/tokenomicsCalculator";

// Default distribution colors
const DEFAULT_COLORS = [
  "#3B82F6", // blue-500
  "#10B981", // emerald-500
  "#F59E0B", // amber-500
  "#EF4444", // red-500
  "#8B5CF6", // violet-500
  "#EC4899", // pink-500
  "#14B8A6", // teal-500
  "#F97316", // orange-500
  "#6366F1", // indigo-500
  "#84CC16", // lime-500
  "#A855F7", // purple-500
  "#06B6D4", // cyan-500
];

// Context state interface
interface DistributionContextState {
  distributions: Distribution[];
  vestingSchedules: VestingSchedule[];
  stats: TokenDistributionStats | null;
  upcomingReleases: UpcomingTokenRelease[];
  monthlySchedule: MonthlyVestingEntry[];
  isLoading: boolean;
  error: string | null;
  userVestingSchedules: VestingSchedule[];
  loadDistributions: () => Promise<void>;
  loadUserVestingSchedules: () => Promise<void>;
  calculateStats: () => void;
}

// Default context state
const defaultContext: DistributionContextState = {
  distributions: [],
  vestingSchedules: [],
  stats: null,
  upcomingReleases: [],
  monthlySchedule: [],
  isLoading: false,
  error: null,
  userVestingSchedules: [],
  loadDistributions: async () => {},
  loadUserVestingSchedules: async () => {},
  calculateStats: () => {},
};

// Create context
const DistributionContext =
  createContext<DistributionContextState>(defaultContext);

// Distribution Provider Props
interface DistributionProviderProps {
  children: ReactNode;
  tokenAddress?: string;
  vestingAddress?: string;
}

/**
 * Distribution Provider Component
 */
export const DistributionProvider: React.FC<DistributionProviderProps> = ({
  children,
  tokenAddress,
  vestingAddress,
}) => {
  const address = useAddress();
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const [vestingSchedules, setVestingSchedules] = useState<VestingSchedule[]>(
    []
  );
  const [stats, setStats] = useState<TokenDistributionStats | null>(null);
  const [upcomingReleases, setUpcomingReleases] = useState<
    UpcomingTokenRelease[]
  >([]);
  const [monthlySchedule, setMonthlySchedule] = useState<MonthlyVestingEntry[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userVestingSchedules, setUserVestingSchedules] = useState<
    VestingSchedule[]
  >([]);

  // Contract hooks
  const { contract: tokenContract } = useContract(tokenAddress);
  const { contract: vestingContract } = useContract(vestingAddress);

  // Get token total supply
  const { data: totalSupply } = useContractRead(tokenContract, "totalSupply");

  /**
   * Load distributions from contract or API
   */
  const loadDistributions = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // In a real implementation, you would fetch from your backend or contracts
      // This is a placeholder with mock data
      const mockDistributions: Distribution[] = [
        {
          category: "Public Sale",
          percentage: 25,
          amount: BigNumber.from(String(25_000_000 * 10 ** 18)),
          color: DEFAULT_COLORS[0],
          vestingEnabled: true,
          cliff: 0,
          vesting: 6 * 30 * 24 * 60 * 60, // 6 months in seconds
          tgeUnlock: 20,
          description: "Tokens available through the public sale",
        },
        {
          category: "Team",
          percentage: 20,
          amount: BigNumber.from(String(20_000_000 * 10 ** 18)),
          color: DEFAULT_COLORS[1],
          vestingEnabled: true,
          cliff: 6 * 30 * 24 * 60 * 60, // 6 months cliff
          vesting: 24 * 30 * 24 * 60 * 60, // 24 months vesting
          tgeUnlock: 0,
          description: "Team allocation with long-term vesting",
        },
        {
          category: "Marketing",
          percentage: 10,
          amount: BigNumber.from(String(10_000_000 * 10 ** 18)),
          color: DEFAULT_COLORS[2],
          vestingEnabled: true,
          cliff: 0,
          vesting: 18 * 30 * 24 * 60 * 60, // 18 months vesting
          tgeUnlock: 10,
          description: "Marketing and promotional activities",
        },
        {
          category: "Advisors",
          percentage: 5,
          amount: BigNumber.from(String(5_000_000 * 10 ** 18)),
          color: DEFAULT_COLORS[3],
          vestingEnabled: true,
          cliff: 3 * 30 * 24 * 60 * 60, // 3 months cliff
          vesting: 18 * 30 * 24 * 60 * 60, // 18 months vesting
          tgeUnlock: 0,
          description: "Advisors and strategic partnerships",
        },
        {
          category: "Ecosystem",
          percentage: 15,
          amount: BigNumber.from(String(15_000_000 * 10 ** 18)),
          color: DEFAULT_COLORS[4],
          vestingEnabled: true,
          cliff: 0,
          vesting: 36 * 30 * 24 * 60 * 60, // 36 months vesting
          tgeUnlock: 5,
          description: "Ecosystem development and grants",
        },
        {
          category: "Liquidity",
          percentage: 5,
          amount: BigNumber.from(String(5_000_000 * 10 ** 18)),
          color: DEFAULT_COLORS[5],
          vestingEnabled: false,
          tgeUnlock: 100,
          description: "Initial DEX Liquidity",
        },
        {
          category: "Treasury",
          percentage: 5,
          amount: BigNumber.from(String(5_000_000 * 10 ** 18)),
          color: DEFAULT_COLORS[6],
          vestingEnabled: true,
          cliff: 6 * 30 * 24 * 60 * 60, // 6 months cliff
          vesting: 36 * 30 * 24 * 60 * 60, // 36 months vesting
          tgeUnlock: 0,
          description: "Treasury reserves for future operations",
        },
        {
          category: "Private Sale",
          percentage: 15,
          amount: BigNumber.from(String(15_000_000 * 10 ** 18)),
          color: DEFAULT_COLORS[7],
          vestingEnabled: true,
          cliff: 1 * 30 * 24 * 60 * 60, // 1 month cliff
          vesting: 12 * 30 * 24 * 60 * 60, // 12 months vesting
          tgeUnlock: 10,
          description: "Strategic investors and private sale",
        },
      ];

      setDistributions(mockDistributions);

      // Load vesting schedules
      // In a real implementation, you would fetch from your vesting contract
      const mockVestingSchedules: VestingSchedule[] = mockDistributions.map(
        (dist, index) => {
          // Create a mock vesting schedule for each distribution
          const startTimestamp =
            Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60; // 30 days ago
          const cliff = dist.cliff || 0;
          const duration = dist.vesting || 0;
          const releaseInterval = 30 * 24 * 60 * 60; // 30 days in seconds

          return {
            id: `schedule-${index}`,
            recipient: `0x${index}123456789abcdef0123456789abcdef01234567`,
            tokenAddress:
              tokenAddress || "0x1234567890123456789012345678901234567890",
            amount: BigNumber.isBigNumber(dist.amount)
              ? dist.amount
              : BigNumber.from(dist.amount),
            startTimestamp,
            cliff,
            duration,
            releaseIntervalSecs: releaseInterval,
            released: BigNumber.from(0),
            revoked: false,
            category: dist.category,
          };
        }
      );

      setVestingSchedules(mockVestingSchedules);
      calculateStats();
      calculateUpcomingReleases(mockVestingSchedules);
      calculateMonthlySchedule(mockDistributions);
    } catch (err) {
      console.error("Error loading distributions:", err);
      setError("Failed to load token distribution data");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Load vesting schedules for the current user
   */
  const loadUserVestingSchedules = async () => {
    if (!address || !vestingContract) {
      setUserVestingSchedules([]);
      return;
    }

    try {
      setIsLoading(true);

      // In a real implementation, you would fetch user's vesting schedules from the contract
      // This is a placeholder with mock data
      const mockUserSchedules: VestingSchedule[] = [
        {
          id: "user-schedule-1",
          recipient: address,
          tokenAddress:
            tokenAddress || "0x1234567890123456789012345678901234567890",
          amount: BigNumber.from(String(100_000 * 10 ** 18)),
          startTimestamp: Math.floor(Date.now() / 1000) - 60 * 24 * 60 * 60, // 60 days ago
          cliff: 30 * 24 * 60 * 60, // 30 days cliff
          duration: 180 * 24 * 60 * 60, // 6 months vesting
          releaseIntervalSecs: 30 * 24 * 60 * 60, // 30 days release interval
          released: BigNumber.from(String(20_000 * 10 ** 18)),
          revoked: false,
          category: "Private Sale",
        },
      ];

      setUserVestingSchedules(mockUserSchedules);
    } catch (err) {
      console.error("Error loading user vesting schedules:", err);
      setError("Failed to load your vesting schedules");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Calculate token distribution statistics
   */
  const calculateStats = () => {
    if (!totalSupply) return;

    try {
      const total = totalSupply;

      // Calculate initial circulating supply from TGE unlocks
      const initialCirculating = distributions.reduce((acc, dist) => {
        const tgeAmount = BigNumber.isBigNumber(dist.amount)
          ? dist.amount.mul(dist.tgeUnlock || 0).div(100)
          : BigNumber.from(dist.amount)
              .mul(dist.tgeUnlock || 0)
              .div(100);
        return acc.add(tgeAmount);
      }, BigNumber.from(0));

      // Calculate currently vested amount
      const now = Math.floor(Date.now() / 1000);
      let currentCirculating = BigNumber.from(0);

      vestingSchedules.forEach((schedule) => {
        const elapsed = now - schedule.startTimestamp;

        // TGE amount
        const tgePercentage =
          distributions.find((d) => d.category === schedule.category)
            ?.tgeUnlock || 0;
        const tgeAmount = schedule.amount.mul(tgePercentage).div(100);
        currentCirculating = currentCirculating.add(tgeAmount);

        // If past cliff, calculate vested amount
        if (elapsed > schedule.cliff && schedule.duration > 0) {
          const vestedDuration = Math.min(
            elapsed - schedule.cliff,
            schedule.duration
          );
          const vestedPercentage = Math.floor(
            (vestedDuration * 100) / schedule.duration
          );
          const vestedAmount = schedule.amount
            .mul(100 - tgePercentage)
            .div(100)
            .mul(vestedPercentage)
            .div(100);
          currentCirculating = currentCirculating.add(vestedAmount);
        }
      });

      const stats: TokenDistributionStats = {
        totalSupply: total,
        initialCirculating,
        initialCirculatingPercent: initialCirculating
          .mul(100)
          .div(total)
          .toNumber(),
        totalAllocated: distributions.reduce(
          (acc, dist) => acc.add(dist.amount),
          BigNumber.from(0)
        ),
        totalAllocatedPercent: 100, // Assuming all tokens are allocated
        maxCirculating: total, // After all vesting complete
        currentCirculating,
        currentCirculatingPercent: currentCirculating
          .mul(100)
          .div(total)
          .toNumber(),
        lockedTokens: total.sub(currentCirculating),
        lockedTokensPercent: total
          .sub(currentCirculating)
          .mul(100)
          .div(total)
          .toNumber(),
      };

      setStats(stats);
    } catch (err) {
      console.error("Error calculating statistics:", err);
    }
  };

  /**
   * Calculate upcoming token releases
   */
  const calculateUpcomingReleases = (schedules: VestingSchedule[]) => {
    try {
      const now = Math.floor(Date.now() / 1000);
      const sixMonths = now + 180 * 24 * 60 * 60; // Look ahead 6 months

      // Group releases by month
      const releasesByMonth: Map<
        string,
        {
          date: Date;
          amount: BigNumber;
          percentage: number;
          recipients: Set<string>;
          categories: Set<string>;
        }
      > = new Map();

      schedules.forEach((schedule) => {
        if (schedule.revoked) return;

        const startDate = new Date(schedule.startTimestamp * 1000);
        const cliffDate = new Date(
          (schedule.startTimestamp + schedule.cliff) * 1000
        );
        const endDate = new Date(
          (schedule.startTimestamp + schedule.cliff + schedule.duration) * 1000
        );

        // If vesting hasn't started yet or has ended, skip
        if (
          now < schedule.startTimestamp ||
          now > schedule.startTimestamp + schedule.cliff + schedule.duration
        ) {
          return;
        }

        // If past cliff, calculate upcoming releases
        if (now >= schedule.startTimestamp + schedule.cliff) {
          const distribution = distributions.find(
            (d) => d.category === schedule.category
          );
          const tgePercentage = distribution?.tgeUnlock || 0;
          const remainingAmount = schedule.amount
            .mul(100 - tgePercentage)
            .div(100);

          // Calculate releases based on releaseIntervalSecs
          for (
            let releaseTime = schedule.startTimestamp + schedule.cliff;
            releaseTime <=
              schedule.startTimestamp + schedule.cliff + schedule.duration &&
            releaseTime <= sixMonths;
            releaseTime += schedule.releaseIntervalSecs
          ) {
            if (releaseTime <= now) continue; // Skip past releases

            const releaseDate = new Date(releaseTime * 1000);
            const monthKey = releaseDate.toISOString().substring(0, 7); // YYYY-MM format

            const intervalPercentage =
              (schedule.releaseIntervalSecs / schedule.duration) * 100;
            const releaseAmount = remainingAmount
              .mul(Math.floor(intervalPercentage))
              .div(100);

            if (!releasesByMonth.has(monthKey)) {
              releasesByMonth.set(monthKey, {
                date: releaseDate,
                amount: releaseAmount,
                percentage: releaseAmount
                  .mul(100)
                  .div(totalSupply || 1)
                  .toNumber(),
                recipients: new Set([schedule.recipient]),
                categories: new Set([schedule.category || ""]),
              });
            } else {
              const existing = releasesByMonth.get(monthKey)!;
              existing.amount = existing.amount.add(releaseAmount);
              existing.percentage = existing.amount
                .mul(100)
                .div(totalSupply || 1)
                .toNumber();
              existing.recipients.add(schedule.recipient);
              if (schedule.category) existing.categories.add(schedule.category);
            }
          }
        }
      });

      // Convert to array of UpcomingTokenRelease objects
      const releases: UpcomingTokenRelease[] = Array.from(
        releasesByMonth.values()
      ).map((item) => ({
        date: item.date,
        amount: item.amount,
        percentage: item.percentage,
        recipients: item.recipients.size,
        categories: Array.from(item.categories),
      }));

      // Sort by date
      releases.sort((a, b) => a.date.getTime() - b.date.getTime());

      setUpcomingReleases(releases);
    } catch (err) {
      console.error("Error calculating upcoming releases:", err);
    }
  };

  /**
   * Calculate monthly vesting schedule for visualization
   */
  const calculateMonthlySchedule = (distributions: Distribution[]) => {
    try {
      // Create monthly entries for 36 months
      const months = 36;
      const schedule: MonthlyVestingEntry[] = [];

      const total =
        totalSupply || BigNumber.from(String(100_000_000 * 10 ** 18));
      const tgeDate = new Date();
      tgeDate.setHours(0, 0, 0, 0);

      let cumulative = BigNumber.from(0);

      // Calculate initial (TGE) release
      let tgeAmount = BigNumber.from(0);
      distributions.forEach((dist) => {
        if (dist.tgeUnlock && dist.tgeUnlock > 0) {
          const amount = BigNumber.isBigNumber(dist.amount)
            ? dist.amount
            : BigNumber.from(dist.amount);
          tgeAmount = tgeAmount.add(
            amount.mul(BigNumber.from(dist.tgeUnlock)).div(100)
          );
        }
      });

      cumulative = cumulative.add(tgeAmount);

      // Add TGE entry
      schedule.push({
        month: 0,
        date: new Date(tgeDate),
        released: tgeAmount,
        releasedPercent: tgeAmount.mul(100).div(total).toNumber(),
        cumulative,
        cumulativePercent: cumulative.mul(100).div(total).toNumber(),
      });

      // Calculate monthly releases
      for (let month = 1; month <= months; month++) {
        const currentDate = new Date(tgeDate);
        currentDate.setMonth(currentDate.getMonth() + month);

        let monthlyReleased = BigNumber.from(0);

        distributions.forEach((dist) => {
          if (!dist.vestingEnabled) return;

          const cliffMonths = dist.cliff
            ? Math.floor(dist.cliff / (30 * 24 * 60 * 60))
            : 0;
          const vestingMonths = dist.vesting
            ? Math.floor(dist.vesting / (30 * 24 * 60 * 60))
            : 0;

          // Skip if before cliff
          if (month <= cliffMonths) return;

          // Skip if after vesting period
          if (month > cliffMonths + vestingMonths) return;

          // Calculate monthly release
          const tgePercentage = dist.tgeUnlock || 0;
          const amount = BigNumber.isBigNumber(dist.amount)
            ? dist.amount
            : BigNumber.from(dist.amount);
          const vestingAmount = amount.mul(100 - tgePercentage).div(100);
          const monthlyAmount = vestingAmount.div(vestingMonths);

          monthlyReleased = monthlyReleased.add(monthlyAmount);
        });

        cumulative = cumulative.add(monthlyReleased);

        schedule.push({
          month,
          date: currentDate,
          released: monthlyReleased,
          releasedPercent: monthlyReleased.mul(100).div(total).toNumber(),
          cumulative,
          cumulativePercent: cumulative.mul(100).div(total).toNumber(),
        });
      }

      setMonthlySchedule(schedule);
    } catch (err) {
      console.error("Error calculating monthly schedule:", err);
    }
  };

  // Initial load when tokenAddress changes
  useEffect(() => {
    if (tokenAddress) {
      loadDistributions();
    }
  }, [tokenAddress]);

  // Load user schedules when address changes
  useEffect(() => {
    if (address) {
      loadUserVestingSchedules();
    }
  }, [address, vestingAddress]);

  // Recalculate stats when totalSupply changes
  useEffect(() => {
    if (totalSupply) {
      calculateStats();
    }
  }, [totalSupply]);

  // Context value
  const contextValue: DistributionContextState = {
    distributions,
    vestingSchedules,
    stats,
    upcomingReleases,
    monthlySchedule,
    isLoading,
    error,
    userVestingSchedules,
    loadDistributions,
    loadUserVestingSchedules,
    calculateStats,
  };

  return (
    <DistributionContext.Provider value={contextValue}>
      {children}
    </DistributionContext.Provider>
  );
};

/**
 * Hook to use the distribution context
 */
export const useDistribution = () => {
  const context = useContext(DistributionContext);
  if (context === undefined) {
    throw new Error(
      "useDistribution must be used within a DistributionProvider"
    );
  }
  return context;
};
