import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [75, 90, 100],
    domains: [
      'www.notion.so',
      'file.notion.so',
      'images.unsplash.com',
      'prod-files-secure.s3',
      's3.us-west-2.amazonaws.com',
      'prod-files-secure.s3.us-west-2.amazonaws.com',
      'drive.google.com',
      'github.com',
    ],
  },
};

export default nextConfig;
