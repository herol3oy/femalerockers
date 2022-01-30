const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const withPreact = require("next-plugin-preact");

module.exports = withPreact(
  withPWA({
    pwa: {
      disable: process.env.NODE_ENV === "development",
      dest: "./public",
      buildExcludes: [/middleware-manifest.json$/],
      runtimeCaching,
    },
    images: {
      domains: ["cdn.sanity.io", "res.cloudinary.com"],
    },
    swcMinify: true,
  })
);
