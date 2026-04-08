import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
