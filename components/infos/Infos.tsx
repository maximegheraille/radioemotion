import React from "react";
import Paginated from "../shared/paginated/Paginated";
import { useQuery } from "react-query";
import { Info } from "../../interfaces/info";
import Title from "../shared/title/Title";
import Article from "../shared/article/actualites/Article";

const InfosPage = () => {
  const { data, isLoading, isError } = useQuery<Info>(
    "actualites_main",
    async () => {
      const info = await fetch("/api/actualites/main");
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
        {data && <Paginated type="actualites" exclude_id={data?.id} />}
      </div>
    </div>
  );
};

export default InfosPage;
