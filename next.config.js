const withPWA = require("next-pwa");
module.exports = withPWA({
  pwa: {
    dest: "public",
    scope: "/",
    register: true,
    buildExcludes: [/middleware-manifest\.json$/],
  },
  images: {
    domains: ["covers.radioemotion.be"],
  },
});
