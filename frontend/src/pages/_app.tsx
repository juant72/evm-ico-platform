import "../styles/globals.css";
import "../styles/components.css";
import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  coinbaseWallet,
  metamaskWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import Head from "next/head";
import { useState, useEffect } from "react";

/**
 * Main application component that wraps all pages
 * Provides global configurations and providers
 */
function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    // You can render a loading screen here
    return null;
  }

  return (
    <>
      <Head>
        <title>Encrypia - ICO Platform</title>
        <meta
          name="description"
          content="A complete platform for launching and participating in Initial Coin Offerings"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThirdwebProvider
        activeChain={Sepolia}
        clientId={
          process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "your-client-id"
        }
        supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnect()]}
        authConfig={{
          authUrl: "/api/auth",
          domain:
            process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "your-domain.com",
          loginRedirect: "/dashboard",
        }}
        dAppMeta={{
          name: "Encrypia ICO Platform",
          description:
            "A complete platform for launching and participating in Initial Coin Offerings",
          logoUrl: "/logo.svg",
          url: "https://encrypia.com",
          isDarkMode: true,
        }}
      >
        <Component {...pageProps} />
      </ThirdwebProvider>
    </>
  );
}

export default MyApp;
