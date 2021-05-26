import Image from "next/image";
import React from "react";
import usePlayer from "../PlayerHook";

const PlayerInfos = () => {
  const { data, isLoading } = usePlayer();
  return (
    <>
      <div className="flex">
        <div className="flex items-center">
          <div className="w-full flex align-middle ">
            {!isLoading && data ? (
              <Image
                // layout="responsive"
                width={40}
                height={40}
                className={`rounded-md items-center`}
                src={data.photo}
              />
            ) : (
              <span className="w-10 h-10 rounded bg-white animate-pulse"></span>
            )}
          </div>
        </div>
        <div
          className={`${
            isLoading ? "space-y-1" : null
          } flex flex-none justify-center content-center flex-col pl-4 text-sm lg:text-base text-white`}
        >
          <p
            className={`${
              isLoading === true
                ? "animate-pulse w-36 h-4 bg-white rounded"
                : null
            } font-bold leading-5`}
          >
            {isLoading ? "" : data?.artiste}
          </p>

          <p
            className={`${
              isLoading === true
                ? "animate-pulse w-32 h-4 bg-white rounded"
                : null
            } `}
          >
            {isLoading ? "" : data?.titre}
          </p>
        </div>
      </div>
    </>
  );
};

export default PlayerInfos;
