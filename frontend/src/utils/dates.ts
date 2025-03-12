import {
  format,
  formatDistanceToNow,
  addMonths,
  addDays,
  isAfter,
  isBefore,
  differenceInDays,
} from "date-fns";

/**
 * Format a date in a human-readable string
 * @param date Date to format
 * @param formatString Format string to use
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | number | string,
  formatString = "MMM dd, yyyy"
): string => {
  if (!date) return "N/A";

  try {
    const dateObj =
      typeof date === "string" || typeof date === "number"
        ? new Date(date)
        : date;
    return format(dateObj, formatString);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

/**
 * Format a date with time
 * @param date Date to format
 * @returns Formatted date and time string
 */
export const formatDateTime = (date: Date | number | string): string => {
  return formatDate(date, "MMM dd, yyyy HH:mm");
};

/**
 * Format a date as a relative time string (e.g., "2 days ago")
 * @param date Date to format
 * @param addSuffix Whether to include a suffix like "ago"
 * @returns Relative time string
 */
export const formatRelativeTime = (
  date: Date | number | string,
  addSuffix = true
): string => {
  if (!date) return "N/A";

  try {
    const dateObj =
      typeof date === "string" || typeof date === "number"
        ? new Date(date)
        : date;
    return formatDistanceToNow(dateObj, { addSuffix });
  } catch (error) {
    console.error("Error formatting relative time:", error);
    return "Unknown time";
  }
};

/**
 * Calculate the end date for vesting based on start date and duration
 * @param startDate Start date of vesting
 * @param durationMonths Duration in months
 * @returns End date of vesting period
 */
export const calculateVestingEndDate = (
  startDate: Date | number | string,
  durationMonths: number
): Date => {
  try {
    const dateObj =
      typeof startDate === "string" || typeof startDate === "number"
        ? new Date(startDate)
        : startDate;
    return addMonths(dateObj, durationMonths);
  } catch (error) {
    console.error("Error calculating vesting end date:", error);
    return new Date();
  }
};

/**
 * Calculate the cliff date based on start date and cliff period
 * @param startDate Start date of vesting
 * @param cliffMonths Cliff period in months
 * @returns Cliff end date
 */
export const calculateCliffDate = (
  startDate: Date | number | string,
  cliffMonths: number
): Date => {
  try {
    const dateObj =
      typeof startDate === "string" || typeof startDate === "number"
        ? new Date(startDate)
        : startDate;
    return addMonths(dateObj, cliffMonths);
  } catch (error) {
    console.error("Error calculating cliff date:", error);
    return new Date();
  }
};

/**
 * Check if a date is in the future
 * @param date Date to check
 * @returns Boolean indicating if date is in the future
 */
export const isFutureDate = (date: Date | number | string): boolean => {
  try {
    const dateObj =
      typeof date === "string" || typeof date === "number"
        ? new Date(date)
        : date;
    return isAfter(dateObj, new Date());
  } catch (error) {
    console.error("Error checking future date:", error);
    return false;
  }
};

/**
 * Check if a date is in the past
 * @param date Date to check
 * @returns Boolean indicating if date is in the past
 */
export const isPastDate = (date: Date | number | string): boolean => {
  try {
    const dateObj =
      typeof date === "string" || typeof date === "number"
        ? new Date(date)
        : date;
    return isBefore(dateObj, new Date());
  } catch (error) {
    console.error("Error checking past date:", error);
    return false;
  }
};

/**
 * Calculate how many days until a date
 * @param date Target date
 * @returns Number of days until the date
 */
export const daysUntil = (date: Date | number | string): number => {
  try {
    const dateObj =
      typeof date === "string" || typeof date === "number"
        ? new Date(date)
        : date;
    const now = new Date();

    if (isBefore(dateObj, now)) {
      return 0;
    }

    return differenceInDays(dateObj, now);
  } catch (error) {
    console.error("Error calculating days until:", error);
    return 0;
  }
};

/**
 * Calculate how many days since a date
 * @param date Starting date
 * @returns Number of days since the date
 */
export const daysSince = (date: Date | number | string): number => {
  try {
    const dateObj =
      typeof date === "string" || typeof date === "number"
        ? new Date(date)
        : date;
    const now = new Date();

    if (isAfter(dateObj, now)) {
      return 0;
    }

    return differenceInDays(now, dateObj);
  } catch (error) {
    console.error("Error calculating days since:", error);
    return 0;
  }
};

/**
 * Format a timestamp as a countdown (days, hours, minutes)
 * @param targetDate Target date for countdown
 * @returns Formatted countdown string
 */
export const formatCountdown = (targetDate: Date | number | string): string => {
  try {
    const target =
      typeof targetDate === "string" || typeof targetDate === "number"
        ? new Date(targetDate)
        : targetDate;

    const now = new Date();

    if (isBefore(target, now)) {
      return "Ended";
    }

    const totalSeconds = Math.floor((target.getTime() - now.getTime()) / 1000);

    if (totalSeconds <= 0) {
      return "Ended";
    }

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  } catch (error) {
    console.error("Error formatting countdown:", error);
    return "N/A";
  }
};

/**
 * Get an array of dates for vesting schedule based on start date, cliff, and duration
 * @param startDate Start date of vesting
 * @param cliffMonths Cliff period in months
 * @param durationMonths Total vesting duration in months
 * @param periods Number of periods to generate
 * @returns Array of vesting dates
 */
export const generateVestingDates = (
  startDate: Date | number | string,
  cliffMonths: number,
  durationMonths: number,
  periods = 12
): Date[] => {
  try {
    const start =
      typeof startDate === "string" || typeof startDate === "number"
        ? new Date(startDate)
        : startDate;

    // Calculate cliff end date
    const cliffEnd = addMonths(start, cliffMonths);

    // Calculate total months after cliff
    const remainingMonths = durationMonths - cliffMonths;

    // Calculate interval between periods
    const monthsPerPeriod = remainingMonths / periods;

    // Generate dates
    const dates: Date[] = [start];

    // Add cliff date if cliff > 0
    if (cliffMonths > 0) {
      dates.push(cliffEnd);
    }

    // Add regular vesting dates
    for (let i = 1; i <= periods; i++) {
      const periodDate = addMonths(cliffEnd, i * monthsPerPeriod);
      dates.push(periodDate);
    }

    return dates;
  } catch (error) {
    console.error("Error generating vesting dates:", error);
    return [];
  }
};

/**
 * Get Unix timestamp in seconds
 * @param date Date to convert
 * @returns Unix timestamp in seconds
 */
export const getUnixTimestamp = (
  date: Date | number | string = new Date()
): number => {
  try {
    const dateObj =
      typeof date === "string" || typeof date === "number"
        ? new Date(date)
        : date;
    return Math.floor(dateObj.getTime() / 1000);
  } catch (error) {
    console.error("Error getting unix timestamp:", error);
    return Math.floor(Date.now() / 1000);
  }
};
