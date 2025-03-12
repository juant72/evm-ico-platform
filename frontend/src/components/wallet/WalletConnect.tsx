import { useAddress, useDisconnect, useConnect } from "@thirdweb-dev/react";

export default function WalletConnect() {
  const address = useAddress();
  const disconnect = useDisconnect();
  const connect = useConnect();

  return (
    <div className="flex items-center space-x-4">
      {address ? (
        <>
          <p>
            {address.slice(0, 6)}...{address.slice(-4)}
          </p>
          <button
            onClick={disconnect}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Desconectar
          </button>
        </>
      ) : (
        <button
          onClick={() => connect()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Conectar Wallet
        </button>
      )}
    </div>
  );
}
