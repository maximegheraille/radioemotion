import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faHeart, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, Transition } from "@headlessui/react";
import React from "react";
import usePlayer from "../PlayerHook";
import { faHeart as faHeart2 } from "@fortawesome/free-regular-svg-icons";
import Apple_music from "../../../public/images/links/Apple_music2.svg";
import { playerProps } from "../../../interfaces/playerProps";
import LoadingState from "../../shared/LoadingState";
import { useMutation, useQueryClient } from "react-query";
import Image from "next/image";
import { votesFormatter } from "../../shared/votes/Votesformatter";

interface VoteProps {
  id: number | undefined;
  voted: boolean | undefined;
}

const PlayerLinks = ({ volume, setVolume }: playerProps) => {
  const { data: song, isLoading, isError } = usePlayer();
  const queryClient = useQueryClient();
  const vote = async (values: VoteProps): Promise<Response> => {
    return await fetch("/api/song/vote", {
      method: "PATCH",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const mutation = useMutation(vote, {
    onSettled: () => {
      queryClient.invalidateQueries("current_song");
      queryClient.invalidateQueries("lastPlayed");
    },
  });

  return (
    <>
      <div className="hidden lg:flex items-center lg:w-[48%] justify-end">
        <Popover className="hidden lg:block relative h-full" as="div">
          {({ open }) => (
            <>
              <Popover.Button
                className={`${open ? "" : "text-opacity-90"}
                group text-white h-full group bg-orange-700 px-3 py-2 rounded-lg inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <FontAwesomeIcon
                  icon={faVolumeUp}
                  className={`${open ? "" : "text-opacity-70"}
                  transform motion-safe:group-focus:scale-110 ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                  aria-hidden="true"
                />
              </Popover.Button>
              <Transition
                as={"div"}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute transform z-50 w-36 px-4 mt-4 -translate-y-14 -translate-x-1/4 noDrag">
                  <div className="flex transform translate-y-6 -translate-x-2">
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
        >
          <div
            className={`relative inline-flex align-middle flex-shrink-0 mr-4`}
          >
            <button
              className={`group flex items-center focus:outline-none group disabled:cursor-not-allowed`}
              onClick={() => {
                mutation.mutate({ id: song?.id, voted: song?.voted });
              }}
              disabled={mutation.isLoading}
            >
              <FontAwesomeIcon
                icon={song?.voted ? faHeart : faHeart2}
                size="2x"
                className={`transform motion-safe:group-focus:scale-110 p-1.5 text-white z-10  ${
                  song?.voted ? "text-[#f44336]" : "text-white"
                } `}
                aria-hidden="true"
              />
            </button>
            <span className="text-xs p-[0.125rem] min-h-[1.25rem] min-w-[1.25rem] w-auto h-auto flex place-content-center text-white absolute top-[3px] right-0 transform -translate-y-1/2 translate-x-2/4 bg-red-500 rounded-full">
              {song?.votes && votesFormatter(song.votes)}
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
        >
          <a
            className={`lg:m-3`}
            href={`${song?.apple_music}`}
            target="_blank"
            rel="noopener"
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
          width="w-9"
          heigth="h-9"
          classNames="m-3"
          isLoading={isLoading}
          isError={isError}
          data={song?.youtube}
        >
          <a
            href={song?.youtube}
            target="_blanc"
            className={`${
              song?.youtube === "0" ? "hidden" : "block"
            } group flex items-center m-3 text-[#f44336]`}
            style={{ outline: "0px auto transparent" }}
          >
            <FontAwesomeIcon
              icon={faYoutube}
              size="2x"
              className={`transform motion-safe:group-focus:scale-110 p-1 text-opacity-70
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
