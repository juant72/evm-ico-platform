import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  useAddress,
  useContract,
  useContractRead,
  useTokenBalance,
  useSDK,
} from "@thirdweb-dev/react";
import { BigNumber, utils } from "ethers";
import {
  Token,
  TokenTransaction,
  TokenMarketData,
  TokenHolder,
} from "../types/token";
import { formatTokenAmount } from "../utils/formatters";

// Context state interface
interface TokenContextState {
  token: Token | null;
  balance: BigNumber;
  formattedBalance: string;
  usdValue: number;
  transactions: TokenTransaction[];
  marketData: TokenMarketData | null;
  topHolders: TokenHolder[];
  isLoading: boolean;
  error: string | null;
  fetchToken: (address: string) => Promise<Token | null>;
  refreshBalance: () => Promise<void>;
  fetchTransactions: (
    address?: string,
    limit?: number
  ) => Promise<TokenTransaction[]>;
  transfer: (to: string, amount: string) => Promise<boolean>;
  approve: (spender: string, amount: string) => Promise<boolean>;
}

// Default context state
const defaultContext: TokenContextState = {
  token: null,
  balance: BigNumber.from(0),
  formattedBalance: "0",
  usdValue: 0,
  transactions: [],
  marketData: null,
  topHolders: [],
  isLoading: false,
  error: null,
  fetchToken: async () => null,
  refreshBalance: async () => {},
  fetchTransactions: async () => [],
  transfer: async () => false,
  approve: async () => false,
};

// Create context
const TokenContext = createContext<TokenContextState>(defaultContext);

// Token Provider Props
interface TokenProviderProps {
  children: ReactNode;
  tokenAddress?: string;
}

/**
 * Token Provider Component
 */
export const TokenProvider: React.FC<TokenProviderProps> = ({
  children,
  tokenAddress,
}) => {
  const address = useAddress();
  const sdk = useSDK();
  const [token, setToken] = useState<Token | null>(null);
  const [marketData, setMarketData] = useState<TokenMarketData | null>(null);
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);
  const [topHolders, setTopHolders] = useState<TokenHolder[]>([]);
  const [usdValue, setUsdValue] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Contract hook
  const { contract } = useContract(tokenAddress);

  // Token balance hook
  const {
    data: balanceData,
    isLoading: isBalanceLoading,
    refetch: refreshBalanceData,
  } = useTokenBalance(contract, address);

  // Format token balance
  const formattedBalance = balanceData
    ? formatTokenAmount(
        balanceData.value,
        balanceData.decimals,
        4,
        balanceData.symbol
      )
    : "0";

  // Get token balance
  const balance = balanceData ? balanceData.value : BigNumber.from(0);

  // Fetch token data on mount if address is provided
  useEffect(() => {
    if (tokenAddress) {
      fetchToken(tokenAddress);
    }
  }, [tokenAddress]);

  /**
   * Fetch token information
   */
  const fetchToken = async (address: string): Promise<Token | null> => {
    try {
      setIsLoading(true);
      setError(null);

      // In a real app, you'd make an API call to get token data
      // This is a placeholder with mock data
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockToken: Token = {
        id: address,
        address: address,
        name: "Encrypia",
        symbol: "ENC",
        decimals: 18,
        totalSupply: utils.parseEther("100000000"), // 100M tokens
        owner: "0x1234567890123456789012345678901234567890",
        circulatingSupply: utils.parseEther("25000000"), // 25M tokens
        logo: "/images/token-logo.png",
        website: "https://encrypia.com",
        socials: {
          twitter: "https://twitter.com/encrypia",
          telegram: "https://t.me/encrypia",
          discord: "https://discord.gg/encrypia",
        },
        description:
          "Encrypia is a privacy-focused cryptocurrency for secure transactions and data protection.",
        launchDate: Math.floor(Date.now() / 1000) - 2592000, // 30 days ago
        tags: ["Privacy", "Security", "DeFi"],
      };

      // Fetch market data
      const mockMarketData: TokenMarketData = {
        price: 0.05, // $0.05
        priceChange24h: 3.5, // +3.5%
        priceChange7d: 12.8, // +12.8%
        marketCap: 25000000 * 0.05, // $1.25M market cap
        fullyDilutedValuation: 100000000 * 0.05, // $5M FDV
        volume24h: 250000, // $250K volume
        liquidity: 500000, // $500K liquidity
        ath: 0.08, // $0.08 all-time high
        atl: 0.02, // $0.02 all-time low
        athDate: Math.floor(Date.now() / 1000) - 1296000, // 15 days ago
        atlDate: Math.floor(Date.now() / 1000) - 2160000, // 25 days ago
        pairAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
      };

      // Generate mock top holders
      const mockHolders: TokenHolder[] = [
        {
          address: "0x1111111111111111111111111111111111111111",
          balance: utils.parseEther("15000000"), // 15M tokens
          percentage: 15,
          value: 15000000 * 0.05, // $750K
          lastActivity: Math.floor(Date.now() / 1000) - 86400, // 1 day ago
        },
        {
          address: "0x2222222222222222222222222222222222222222",
          ensName: "vitalik.eth",
          balance: utils.parseEther("10000000"), // 10M tokens
          percentage: 10,
          value: 10000000 * 0.05, // $500K
          lastActivity: Math.floor(Date.now() / 1000) - 172800, // 2 days ago
        },
        {
          address: "0x3333333333333333333333333333333333333333",
          balance: utils.parseEther("5000000"), // 5M tokens
          percentage: 5,
          value: 5000000 * 0.05, // $250K
          lastActivity: Math.floor(Date.now() / 1000) - 259200, // 3 days ago
        },
        {
          address: "0x4444444444444444444444444444444444444444",
          balance: utils.parseEther("3000000"), // 3M tokens
          percentage: 3,
          value: 3000000 * 0.05, // $150K
          lastActivity: Math.floor(Date.now() / 1000) - 345600, // 4 days ago
        },
        {
          address: "0x5555555555555555555555555555555555555555",
          ensName: "investor.eth",
          balance: utils.parseEther("2000000"), // 2M tokens
          percentage: 2,
          value: 2000000 * 0.05, // $100K
          lastActivity: Math.floor(Date.now() / 1000) - 432000, // 5 days ago
        },
      ];

      // Update state
      setToken(mockToken);
      setMarketData(mockMarketData);
      setTopHolders(mockHolders);

      // Calculate USD value of user's tokens
      if (balanceData && mockMarketData.price) {
        const balanceValue =
          parseFloat(
            utils.formatUnits(balanceData.value, balanceData.decimals)
          ) * mockMarketData.price;
        setUsdValue(balanceValue);
      }

      return mockToken;
    } catch (err: any) {
      console.error("Error fetching token:", err);
      setError(err.message || "Error fetching token data");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Refresh user's token balance
   */
  const refreshBalance = async (): Promise<void> => {
    if (!address || !contract) return;

    try {
      await refreshBalanceData();

      // Update USD value if market data exists
      if (balanceData && marketData?.price) {
        const balanceValue =
          parseFloat(
            utils.formatUnits(balanceData.value, balanceData.decimals)
          ) * marketData.price;
        setUsdValue(balanceValue);
      }
    } catch (err: any) {
      console.error("Error refreshing balance:", err);
      setError(err.message || "Error refreshing balance");
    }
  };

  /**
   * Fetch transaction history
   * @param address Optional address to fetch transactions for (defaults to connected wallet)
   * @param limit Optional limit of transactions to fetch
   */
  const fetchTransactions = async (
    addr?: string,
    limit: number = 10
  ): Promise<TokenTransaction[]> => {
    try {
      setIsLoading(true);

      // In a real app, you'd make an API call to get transaction data
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Generate mock transaction data
      const mockTransactions: TokenTransaction[] = Array.from({
        length: limit,
      }).map((_, i) => {
        const timestamp = Math.floor(Date.now() / 1000) - (i * 86400) / 2; // Every half day
        const transactionTypes: TokenTransactionType[] = [
          "transfer",
          "approve",
          "transferFrom",
          "mint",
          "burn",
          "stake",
          "unstake",
        ];
        const randomType =
          transactionTypes[Math.floor(Math.random() * transactionTypes.length)];

        return {
          id: `0x${Math.random().toString(16).slice(2, 10)}`,
          hash: `0x${Math.random().toString(16).slice(2, 66)}`,
          blockNumber: 10000000 + i,
          timestamp,
          from:
            i % 3 === 0
              ? address || addr || "0x0"
              : `0x${Math.random().toString(16).slice(2, 42)}`,
          to:
            i % 3 === 0
              ? `0x${Math.random().toString(16).slice(2, 42)}`
              : address || addr || "0x0",
          value: utils.parseEther((Math.random() * 1000 + 100).toFixed(2)),
          fee: utils.parseEther((Math.random() * 0.005).toFixed(6)),
          successful: Math.random() > 0.1, // 10% chance of failure
          type: randomType as TokenTransactionType,
        };
      });

      setTransactions(mockTransactions);
      return mockTransactions;
    } catch (err: any) {
      console.error("Error fetching transactions:", err);
      setError(err.message || "Error fetching transaction history");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Transfer tokens to another address
   * @param to Recipient address
   * @param amount Amount to transfer
   */
  const transfer = async (to: string, amount: string): Promise<boolean> => {
    if (!contract || !address) return false;

    try {
      setIsLoading(true);
      setError(null);

      // In a real app, this would be a real contract call
      console.log(`Transferring ${amount} tokens to ${to}`);

      // Simulate success
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Refresh balance after transfer
      await refreshBalance();

      // Add transaction to history
      const newTransaction: TokenTransaction = {
        id: `0x${Math.random().toString(16).slice(2, 10)}`,
        hash: `0x${Math.random().toString(16).slice(2, 66)}`,
        blockNumber: 10000000,
        timestamp: Math.floor(Date.now() / 1000),
        from: address,
        to,
        value: utils.parseEther(amount),
        fee: utils.parseEther("0.002"),
        successful: true,
        type: "transfer",
      };

      setTransactions([newTransaction, ...transactions]);

      return true;
    } catch (err: any) {
      console.error("Error transferring tokens:", err);
      setError(err.message || "Error transferring tokens");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Approve tokens for another address
   * @param spender Spender address
   * @param amount Amount to approve
   */
  const approve = async (spender: string, amount: string): Promise<boolean> => {
    if (!contract || !address) return false;

    try {
      setIsLoading(true);
      setError(null);

      // In a real app, this would be a real contract call
      console.log(`Approving ${amount} tokens for ${spender}`);

      // Simulate success
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Add transaction to history
      const newTransaction: TokenTransaction = {
        id: `0x${Math.random().toString(16).slice(2, 10)}`,
        hash: `0x${Math.random().toString(16).slice(2, 66)}`,
        blockNumber: 10000000,
        timestamp: Math.floor(Date.now() / 1000),
        from: address,
        to: tokenAddress || "",
        value: utils.parseEther(amount),
        fee: utils.parseEther("0.001"),
        successful: true,
        type: "approve",
      };

      setTransactions([newTransaction, ...transactions]);

      return true;
    } catch (err: any) {
      console.error("Error approving tokens:", err);
      setError(err.message || "Error approving tokens");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TokenContext.Provider
      value={{
        token,
        balance,
        formattedBalance,
        usdValue,
        transactions,
        marketData,
        topHolders,
        isLoading,
        error,
        fetchToken,
        refreshBalance,
        fetchTransactions,
        transfer,
        approve,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

/**
 * Hook to use the token context
 */
export const useToken = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};

export default TokenContext;
