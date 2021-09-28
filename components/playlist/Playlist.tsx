import React, { useState } from "react";
import "flatpickr/dist/themes/light.css";
import Flatpickr from "react-flatpickr";
import { French } from "flatpickr/dist/l10n/fr.js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Song } from "../../interfaces/song";
import { Disclosure, Transition } from "@headlessui/react";
import LoadingState from "../shared/LoadingState";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeart2 } from "@fortawesome/free-regular-svg-icons";
import { votesFormatter } from "../shared/votes/Votesformatter";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import YoutubePlayer from "../shared/card/YoutubePlayer";
import Apple_music from "../../public/images/links/Apple_music2.svg";
import vote from "../shared/card/CardVote";

const Playlist = () => {
  const [date, setDate] = useState<Date>(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      new Date().getHours(),
      0,
      0
    )
  );
  const [showYou, setShowYou] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const {
    data: song,
    isLoading,
    isError,
  } = useQuery(
    [`playlist`, date],
    async () => {
      let params = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
      };
      const info = await fetch(`/api/playlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(params),
      });
      return info.json();
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  const CardVote = useMutation(vote, {
    onSettled: (_data: any, _error: any, _variables: any, _context?: any) => {
      queryClient.invalidateQueries(`playlist`);
    },
  });
  return (
    <div className="">
      {showYou && <YoutubePlayer url={song?.youtube} />}
      <div className="w-full text-center rounded-lg">
        <p className="text-black dark:text-white mb-1">
          Selectionez le jour et l'heure
        </p>
        <Flatpickr
          data-enable-time
          value={date}
          options={{
            maxDate: new Date(),
            time_24hr: true,
            locale: French,
            hourIncrement: 1,
            defaultMinute: 0,
          }}
          onClose={(dates) => {
            setDate(new Date(dates[0]));
            queryClient.invalidateQueries(`playlist`);
          }}
          className="rounded-lg text-center mb-8 border-2 border-[rgb(164, 167, 181)] dark:border-white"
        />
      </div>
      {isLoading || isError ? (
        <div className="w-full">
          {[...Array(21)].map((song: Song, index: number) => (
            <div className={`w-full lg:w-8/12 p-2 mx-auto`} key={index}>
              <div
                className={`flex transition-all rounded-lg
                       text-white items-center justify-between w-full px-4 py-2 text-sm font-medium text-left bg-gradient-to-r from-[#303f9f] to-[#45cafc] hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}
              >
                <LoadingState
                  width="w-32"
                  heigth="h-4"
                  classNames="m-1"
                  isLoading={isLoading}
                  isError={isError}
                  data={song?.min}
                >
                  <>
                    <div className="text-xl font-semibold">
                      {song?.heure}:{song?.min}
                    </div>
                    <FontAwesomeIcon
                      icon={faArrowDown}
                      className={`text-white h-full transition-all`}
                    />
                  </>
                </LoadingState>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {song?.map((song: Song, index: number) => (
            <div className="w-full lg:w-8/12 p-2 mx-auto" key={index}>
              <Disclosure defaultOpen={true}>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={`flex transition-all ${
                        open ? "rounded-t-lg" : "rounded-lg"
                      } text-white items-center justify-between w-full py-1 px-4 lg:py-1 text-sm font-medium text-left bg-gradient-to-r from-[#303f9f] to-[#45cafc] hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}
                    >
                      <LoadingState
                        width="w-32"
                        heigth="h-4"
                        classNames="m-1"
                        isLoading={isLoading}
                        isError={isError}
                        data={song?.min}
                      >
                        <>
                          <div className="text-lg lg:text-xl font-semibold pl-5">
                            {song?.heure}:{song?.min}
                          </div>
                          <FontAwesomeIcon
                            icon={faArrowDown}
                            className={`${
                              open ? "transform rotate-180 " : ""
                            } text-white h-full transition-all`}
                          />
                        </>
                      </LoadingState>
                    </Disclosure.Button>
                    <Transition
                      show={open}
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="transform transition-all flex rounded-b-lg text-gray-500 card rounded-t-none">
                        <div className="w-28 min-w-[7rem] lg:max-w-[10rem] lg:min-w-[10rem] flex place-content-center">
                          <Image
                            width={160}
                            height={160}
                            className={`rounded-bl-lg`}
                            src={song?.photo.toString()!}
                            alt="pochette de l'album"
                          />
                        </div>
                        <div className="w-full flex-col lg:flex-row flex">
                          <div className="h-3/4 text-black dark:text-white flex pl-4 lg:pl-10 text-left text-base lg:text-lg justify-center p-1 space-y-1 lg:space-y-5 flex-col w-full lg:w-6/12">
                            <p className="line-clamp-1 lg:line-clamp-2 font-bold ">
                              {song?.titre}
                            </p>
                            <p className="line-clamp-1 lg:line-clamp-2 text-base">
                              {song?.artiste}
                            </p>
                          </div>
                          <div className="my-1 px-2 lg:w-6/12">
                            <div className="h-full flex flex-wrap w-full lg:w-full place-content-around">
                              <LoadingState
                                width="w-7"
                                heigth="h-7"
                                classNames="mx-4"
                                isLoading={isLoading}
                                isError={isError}
                                data={song?.apple_music}
                              >
                                <a
                                  className={`lg:m-1 flex`}
                                  href={`${song?.apple_music}`}
                                  target="_blank"
                                >
                                  <div className="w-6 align-middle flex">
                                    <Image
                                      src={Apple_music}
                                      className={`p-1 transform motion-safe:group-focus:scale-110 w-5 lg:w-5 text-white`}
                                    />
                                  </div>
                                </a>
                              </LoadingState>
                              <LoadingState
                                width="w-7"
                                heigth="h-7"
                                classNames=""
                                isLoading={isLoading}
                                isError={isLoading}
                                data={song?.youtube}
                              >
                                <button
                                  className={`${
                                    song?.youtube === "" ? "hidden" : "block"
                                  } group flex items-center text-[#f44336]`}
                                  onClick={() => setShowYou(!showYou)}
                                >
                                  <FontAwesomeIcon
                                    icon={faYoutube}
                                    size="2x"
                                    className={`transform motion-safe:group-focus:scale-110 px-0.5 text-opacity-70
              h-10 w-10 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                                    aria-hidden="true"
                                  />
                                </button>
                              </LoadingState>
                              <div className="flex place-content-evenly space-x-2 h-[2rem] max-h-[2rem]">
                                <LoadingState
                                  width="w-7"
                                  heigth="h-7"
                                  classNames=""
                                  isLoading={isLoading}
                                  isError={isError}
                                  data={song?.voted}
                                >
                                  <div
                                    className={`relative inline-flex align-middle flex-shrink-0`}
                                  >
                                    <button
                                      className={`group flex items-center focus:outline-none group disabled:cursor-not-allowed`}
                                      onClick={() => {
                                        CardVote.mutate({
                                          id: song?.id,
                                          voted: song?.voted,
                                        });
                                      }}
                                      disabled={CardVote.isLoading}
                                    >
                                      <FontAwesomeIcon
                                        icon={song?.voted ? faHeart : faHeart2}
                                        size="2x"
                                        className={`transform motion-safe:group-focus:scale-110 p-1.5 pb-0 z-10 ${
                                          song?.voted
                                            ? "text-[#f44336]"
                                            : "text-black dark:text-white"
                                        } `}
                                        aria-hidden="true"
                                      />
                                    </button>
                                    <span className="text-xs p-[0.125rem] min-h-[1.25rem] min-w-[1.25rem] w-auto h-auto flex place-content-center text-white absolute top-1 right-0 transform -translate-y-1/2 translate-x-2/4 bg-red-500 rounded-full">
                                      {song?.votes &&
                                        votesFormatter(song.votes)}
                                    </span>
                                  </div>
                                </LoadingState>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Playlist;
