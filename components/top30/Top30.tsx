import React from "react";
import { useQuery } from "react-query";
import { Song } from "../../interfaces/song";
import Card, { outderdivCard } from "../shared/card/Card";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import LoadingState from "../shared/LoadingState";

const Top30 = () => {
  const {
    data: top30,
    isLoading,
    isError,
  } = useQuery(
    "nouveautes",
    async () => {
      const info = await fetch("/api/top30");
      return info.json();
    },
    {
      refetchInterval: 30000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <div>
      {isLoading || isError ? (
        <div className="flex flex-wrap justify-center">
          {[...Array(30)].map((song: Song, index: number) => (
            <div className={`card mb-5 flex w-full`} key={index}>
              <div className="flex justify-center items-center p-16">
                <p className="">N°{index}</p>
              </div>
              <div className="max-w-[8.5rem] min-w-[8.5rem] lg:max-w-[10rem] lg:min-w-[10rem] flex place-content-center">
                <LoadingState
                  width="w-full"
                  heigth="h-full"
                  data={top30}
                  isLoading={isLoading}
                  isError={isError}
                  classNames="mb-2"
                >
                  <></>
                </LoadingState>
              </div>
              <div className="w-full flex">
                <div className="flex justify-center flex-col w-1/4 space-y-7 items-center">
                  <LoadingState
                    width="w-32"
                    heigth="h-4"
                    data={song?.titre}
                    isLoading={isLoading}
                    isError={isError}
                  >
                    <p className="line-clamp-2">{song?.titre}</p>
                  </LoadingState>
                  <LoadingState
                    width="w-32"
                    heigth="h-4"
                    data={top30}
                    isLoading={isLoading}
                    isError={isError}
                  >
                    <p className="line-clamp-2">{song?.artiste}</p>
                  </LoadingState>
                </div>
                <div className="w-full">
                  <div className="h-1/6">
                    <div className="flex pl-[35%] place-content-around rounded-r-lg text-white">
                      {/* <div className="flex justify-center items-center /*bg-[#2D2180] bg-red-500  w-full rounded-l-lg">
                    <p>EVOLUTION</p>
                  </div> */}
                      <div className="flex justify-center items-center bg-[#D43E3B] rounded-bl-lg w-full">
                        <p>NOMBRE DE SEMAINES</p>
                      </div>
                      <div className="flex justify-center items-center bg-[#D43E3B] w-full rounded-tr-lg">
                        <p>MEILLEURE POSITION</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-5/6 flex flex-wrap w-full place-content-around">
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
                    <div className="flex justify-center items-center">
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
                    <div className="flex justify-center items-center">
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
          {top30?.map((song: Song, index: number) => (
            <div className={`card mb-5 flex w-full`} key={index}>
              <div className="flex justify-center items-center p-16">
                <p className="">N°{song.position}</p>
              </div>
              <div className="max-w-[8.5rem] min-w-[8.5rem] lg:max-w-[10rem] lg:min-w-[10rem] flex place-content-center">
                <Image
                  width={160}
                  height={160}
                  className={`rounded-lg`}
                  src={song?.photo!}
                  alt="pochette de l'album"
                />
              </div>
              <div className="w-full flex">
                <div className="flex justify-center flex-col w-1/4 space-y-7 items-center">
                  <p className="line-clamp-2">{song?.titre}</p>
                  <p className="line-clamp-2">{song?.artiste}</p>
                </div>
                <div className="w-full">
                  <div className="h-1/6">
                    <div className="flex pl-[35%] place-content-around rounded-r-lg text-white">
                      {/* <div className="flex justify-center items-center /*bg-[#2D2180] bg-red-500  w-full rounded-l-lg">
                      <p>EVOLUTION</p>
                    </div> */}
                      <div className="flex justify-center items-center bg-[#D43E3B] rounded-bl-lg w-full">
                        <p>NOMBRE DE SEMAINES</p>
                      </div>
                      <div className="flex justify-center items-center bg-[#D43E3B] w-full rounded-tr-lg">
                        <p>MEILLEURE POSITION</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-5/6 flex flex-wrap w-full place-content-around">
                    <div className="flex justify-center items-center">
                      {song.evolution_position !== undefined && (
                        <p>
                          {song.evolution_position < 0 ? (
                            <FontAwesomeIcon
                              icon={faArrowDown}
                              className="text-[#D43E3B] mr-2"
                            />
                          ) : (
                            <>
                              {song.evolution_position === 0 ? (
                                <FontAwesomeIcon
                                  icon={faMinus}
                                  className="text-black mr-2"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faArrowUp}
                                  className="text-green-600 mr-2"
                                />
                              )}
                            </>
                          )}
                          {Math.abs(song.evolution_position)}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-center items-center">
                      <p>{song.weeks}</p>
                    </div>
                    <div className="flex justify-center items-center">
                      <p>{song.best_position}</p>
                    </div>
                  </div>
                </div>
                {/* <div className="flex justify-center flex-col w-1/4">
                  <p className="line-clamp-2">{song?.titre}</p>
                  <p className="line-clamp-2">{song?.artiste}</p>
                </div>
                <div className="flex justify-center items-center">
                  <p>
                    {song.evolution_position !== undefined &&
                    Math.abs(song.evolution_position) === 0
                      ? "-"
                      : song.evolution_position !== undefined &&
                        Math.abs(song.evolution_position)}
                  </p>
                </div>
                <div className="flex justify-center flex-col">
                  <p>{song.weeks}</p>
                </div>
                <div className="flex justify-center flex-col">
                  <p>{song.best_position}</p>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Top30;