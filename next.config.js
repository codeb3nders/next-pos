/** @type {import("next").NextConfig} */
module.exports = {
  env: {
    SECRET_KEY: process.env.SECRET_KEY || "secret",
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
};
