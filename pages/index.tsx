import React from "react";
import dynamic from "next/dynamic";
import LazyLoad from "react-lazyload";
import NextSeo from "../components/shared/NextSeo/NextSeo";

const Lastplayed = dynamic(
  () => import("../components/homepage/lastplayed/Lastplayed")
);
const Title = dynamic(() => import("../components/shared/title/Title"));
const Carousel = dynamic(
  () => import("../components/homepage/carousel/Carousel")
);
const NewSongs = dynamic(
  () => import("../components/homepage/newSongs/NewSongs")
);
const Emissions = dynamic(
  () => import("../components/homepage/emissions/Emissions")
);
const Infos = dynamic(() => import("../components/homepage/infos/Infos"));
const Agenda = dynamic(() => import("../components/homepage/agenda/Agenda"));
const IndexPage = () => {
  return (
    <div className="">
      <NextSeo
        canonical="https://www.radioemotion.be/"
        title="Radio Emotion"
        description="Radio Emotion est la radio indépendante de Braine-L'Alleud / Waterloo / Lasne émettant sur le 104.9 FM"
      />
      <div className="">
        <div className="mx-auto rounded-lg z-0 md:w-10/12 lg:w-6/12 2xl:w-6/12 ">
          <Carousel />
        </div>
        <div className="">
          <Title title={"DERNIERS TITRES DIFFUSES"} className="" />
          <div className="">
            <Lastplayed />
          </div>
        </div>
        <div className="lg:flex place-content-between">
          <div className="lg:w-[70%]">
            <Title title="DERNIERES NOUVEAUTES" />
            <div className="">
              <NewSongs />
            </div>
          </div>
          <div className="lg:w-[30%]">
            <Title title="EMISSIONS DU JOUR" />
            <LazyLoad>
              <Emissions />
            </LazyLoad>
          </div>
        </div>
        <div className="lg:flex place-content-between">
          <div className="lg:w-[70%]">
            <Title title="INFO REGIONALE" />
            <div className="">
              <LazyLoad>
                <Infos />
              </LazyLoad>
            </div>
          </div>
          <div className="lg:w-[30%]">
            <Title title="AGENDA" />
            <LazyLoad>
              <Agenda />
            </LazyLoad>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
