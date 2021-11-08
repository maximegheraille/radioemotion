import React from "react";
import { server } from "../../config/nextjs";
import { Info } from "../../interfaces/info";
import Paginated from "../../components/shared/paginated/Paginated";
import Article from "../../components/shared/article/actualites/Article";
import Title from "../../components/shared/title/Title";
import { NextSeo } from "next-seo";
import { getConnection2 } from "../api/connection/connection";

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
              url: `https://covers.radioemotion.be/images/infos/${info.id}.jpg`,
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
interface paths {
  params: { id: string };
}
export const getStaticPaths = async () => {
  let paths: paths[] = [];
  const connection = getConnection2();

  connection.query(
    `select * from radioemotion_get_all_infos`,
    async (_err: any, rows: Info[], _fields: any) => {
      paths = rows.map((actu: Info) => {
        console.log(actu);
        return {
          params: { id: actu.id.toString() },
        };
      });
      console.log(paths);
      connection.end();
    }
  );
  return { paths, fallback: "blocking" };
};

export default InfoPage;
