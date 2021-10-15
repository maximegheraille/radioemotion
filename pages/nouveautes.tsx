import React from "react";
import Nouveautes from "../components/nouveautes/Nouveautes";
import LazyLoad from "react-lazyload";
import nouveautesban from "../public/images/bannieres/nouveautes.jpg";
import Banniere from "../components/shared/banniere/Banniere";
import { NextSeo } from "next-seo";
const nouveautes = () => {
  return (
    <div>
      <NextSeo
        canonical="https://www.radioemotion.be/nouveautes"
        title="Les nouveautes"
        description="Les nouveautes sur Radio Emotion"
        openGraph={{
          url: "https://www.radioemotion.be/nouveautes",
          title: "Les nouveautes",
          description: "Les nouveautes sur Radio Emotion",
          images: [
            {
              url: "https://www.radioemotion.be/images/radioemotion-logo.png",
              width: 150,
              height: 150,
              alt: "Logo de Radio Emotion",
              type: "image/png",
            },
            { url: "https://www.radioemotion.be/images/radioemotion-logo.png" },
          ],
          site_name: "Radio Emotion",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <LazyLoad>
        <Banniere image={nouveautesban} />
      </LazyLoad>
      <LazyLoad>
        <Nouveautes />
      </LazyLoad>
    </div>
  );
};

export default nouveautes;
