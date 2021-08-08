import React from "react";
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
interface cardProps {
  showTime?: Boolean;
  isLoading: boolean;
  isError: boolean;
  song: Song | undefined;
}

export const outderdivCard =
  "text-white text-center bg-[#6f7988] dark:bg-[#1F1F1E] rounded-lg min-w-[8.5rem] w-32 max-w-[8.5rem]";

const Card = ({ showTime = false, song, isError, isLoading }: cardProps) => {
  const queryClient = useQueryClient();

  const CardVote = useMutation(vote, {
    onSuccess: (data: Response) => {
      console.log(`onSuccess`);
      if (data.status === 200) {
        console.log("200");
        queryClient.invalidateQueries("lastPlayed");
      } else {
        console.log("not 200");
      }
    },
    // onMutate: () => {
    //   console.log(`rolling back optimistic update with id`);
    //   queryClient.invalidateQueries("lastPlayed");
    //   //  refetch();
    //   // queryClient.invalidateQueries("lastPlayed");
    // },
    onError: () => {
      console.log(`onError`);
      // refetch();
      //  queryClient.invalidateQueries("lastPlayed");
    },
    // onSettled: () => {
    //   console.log(`onSettled`);
    //   //     refetch();
    //   // queryClient.invalidateQueries("lastPlayed");
    // },
  });

  return (
    <>
      {showTime ? (
        <div className="flex items-center place-content-center content-center">
          <LoadingState
            width="w-32"
            heigth="h-4"
            classNames="m-1"
            isLoading={isLoading}
            isError={isError}
            data={song?.min}
          >
            <div className="text-white text-lg">
              {song?.heure}:{song?.min}
            </div>
          </LoadingState>
        </div>
      ) : null}
      {/* <Image
        layout="responsive"
        width="130px"
        height="130px"
        className="w-full"
        src={`https://www.radioemotion.be/covers/${song?.id}.jpg`}
      /> */}

      <div className="flex place-content-center">
        <LoadingState
          width="w-[140px]"
          heigth="h-[140px]"
          classNames=""
          isLoading={isLoading}
          isError={isError}
          data={song?.photo}
        >
          <Image
            width={136}
            height={136}
            className={`items-center`}
            src={song?.photo!}
          />
        </LoadingState>
      </div>

      <div className="h-[6.5rem] my-1 px-2">
        <LoadingState
          width="w-full"
          heigth="h-4"
          classNames=""
          isLoading={isLoading}
          isError={isError}
          data={song?.artiste}
        >
          <p className="line-clamp-2">{song?.titre}</p>
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
      <div className="flex place-content-center space-x-2 h-[2rem] max-h-[2rem]">
        <LoadingState
          width="w-7"
          heigth="h-7"
          classNames=""
          isLoading={isLoading}
          isError={false}
          data={song?.voted}
        >
          <div
            className={`relative inline-flex align-middle flex-shrink-0 mr-2`}
          >
            <button
              className={`group flex items-center focus:outline-none group disabled:cursor-not-allowed`}
              onClick={() => {
                CardVote.mutate({ id: song?.id, voted: song?.voted });
              }}
              disabled={CardVote.isLoading}
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
            href={`${song?.apple_music}`}
            target="_blank"
          >
            <div className="w-6 mr-1 align-middle flex">
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
          <a
            href={song?.youtube}
            target="_blanc"
            className={`${
              song?.youtube === "" ? "hidden" : "block"
            } group flex items-center text-[#f44336]`}
          >
            <FontAwesomeIcon
              icon={faYoutube}
              size="2x"
              className={`transform motion-safe:group-focus:scale-110 px-0.5 text-opacity-70
              h-10 w-10 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
              aria-hidden="true"
            />
          </a>
        </LoadingState>
      </div>
    </>
  );
};

export default Card;
