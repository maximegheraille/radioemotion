import React, { useState } from "react";
import Image from "next/image";
import { Song } from "../../../interfaces/song";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import LoadingState from "../LoadingState";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeart2 } from "@fortawesome/free-regular-svg-icons";
import Apple_music from "../../../public/images/links/Apple_music2.svg";
import { votesFormatter } from "../votes/Votesformatter";
import { useMutation, useQueryClient } from "react-query";
import vote from "./CardVote";
import YoutubePlayer from "./YoutubePlayer";
interface cardProps {
  showTime?: Boolean;
  number?: boolean;
  isLoading: boolean;
  isError: boolean;
  song: Song | undefined;
  component:
    | "lastPlayed"
    | "nouveautes"
    | "newSongs"
    | "votes"
    | "playlist"
    | "nothing";
  className?: string;
}

export const outderdivCard =
  "card text-center max-w-[8.5rem] min-w-[8.5rem] lg:max-w-[10rem] lg:min-w-[10rem]";

const Card = ({
  showTime = false,
  number = false,
  song,
  isError,
  isLoading,
  className = "",
  component,
}: cardProps) => {
  const queryClient = useQueryClient();
  const CardVote = useMutation(vote, {
    onSettled: (_data: any, _error: any, _variables: any, _context?: any) => {
      if (component !== "nothing") {
        if (component === "lastPlayed") {
          queryClient.invalidateQueries("current_song");
        }
        queryClient.invalidateQueries(`${component}`);
      }
    },
  });
  const [showYou, setShowYou] = useState<boolean>(false);
  return (
    <div className={`${className}`}>
      {showYou && <YoutubePlayer url={song?.youtube} />}
      {showTime && (
        <div className="flex items-center place-content-center content-center bg-[#2d2180] rounded-t-lg">
          <LoadingState
            width="w-32"
            heigth="h-4"
            classNames="m-1"
            isLoading={isLoading}
            isError={isError}
            data={song?.min}
          >
            <div className="text-xl font-semibold text-white">
              {song?.heure}:{song?.min}
            </div>
          </LoadingState>
        </div>
      )}
      {number && (
        <div className="flex items-center place-content-center content-center bg-[#2d2180] rounded-t-md">
          <LoadingState
            width="w-32"
            heigth="h-4"
            classNames="m-1"
            isLoading={isLoading}
            isError={isError}
            data={song?.position}
          >
            <div className="text-xl font-semibold text-white">
              N??{song?.position}
            </div>
          </LoadingState>
        </div>
      )}
      <div className="flex place-content-center">
        <LoadingState
          width="w-[160px]"
          heigth="h-[160px]"
          isLoading={isLoading}
          isError={isError}
          data={song?.photo}
        >
          <Image
            width={160}
            height={160}
            className={`items-center ${
              !number && !showTime ? "rounded-t-lg" : null
            }`}
            src={song?.photo.toString()!}
            alt="pochette de l'album"
          />
        </LoadingState>
      </div>

      <div className="h-[6.5rem] my-1 px-2">
        <LoadingState
          width="w-full"
          heigth="h-4"
          isLoading={isLoading}
          isError={isError}
          data={song?.artiste}
        >
          <p className="line-clamp-2 font-bold">{song?.titre}</p>
        </LoadingState>

        <LoadingState
          width="w-full"
          heigth="h-4"
          classNames="mt-2"
          isLoading={isLoading}
          isError={isError}
          data={song?.artiste}
        >
          <p className="line-clamp-2">{song?.artiste}</p>
        </LoadingState>
      </div>
      <div className="flex place-content-evenly space-x-2 h-[2rem] max-h-[2rem]">
        <LoadingState
          width="w-7"
          heigth="h-7"
          isLoading={isLoading}
          isError={false}
          data={song?.voted}
        >
          <div
            className={`relative inline-flex align-middle flex-shrink-0 mr-2`}
          >
            <button
              className={`group flex items-center focus:outline-none disabled:cursor-not-allowed`}
              onClick={() => {
                CardVote.mutate({ id: song?.id, voted: song?.voted });
              }}
              disabled={CardVote.isLoading}
              aria-label={`${song?.voted ? "D??saimer" : "Aimer"}`}
            >
              <FontAwesomeIcon
                icon={song?.voted ? faHeart : faHeart2}
                className={`text-2xl transform motion-safe:group-focus:scale-110 p-1.5 z-10 ${
                  song?.voted ? "text-[#f44336]" : "text-black dark:text-white"
                } `}
                aria-hidden="true"
              />
            </button>
            <span className="text-xs p-[0.125rem] min-h-[1.25rem] min-w-[1.25rem] w-auto h-auto flex place-content-center text-white absolute top-0 right-0 transform -translate-y-1/2 translate-x-2/4 bg-red-500 rounded-full">
              {song?.votes && votesFormatter(song.votes)}
            </span>
          </div>
        </LoadingState>
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
            href={`${
              song?.apple_music &&
              song?.apple_music.replace("geo.music", "itunes")
            }`}
            target="_blank"
            rel="noopener"
          >
            <button
              className="w-6 mr-1 items-center flex"
              aria-label="Ouvrir le clip video"
            >
              <Image
                src={Apple_music}
                className={`p-1 transform motion-safe:group-focus:scale-110 w-5 lg:w-5 text-white`}
                alt="Logo de Apple music"
              />
            </button>
          </a>
        </LoadingState>
        <LoadingState
          width="w-7"
          heigth="h-7"
          classNames="hidden lg:block"
          isLoading={isLoading}
          isError={isLoading}
          data={song?.youtube}
        >
          <button
            className={`hidden lg:flex ${
              song?.youtube === "" ? "hidden" : "flex"
            } group items-center place-content-center text-[#f44336]`}
            onClick={() => setShowYou(!showYou)}
            aria-label="Ouvrir le clip video"
          >
            <FontAwesomeIcon
              icon={faYoutube}
              //size="2x"
              className={`text-3xl transform motion-safe:group-focus:scale-110 px-0.5
              h-10 w-10 text-[#f44336] transition ease-in-out duration-150`}
              aria-hidden="true"
            />
          </button>
        </LoadingState>
        <LoadingState
          width="w-7"
          heigth="h-7"
          classNames="lg:hidden"
          isLoading={isLoading}
          isError={isLoading}
          data={song?.youtube}
        >
          <a
            className={`lg:hidden ${
              song?.youtube === "" ? "hidden" : "flex"
            } group flex items-center`}
            href={`${song?.youtube}`}
            target="_blank"
            aria-label="Ouvrir le clip video"
          >
            <FontAwesomeIcon
              icon={faYoutube}
              size="2x"
              className={`transform motion-safe:group-focus:scale-110 px-0.5
              h-10 w-10 text-[#f44336] group-hover:text-opacity-80 transition ease-in-out duration-150`}
              aria-hidden="true"
            />
          </a>
        </LoadingState>
      </div>
    </div>
  );
};

export default Card;
