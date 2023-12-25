/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  experimental: {
    ppr: true,
  },
};

module.exports = nextConfig;
