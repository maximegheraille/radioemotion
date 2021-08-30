import React from "react";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Song } from "../../../interfaces/song";
import Card, { outderdivCard } from "../../shared/card/Card";

const Lastplayed = () => {
  const { data, isLoading, isError } = useQuery(
    "lastPlayed",
    async () => {
      const info = await fetch("/api/index/derniers_titres");
      return info.json();
    },
    {
      refetchInterval: 30000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        freeMode={true}
        freeModeSticky
        watchSlidesVisibility={true}
        preloadImages={false}
        resizeObserver={true}
        lazy={true}
      >
        {isLoading || isError ? (
          <>
            {[...Array(15)].map((song: Song, index: number) => (
              <SwiperSlide
                virtualIndex={index}
                className={`${outderdivCard}`}
                key={index}
              >
                <Card
                  song={song}
                  showTime
                  component="nothing"
                  isLoading={isLoading}
                  isError={isError}
                />
              </SwiperSlide>
            ))}
          </>
        ) : (
          <>
            {data?.map((song: Song) => (
              <SwiperSlide
                virtualIndex={song.id}
                className={`${outderdivCard}`}
                key={song.id}
              >
                <Card
                  song={song}
                  showTime
                  component="lastplayed"
                  isLoading={isLoading}
                  isError={isError}
                />
              </SwiperSlide>
            ))}
          </>
        )}
      </Swiper>
    </>
  );
};

export default Lastplayed;
