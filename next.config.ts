import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Export statique : requis pour un déploiement GitHub Pages.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
