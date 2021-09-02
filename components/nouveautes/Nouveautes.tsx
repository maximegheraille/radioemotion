import React from "react";
import { useQuery } from "react-query";
import Card, { outderdivCard } from "../../components/shared/card/Card";
import { Song } from "../../interfaces/song";
const Nouveautes = () => {
  const { data, isLoading, isError } = useQuery(
    "nouveautes",
    async () => {
      const info = await fetch("/api/nouveautes");
      return info.json();
    },
    {
      refetchInterval: 30000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div>
      {isLoading || isError ? (
        <div className="flex flex-wrap justify-center">
          {[...Array(42)].map((song: Song, index: number) => (
            <div className={`${outderdivCard} mb-5 ml-4`} key={index}>
              <Card
                song={song}
                isLoading={isLoading}
                isError={isError}
                key={index}
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
                component="nouveautes"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Nouveautes;
