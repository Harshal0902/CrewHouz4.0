import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/gitbook',
        destination: 'https://gitbook.bit10.app',
        permanent: true,
      },
      {
        source: '/whitepaper',
        destination: 'https://gitbook.bit10.app',
        permanent: true,
      },
      {
        source: '/twitter',
        destination: 'https://twitter.com/bit10startup',
        permanent: true,
      },
      {
        source: '/telegram',
        destination: 'https://t.me/zr00083',
        permanent: true,
      },
      {
        source: '/github',
        destination: 'https://github.com/Harshal0902/CrewHouz4.0',
        permanent: true,
      }
    ]
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  output: 'export',
};

export default nextConfig;
