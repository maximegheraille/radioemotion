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
SwiperCore.use([Autoplay, Pagination, Navigation, Lazy]);

const Carousel = () => {
  const { data: caroussel, isLoading } = useQuery(
    "caroussel",
    async () => {
      const info = await fetch("/api/index/caroussel");
      return info.json();
    },
    { refetchOnWindowFocus: false }
  );
  return (
    <>
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
    </>
  );
};
export default Carousel;
