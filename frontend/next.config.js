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
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      os: require.resolve("os-browserify/browser"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      buffer: require.resolve("buffer"),
      process: require.resolve("process/browser"),
    };

    // Add polyfills
    config.plugins.push(
      new (require("webpack").ProvidePlugin)({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      })
    );

    return config;
  },
  // Ayuda con problemas de importación de módulos
  experimental: {
    esmExternals: "loose",
  },
};

module.exports = nextConfig;
