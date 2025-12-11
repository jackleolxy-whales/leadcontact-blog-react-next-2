import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'leadcontact.ai' },
      { protocol: 'https', hostname: 'app.leadcontact.ai' },
    ],
  },
};

export default nextConfig;
