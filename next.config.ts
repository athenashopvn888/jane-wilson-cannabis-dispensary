import type { NextConfig } from "next";
import { cigaretteRedirects } from "./app/lib/cigaretteRedirects";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev",
        pathname: "/products/**"
      }
    ]
  },
  async redirects() {
    return [
      { source: "/exotic", destination: "/exotic-weed", permanent: true },
      { source: "/premium", destination: "/premium-weed", permanent: true },
      { source: "/aaa", destination: "/aaa-weed", permanent: true },
      { source: "/aa", destination: "/aa-weed", permanent: true },
      { source: "/budget", destination: "/budget-weed", permanent: true },
      ...cigaretteRedirects()
    ];
  }
};

export default nextConfig;
