import { ThirdwebAuth } from "@thirdweb-dev/auth/next";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import { domain, AUTH_PRIVATE_KEY } from "../../../constants/auth";

if (!AUTH_PRIVATE_KEY) {
  throw new Error("No private key provided");
}

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: domain,
  wallet: new PrivateKeyWallet(AUTH_PRIVATE_KEY),
});

export default ThirdwebAuthHandler();
