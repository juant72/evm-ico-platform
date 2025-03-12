import { BigNumber, ethers } from "ethers";

/**
 * Format an Ethereum address for display by shortening it
 * @param address Ethereum address to format
 * @param chars Number of characters to display at beginning and end
 * @returns Formatted address string
 */
export const formatAddress = (address?: string, chars: number = 4): string => {
  if (!address) return "";
  if (address.length < chars * 2) return address;

  return `${address.substring(0, chars)}...${address.substring(
    address.length - chars
  )}`;
};

/**
 * Format a token amount with appropriate decimals and symbol
 * @param amount Amount as BigNumber or string
 * @param decimals Number of decimals for the token
 * @param displayDecimals Number of decimals to display
 * @param symbol Token symbol
 * @returns Formatted token amount string
 */
export const formatTokenAmount = (
  amount?: BigNumber | string | number,
  decimals: number = 18,
  displayDecimals: number = 4,
  symbol: string = ""
): string => {
  if (!amount) return `0${symbol ? ` ${symbol}` : ""}`;

  try {
    let formattedAmount: string;

    if (BigNumber.isBigNumber(amount)) {
      formattedAmount = ethers.utils.formatUnits(amount, decimals);
    } else if (typeof amount === "string") {
      const bn = BigNumber.from(amount);
      formattedAmount = ethers.utils.formatUnits(bn, decimals);
    } else if (typeof amount === "number") {
      formattedAmount = amount.toString();
    } else {
      return `0${symbol ? ` ${symbol}` : ""}`;
    }

    const value = parseFloat(formattedAmount);

    // Handle very small values
    if (value > 0 && value < Math.pow(10, -displayDecimals)) {
      return `<${Math.pow(10, -displayDecimals)}${symbol ? ` ${symbol}` : ""}`;
    }

    // Format with the specified number of decimals
    const formatted = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: displayDecimals,
    }).format(value);

    return `${formatted}${symbol ? ` ${symbol}` : ""}`;
  } catch (error) {
    console.error("Error formatting token amount:", error);
    return `0${symbol ? ` ${symbol}` : ""}`;
  }
};

/**
 * Format a number as currency
 * @param value Number to format
 * @param currency Currency code
 * @param decimals Number of decimal places
 * @returns Formatted currency string
 */
export const formatCurrency = (
  value: number | string,
  currency: string = "USD",
  decimals: number = 2
): string => {
  try {
    const numValue = typeof value === "string" ? parseFloat(value) : value;

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(numValue);
  } catch (error) {
    console.error("Error formatting currency:", error);
    return `$0.00`;
  }
};

/**
 * Format a percentage value
 * @param value Percentage value (0-100)
 * @param decimals Number of decimal places
 * @returns Formatted percentage string
 */
export const formatPercentage = (
  value: number | string,
  decimals: number = 2
): string => {
  try {
    const numValue = typeof value === "string" ? parseFloat(value) : value;

    return new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(numValue / 100);
  } catch (error) {
    console.error("Error formatting percentage:", error);
    return "0%";
  }
};

/**
 * Format a number with thousands separators
 * @param value Number to format
 * @param decimals Number of decimal places
 * @returns Formatted number string
 */
export const formatNumber = (
  value: number | string,
  decimals: number = 0
): string => {
  try {
    const numValue = typeof value === "string" ? parseFloat(value) : value;

    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(numValue);
  } catch (error) {
    console.error("Error formatting number:", error);
    return "0";
  }
};

/**
 * Format a file size in bytes to a human-readable format
 * @param bytes Size in bytes
 * @param decimals Number of decimal places
 * @returns Formatted file size string
 */
export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

/**
 * Format gas price from wei to gwei
 * @param wei Gas price in wei
 * @param decimals Number of decimal places
 * @returns Formatted gas price string
 */
export const formatGasPrice = (
  wei: BigNumber | string,
  decimals: number = 2
): string => {
  try {
    const gwei = ethers.utils.formatUnits(wei, "gwei");
    const gweiNumber = parseFloat(gwei);

    return `${gweiNumber.toFixed(decimals)} Gwei`;
  } catch (error) {
    console.error("Error formatting gas price:", error);
    return "0 Gwei";
  }
};

/**
 * Truncate text with ellipsis
 * @param text Text to truncate
 * @param maxLength Maximum length before truncation
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};
