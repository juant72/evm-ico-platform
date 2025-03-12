import { useState, useEffect, useCallback } from "react";
import { BigNumber, utils } from "ethers";
import { useAddress, useChainId, useSDK } from "@thirdweb-dev/react";
import {
  getContractAddress,
  getExplorerAddressUrl,
  getExplorerTxUrl,
} from "../constants/addresses";
import { useAsync } from "./useAsync";
import {
  Token,
  TokenHolder,
  TokenTransaction,
  TokenMarketData,
} from "../types/token";
import { DEFAULT_TOKEN_PARAMS } from "../constants/tokenomics";

/**
 * Custom hook for interacting with the ERC20 token contract
 * @param contractAddress Optional override for the contract address
 * @returns Functions and state for token contract interaction
 */
export const useTokenContract = (contractAddress?: string) => {
  const address = useAddress();
  const chainId = useChainId();
  const sdk = useSDK();
  const { execute, loading: asyncLoading, error: asyncError } = useAsync();

  const [token, setToken] = useState<Token | null>(null);
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0));
  const [formattedBalance, setFormattedBalance] = useState("0");
  const [usdValue, setUsdValue] = useState(0);
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);
  const [marketData, setMarketData] = useState<TokenMarketData | null>(null);
  const [topHolders, setTopHolders] = useState<TokenHolder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize contract
  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!sdk) return;

        const tokenAddress =
          contractAddress || getContractAddress("TOKEN", chainId);
        if (!tokenAddress) {
          setError("Token contract address not found for this network");
          return;
        }

        // In a real application, you would use the SDK to get the contract
        // For demo purposes, we'll initialize with mock data

        // Mock token data
        const mockToken: Token = {
          id: tokenAddress,
          address: tokenAddress,
          name: DEFAULT_TOKEN_PARAMS.name,
          symbol: DEFAULT_TOKEN_PARAMS.symbol,
          decimals: DEFAULT_TOKEN_PARAMS.decimals,
          totalSupply: utils.parseEther("100000000"), // 100 million
          owner: "0xD979acD786A92a4Fb8d1046886B68Fc9896a3C25",
          circulatingSupply: utils.parseEther("25000000"), // 25 million
          logo: "/images/token-logo.svg",
          website: "https://encrypia.io",
          socials: {
            twitter: "https://twitter.com/encrypia",
            telegram: "https://t.me/encrypia",
            discord: "https://discord.gg/encrypia",
            github: "https://github.com/encrypia",
          },
          description:
            "Encrypia is a decentralized platform for secure data sharing and storage.",
          launchDate: Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60, // 30 days ago
          marketData: {
            price: 0.07, // $0.07
            priceChange24h: 5.2, // +5.2%
            priceChange7d: 12.8, // +12.8%
            marketCap: 1750000, // $1.75M
            fullyDilutedValuation: 7000000, // $7M
            volume24h: 350000, // $350K
            liquidity: 500000, // $500K
            ath: 0.09, // $0.09
            atl: 0.04, // $0.04
            athDate: Math.floor(Date.now() / 1000) - 10 * 24 * 60 * 60, // 10 days ago
            atlDate: Math.floor(Date.now() / 1000) - 28 * 24 * 60 * 60, // 28 days ago
          },
          stats: {
            holders: 1250,
            transactions: 8750,
            transfers: 5200,
          },
          features: {
            isMintable: DEFAULT_TOKEN_PARAMS.mintable,
            isBurnable: DEFAULT_TOKEN_PARAMS.burnable,
            isPausable: DEFAULT_TOKEN_PARAMS.pausable,
            isUpgradeable: true,
            hasTransferFee: false,
            isDeflationary: false,
            isGovernance: true,
            hasTimeLock: true,
            isStakeable: true,
            stakingAPY: 18,
            hasReflection: false,
          },
          tags: ["governance", "defi", "utility"],
        };

        setToken(mockToken);
        setMarketData(mockToken.marketData || null);

        // Mock top holders
        const mockTopHolders: TokenHolder[] = [
          {
            address: "0x8D619cC717f272d8ffc929cc8494db0BbEf933F3", // team multisig
            balance: utils.parseEther("20000000"), // 20M
            percentage: 20,
            ensName: "encrypia-team.eth",
          },
          {
            address: "0x1C5bF1cbE42380Bcea491608510955b277Cc8594", // development
            balance: utils.parseEther("15000000"), // 15M
            percentage: 15,
            ensName: "encrypia-dev.eth",
          },
          {
            address: "0xfa31095D88B56E4e70C67bfDD68eccE107180675", // timelock
            balance: utils.parseEther("10000000"), // 10M
            percentage: 10,
          },
          {
            address: "0x2123050Ac4fa4cEfc1aFf8a4c9593Fc64c2B1980", // treasury
            balance: utils.parseEther("5000000"), // 5M
            percentage: 5,
            ensName: "encrypia-treasury.eth",
          },
          {
            address: "0x3aF7E38Cf35D10962A90E99fF4313D3C67F4a35E", // governance
            balance: utils.parseEther("5000000"), // 5M
            percentage: 5,
          },
        ];

        setTopHolders(mockTopHolders);

        // If user is connected, fetch their balance
        if (address) {
          // Mock user balance
          const mockUserBalance = utils.parseEther("1000"); // 1,000 tokens
          setBalance(mockUserBalance);
          setFormattedBalance(
            formatBalance(mockUserBalance, mockToken.decimals)
          );

          // Calculate USD value
          if (mockToken.marketData?.price) {
            const tokenCount = parseFloat(utils.formatEther(mockUserBalance));
            setUsdValue(tokenCount * mockToken.marketData.price);
          }

          // Mock user transactions
          const mockTransactions: TokenTransaction[] = [
            {
              id: "1",
              hash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
              blockNumber: 10000000,
              timestamp: Math.floor(Date.now() / 1000) - 20 * 24 * 60 * 60, // 20 days ago
              from: "0x1bE3A2e566cD0d225C5E34Ea0c90A194ac739192",
              to: address,
              value: utils.parseEther("1000"),
              fee: utils.parseEther("0.002"),
              successful: true,
              type: "transfer",
            },
            {
              id: "2",
              hash: "0x0987654321098765432109876543210987654321098765432109876543210987654",
              blockNumber: 10000100,
              timestamp: Math.floor(Date.now() / 1000) - 15 * 24 * 60 * 60, // 15 days ago
              from: address,
              to: "0x259a2795624b8a17bc7eb312a94504ad0f615d1e", // ICO contract
              value: utils.parseEther("100"),
              fee: utils.parseEther("0.001"),
              successful: true,
              type: "stake",
            },
            {
              id: "3",
              hash: "0x5555555555555555555555555555555555555555555555555555555555555555",
              blockNumber: 10000200,
              timestamp: Math.floor(Date.now() / 1000) - 8 * 24 * 60 * 60, // 8 days ago
              from: "0x7c833A71Dd3B6cb96761c444E3D71A9ca1041843", // Vesting contract
              to: address,
              value: utils.parseEther("200"),
              fee: utils.parseEther("0.002"),
              successful: true,
              type: "claim",
            },
            {
              id: "4",
              hash: "0x1111111111111111111111111111111111111111111111111111111111111111",
              blockNumber: 10000300,
              timestamp: Math.floor(Date.now() / 1000) - 3 * 24 * 60 * 60, // 3 days ago
              from: address,
              to: "0x7B309b0dc63B36919c6DFFf93191A53F0FB63c6c", // Uniswap pool
              value: utils.parseEther("50"),
              fee: utils.parseEther("0.001"),
              successful: true,
              type: "swap",
            },
            {
              id: "5",
              hash: "0x2222222222222222222222222222222222222222222222222222222222222222",
              blockNumber: 10000400,
              timestamp: Math.floor(Date.now() / 1000) - 24 * 60 * 60, // 1 day ago
              from: address,
              to: "0x3aF7E38Cf35D10962A90E99fF4313D3C67F4a35E", // Governance contract
              value: utils.parseEther("100"),
              fee: utils.parseEther("0.001"),
              successful: true,
              type: "approve",
            },
          ];

          setTransactions(mockTransactions);
        }
      } catch (err: any) {
        console.error("Error initializing token contract:", err);
        setError(`Failed to initialize token contract: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [sdk, address, chainId, contractAddress]);

  /**
   * Format token balance based on decimals
   * @param balanceWei Balance in wei
   * @param decimals Decimals of the token
   * @returns Formatted balance string
   */
  const formatBalance = (balanceWei: BigNumber, decimals: number): string => {
    try {
      return utils.formatUnits(balanceWei, decimals);
    } catch (err) {
      console.error("Error formatting balance:", err);
      return "0";
    }
  };

  /**
   * Refresh token data
   * @returns Promise resolving to the token data
   */
  const fetchToken = async (): Promise<Token | null> => {
    return (await execute(async () => {
      if (!token) throw new Error("Token not initialized");

      // In a real application, you would fetch fresh token data
      // For demo purposes, we'll return the existing data

      return token;
    })) as Promise<Token | null>;
  };

  /**
   * Refresh user balance
   * @returns Promise resolving to the user's balance
   */
  const refreshBalance = async (): Promise<BigNumber> => {
    return (await execute(async () => {
      if (!token) throw new Error("Token not initialized");
      if (!address) throw new Error("Wallet not connected");

      // In a real application, you would fetch the latest balance
      // For demo purposes, we'll simulate a small balance change

      const newBalance = balance.add(utils.parseEther("1")); // Add 1 token
      setBalance(newBalance);
      setFormattedBalance(formatBalance(newBalance, token.decimals));

      if (token.marketData?.price) {
        const tokenCount = parseFloat(utils.formatEther(newBalance));
        setUsdValue(tokenCount * token.marketData.price);
      }

      return newBalance;
    })) as Promise<BigNumber>;
  };

  /**
   * Fetch token transactions
   * @param limit Number of transactions to fetch
   * @returns Promise resolving to the token transactions
   */
  const fetchTransactions = async (
    limit: number = 10
  ): Promise<TokenTransaction[]> => {
    return (await execute(async () => {
      if (!token) throw new Error("Token not initialized");
      if (!address) throw new Error("Wallet not connected");

      // In a real application, you would fetch transactions from an API or blockchain
      // For demo purposes, we'll return the existing data, limited to the specified number

      return transactions.slice(0, limit);
    })) as Promise<TokenTransaction[]>;
  };

  /**
   * Transfer tokens to another address
   * @param recipient Recipient address
   * @param amount Amount to transfer (as string, e.g. "100")
   * @returns Promise resolving to boolean indicating success
   */
  const transfer = async (
    recipient: string,
    amount: string
  ): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Validate inputs
      if (!token) throw new Error("Token not initialized");
      if (!address) throw new Error("Wallet not connected");
      if (!recipient) throw new Error("Recipient address is required");
      if (!amount || parseFloat(amount) <= 0)
        throw new Error("Amount must be greater than 0");

      // Check if user has enough balance
      const transferAmount = utils.parseEther(amount);
      if (transferAmount.gt(balance)) {
        throw new Error("Insufficient balance for transfer");
      }

      // In a real application, you would call the contract to transfer tokens
      // For demo purposes, we'll simulate the transfer

      // Simulate successful transaction
      const newTransaction: TokenTransaction = {
        id: `0x${Math.random().toString(16).slice(2, 10)}`,
        hash: `0x${Math.random().toString(16).slice(2, 66)}`,
        blockNumber: 10000000 + Math.floor(Math.random() * 1000),
        timestamp: Math.floor(Date.now() / 1000),
        from: address,
        to: recipient,
        value: transferAmount,
        fee: utils.parseEther("0.001"),
        successful: true,
        type: "transfer",
      };

      // Update user's balance
      const newBalance = balance.sub(transferAmount);
      setBalance(newBalance);
      setFormattedBalance(formatBalance(newBalance, token.decimals));

      if (token.marketData?.price) {
        const tokenCount = parseFloat(utils.formatEther(newBalance));
        setUsdValue(tokenCount * token.marketData.price);
      }

      // Add transaction to the list
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
   * Approve tokens for another contract to spend
   * @param spender Spender address
   * @param amount Amount to approve (as string, e.g. "100")
   * @returns Promise resolving to boolean indicating success
   */
  const approve = async (spender: string, amount: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Validate inputs
      if (!token) throw new Error("Token not initialized");
      if (!address) throw new Error("Wallet not connected");
      if (!spender) throw new Error("Spender address is required");
      if (!amount || parseFloat(amount) <= 0)
        throw new Error("Amount must be greater than 0");

      // In a real application, you would call the contract to approve tokens
      // For demo purposes, we'll simulate the approval

      // Simulate successful transaction
      const newTransaction: TokenTransaction = {
        id: `0x${Math.random().toString(16).slice(2, 10)}`,
        hash: `0x${Math.random().toString(16).slice(2, 66)}`,
        blockNumber: 10000000 + Math.floor(Math.random() * 1000),
        timestamp: Math.floor(Date.now() / 1000),
        from: address,
        to: token.address,
        value: utils.parseEther(amount),
        fee: utils.parseEther("0.001"),
        successful: true,
        type: "approve",
      };

      // Add transaction to the list
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

  return {
    token,
    balance,
    formattedBalance,
    usdValue,
    transactions,
    marketData,
    topHolders,
    isLoading: isLoading || asyncLoading,
    error: error || asyncError,
    fetchToken,
    refreshBalance,
    fetchTransactions,
    transfer,
    approve,
  };
};

export default useTokenContract;
