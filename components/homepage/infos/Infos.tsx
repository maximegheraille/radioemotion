import React from "react";
import { useQuery } from "react-query";
import { Info } from "../../../interfaces/info";
import Image from "next/image";
import LoadingState from "../../shared/LoadingState";
import Link from "next/link";

const Infos = () => {
  const {
    data: infos,
    isLoading,
    isError,
  } = useQuery(
    "infos",
    async () => {
      const info = await fetch("/api/index/infos");
      return info.json();
    },
    { refetchOnWindowFocus: false }
  );
  return (
    <div className="lg:flex lg:flex-wrap lg:pb-16">
      {isError || isLoading ? (
        <>
          {[...Array(7)].map((info: Info, index: number) => (
            <React.Fragment key={index}>
              {index === 0 ? (
                <>
                  <div
                    key={index}
                    className="hidden shadow-lg mb-6 mr-14 w-full lg:flex text-center card"
                  >
                    <LoadingState
                      width="w-[430px]"
                      heigth="h-[200px]"
                      data={infos}
                      isLoading={isLoading}
                      isError={isError}
                    >
                      <Image
                        width="430"
                        height="200"
                        src={info?.photo}
                        className="rounded-lg"
                      />
                    </LoadingState>
                    <div className="lg:w-6/12 h-full p-3 place-content-center align-middle justify-center items-center">
                      <LoadingState
                        width="w-full"
                        heigth="h-4"
                        data={infos}
                        isLoading={isLoading}
                        isError={isError}
                      >
                        <p className="text-xl place-content-center items-center flex  font-semibold line-clamp-2">
                          {info?.title}
                        </p>
                      </LoadingState>
                      <LoadingState
                        width="w-10/12"
                        heigth="h-4"
                        data={infos}
                        isLoading={isLoading}
                        isError={isError}
                        classNames="mt-9"
                      >
                        <p className="hidden lg:flex text-base pt-4 place-content-center items-center line-clamp-2">
                          {info?.preview}
                        </p>
                      </LoadingState>
                    </div>
                  </div>
                  <div
                    key={index}
                    className="shadow-lg mb-6 lg:w-72 lg:hidden text-center card"
                  >
                    <LoadingState
                      width="w-full"
                      heigth="h-36"
                      data={infos}
                      isLoading={isLoading}
                      isError={isError}
                      classNames="mb-2"
                    >
                      <Image
                        width="435"
                        height="190"
                        src={info?.photo}
                        className="rounded-lg"
                      />
                    </LoadingState>

                    <div className="p-2">
                      <LoadingState
                        width="w-full"
                        heigth="h-4"
                        data={infos}
                        isLoading={isLoading}
                        isError={isError}
                      >
                        <p className="text-lg font-semibold line-clamp-2 text-center w-full">
                          {info?.title}
                        </p>
                      </LoadingState>
                    </div>
                  </div>
                </>
              ) : (
                <div
                  key={index}
                  className="shadow-lg mb-6 lg:w-72 lg:mr-7 text-center card"
                >
                  <LoadingState
                    width="w-full"
                    heigth="h-36"
                    data={infos}
                    isLoading={isLoading}
                    isError={isError}
                    classNames="mb-2"
                  >
                    <Image
                      width="435"
                      height="190"
                      src={info?.photo}
                      className="rounded-lg"
                    />
                  </LoadingState>

                  <div className="p-2">
                    <LoadingState
                      width="w-full"
                      heigth="h-4"
                      data={infos}
                      isLoading={isLoading}
                      isError={isError}
                    >
                      <p className="text-lg font-semibold line-clamp-2 text-center w-full">
                        {info?.title}
                      </p>
                    </LoadingState>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </>
      ) : (
        <>
          {infos.map((info: Info, index: number) => (
            <>
              {index === 0 ? (
                <Link key={index} href={`/actualites/${info.id}`}>
                  <a className="flex w-full lg:w-[90%] xl:w-[90%] 2xl:w-[92%]">
                    <div className="shadow-lg w-full mb-6 lg:flex text-center card">
                      <div className="w-full">
                        <Image
                          width="1100"
                          height="500"
                          layout="responsive"
                          src={info?.photo}
                          alt="Image de l'article"
                          className="rounded-b-none lg:rounded-lg"
                        />
                      </div>
                      <div className="w-full p-3 lg:p-2 xl:p-3 place-content-center align-middle justify-center items-center">
                        <p className="text-xl place-content-center items-center font-semibold line-clamp-2">
                          {info?.title}
                        </p>
                        <p className="hidden text-base pt-4 lg:pt-1 xl:pt-4 place-content-center items-center lg:line-clamp-2 xl:line-clamp-3">
                          {info?.preview}
                        </p>
                      </div>
                    </div>
                  </a>
                </Link>
              ) : (
                <Link key={index} href={`/actualites/${info.id}`}>
                  <a>
                    <div className="shadow-lg mb-6 lg:mr-7 lg:w-[16.5rem] xl:w-[13.8rem] xl:mr-[30px] 2xl:w-[17.5rem] 2xl:mr-[1.60rem] text-center card">
                      <div className="w-full">
                        <Image
                          width="315"
                          height="148"
                          src={info?.photo}
                          layout="responsive"
                          alt="Image de l'article"
                          className="rounded-t-lg"
                        />
                      </div>
                      <div className="p-2 h-16 flex items-center">
                        <p className="text-lg font-semibold line-clamp-2 text-center w-full">
                          {info?.title}
                        </p>
                      </div>
                    </div>
                  </a>
                </Link>
              )}
            </>
          ))}
        </>
      )}
    </div>
  );
};

export default Infos;
