import React from "react";
import { server } from "../../config/nextjs";
import Paginated from "../../components/shared/paginated/Paginated";
import Title from "../../components/shared/title/Title";
import { Agenda } from "../../interfaces/agenda";
import Article from "../../components/shared/article/agenda/Article";

// interface InfoProps {
//   agenda: Agenda;
// }

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
      <div className="w-full lg:w-9/12">
        <Title title="L'INFO DE VOTRE REGION" className="text-center" />
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
export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/agenda/all`);
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((agenda: Agenda) => ({
    params: { id: agenda.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
};
