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
        <div className="flex flex-wrap justify-center space-x-4">
          {[...Array(42)].map((song: Song, index: number) => (
            <div className={`${outderdivCard} mb-5 ml-4`} key={index}>
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
        <div className="flex-wrap flex justify-center space-x-4">
          {data?.map((song: Song, index: number) => (
            <div className={`${outderdivCard} mb-5 ml-4`} key={index}>
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
