/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false, // false because stict mode now render every onMount useEffect twice for some reason.. This messes up my AudioPlayer
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sdo.gsfc.nasa.gov",
      }
    ]
    // domains: ["aleksati.net", "www.aleksati.net", "m.aleksati.net", "sdo.gsfc.nasa.gov"],
  },
  turbopack: {},

  // user lands on posts
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/about",
  //       permanent: true,
  //     },
  //   ];
  // },

  // I do this to use "fs" in getStaticProps
  webpack(config, { nextRuntime }) {
    // as of Next.js latest versions, the nextRuntime is preferred over `isServer`, because of edge-runtime
    if (typeof nextRuntime === "undefined") {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    return config;
  },
};

module.exports = nextConfig;
