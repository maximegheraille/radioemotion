const siteUrl = "http://192.168.1.133:3012";

module.exports = {
  siteUrl: siteUrl,
  robotsTxtOptions: {
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/server-actualites-sitemap.xml`,
      `${siteUrl}/server-agenda-sitemap.xml`,
    ],
  },
  generateRobotsTxt: true,
  // ...other options
};
