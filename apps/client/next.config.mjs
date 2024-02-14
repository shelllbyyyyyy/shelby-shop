/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@shelby/db",
    "@shelby/supabase",
    "@shelby/api",
    "@shelby/dto",
  ],
  env: {
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  },
};

export default nextConfig;
