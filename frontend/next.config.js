/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@thirdweb-dev/react",
    "@thirdweb-dev/sdk",
    "@thirdweb-dev/chains",
    "react-chartjs-2",
    "chart.js",
  ],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

module.exports = nextConfig;
