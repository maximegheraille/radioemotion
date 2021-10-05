import { GetServerSideProps } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { server } from "../../config/nextjs";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await fetch(`${server}/api/actualites/all`);
  const capsules: any[] = await response.json();
  const fields: ISitemapField[] = capsules.map((info) => ({
    loc: `${server}/actualites/${info.id}`,
    id: new Date().toISOString(),
  }));

  return await getServerSideSitemap(ctx, fields);
};

export default function Site() {}
