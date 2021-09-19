import React, { useState } from "react";
import { useQuery } from "react-query";
import { Info, InfoPaginated } from "../../../interfaces/info";
import Image from "next/image";
import Title from "../title/Title";
import Link from "next/link";
import LoadingState from "../LoadingState";
interface PaginatedProps {
  type: "agenda" | "actualites";
  exclude_id: number;
}
const Paginated = ({ type, exclude_id }: PaginatedProps) => {
  const [page, setPage] = useState<number>(1);
  const {
    data: info,
    isError,
    isLoading,
    isPreviousData,
  } = useQuery<{
    data: InfoPaginated[];
    options: { hasMore: boolean | number; max_page: number };
  }>(
    [`paginated_${type}`, page],
    async () => {
      const info = await fetch(`/api/${type}/paginated`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          exclude_id: exclude_id.toString(),
          start: page.toString(),
        },
        //  body: JSON.stringify({ start: page, count: page }),
      });
      return info.json();
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
  return (
    <div>
      <Title
        title={`${
          type === "actualites" ? "LES AUTRES TITRES" : "LES AUTRES EVENEMENTS"
        }`}
        className="text-center"
      />
      <div className="">
        {isError || isLoading ? (
          <div className="px-6 pb-0">
            {[...Array(4)].map((info: Info, index: number) => (
              <div key={index} className="shadow-lg mb-6 text-center card">
                <LoadingState
                  width="w-full"
                  heigth="h-[100px]"
                  isLoading={isLoading}
                  isError={isError}
                  data={info?.photo}
                >
                  <Image
                    width="250"
                    height="100"
                    src={info?.photo}
                    layout="responsive"
                    className="rounded-lg-t-lg"
                  />
                </LoadingState>
                <div className="p-2 h-16 flex flex-col space-y-2 items-center justify-center ">
                  <LoadingState
                    width="w-full"
                    heigth="h-4"
                    classNames="mt-1"
                    isLoading={isLoading}
                    isError={isError}
                    data={info?.title}
                  >
                    <p className="text-lg font-semibold line-clamp-2 text-center w-full">
                      {info?.title}
                    </p>
                  </LoadingState>
                  <LoadingState
                    width="w-full"
                    heigth="h-4"
                    classNames=""
                    isLoading={isLoading}
                    isError={isError}
                    data={info?.title}
                  >
                    <p className="text-lg font-semibold line-clamp-2 text-center w-full">
                      {info?.title}
                    </p>
                  </LoadingState>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="px-6 pb-0">
              {info?.data.map((info: Info, index: number) => (
                <Link key={index} href={`/${type}/${info.id}`}>
                  <a>
                    <div className="shadow-lg mb-6 text-center card">
                      <Image
                        width="250"
                        height="100"
                        src={info.photo}
                        layout="responsive"
                        className="rounded-t-lg"
                      />
                      <div className="p-2 h-16 flex items-center justify-center">
                        <p className="text-lg font-semibold line-clamp-2 text-center w-full">
                          {info.title}
                        </p>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
            <div className="flex justify-center items-center space-x-1">
              <button
                className="flex card bg-white items-center px-3 lg:px-4 py-1 lg:py-2 rounded-lg-md text-black hover:text-white hover:bg-[#181144]"
                onClick={() => setPage((old) => Math.max(old - 1, 0))}
                disabled={page === 1}
              >
                Précèdent
              </button>
              <button
                className={`${
                  page - 1 > 1 && info && info?.options.max_page && page > 1
                    ? ""
                    : "hidden"
                } card px-3 lg:px-4 py-1 lg:py-2 bg-white dark:text-white rounded-lg-md dark:hover:text-white hover:bg-[#181144]`}
                onClick={() => {
                  setPage(1);
                }}
              >
                1
              </button>
              <div
                className={`${page - 2 > 1 ? "" : "hidden"} ${page} ${
                  page - 2
                } ${
                  page - 2 > 1
                } card bg-white px-3 lg:px-4 py-1 lg:py-2 dark:text-white  rounded-lg-md hover:text-white hover:bg-[#181144]`}
              >
                ...
              </div>
              <button
                className={`${
                  info && info?.options.max_page >= page - 1 && page - 1 > 0
                    ? ""
                    : "hidden"
                } px-3 lg:px-4 py-1 lg:py-2 card bg-white rounded-lg-md hover:text-white dark:text-white dark:hover:text-white hover:bg-[#181144] `}
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                {page - 1}
              </button>

              <button
                className={`card text-white z-10 px-3 lg:px-4 py-1 lg:py-2 bg-[#2D2180] dark:bg-[#2D2180] rounded-lg-md hover:text-white hover:bg-[#181144] `}
              >
                {page}
              </button>
              <button
                className={`${
                  info && info?.options.max_page >= page + 1 ? null : "hidden"
                } card bg-white px-3 lg:px-4 py-1 lg:py-2 text-gray-700  rounded-lg-md hover:text-white hover:bg-[#181144] `}
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                {page + 1}
              </button>
              <button
                className={`${
                  info && info?.options.max_page >= page + 2 ? null : "hidden"
                } card bg-white px-3 lg:px-4 py-1 lg:py-2 text-gray-700  rounded-lg-md hover:text-white hover:bg-[#181144] `}
                onClick={() => {
                  setPage(page + 2);
                }}
              >
                {page + 2}
              </button>
              <div
                className={`${
                  info && info?.options.max_page > page + 2 ? "" : "hidden"
                } card bg-white px-3 lg:px-4 py-1 lg:py-2 text-gray-700  rounded-lg-md hover:text-white hover:bg-[#181144]`}
              >
                ...
              </div>
              <button
                className={`${
                  info && info?.options.max_page > page + 2 ? null : "hidden"
                } card bg-white px-3 lg:px-4 py-1 lg:py-2 text-gray-700  rounded-lg-md hover:text-white hover:bg-[#181144]`}
                onClick={() => {
                  if (info) {
                    setPage(info?.options.max_page);
                  }
                }}
              >
                {info && info?.options.max_page}
              </button>
              <button
                className="card bg-white px-3 lg:px-4 py-1 lg:py-2 text-black rounded-lg-md hover:text-white hover:bg-[#181144]"
                onClick={() => {
                  if (info && page + 1 <= info?.options.max_page) {
                    setPage(page + 1);
                  }
                }}
                disabled={isPreviousData || !info?.options.hasMore}
              >
                suivant
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Paginated;
