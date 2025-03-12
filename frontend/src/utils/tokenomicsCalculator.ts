import { BigNumber } from "ethers";

/**
 * ICO Stage information
 */
export interface IcoStage {
  name: string;
  price: number; // in USD
  supplyPercentage: number;
  tokenAmount: number;
  hardCap: number; // in USD
}

/**
 * Token price information
 */
export interface TokenPricing {
  initialMarketCap: number; // in USD
  fullyDilutedValuation: number; // in USD
  initialSupply: number; // tokens
  totalSupply: number; // tokens
  initialPrice: number; // in USD
  targetPrice: number; // in USD
}

/**
 * Token allocation interface
 */
export interface TokenAllocation {
  category: string;
  percentage: number;
  amount: number;
  vestingMonths: number;
  cliff: number; // months
  tge: number; // percentage released at token generation event
}

/**
 * Calculate ICO stages based on total supply and pricing
 * @param totalSupply Total token supply
 * @param initialPrice Initial price per token in USD
 * @param stageMultipliers Price multipliers for each stage
 * @param stagePercentages Percentage of supply for each stage
 * @returns Array of ICO stages with calculated values
 */
export const calculateIcoStages = (
  totalSupply: number,
  initialPrice: number,
  stageMultipliers: number[] = [0.5, 0.75, 1],
  stagePercentages: number[] = [5, 10, 25]
): IcoStage[] => {
  // Validate inputs
  if (stageMultipliers.length !== stagePercentages.length) {
    throw new Error(
      "Stage multipliers and percentages arrays must have the same length"
    );
  }

  const totalPercentage = stagePercentages.reduce(
    (sum, percentage) => sum + percentage,
    0
  );
  if (totalPercentage > 100) {
    throw new Error("Total percentage exceeds 100%");
  }

  // Calculate stages
  const stages: IcoStage[] = [];
  const stageNames = ["Seed", "Private", "Public"];

  for (let i = 0; i < stageMultipliers.length; i++) {
    const stageName = i < stageNames.length ? stageNames[i] : `Stage ${i + 1}`;
    const price = initialPrice * stageMultipliers[i];
    const supplyPercentage = stagePercentages[i];
    const tokenAmount = (totalSupply * supplyPercentage) / 100;
    const hardCap = tokenAmount * price;

    stages.push({
      name: stageName,
      price,
      supplyPercentage,
      tokenAmount,
      hardCap,
    });
  }

  return stages;
};

/**
 * Calculate token pricing metrics
 * @param totalSupply Total token supply
 * @param initialPrice Initial price per token in USD
 * @param circulatingPercentage Percentage of supply circulating at launch
 * @param targetPriceMultiplier Target price multiplier from initial price
 * @returns Token pricing metrics
 */
export const calculateTokenPricing = (
  totalSupply: number,
  initialPrice: number,
  circulatingPercentage: number = 25,
  targetPriceMultiplier: number = 5
): TokenPricing => {
  const initialSupply = (totalSupply * circulatingPercentage) / 100;
  const initialMarketCap = initialSupply * initialPrice;
  const fullyDilutedValuation = totalSupply * initialPrice;
  const targetPrice = initialPrice * targetPriceMultiplier;

  return {
    initialMarketCap,
    fullyDilutedValuation,
    initialSupply,
    totalSupply,
    initialPrice,
    targetPrice,
  };
};

/**
 * Generate default token allocations
 * @param totalSupply Total token supply
 * @returns Array of token allocations
 */
export const generateDefaultAllocations = (
  totalSupply: number
): TokenAllocation[] => {
  return [
    {
      category: "Public Sale",
      percentage: 25,
      amount: (totalSupply * 25) / 100,
      vestingMonths: 6,
      cliff: 0,
      tge: 20, // 20% released at TGE
    },
    {
      category: "Private Sale",
      percentage: 15,
      amount: (totalSupply * 15) / 100,
      vestingMonths: 12,
      cliff: 1,
      tge: 10, // 10% released at TGE
    },
    {
      category: "Team",
      percentage: 20,
      amount: (totalSupply * 20) / 100,
      vestingMonths: 24,
      cliff: 6,
      tge: 0, // 0% released at TGE
    },
    {
      category: "Advisors",
      percentage: 5,
      amount: (totalSupply * 5) / 100,
      vestingMonths: 18,
      cliff: 3,
      tge: 0, // 0% released at TGE
    },
    {
      category: "Marketing",
      percentage: 10,
      amount: (totalSupply * 10) / 100,
      vestingMonths: 18,
      cliff: 0,
      tge: 10, // 10% released at TGE
    },
    {
      category: "Ecosystem",
      percentage: 15,
      amount: (totalSupply * 15) / 100,
      vestingMonths: 36,
      cliff: 3,
      tge: 5, // 5% released at TGE
    },
    {
      category: "Liquidity",
      percentage: 5,
      amount: (totalSupply * 5) / 100,
      vestingMonths: 0, // No vesting
      cliff: 0,
      tge: 100, // 100% released at TGE
    },
    {
      category: "Treasury",
      percentage: 5,
      amount: (totalSupply * 5) / 100,
      vestingMonths: 36,
      cliff: 6,
      tge: 0, // 0% released at TGE
    },
  ];
};

/**
 * Calculate initial circulating supply based on allocations
 * @param allocations Token allocations
 * @returns Initial circulating supply amount
 */
export const calculateInitialCirculating = (
  allocations: TokenAllocation[]
): number => {
  return allocations.reduce((sum, allocation) => {
    return sum + (allocation.amount * allocation.tge) / 100;
  }, 0);
};

/**
 * Calculate vesting schedule for each month
 * @param allocations Token allocations
 * @param months Number of months to calculate for
 * @returns Monthly vesting schedule
 */
export const calculateVestingSchedule = (
  allocations: TokenAllocation[],
  months: number = 36
): { month: number; released: number; cumulative: number }[] => {
  const schedule: { month: number; released: number; cumulative: number }[] =
    [];
  let cumulative = 0;

  for (let month = 0; month <= months; month++) {
    let monthlyReleased = 0;

    if (month === 0) {
      // TGE (Token Generation Event)
      monthlyReleased = allocations.reduce((sum, allocation) => {
        return sum + (allocation.amount * allocation.tge) / 100;
      }, 0);
    } else {
      // Monthly releases based on vesting schedules
      monthlyReleased = allocations.reduce((sum, allocation) => {
        // Skip if this allocation doesn't have this month in its schedule
        if (
          month <= allocation.cliff ||
          month > allocation.cliff + allocation.vestingMonths
        ) {
          return sum;
        }

        // Calculate how much is released this month
        const totalToVest = allocation.amount * (1 - allocation.tge / 100);
        const monthlyAmount = totalToVest / allocation.vestingMonths;

        return sum + monthlyAmount;
      }, 0);
    }

    cumulative += monthlyReleased;

    schedule.push({
      month,
      released: monthlyReleased,
      cumulative,
    });
  }

  return schedule;
};

/**
 * Calculate fundraising requirements
 * @param hardCap Hard cap in USD
 * @param softCap Soft cap in USD (percentage of hard cap)
 * @param ethPrice Current ETH price in USD
 * @returns Fundraising metrics in ETH and USD
 */
export const calculateFundraising = (
  hardCap: number,
  softCapPercentage: number = 60,
  ethPrice: number = 2000
): {
  hardCapUsd: number;
  softCapUsd: number;
  hardCapEth: number;
  softCapEth: number;
} => {
  const softCapUsd = (hardCap * softCapPercentage) / 100;
  const hardCapEth = hardCap / ethPrice;
  const softCapEth = softCapUsd / ethPrice;

  return {
    hardCapUsd: hardCap,
    softCapUsd,
    hardCapEth,
    softCapEth,
  };
};

/**
 * Convert between token amount and USD value
 * @param amount Amount to convert
 * @param price Price per token in USD
 * @param fromUsd Whether converting from USD to tokens
 * @returns Converted amount
 */
export const convertTokenValue = (
  amount: number,
  price: number,
  fromUsd: boolean = false
): number => {
  if (fromUsd) {
    // Convert from USD to tokens
    return amount / price;
  }
  // Convert from tokens to USD
  return amount * price;
};
