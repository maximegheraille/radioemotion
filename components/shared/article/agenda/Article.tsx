import React from "react";
import Image from "next/image";
import LoadingState from "../../LoadingState";
import { faClock, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextParser from "../../TextParser";
import { Agenda } from "../../../../interfaces/agenda";

interface ArticleProps {
  article: Agenda;
  isLoading?: boolean;
  isError?: boolean;
}

const Article = ({
  article,
  isError = false,
  isLoading = false,
}: ArticleProps) => {
  return (
    <div>
      <>
        <LoadingState
          width="w-full"
          heigth="h-[500px]"
          isLoading={isLoading}
          isError={isError}
          data={article?.photo}
        >
          <div className="card mb-6 flex">
            <Image
              src={article?.photo!}
              width={1100}
              height={500}
              className="rounded-lg"
              alt="Image de l'article"
            />
          </div>
        </LoadingState>
        <div className="flex justify-between text-lg w-full">
          <LoadingState
            width="w-1/12"
            heigth="h-4"
            classNames="mt-1"
            isLoading={isLoading}
            isError={isError}
            data={article?.commune}
          >
            <p className="text-[#ff5722] font-semibold mt-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-3" />
              {article?.commune}
            </p>
          </LoadingState>

          <LoadingState
            width="w-2/12"
            heigth="h-4"
            classNames="mt-1"
            isLoading={isLoading}
            isError={isError}
            data={article?.event_date}
          >
            <>
              <p className="text-gray-700 font-semibold mt-2">
                <FontAwesomeIcon icon={faClock} className="mr-3" />
                {article?.event_date &&
                  new Date(article?.event_date).toLocaleDateString("fr-be")}
              </p>
            </>
          </LoadingState>
        </div>
        <div className="">
          <LoadingState
            width="w-10/12"
            heigth="h-4"
            classNames="mt-10"
            isLoading={isLoading}
            isError={isError}
            data={article?.commune}
          >
            <h1 className="text-3xl py-8 font-bold">{article?.title}</h1>
          </LoadingState>
          <div className="text-lg">
            <LoadingState
              width="w-8/12"
              heigth="h-4"
              classNames="mt-1"
              isLoading={isLoading}
              isError={isError}
              data={article?.text}
            >
              <TextParser text={article?.text} />
            </LoadingState>
          </div>
        </div>
      </>
    </div>
  );
};

export default Article;
