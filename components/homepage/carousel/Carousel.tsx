import React from "react";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import SwiperCore, {
  Autoplay,
  Pagination,
  Navigation,
  Lazy,
} from "swiper/core";
import Image from "next/image";
SwiperCore.use([Autoplay, Pagination, Navigation, Lazy]);

const Carousel = () => {
  const {
    data: caroussel,
    isLoading,
    isError,
  } = useQuery(
    "caroussel",
    async () => {
      const info = await fetch("/api/index/caroussel");
      return info.json();
    },
    { refetchOnWindowFocus: false }
  );
  return (
    <>
      {isLoading || isError || caroussel === undefined ? (
        <div
          className={`bg-white shadow-lg animate-pulse rounded w-full lg:w-[640px] lg:h-[240px]`}
        ></div>
      ) : (
        <Swiper
          centeredSlides={true}
          centeredSlidesBounds={true}
          slidesPerView={1}
          updateOnWindowResize={true}
          speed={1250}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            waitForTransition: true,
          }}
          pagination={{
            clickable: true,
          }}
          className="rounded-lg"
          lazy={true}
        >
          {caroussel &&
            !isLoading &&
            caroussel.map(
              (caroussel: { id: number; url: string }, index: number) => (
                <SwiperSlide virtualIndex={index} key={index}>
                  <Image
                    className="rounded-lg w-full shadow-lg"
                    width="700"
                    height="260"
                    src={caroussel.url}
                    alt="Information sur une emission"
                  />
                </SwiperSlide>
              )
            )}
        </Swiper>
      )}
    </>
  );
};
export default Carousel;
