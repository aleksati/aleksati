/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // user lands on posts
  async redirects() {
    return [
      {
        source: "/",
        destination: "/posts/1",
        permanent: true,
      },
      {
        source: "/posts",
        destination: "/posts/1",
        permanent: true,
      },
    ];
  },
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
