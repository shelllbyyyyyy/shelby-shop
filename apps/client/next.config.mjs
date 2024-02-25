/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jknednnvxbnawmfltvfy.supabase.co",
      },
      {
        hostname: "localhost",
      },
    ],
  },
  transpilePackages: ["@shelby/db", "@shelby/api", "@shelby/dto"],
  env: {
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  },
};

export default nextConfig;
