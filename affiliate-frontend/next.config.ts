import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: '**.shopee.co.id' },
      { protocol: 'https', hostname: '**.tokopedia.net' },
      { protocol: 'https', hostname: '**.googleusercontent.com' },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
