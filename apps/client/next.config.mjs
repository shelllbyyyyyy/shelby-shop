import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jknednnvxbnawmfltvfy.supabase.co",
      },
      {
        protocol: "https",
        hostname: "esiiqnvrpirhrvnmgotv.supabase.co",
      },
      {
        hostname: "localhost",
      },
    ],
  },
  transpilePackages: ["@shelby/db", "@shelby/api", "@shelby/dto"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
  env: {
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  },
};

export default nextConfig;
