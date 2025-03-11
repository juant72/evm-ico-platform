import React, { createContext, useContext, ReactNode } from "react";

interface TokenData {
  name: string;
  symbol: string;
  totalSupply: number;
  blockchain: string;
}

interface TokenContextType {
  createToken: (tokenData: TokenData) => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export function TokenProvider({ children }: { children: ReactNode }) {
  const createToken = async (tokenData: TokenData) => {
    // Implement token creation logic here
    console.log("Creating token:", tokenData);
    // Make API calls or blockchain interactions as needed
  };

  return (
    <TokenContext.Provider value={{ createToken }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useCreateToken() {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error("useCreateToken must be used within a TokenProvider");
  }
  return context.createToken;
}
