import React from "react";
import { useQuery } from "react-query";
import { Song } from "../../interfaces/song";
import Card, { outderdivCard } from "../shared/card/Card";

const Votes = () => {
  const { data, isLoading, isError } = useQuery(
    `votes`,
    async () => {
      const info = await fetch("/api/votes");
      return info.json();
    },
    {
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div>
      {isLoading || isError ? (
        <div className="flex flex-wrap justify-center">
          {[...Array(42)].map((song: Song, index: number) => (
            <div
              className={`${outderdivCard} mb-5 mx-1 sm:mx-2 md:mx-6 lg:mx-2 xl:mx-4 2xl:mx-5`}
              key={index}
            >
              <Card
                song={song}
                isLoading={isLoading}
                isError={isError}
                key={index}
                number={true}
                component="nothing"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-wrap flex justify-center items-center">
          {data?.map((song: Song, index: number) => (
            <div
              className={`${outderdivCard} mb-5 mx-1 sm:mx-2 md:mx-6 lg:mx-2 xl:mx-4 2xl:mx-5`}
              key={index}
            >
              <Card
                song={song}
                isLoading={isLoading}
                isError={isError}
                number={true}
                component="votes"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Votes;
