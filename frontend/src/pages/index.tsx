// pages/index.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Lanza tu ICO en minutos</h1>
        <p className="text-xl mb-8">
          Crea, gestiona y distribuye tokens de forma segura
        </p>
        <Link href="/create">
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50">
            Comenzar ahora →
          </button>
        </Link>
      </header>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Token Personalizable</h3>
          <p>Define nombre, supply, tax y más.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Vesting Automático</h3>
          <p>Protege a tu equipo e inversores.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Integración con DEX</h3>
          <p>Añade liquidez a Uniswap/PancakeSwap.</p>
        </div>
      </section>
    </div>
  );
}
