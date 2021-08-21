import React from "react";
import dynamic from "next/dynamic";
import LazyLoad from "react-lazyload";

// import Lastplayed from "../components/homepage/lastPlayed/Lastplayed";
// import Title from "../components/shared/title/Title";
// import Carousel from "../components/homepage/carousel/Carousel";
// import NewSongs from "../components/homepage/newSongs/NewSongs";
// import Emissions from "../components/homepage/emissions/Emissions";
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
    <div>
      <div className="">
        <div className="mx-auto pt-7 rounded-md z-0 md:w-10/12 lg:w-6/12 2xl:w-6/12">
          <Carousel />
        </div>
        <Title title={"DERNIERS TITRES DIFFUSES"} className="" />
        <Lastplayed />
        <div className="lg:flex place-content-between">
          <div className="w-full lg:w-auto">
            <Title title="DERNIERES NOUVEAUTES" />
            <div className="w-full">
              <NewSongs />
            </div>
          </div>
          <div className="lg:w-3/5">
            <Title title="EMISSIONS DU JOUR" />
            <LazyLoad>
              <Emissions />
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
