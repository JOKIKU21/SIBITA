import type { NextConfig } from "next";
  
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // Diarahkan ke backend asli menggunakan server env variable
        destination: `${process.env.BACKEND_API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;