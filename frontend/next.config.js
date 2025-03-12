/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@thirdweb-dev/react",
    "@thirdweb-dev/sdk",
    "@thirdweb-dev/chains",
    "react-chartjs-2",
    "chart.js",
    "@coinbase/wallet-sdk",
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        os: require.resolve("os-browserify/browser"),
        http: false,
        https: false,
        path: false,
        pino: false,
      };
    }
    return config;
  },
  // Ayuda con problemas de importación de módulos
  experimental: {
    esmExternals: "loose",
  },
};

module.exports = nextConfig;
