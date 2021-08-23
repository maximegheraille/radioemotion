import React from "react";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Song } from "../../../interfaces/song";
import Card, { outderdivCard } from "../../shared/card/Card";

const NewSongs = () => {
  const { data, isLoading, isError } = useQuery(
    "newSongs",
    async () => {
      const info = await fetch(
        //https://www.radioemotion.be/API/DerniersTitresDiffuses.php
        //https://www.radioemotion.be/API/10Nouveautes.php
        "/api/index/new_songs"
      );
      return info.json();
    },
    { refetchOnWindowFocus: false }
  );
  return (
    <div>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        freeMode={true}
        freeModeSticky
        watchSlidesVisibility={true}
        preloadImages={false}
        resizeObserver={true}
        lazy={true}
        className="lg:hidden"
      >
        {isLoading ? (
          <>
            {[...Array(10)].map((song: Song, index: number) => (
              <SwiperSlide
                virtualIndex={index}
                className={`${outderdivCard}`}
                key={index}
              >
                <Card
                  key={index}
                  song={song}
                  showTime
                  isLoading={isLoading}
                  isError={isError}
                />
              </SwiperSlide>
            ))}
          </>
        ) : (
          <>
            {data?.map((song: Song, index: number) => (
              <SwiperSlide
                virtualIndex={song.id}
                className={`${outderdivCard}`}
                key={index}
              >
                <Card
                  key={index}
                  song={song}
                  isLoading={isLoading}
                  isError={isError}
                />
              </SwiperSlide>
            ))}
          </>
        )}
      </Swiper>

      <div className=" flex-wrap w-full hidden lg:flex">
        {data?.map((song: Song, index: number) => (
          <div
            className={`${outderdivCard} mr-[30px] mb-5 ${
              index > 5 && "lg:hidden xl:block"
            } ${index > 7 && "xl:hidden 2xl:block"}`}
            key={index}
          >
            <Card song={song} isLoading={isLoading} isError={isError} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewSongs;