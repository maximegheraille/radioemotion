import React from "react";
import { server } from "../../config/nextjs";
import Paginated from "../../components/shared/paginated/Paginated";
import Title from "../../components/shared/title/Title";
import Article from "../../components/shared/article/agenda/Article";
import { NextSeo } from "next-seo";
import { Agenda } from "../../interfaces/agenda";
import { getConnection2 } from "../api/connection/connection";
const AgendaSlug = ({ agenda }: any) => {
  if (Object.entries(agenda).length === 0 && agenda.constructor === Object) {
    return (
      <div className="flex h-[85vh] place-content-center text-center text-2xl items-center">
        <p className="dark:text-white">Page introuvable</p>
      </div>
    );
  }
  return (
    <div className="lg:flex text-black dark:text-white place-content-between">
      <NextSeo
        canonical="https://www.radioemotion.be/actualites"
        title={`${agenda.title}`}
        description={`${agenda.text}`}
        openGraph={{
          url: `https://www.radioemotion.be/actualites/${agenda.id}`,
          title: `${agenda.title}`,
          description: `${agenda.text}`,
          images: [
            {
              url: `https://covers.radioemotion.be/images/agenda/${agenda.id}.jpg`,
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
        <Title
          title="L’Agenda de votre région"
          className="text-center lg:pt-0"
          article={true}
        />
        <Article article={agenda} />
      </div>
      <div className="w-full lg:w-3/12 lg:px-2">
        <Paginated type="agenda" exclude_id={agenda.id} />
      </div>
    </div>
  );
};
export default AgendaSlug;

export const getStaticProps = async ({ params }: any) => {
  const res = await fetch(`${server}/api/agenda/individual`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      id: params.id,
    },
  });
  const agenda = await res.json();
  return {
    props: {
      agenda,
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
    `select * from radioemotion_get_all_agenda`,
    async (_err: any, rows: Agenda[], _fields: any) => {
      paths = rows.map((agenda: Agenda) => {
        console.log(agenda);
        return {
          params: { id: agenda.id.toString() },
        };
      });
      console.log(paths);
      connection.end();
    }
  );
  return { paths, fallback: "blocking" };
};
// const res = await fetch("https://jsonplaceholder.typicode.com/users");
//const data = await res.json();

// map data to an array of path objects with params (id)

// We'll pre-render only these paths at build time.
// { fallback: blocking } will server-render pages
// on-demand if the path doesn't exist.
