// src/components/WalletConnect.tsx
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

export default function WalletConnect() {
  const address = useAddress();
  return (
    <div className="fixed top-4 right-4">
      <ConnectWallet />
      {address && <p>Conectado: {address}</p>}
    </div>
  );
}
