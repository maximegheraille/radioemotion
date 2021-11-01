import { GetServerSideProps } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { server } from "../../config/nextjs";
import { siteUrl } from "../../next-sitemap.config";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await fetch(`${server}/api/agenda/all`);
  const capsules: any[] = await response.json();

  const fields: ISitemapField[] = capsules.map((agenda) => ({
    loc: `${siteUrl}/agenda/${agenda.id}`,
    id: new Date().toISOString(),
  }));

  return await getServerSideSitemap(ctx, fields);
};

export default function Site() {}
