import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import SwiperCore, {
  Autoplay,
  Pagination,
  Navigation,
  Lazy,
} from "swiper/core";
SwiperCore.use([Autoplay, Pagination, Navigation, Lazy]);
import { useQuery } from "react-query";
import { Song } from "../interfaces/song";
import Card, { outderdivCard } from "../components/shared/card/Card";
import Lastplayed from "../components/homepage/lastplayed/Lastplayed";

const IndexPage = ({ data }: any) => {
  console.log("here");
  console.log(data);
  const { data: caroussel, isLoading } = useQuery("caroussel", async () => {
    // setTimeout(async function () {
    const info = await fetch("/api/index/caroussel");
    return info.json();
    //   }, 1);
  });

  // const {
  //   data: lastPlayed,
  //   isLoading: lastPlayedIsLoading,
  //   isError: lastPlayedIsError,
  // } = useQuery("lastPlayed", async () => {
  //   const info = await fetch("/api/index/derniers_titres");
  //   return info.json();
  // });

  return (
    <div className="">
      <div className="mx-auto rounded-md z-0 md:w-10/12 lg:w-6/12 2xl:w-6/12">
        {isLoading || caroussel === undefined ? (
          <div
            className={`bg-white animate-pulse rounded w-full lg:w-[640px] lg:h-[240px]`}
          ></div>
        ) : (
          <Swiper
            spaceBetween={10}
            centeredSlides={true}
            centeredSlidesBounds={true}
            slidesPerView={1}
            updateOnWindowResize={true}
            speed={900}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              waitForTransition: true,
            }}
            pagination={{
              clickable: true,
            }}
            className="rounded-md"
            lazy={true}
          >
            {caroussel &&
              caroussel.map((caroussel: { ID: number; URL: string }) => (
                <SwiperSlide virtualIndex={caroussel.ID} key={caroussel.ID}>
                  <img
                    className="rounded-md w-full bac"
                    src={`https://www.radioemotion.be${caroussel.URL}.jpg`}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
      <div className="pt-8 ">
        <Lastplayed />
      </div>
      {/* <div className="pt-8 overflow-x-scroll flex">
        {data &&
          data.map((song: Song) => (
            <div
              key={song.id}
              className="text-white  mr-[5%] text-center bg-[#1F1F1E] rounded-md min-w-[8.5rem] w-32"
            >
              <div className="text-white text-lg">
                {song.heure}:{song.min}
              </div>
              <img
                className="rounded-md w-32 h-[8.5rem]"
                src={`https://www.radioemotion.be/covers/${song.id}.jpg`}
              />
              <div className="h-[5rem]">
                <p className="line-clamp-2">{song.titre}</p>
                <p className="line-clamp-2">{song.artiste}</p>
              </div>
              <div className="flex place-content-center align-middle max-h-[2rem]">
                <LoadingState
                  width="w-9"
                  heigth="h-9"
                  classNames="m-3"
                  isLoading={isLoading}
                  isError={false}
                  data={song?.voted}
                >
                  <div
                    className={`relative inline-flex align-middle flex-shrink-0 mr-4`}
                  >
                    <button
                      className={`group flex items-center focus:outline-none group disabled:cursor-not-allowed`}
                    >
                      <FontAwesomeIcon
                        icon={song?.voted ? faHeart : faHeart2}
                        size="2x"
                        className={`transform motion-safe:group-focus:scale-110 p-1.5 text-white z-10  ${
                          song?.voted ? "text-[#f44336]" : "text-white"
                        } `}
                        aria-hidden="true"
                      />
                    </button>
                    <span className="text-xs p-[0.125rem] min-h-[1.25rem] min-w-[1.25rem] w-auto h-auto flex place-content-center text-white absolute top-0 right-0 transform -translate-y-1/2 translate-x-2/4 bg-red-500 rounded-full">
                      {song?.votes && votesFormatter(song.votes)}
                    </span>
                  </div>
                </LoadingState>
                <LoadingState
                  width="w-9"
                  heigth="h-9"
                  classNames="m-3"
                  isLoading={isLoading}
                  isError={isLoading}
                  data={song?.apple_music}
                >
                  <a
                    className={`lg:m-1`}
                    href={`${song?.apple_music}`}
                    target="_blank"
                  >
                    <div className="w-6 align-middle flex">
                      <Image
                        src={Apple_music}
                        className={`p-1 transform motion-safe:group-focus:scale-110 w-5 lg:w-5 text-white`}
                      />
                    </div>
                  </a>
                </LoadingState>
                <LoadingState
                  width="w-9"
                  heigth="h-9"
                  classNames="m-1"
                  isLoading={isLoading}
                  isError={isLoading}
                  data={song?.youtube}
                >
                  <a
                    href={song?.youtube}
                    target="_blanc"
                    className={`${
                      song?.youtube === "" ? "hidden" : "block"
                    } group flex items-center m-3 text-[#f44336]`}
                    style={{ outline: "0px auto transparent" }}
                  >
                    <FontAwesomeIcon
                      icon={faYoutube}
                      size="2x"
                      className={`transform motion-safe:group-focus:scale-110 p-1 text-opacity-70
        h-10 w-10 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                      aria-hidden="true"
                    />
                  </a>
                </LoadingState>
              </div>
            </div>
          ))}
      </div> */}
    </div>
  );
};

export default IndexPage;
// export async function getServerSideProps(context: any, ctx: any) {
//   const info = await fetch(
//     "http://192.168.1.133:3012/api/index/derniers_titres"
//   );
//   const data = await info.json();
//   console.log(data);
//   return {
//     props: { data }, // will be passed to the page component as props
//   };
// }
