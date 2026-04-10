import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // jouw bestaande config hier…
  // bv: experimental, images, reactStrictMode, etc.

  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
