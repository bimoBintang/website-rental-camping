import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", 
  images: {
    domains: ['localhost', 'website-rental-camping.vercel.app'],
  },
};

export default nextConfig;

