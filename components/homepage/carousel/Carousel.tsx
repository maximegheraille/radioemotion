import React from "react";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Lazy } from "swiper";
import Image from "next/image";

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
          modules={[Navigation, Lazy, Autoplay, Pagination]}
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
