import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faHeart, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import usePlayer from "../PlayerHook";
import { faHeart as faHeart2 } from "@fortawesome/free-regular-svg-icons";
import Apple_music from "../../../public/images/links/Apple_music.svg";
import { playerProps } from "../../../interfaces/playerProps";
import LoadingState from "../../shared/LoadingState";

const PlayerLinks = ({ volume, setVolume }: playerProps) => {
  const { data: song, isLoading, isError, refetch } = usePlayer();
  const vote = async (id: number | undefined, voted: boolean | undefined) => {
    const info = await fetch("/api/song/vote", {
      method: "POST",
      body: JSON.stringify({ id: id, voted: voted }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const playing = await info.json();
    if (playing.success) {
      refetch();
    }
  };
  return (
    <>
      <div className="hidden lg:flex items-center">
        <Popover className="hidden lg:block relative h-full">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
                ${open ? "" : "text-opacity-90"}
                text-white h-full group bg-orange-700 px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <FontAwesomeIcon
                  icon={faVolumeUp}
                  className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                  aria-hidden="true"
                />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute transform z-10 w-36 px-4 mt-4 -translate-y-14 -translate-x-1/4">
                  <div className="flex transform -translate-y-16 -rotate-90 -translate-x-2">
                    <input
                      type="range"
                      className="w-full"
                      value={volume}
                      onChange={(e) => setVolume(parseInt(e.target.value))}
                      min={0}
                      max={100}
                    />
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        <LoadingState
          width="w-9"
          heigth="h-9"
          classNames="m-3"
          isLoading={isLoading}
          isError={isError}
          data={song?.voted}
          // bgColor={false}
        >
          <div
            className={`relative inline-flex align-middle flex-shrink-0 mr-4`}
          >
            <button
              className={` ${
                song?.voted ? "scale-100" : "scale-0"
              } flex items-center focus:outline-none`}
              onClick={() => {
                vote(song?.id, song?.voted);
              }}
            >
              <FontAwesomeIcon
                icon={song?.voted ? faHeart : faHeart2}
                size="2x"
                className={`p-1.5 text-white z-10 ${
                  song?.voted ? "text-[#f44336]" : "text-white"
                } `}
                aria-hidden="true"
              />
            </button>
            <span className="text-xs flex items-center text-white absolute top-0 right-0 transform -translate-y-1/2 translate-x-2/4 bg-red-500 rounded-[100px] px-1 h-5">
              {song?.votes}
            </span>
          </div>
        </LoadingState>
        <LoadingState
          width="w-9"
          heigth="h-9"
          classNames="m-3"
          isLoading={isLoading}
          isError={isError}
          data={song?.apple_music}
          //   bgColor={false}
        >
          <a
            className={`flex items-center ${
              song?.voted ? "block" : "scale-0"
            } lg:m-3`}
            href={`${song?.apple_music}`}
            target="_blank"
          >
            <img src={Apple_music} className={`w-5 lg:h-5 lg:w-5 text-white`} />
          </a>
        </LoadingState>
        <LoadingState
          width="w-9"
          heigth="h-9"
          classNames="m-3"
          isLoading={isLoading}
          isError={isError}
          data={song?.youtube}
          // bgColor={false}
        >
          <a
            href={song?.youtube}
            target="_blanc"
            className={`${
              song?.youtube === "0" ? "hidden" : "block"
            } flex items-center m-3 text-[#f44336]`}
          >
            <FontAwesomeIcon
              icon={faYoutube}
              size="2x"
              className={`p-1 text-opacity-70
              h-10 w-10 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
              aria-hidden="true"
            />
          </a>
        </LoadingState>
      </div>
    </>
  );
};

export default PlayerLinks;
