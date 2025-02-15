/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fourhoi.com"],
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
