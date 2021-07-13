import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
// import Swiper core and required modules
import SwiperCore, {
  Autoplay, Pagination, Navigation
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);
const IndexPage = () => {
  return <div className="pt-16 z-0 hidden" >





    <Swiper spaceBetween={30} centeredSlides={true} speed={900} autoplay={{
      "delay": 3500,
      "disableOnInteraction": false,
      "waitForTransition":true
    }} pagination={{
      "clickable": true
    }} navigation={true} className="mySwiper">
      <SwiperSlide><img src={"https://www.radioemotion.be/images/caroussel/ClubVintage.jpg"}></img></SwiperSlide><SwiperSlide> <img src={"https://www.radioemotion.be/images/caroussel/BonRetour.jpg"}></img></SwiperSlide><SwiperSlide>    <img src={"https://www.radioemotion.be/images/caroussel/Morning.jpg"}></img></SwiperSlide>
    </Swiper>
  </div>;
};

export default IndexPage;
