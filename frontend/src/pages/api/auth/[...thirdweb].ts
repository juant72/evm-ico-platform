import { ThirdwebAuth } from "@thirdweb-dev/auth/next";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import { domain } from "../../../constants/auth";

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: domain,
  wallet: new PrivateKeyWallet(process.env.ADMIN_PRIVATE_KEY || ""),
  callbacks: {
    onLogin: async (address) => {
      // Add custom login logic here
      return { role: "user" };
    },
    onUser: async (user) => {
      // Add custom user transformation logic here
      return user;
    },
    onLogout: async (user) => {
      // Add custom logout logic here
    },
  },
  // Configure JWT options
  session: {
    expires: "1h", // Session duration
  },
});

export default ThirdwebAuthHandler();
