import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   /* config options here */
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "xn--80agomhibes5b3a.xn--p1ai",
            pathname: "/**",
         },
      ],
   },
};

export default nextConfig;
