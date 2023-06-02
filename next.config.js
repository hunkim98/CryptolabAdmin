const serverDestination = process.env.SERVER_URL + "/:path*";

const nextConfig = {
  crossOrigin: "anonymous",
  reactStrictMode: false,
  //   async rewrites() {
  //     console.log("serverDestination", serverDestination);
  //     return [
  //       {
  //         source: "/api/:path*",
  //         destination: "http://127.0.0.1:8000/:path*", // Proxy to Backend
  //       },
  //       // {
  //       //   source: "/image/upload",
  //       //   destination: "https://image.simpledimpleworld.com/upload", // Proxy to Backend
  //       // },
  //     ];
  //   },
  // trailingSlash: false,
};

module.exports = nextConfig;
