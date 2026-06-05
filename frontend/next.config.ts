import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Ensure we don't try to fetch data files that Hostinger might block
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
