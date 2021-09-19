import React from "react";
import { useQuery } from "react-query";
import { Agenda } from "../../interfaces/agenda";
import Article from "../shared/article/agenda/Article";
import Paginated from "../shared/paginated/Paginated";
import Title from "../shared/title/Title";

const AgendaPage = () => {
  const { data, isLoading, isError } = useQuery<Agenda>(
    "agenda_main",
    async () => {
      const info = await fetch("/api/agenda/main");
      return info.json();
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  return (
    <div className="lg:flex text-black dark:text-white place-content-between">
      <div className="w-full lg:w-9/12">
        <div>
          <Title title="L'INFO DE VOTRE REGION" className="text-center" />
          <Article article={data!} isError={isError} isLoading={isLoading} />
        </div>
      </div>
      <div className="w-full lg:w-3/12 lg:px-2">
        {data && <Paginated type="agenda" exclude_id={data.id} />}
      </div>
    </div>
  );
};

export default AgendaPage;
