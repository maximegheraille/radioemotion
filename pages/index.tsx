import React from "react";
import dynamic from "next/dynamic";
import LazyLoad from "react-lazyload";
import Infos from "../components/homepage/infos/Infos";
import Agenda from "../components/homepage/agenda/Agenda";

const Lastplayed = dynamic(
  () => import("../components/homepage/lastPlayed/Lastplayed")
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
const IndexPage = () => {
  return (
    <div className="">
      <div className="">
        <div className="mx-auto pt-7 rounded-lg z-0 md:w-10/12 lg:w-6/12 2xl:w-6/12">
          <Carousel />
        </div>
        <Title title={"DERNIERS TITRES DIFFUSES"} className="" />
        <Lastplayed />
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
