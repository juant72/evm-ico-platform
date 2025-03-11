import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId="your-client-id" // Replace with your client ID or use activeChain only
      activeChain="ethereum" // or any other chain you're using
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
