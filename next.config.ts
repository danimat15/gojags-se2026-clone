import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gojags-classroom.bps.go.id",
      },
    ],
  },
};

export default nextConfig;
