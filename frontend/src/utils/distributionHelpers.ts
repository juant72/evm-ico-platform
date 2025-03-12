import { BigNumber } from "ethers";

/**
 * Token allocation categories
 */
export interface TokenAllocation {
  name: string;
  percentage: number;
  color: string;
  lockupPeriod?: number; // in months
  vestingDuration?: number; // in months
}

/**
 * Standard token distribution categories
 */
export const standardTokenDistribution: TokenAllocation[] = [
  {
    name: "Public Sale",
    percentage: 40,
    color: "#3b82f6", // blue-500
    vestingDuration: 6,
  },
  {
    name: "Team",
    percentage: 15,
    color: "#8b5cf6", // purple-500
    lockupPeriod: 12,
    vestingDuration: 24,
  },
  {
    name: "Development",
    percentage: 15,
    color: "#10b981", // green-500
    vestingDuration: 24,
  },
  {
    name: "Marketing",
    percentage: 10,
    color: "#f97316", // orange-500
    vestingDuration: 12,
  },
  {
    name: "Ecosystem",
    percentage: 10,
    color: "#06b6d4", // cyan-500
    vestingDuration: 18,
  },
  {
    name: "Liquidity",
    percentage: 5,
    color: "#f43f5e", // rose-500
  },
  {
    name: "Rewards",
    percentage: 5,
    color: "#eab308", // yellow-500
    vestingDuration: 18,
  },
];

/**
 * Calculate token amounts for each allocation category
 * @param totalSupply Total token supply
 * @param allocations Token allocation percentages
 * @returns Token allocations with calculated amounts
 */
export const calculateTokenAllocations = (
  totalSupply: number | string | BigNumber,
  allocations: TokenAllocation[]
): (TokenAllocation & { amount: number })[] => {
  let totalSupplyNumber: number;

  if (typeof totalSupply === "string") {
    totalSupplyNumber = parseFloat(totalSupply);
  } else if (BigNumber.isBigNumber(totalSupply)) {
    totalSupplyNumber = parseFloat(totalSupply.toString());
  } else {
    totalSupplyNumber = totalSupply;
  }

  return allocations.map((allocation) => {
    const amount = (totalSupplyNumber * allocation.percentage) / 100;
    return {
      ...allocation,
      amount,
    };
  });
};

/**
 * Calculate vested amount based on time elapsed
 * @param totalAmount Total token amount
 * @param startTimestamp Vesting start timestamp (seconds)
 * @param cliffMonths Cliff period in months
 * @param vestingDuration Vesting duration in months
 * @param currentTimestamp Current timestamp (seconds)
 * @returns Vested amount
 */
export const calculateVestedAmount = (
  totalAmount: number,
  startTimestamp: number,
  cliffMonths: number,
  vestingDuration: number,
  currentTimestamp = Math.floor(Date.now() / 1000)
): number => {
  // Convert timestamps to milliseconds
  const startTime = startTimestamp * 1000;
  const currentTime = currentTimestamp * 1000;

  // Calculate cliff end time
  const millisecondsPerMonth = 30 * 24 * 60 * 60 * 1000;
  const cliffEndTime = startTime + cliffMonths * millisecondsPerMonth;

  // If current time is before cliff ends, no tokens are vested
  if (currentTime < cliffEndTime) {
    return 0;
  }

  // Calculate vesting end time
  const vestingEndTime =
    startTime + (cliffMonths + vestingDuration) * millisecondsPerMonth;

  // If current time is after vesting ends, all tokens are vested
  if (currentTime >= vestingEndTime) {
    return totalAmount;
  }

  // Calculate linear vesting amount based on time elapsed since cliff ended
  const timeElapsedSinceCliff = currentTime - cliffEndTime;
  const totalVestingTime = vestingEndTime - cliffEndTime;
  const vestedPercentage = timeElapsedSinceCliff / totalVestingTime;

  return totalAmount * vestedPercentage;
};

/**
 * Calculate monthly vesting schedule
 * @param totalAmount Total token amount
 * @param vestingMonths Vesting duration in months
 * @param cliffMonths Cliff period in months
 * @returns Monthly vesting amounts
 */
export const calculateMonthlyVestingSchedule = (
  totalAmount: number,
  vestingMonths: number,
  cliffMonths: number = 0
): { month: number; amount: number; cumulative: number }[] => {
  const schedule: { month: number; amount: number; cumulative: number }[] = [];
  let cumulativeAmount = 0;

  // Add cliff period (no tokens released)
  for (let i = 0; i < cliffMonths; i++) {
    schedule.push({
      month: i,
      amount: 0,
      cumulative: 0,
    });
  }

  // Calculate monthly amount after cliff
  const monthlyAmount = totalAmount / vestingMonths;

  // Add vesting schedule
  for (let i = 0; i < vestingMonths; i++) {
    cumulativeAmount += monthlyAmount;
    schedule.push({
      month: cliffMonths + i,
      amount: monthlyAmount,
      cumulative: cumulativeAmount,
    });
  }

  return schedule;
};

/**
 * Generate random token distribution for testing
 * @param categories Number of categories to generate
 * @returns Random token allocation array
 */
export const generateRandomDistribution = (
  categories: number = 5
): TokenAllocation[] => {
  const colors = [
    "#3b82f6", // blue
    "#8b5cf6", // purple
    "#10b981", // green
    "#f97316", // orange
    "#06b6d4", // cyan
    "#f43f5e", // rose
    "#eab308", // yellow
    "#6366f1", // indigo
    "#ec4899", // pink
    "#14b8a6", // teal
  ];

  const names = [
    "Public Sale",
    "Private Sale",
    "Team",
    "Advisors",
    "Development",
    "Marketing",
    "Ecosystem",
    "Liquidity",
    "Rewards",
    "Treasury",
    "Partnerships",
    "Staking",
  ];

  // Ensure we have enough categories and colors
  const catCount = Math.min(categories, names.length, colors.length);

  // Randomize percentages and ensure they sum to 100%
  const randomPercentages: number[] = [];
  let remainingPercent = 100;

  for (let i = 0; i < catCount - 1; i++) {
    // Generate a random percentage for this category
    const maxForThisCategory = Math.floor(remainingPercent * 0.8); // Don't use more than 80% of what's left
    let percentage = Math.floor(Math.random() * maxForThisCategory);

    // Ensure minimum of 5%
    percentage = Math.max(5, percentage);

    randomPercentages.push(percentage);
    remainingPercent -= percentage;
  }

  // Last category gets the remainder
  randomPercentages.push(remainingPercent);

  // Shuffle arrays
  const shuffledNames = [...names]
    .sort(() => 0.5 - Math.random())
    .slice(0, catCount);
  const shuffledColors = [...colors]
    .sort(() => 0.5 - Math.random())
    .slice(0, catCount);

  // Generate allocations
  return shuffledNames.map((name, i) => {
    const lockupPeriod =
      Math.random() > 0.5 ? Math.floor(Math.random() * 12) : 0;
    const vestingDuration = Math.floor(Math.random() * 24) + 6;

    return {
      name,
      percentage: randomPercentages[i],
      color: shuffledColors[i],
      lockupPeriod,
      vestingDuration,
    };
  });
};
