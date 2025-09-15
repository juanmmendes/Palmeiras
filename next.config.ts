// next.config.ts
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repo = "Palmeiras";

const nextConfig: NextConfig = {
  output: "export",                   // gera /out
  images: { unoptimized: true },      // export estático não tem Image Optimization
  basePath: isProd ? `/${repo}` : undefined,
  assetPrefix: isProd ? `/${repo}/` : undefined,
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: isProd ? `/${repo}` : "" }
};

export default nextConfig;