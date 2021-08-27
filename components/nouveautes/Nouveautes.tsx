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
            <div className={`${outderdivCard} mr-[30px] mb-5`} key={index}>
              <Card
                song={song}
                isLoading={isLoading}
                isError={isError}
                key={index}
                className=""
              />{" "}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-wrap flex justify-center">
          {data?.map((song: Song, index: number) => (
            <div className={`${outderdivCard} mr-[30px] mb-5`} key={index}>
              <Card song={song} isLoading={isLoading} isError={isError} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Nouveautes;
