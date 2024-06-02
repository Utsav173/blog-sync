/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    ppr: 'incremental',
  },
};

module.exports = nextConfig;
