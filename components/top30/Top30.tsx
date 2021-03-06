import React from "react";
import { Song } from "../../interfaces/song";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faEquals,
} from "@fortawesome/free-solid-svg-icons";
import LoadingState from "../shared/LoadingState";
import { useQuery } from "react-query";

const Top30 = () => {
  const { data, isLoading, isError } = useQuery(
    "top30",
    async () => {
      const info = await fetch("/api/top30");
      return info.json();
    },
    {
      refetchOnWindowFocus: false,
      retry: 500,
      retryDelay: 10,
    }
  );
  return (
    <div>
      {isLoading || isError ? (
        <div className="flex flex-wrap justify-center">
          {[...Array(30)].map((song: Song, index: number) => (
            <div className={`card mb-5 flex w-full`} key={index}>
              <div className="flex justify-center items-center p-4  lg:p-16">
                <p className="">N°{index}</p>
              </div>
              <div className="max-w-[8.5rem] min-w-[8.5rem] lg:max-w-[10rem] lg:min-w-[10rem] flex place-content-center">
                <LoadingState
                  width="w-full"
                  heigth="h-full"
                  data={data}
                  isLoading={isLoading}
                  isError={isError}
                  classNames="mb-2"
                >
                  <></>
                </LoadingState>
              </div>
              <div className="w-full flex">
                <div className="flex justify-center flex-col space-y-7 items-center  p-2 w-4/6 lg:w-1/4">
                  <LoadingState
                    width="w-20 lg:w-32"
                    heigth="h-4"
                    data={song?.titre}
                    isLoading={isLoading}
                    isError={isError}
                  >
                    <p className="line-clamp-2">{song?.titre}</p>
                  </LoadingState>
                  <LoadingState
                    width="w-20 lg:w-32"
                    heigth="h-4"
                    data={data}
                    isLoading={isLoading}
                    isError={isError}
                  >
                    <p className="line-clamp-2">{song?.artiste}</p>
                  </LoadingState>
                </div>
                <div className="hidden lg:block w-full">
                  <div className="h-1/6">
                    <div className="hidden lg:flex pl-[35%] place-content-around rounded-r-lg text-white">
                      <div className="flex justify-center items-center bg-[#D43E3B] rounded-bl-lg w-full">
                        <p>NOMBRE DE SEMAINES</p>
                      </div>
                      <div className="flex justify-center items-center bg-[#D43E3B] w-full rounded-tr-lg">
                        <p>MEILLEURE POSITION</p>
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:flex h-5/6 flex-wrap w-full place-content-around">
                    <div className="flex justify-center items-center">
                      <LoadingState
                        width="w-16"
                        heigth="h-4"
                        data={undefined}
                        isLoading={isLoading}
                        isError={isError}
                      >
                        <p className="line-clamp-2">
                          {song?.evolution_position}
                        </p>
                      </LoadingState>
                    </div>
                    <div className="hidden lg:flex justify-center items-center">
                      <LoadingState
                        width="w-8"
                        heigth="h-4"
                        data={song?.weeks}
                        isLoading={isLoading}
                        isError={isError}
                      >
                        <p>{song?.weeks}</p>
                      </LoadingState>
                    </div>
                    <div className="hidden lg:flex justify-center items-center">
                      <LoadingState
                        width="w-8"
                        heigth="h-4"
                        data={song?.best_position}
                        isLoading={isLoading}
                        isError={isError}
                      >
                        <p>{song?.best_position}</p>
                      </LoadingState>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-wrap flex justify-center">
          {data?.map((song: Song, index: number) => (
            <div className={`card mb-5 flex w-full`} key={index}>
              <div className="flex justify-center items-center p-4 lg:p-16">
                <p className="">N°{song.position}</p>
              </div>
              <div className="w-28 min-w-[7rem] lg:max-w-[10rem] lg:min-w-[10rem] flex place-content-center">
                <Image
                  width={160}
                  height={160}
                  className={`rounded-lg`}
                  src={song?.photo.toString()!}
                  alt="pochette de l'album"
                />
              </div>
              <div className="w-full flex">
                <div className="flex text-center justify-center p-1 space-y-4 lg:space-y-7 items-center flex-col w-5/6 lg:w-1/4">
                  <p className="line-clamp-2 font-bold">{song?.titre}</p>
                  <p className="line-clamp-2">{song?.artiste}</p>
                </div>
                <div className="w-1/6 lg:w-full">
                  <div className="h-1/6 hidden lg:flex">
                    <div className="flex lg:pl-[35%] lg:w-full place-content-around rounded-r-lg text-white">
                      <div className="flex justify-center items-center bg-[#D43E3B] rounded-bl-lg w-full">
                        <p>NOMBRE DE SEMAINES</p>
                      </div>
                      <div className="flex justify-center items-center bg-[#D43E3B] w-full rounded-tr-lg">
                        <p>MEILLEURE POSITION</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-full lg:h-5/6 flex flex-wrap w-full lg:w-full place-content-around">
                    <div className="flex flex-col lg:flex-row text-center justify-center items-center">
                      {song.evolution_position !== undefined && (
                        <>
                          {song.old_position === 0 ? (
                            <></>
                          ) : (
                            <>
                              {song.evolution_position < 0 ? (
                                <FontAwesomeIcon
                                  icon={faArrowDown}
                                  className="text-[#D43E3B] lg:mr-2"
                                />
                              ) : (
                                <>
                                  {song.evolution_position === 0 ? (
                                    <FontAwesomeIcon
                                      icon={faEquals}
                                      className="text-black dark:text-white"
                                    />
                                  ) : (
                                    <>
                                      <FontAwesomeIcon
                                        icon={faArrowUp}
                                        className="text-green-600 lg:mr-2"
                                      />
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                          <p
                            className={`${
                              song.old_position === 0
                                ? "text-black dark:text-white"
                                : song.evolution_position < 0
                                ? "text-[#D43E3B]"
                                : song.evolution_position === 0
                                ? "text-black"
                                : "text-green-600 "
                            } font-bold`}
                          >
                            {song.old_position === 0 ? (
                              "ENTREE"
                            ) : (
                              <>
                                {Math.abs(song.evolution_position) !== 0 &&
                                  Math.abs(song.evolution_position)}
                              </>
                            )}
                          </p>
                        </>
                      )}
                    </div>
                    <div className="hidden lg:flex justify-center items-center">
                      <p>{song.weeks}</p>
                    </div>
                    <div className="hidden lg:flex justify-center items-center">
                      <p>{song.best_position}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Top30;
