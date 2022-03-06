import React from "react";
import { useQuery } from "react-query";
import { Song } from "../../../interfaces/song";
import Card, { outderdivCard } from "../../shared/card/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Lazy } from "swiper";

const NewSongs = () => {
  const { data, isLoading, isError } = useQuery(
    "newSongs",
    async () => {
      const info = await fetch("/api/index/new_songs");
      return info.json();
    },
    { refetchOnWindowFocus: false }
  );
  return (
    <div>
      {isError || isLoading ? (
        <div>
          <Swiper
            modules={[Navigation, FreeMode, Lazy]}
            slidesPerView={"auto"}
            spaceBetween={30}
            freeMode={{
              enabled: true,
              sticky: true,
            }}
            watchSlidesProgress
            preloadImages={false}
            resizeObserver={true}
            lazy={true}
            className="lg:hidden z-0"
          >
            {[...Array(10)].map((song: Song, index: number) => (
              <SwiperSlide
                virtualIndex={index}
                className={`${outderdivCard} mr-[30px]`}
                key={index}
              >
                <Card
                  key={index}
                  song={song}
                  showTime
                  component="nothing"
                  isLoading={isLoading}
                  isError={isError}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex-wrap w-full hidden lg:flex">
            {[...Array(10)].map((song: Song, index: number) => (
              <div
                className={`${outderdivCard} mr-[30px] mb-5 ${
                  index > 5 && "lg:hidden xl:block"
                } ${index > 7 && "xl:hidden 2xl:block"}`}
                key={index}
              >
                <Card
                  song={song}
                  isLoading={isLoading}
                  isError={isError}
                  component="newSongs"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <Swiper
            modules={[Navigation, FreeMode, Lazy]}
            slidesPerView={"auto"}
            spaceBetween={30}
            freeMode={{
              enabled: true,
              sticky: true,
            }}
            watchSlidesProgress
            preloadImages={false}
            resizeObserver={true}
            lazy={true}
            className="lg:hidden z-0"
          >
            {data?.map((song: Song, index: number) => (
              <SwiperSlide
                virtualIndex={song.id}
                className={`${outderdivCard}`}
                key={index}
              >
                <Card
                  key={index}
                  song={song}
                  component="newSongs"
                  isLoading={isLoading}
                  isError={isError}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex-wrap w-full hidden lg:flex">
            {data?.map((song: Song, index: number) => (
              <div
                className={`${outderdivCard} mr-[30px] mb-5 ${
                  index > 5 ? "lg:hidden xl:block" : ""
                } ${index > 7 ? "xl:hidden 2xl:block" : ""}`}
                key={index}
              >
                <Card
                  song={song}
                  isLoading={isLoading}
                  isError={isError}
                  component="newSongs"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NewSongs;
