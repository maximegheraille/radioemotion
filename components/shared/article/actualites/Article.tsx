import React from "react";
import Image from "next/image";
import { Info } from "../../../../interfaces/info";
import LoadingState from "../../LoadingState";
import { faClock, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextParser from "../../TextParser";

interface ArticleProps {
  article: Info;
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
            <p>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="mr-3 text-[#D53E3A]"
              />
              {article?.commune}
            </p>
          </LoadingState>

          <LoadingState
            width="w-2/12"
            heigth="h-4"
            classNames="mt-1"
            isLoading={isLoading}
            isError={isError}
            data={article?.start_date}
          >
            <>
              <p>
                <FontAwesomeIcon
                  icon={faClock}
                  className="mr-3 text-[#D53E3A]"
                />
                {article?.start_date &&
                  new Date(article?.start_date).toLocaleDateString("fr-be")}
                <span>&nbsp;</span>
                {article?.start_date &&
                  new Date(article?.start_date).toLocaleTimeString("fr-be", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
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
              data={article?.full_text}
            >
              <TextParser text={article?.full_text!} />
            </LoadingState>
          </div>
        </div>
      </>
    </div>
  );
};

export default Article;
