import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // lets a verification build run next to the dev server: NEXT_DIST_DIR=.next-build npm run build
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default nextConfig;
