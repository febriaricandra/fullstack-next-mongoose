import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  images: {
    domains: [
       "awsimages.detik.net.id",
       "asset-2.tribunnews.com",
       "img-global.cpcdn.com",
       "images.unsplash.com", 
    ]
  }
};

export default nextConfig;
