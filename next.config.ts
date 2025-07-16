import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Add more hosts if you use them, e.g.:
      // { protocol: 'https', hostname: 'drive.google.com' },
      // { protocol: 'https', hostname: 'cht36xxrzycrr1fo.public.blob.vercel-storage.com' },
      // { protocol: 'https', hostname: 'your-other-image-host.com' },
    ],
  },
  // ...other config options
};

export default nextConfig;
