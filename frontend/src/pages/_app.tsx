import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

function MyApp({ Component, pageProps }: AppProps) {
  // This can be any supported chain
  const desiredChainId = ChainId.Mainnet;

  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
