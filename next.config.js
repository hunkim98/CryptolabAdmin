const serverDestination = process.env.SERVER_URL + "/:path*";

/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: "anonymous",
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: serverDestination, // Proxy to Backend
      },
      // {
      //   source: "/image/upload",
      //   destination: "https://image.simpledimpleworld.com/upload", // Proxy to Backend
      // },
    ];
  },
};

module.exports = nextConfig;
