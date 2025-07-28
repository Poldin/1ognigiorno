import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.x-bio.it',
        port: '',
        pathname: '/img/**',
      },
    ],
  },
};

export default nextConfig;
