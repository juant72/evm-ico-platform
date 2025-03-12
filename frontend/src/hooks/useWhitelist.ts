import { useState, useEffect, useCallback } from "react";
import { BigNumber, utils } from "ethers";
import { useAddress, useChainId, useSDK } from "@thirdweb-dev/react";
import { getContractAddress } from "../constants/addresses";
import { useAsync } from "./useAsync";

/**
 * Whitelist entry data
 */
interface WhitelistEntry {
  id: string;
  address: string;
  tier: number;
  allocation: BigNumber;
  purchased: BigNumber;
  remaining: BigNumber;
  discountPercentage: number;
  addedAt: number;
  expiresAt: number | null;
}

/**
 * Whitelist data
 */
interface WhitelistData {
  isWhitelisted: boolean;
  entry: WhitelistEntry | null;
  totalAllocated: BigNumber;
  totalPurchased: BigNumber;
  totalRemaining: BigNumber;
  tierName: string;
}

/**
 * Tier information
 */
interface TierInfo {
  id: number;
  name: string;
  discount: number;
  minAllocation: BigNumber;
  maxAllocation: BigNumber;
}

// Define tier information
const TIERS: TierInfo[] = [
  {
    id: 1,
    name: "Bronze",
    discount: 5, // 5% discount
    minAllocation: utils.parseEther("100"),
    maxAllocation: utils.parseEther("1000"),
  },
  {
    id: 2,
    name: "Silver",
    discount: 10, // 10% discount
    minAllocation: utils.parseEther("1000"),
    maxAllocation: utils.parseEther("5000"),
  },
  {
    id: 3,
    name: "Gold",
    discount: 15, // 15% discount
    minAllocation: utils.parseEther("5000"),
    maxAllocation: utils.parseEther("10000"),
  },
  {
    id: 4,
    name: "Platinum",
    discount: 20, // 20% discount
    minAllocation: utils.parseEther("10000"),
    maxAllocation: utils.parseEther("50000"),
  },
];

/**
 * Custom hook for interacting with whitelist contract
 * @param contractAddress Optional override for the whitelist contract address
 * @returns Functions and state for whitelist contract interaction
 */
export const useWhitelist = (contractAddress?: string) => {
  const address = useAddress();
  const chainId = useChainId();
  const sdk = useSDK();
  const { execute, loading: asyncLoading, error: asyncError } = useAsync();

  const [whitelistData, setWhitelistData] = useState<WhitelistData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize whitelist data
  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!sdk || !address) return;

        const whitelistAddress =
          contractAddress || getContractAddress("WHITELIST", chainId);
        if (!whitelistAddress) {
          setError("Whitelist contract address not found for this network");
          return;
        }

        // In a real application, you would use the SDK to get the contract
        // For demo purposes, we'll initialize with mock data

        // Determine if address is whitelisted (mock implementation)
        const mockIsWhitelisted = Math.random() > 0.3; // 70% chance of being whitelisted

        if (!mockIsWhitelisted) {
          setWhitelistData({
            isWhitelisted: false,
            entry: null,
            totalAllocated: BigNumber.from(0),
            totalPurchased: BigNumber.from(0),
            totalRemaining: BigNumber.from(0),
            tierName: "",
          });
          return;
        }

        // Select a random tier
        const tierIndex = Math.floor(Math.random() * TIERS.length);
        const tier = TIERS[tierIndex];

        // Generate random allocation within tier limits
        const range = tier.maxAllocation.sub(tier.minAllocation);
        const randomOffset = BigNumber.from(Math.floor(Math.random() * 1000));
        const allocation = tier.minAllocation.add(
          range.mul(randomOffset).div(1000)
        );

        // Generate random purchased amount (0-80% of allocation)
        const purchasedPercent = Math.floor(Math.random() * 80);
        const purchased = allocation.mul(purchasedPercent).div(100);
        const remaining = allocation.sub(purchased);

        // Create whitelist entry
        const now = Math.floor(Date.now() / 1000);
        const mockEntry: WhitelistEntry = {
          id: `${address}-${tier.id}`,
          address: address,
          tier: tier.id,
          allocation,
          purchased,
          remaining,
          discountPercentage: tier.discount,
          addedAt: now - 86400 * Math.floor(Math.random() * 30), // Added 0-30 days ago
          expiresAt:
            Math.random() > 0.5
              ? null
              : now + 86400 * Math.floor(Math.random() * 60 + 30), // 50% chance of expiring in 30-90 days
        };

        // Set whitelist data
        setWhitelistData({
          isWhitelisted: true,
          entry: mockEntry,
          totalAllocated: allocation,
          totalPurchased: purchased,
          totalRemaining: remaining,
          tierName: tier.name,
        });
      } catch (err: any) {
        console.error("Error initializing whitelist:", err);
        setError(`Failed to initialize whitelist: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [sdk, address, chainId, contractAddress]);

  /**
   * Check if the current user is whitelisted
   * @returns Boolean indicating if the user is whitelisted
   */
  const checkWhitelistStatus = useCallback(async (): Promise<boolean> => {
    return (await execute(async () => {
      if (!address) throw new Error("No wallet connected");

      // In a real application, you would call the whitelist contract
      // For demo purposes, we'll use the existing state

      return whitelistData?.isWhitelisted || false;
    })) as boolean;
  }, [address, execute, whitelistData]);

  /**
   * Get tier information by tier ID
   * @param tierId Tier ID to look up
   * @returns Tier information or null if not found
   */
  const getTierInfo = useCallback((tierId: number): TierInfo | null => {
    return TIERS.find((t) => t.id === tierId) || null;
  }, []);

  /**
   * Get the name of a tier by ID
   * @param tierId Tier ID to look up
   * @returns Tier name or empty string if not found
   */
  const getTierName = useCallback(
    (tierId: number): string => {
      const tier = getTierInfo(tierId);
      return tier?.name || "";
    },
    [getTierInfo]
  );

  /**
   * Calculate discounted price based on tier
   * @param originalPrice Original price in BigNumber
   * @returns Discounted price in BigNumber
   */
  const getDiscountedPrice = useCallback(
    (originalPrice: BigNumber): BigNumber => {
      if (
        !whitelistData ||
        !whitelistData.isWhitelisted ||
        !whitelistData.entry
      ) {
        return originalPrice;
      }

      const discountPercent = whitelistData.entry.discountPercentage;
      if (discountPercent <= 0) return originalPrice;

      const discount = originalPrice.mul(discountPercent).div(100);
      return originalPrice.sub(discount);
    },
    [whitelistData]
  );

  /**
   * Format allocation information for display
   */
  const getAllocationInfo = useCallback(() => {
    if (!whitelistData || !whitelistData.isWhitelisted) {
      return {
        allocated: "0",
        purchased: "0",
        remaining: "0",
        percentUsed: 0,
      };
    }

    const allocated = utils.formatEther(whitelistData.totalAllocated);
    const purchased = utils.formatEther(whitelistData.totalPurchased);
    const remaining = utils.formatEther(whitelistData.totalRemaining);

    const percentUsed = whitelistData.totalAllocated.isZero()
      ? 0
      : Math.floor(
          whitelistData.totalPurchased
            .mul(100)
            .div(whitelistData.totalAllocated)
            .toNumber()
        );

    return {
      allocated,
      purchased,
      remaining,
      percentUsed,
    };
  }, [whitelistData]);

  /**
   * Calculate if the user can purchase a specific amount
   * @param amount Amount to check in BigNumber
   * @returns Boolean indicating if purchase is allowed
   */
  const canPurchase = useCallback(
    (amount: BigNumber): boolean => {
      if (
        !whitelistData ||
        !whitelistData.isWhitelisted ||
        !whitelistData.entry
      ) {
        return false;
      }

      // Check if whitelist entry is expired
      if (whitelistData.entry.expiresAt) {
        const now = Math.floor(Date.now() / 1000);
        if (now > whitelistData.entry.expiresAt) {
          return false;
        }
      }

      // Check if user has enough remaining allocation
      return whitelistData.totalRemaining.gte(amount);
    },
    [whitelistData]
  );

  /**
   * Refresh whitelist data
   */
  const refreshWhitelistData = async (): Promise<WhitelistData | null> => {
    return (await execute(async () => {
      if (!whitelistData) throw new Error("Whitelist data not initialized");

      // In a real application, you would fetch fresh whitelist data
      // For demo purposes, we'll return the existing data

      return whitelistData;
    })) as Promise<WhitelistData | null>;
  };

  return {
    whitelistData,
    isLoading: isLoading || asyncLoading,
    error: error || asyncError,
    checkWhitelistStatus,
    getTierInfo,
    getTierName,
    getDiscountedPrice,
    getAllocationInfo,
    canPurchase,
    refreshWhitelistData,
    tiers: TIERS,
  };
};
