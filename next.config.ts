import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.notion.so",
      "images.unsplash.com",
      "prod-files-secure.s3",
      "s3.us-west-2.amazonaws.com",
      "prod-files-secure.s3.us-west-2.amazonaws.com",
      "github.com",
    ],
  },
};

export default nextConfig;
