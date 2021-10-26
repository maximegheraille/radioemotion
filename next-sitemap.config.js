const siteUrl = "https://www.radioemotion.be";

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
};
