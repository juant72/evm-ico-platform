import { ethers } from "ethers";

/**
 * Email validation regex pattern
 */
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * URL validation regex pattern
 */
const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

/**
 * Password validation regex - requires at least 8 chars with 1 uppercase, 1 lowercase, and 1 number
 */
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Check if a string is a valid email address
 * @param email Email address to validate
 * @returns True if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

/**
 * Check if a string is a valid URL
 * @param url URL to validate
 * @returns True if URL is valid
 */
export const isValidUrl = (url: string): boolean => {
  return URL_REGEX.test(url);
};

/**
 * Check if a string is a valid Ethereum address
 * @param address Ethereum address to validate
 * @returns True if address is valid
 */
export const isValidEthAddress = (address: string): boolean => {
  try {
    return ethers.utils.isAddress(address);
  } catch (error) {
    return false;
  }
};

/**
 * Check if a string is a valid password
 * @param password Password to validate
 * @returns True if password is valid
 */
export const isValidPassword = (password: string): boolean => {
  return PASSWORD_REGEX.test(password);
};

/**
 * Check if a number is within a range
 * @param value Value to check
 * @param min Minimum allowed value (inclusive)
 * @param max Maximum allowed value (inclusive)
 * @returns True if value is within range
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

/**
 * Validate ICO parameters
 * @param params ICO parameters
 * @returns Object with validation errors, if any
 */
export const validateIcoParams = (params: {
  name?: string;
  symbol?: string;
  totalSupply?: number;
  rate?: number;
  softCap?: number;
  hardCap?: number;
  startTime?: Date | number | string;
  endTime?: Date | number | string;
  minContribution?: number;
  maxContribution?: number;
}) => {
  const errors: Record<string, string> = {};

  // Token name validation
  if (!params.name || params.name.trim().length === 0) {
    errors.name = "Token name is required";
  } else if (params.name.trim().length < 3) {
    errors.name = "Token name must be at least 3 characters";
  } else if (params.name.trim().length > 50) {
    errors.name = "Token name must be less than 50 characters";
  }

  // Token symbol validation
  if (!params.symbol || params.symbol.trim().length === 0) {
    errors.symbol = "Token symbol is required";
  } else if (!/^[A-Z0-9]{2,6}$/.test(params.symbol)) {
    errors.symbol = "Symbol must be 2-6 uppercase letters or numbers";
  }

  // Total supply validation
  if (!params.totalSupply || params.totalSupply <= 0) {
    errors.totalSupply = "Total supply must be greater than 0";
  } else if (params.totalSupply > 1_000_000_000_000) {
    errors.totalSupply = "Total supply exceeds maximum allowed (1 trillion)";
  }

  // Token rate validation
  if (!params.rate || params.rate <= 0) {
    errors.rate = "Token rate must be greater than 0";
  }

  // Cap validations
  if (!params.softCap || params.softCap <= 0) {
    errors.softCap = "Soft cap must be greater than 0";
  }

  if (!params.hardCap || params.hardCap <= 0) {
    errors.hardCap = "Hard cap must be greater than 0";
  } else if (params.softCap && params.hardCap <= params.softCap) {
    errors.hardCap = "Hard cap must be greater than soft cap";
  }

  // Time validations
  const now = Date.now();
  const startTime = params.startTime ? new Date(params.startTime).getTime() : 0;
  const endTime = params.endTime ? new Date(params.endTime).getTime() : 0;

  if (!startTime) {
    errors.startTime = "Start time is required";
  } else if (startTime < now) {
    errors.startTime = "Start time must be in the future";
  }

  if (!endTime) {
    errors.endTime = "End time is required";
  } else if (endTime <= startTime) {
    errors.endTime = "End time must be after start time";
  }

  // Contribution limits
  if (params.minContribution && params.minContribution <= 0) {
    errors.minContribution = "Minimum contribution must be greater than 0";
  }

  if (params.maxContribution && params.maxContribution <= 0) {
    errors.maxContribution = "Maximum contribution must be greater than 0";
  } else if (
    params.minContribution &&
    params.maxContribution &&
    params.maxContribution <= params.minContribution
  ) {
    errors.maxContribution =
      "Maximum contribution must be greater than minimum contribution";
  }

  return errors;
};

/**
 * Format validation errors into user-friendly messages
 * @param errors Validation error object
 * @returns Array of error messages
 */
export const formatValidationErrors = (
  errors: Record<string, string>
): string[] => {
  return Object.values(errors);
};

/**
 * Validate that a number is a positive number
 * @param value Value to check
 * @returns True if value is a positive number
 */
export const isPositiveNumber = (value: any): boolean => {
  if (typeof value === "number") {
    return value > 0;
  }

  if (typeof value === "string") {
    const num = parseFloat(value);
    return !isNaN(num) && num > 0;
  }

  return false;
};

/**
 * Validate token allocations sum to 100%
 * @param allocations Array of allocation percentages
 * @returns True if allocations sum to 100%
 */
export const validateTokenAllocations = (allocations: number[]): boolean => {
  const sum = allocations.reduce((acc, val) => acc + val, 0);
  return Math.abs(sum - 100) < 0.001; // Allow for minor floating point discrepancies
};
