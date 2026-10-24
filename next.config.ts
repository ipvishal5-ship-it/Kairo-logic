import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optional static build for private reviews or static hosting.
  ...(process.env.KAIRO_STATIC_EXPORT === "1"
    ? { output: "export" as const, images: { unoptimized: true } }
    : {}),
};

export default nextConfig;
