import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export static HTML using the experimental SSG export flow.
  // This replaces the old `next export` CLI and makes `next build`
  // produce an `out/` static site for hosting on static platforms.
  output: "export",
};

export default nextConfig;
