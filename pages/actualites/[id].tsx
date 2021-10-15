import React from "react";
import { server } from "../../config/nextjs";
import { Info } from "../../interfaces/info";
import Paginated from "../../components/shared/paginated/Paginated";
import Article from "../../components/shared/article/actualites/Article";
import Title from "../../components/shared/title/Title";
import { NextSeo } from "next-seo";

const InfoPage = ({ info }: any) => {
  if (Object.entries(info).length === 0 && info.constructor === Object) {
    return (
      <div className="flex h-[85vh] place-content-center text-center text-2xl items-center">
        <p className="dark:text-white">Page introuvable</p>
      </div>
    );
  }
  return (
    <div className="lg:flex text-black dark:text-white place-content-between">
      <NextSeo
        canonical={`https://www.radioemotion.be/actualites/${info.id}`}
        title={`${info.title}`}
        description={`${info.preview}`}
        openGraph={{
          url: `https://www.radioemotion.be/actualites/${info.id}`,
          title: `${info.title}`,
          description: `${info.preview}`,
          images: [
            {
              url: `https://www.radioemotion.be/images/infos/${info.id}.jpg`,
              alt: "Image de l'actualités",
              type: "image/jpg",
            },
          ],
          site_name: "Radio Emotion",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <div className="w-full lg:w-9/12">
        <Title title="L'INFO DE VOTRE REGION" className="text-center" article />
        <Article article={info} />
      </div>
      <div className="w-full lg:w-3/12  lg:px-2">
        <Paginated type="actualites" exclude_id={info.id} />
      </div>
    </div>
  );
};

export const getStaticProps = async ({ params }: any) => {
  const res = await fetch(`${server}/api/actualites/individual`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      id: params.id,
    },
  });
  const info = await res.json();
  return {
    props: {
      info,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
};
export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/actualites/all`);
  const posts = await res.json();
  // Get the paths we want to pre-render based on posts
  const paths = posts.map((info: Info) => ({
    params: { id: info.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
};

export default InfoPage;
