import type { NextConfig } from "next";

// Get base path from environment variable (for GitHub Pages)
// Set to empty string for root domain, or '/repository-name' for subpath
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,
  images: {
    unoptimized: true,
  },
  // Security: Remove X-Powered-By header
  poweredByHeader: false,
  // Trailing slash for GitHub Pages compatibility
  trailingSlash: true,
};

export default nextConfig;
