import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: "bottom-right",
  },
  poweredByHeader: false,
};

export default nextConfig;
