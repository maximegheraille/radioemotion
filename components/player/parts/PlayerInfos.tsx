import Image from "next/image";
import React from "react";
import LoadingState from "../../shared/LoadingState";
import usePlayer from "../PlayerHook";

const PlayerInfos = () => {
  const { data: song, isLoading, isError } = usePlayer();
  return (
    <>
      <div className="flex">
        <div className="flex items-center flex-shrink-0">
          <div className="w-full flex align-middle">
            {song !== undefined && (
              <LoadingState
                width="w-[40px]"
                heigth="h-[40px]"
                classNames=""
                isLoading={isLoading}
                isError={isError}
                data={song?.photo}
              >
                <Image
                  // layout="responsive"
                  width={40}
                  height={40}
                  className={`rounded-md items-center`}
                  src={song?.photo}
                />
              </LoadingState>
            )}
          </div>
        </div>
        <div
          className={`space-y-1 flex justify-center content-center flex-col pl-2 lg:pl-4 text-sm lg:text-base text-white`}
        >
          {/* <p
            className={`${
              isLoading || isError
                ? "animate-pulse w-32 max-w- h-4 bg-white rounded"
                : "line-clamp-1 w-32 lg:w-auto"
            } font-bold leading-5`}
          >
            {isLoading || isError ? "" : song?.artiste}
          </p> */}

          <LoadingState
            width="w-32"
            heigth="h-4"
            classNames=""
            isLoading={isLoading}
            isError={isError}
            data={song?.artiste}
          >
            <p className="line-clamp-1 max-w-[9rem]">{song?.artiste}</p>
          </LoadingState>
          {/* <p
            className={`${
              isLoading || isError
                ? "animate-pulse w-36 h-4 bg-white rounded"
                : "w-32 lg:w-auto line-clamp-1"
            } `}
          >
            {isLoading || isError ? "" : song?.titre}
          </p> */}
          <LoadingState
            width="w-28"
            heigth="h-4"
            classNames=""
            isLoading={isLoading}
            isError={isError}
            data={song?.titre}
          >
            <p className="line-clamp-1 max-w-[9rem]">{song?.titre}</p>
          </LoadingState>
        </div>
      </div>
    </>
  );
};

export default PlayerInfos;
