import React from "react";
import { server } from "../../config/nextjs";
import { Info } from "../../interfaces/info";
import Paginated from "../../components/shared/paginated/Paginated";
import Article from "../../components/shared/article/actualites/Article";
import Title from "../../components/shared/title/Title";

const InfoPage = ({ info }: any) => {
  return (
    <div className="lg:flex text-black dark:text-white place-content-between space-x-3">
      <div className="w-full lg:w-9/12">
        <Title title="L'INFO DE VOTRE REGION" className="text-center" />
        <Article article={info} />
      </div>
      <div className="w-full lg:w-3/12">
        <Paginated type="actualites" exclude_id={info.id} />
        {/*  <p>{JSON.stringify(info)}</p>*/}
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
  //const posts: any = [{ id: "270" }];
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
