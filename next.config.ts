
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Allow production builds even when ESLint reports errors
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Allow production builds even when TypeScript reports errors
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
