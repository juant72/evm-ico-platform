import type { NextPage } from "next";
import React from "react";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
        ICO Platform
      </h1>
      <button className="mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:scale-105 transition-transform">
        Conectar Wallet
      </button>
    </div>
  );
};

export default Home;
