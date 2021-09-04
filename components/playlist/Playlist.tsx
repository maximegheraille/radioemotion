import React, { useState } from "react";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { French } from "flatpickr/dist/l10n/fr.js";
import { useQuery, useQueryClient } from "react-query";
import Card, { outderdivCard } from "../shared/card/Card";
import { Song } from "../../interfaces/song";
const Playlist = () => {
  const [date, setDate] = useState<Date>(new Date());
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery(
    [`playlist`, date],
    async () => {
      let params = {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDay(),
        hour: date.getHours(),
      };
      const info = await fetch(`/api/playlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(params),
      });
      return info.json();
    },
    {
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="">
      <div className="w-full text-center rounded-lg">
        <p className="text-black dark:text-white mb-1">
          Selectionez Le Jour Et L'heure
        </p>
        <Flatpickr
          data-enable-time
          value={date}
          options={{
            maxDate: new Date(),
            maxTime: new Date().getTime(),
            time_24hr: true,
            locale: French,
          }}
          onClose={(dates) => {
            console.log("inval");
            setDate(new Date(dates[0]));
            queryClient.invalidateQueries(`playlist`);
          }}
          className="rounded-md text-center mb-8"
        />
      </div>
      {isLoading || isError ? (
        <div className="flex flex-wrap justify-center">
          {[...Array(21)].map((song: Song, index: number) => (
            <div
              className={`${outderdivCard} mb-5 mx-1 sm:mx-2 md:mx-6 lg:mx-2 xl:mx-4 2xl:mx-5`}
              key={index}
            >
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
        <div className="flex-wrap flex justify-center">
          {data?.map((song: Song, index: number) => (
            <div
              className={`${outderdivCard} mb-5 mx-1 sm:mx-2 md:mx-6 lg:mx-2 xl:mx-4 2xl:mx-5`}
              key={index}
            >
              <Card
                song={song}
                showTime
                isLoading={isLoading}
                isError={isError}
                component="playlist"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Playlist;
