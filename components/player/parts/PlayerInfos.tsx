import Image from "next/image";
import React from "react";
import LoadingState from "../../shared/LoadingState";
import usePlayer from "../PlayerHook";

const PlayerInfos = () => {
  const { data: song, isLoading, isError } = usePlayer();
  return (
    <>
      <div className="flex lg:w-[48%]">
        <div className="flex items-center flex-shrink-0">
          <div className="w-full flex align-middle">
            <LoadingState
              width="w-[40px]"
              heigth="h-[40px]"
              classNames=""
              isLoading={isLoading}
              isError={isError}
              data={song?.photo}
            >
              <div className="w-12 h-12 lg:w-10 lg:h-10">
                <Image
                  width={40}
                  height={40}
                  alt="pochette"
                  className={`rounded-lg items-center`}
                  src={song?.photo.toString()!}
                  layout="responsive"
                />
              </div>
            </LoadingState>
          </div>
        </div>
        <div
          className={`flex justify-center content-center flex-col pl-2 lg:pl-4 text-sm lg:text-base text-white`}
        >
          <LoadingState
            width="w-28"
            heigth="h-4"
            classNames=""
            isLoading={isLoading}
            isError={isError}
            data={song?.titre}
          >
            <p className="line-clamp-1 text-sm font-bold lg:text-base lg:leading-5">
              {song?.titre}
            </p>
          </LoadingState>
          <LoadingState
            width="w-32"
            heigth="h-4"
            classNames=""
            isLoading={isLoading}
            isError={isError}
            data={song?.artiste}
          >
            <p className="line-clamp-1 text-sm lg:text-base lg:leading-5">
              {song?.artiste}
            </p>
          </LoadingState>
        </div>
      </div>
    </>
  );
};

export default PlayerInfos;
