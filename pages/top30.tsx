import React from "react";
import LazyLoad from "react-lazyload";
import Banniere from "../components/shared/banniere/Banniere";
import Top30 from "../components/top30/Top30";
import bantop30 from "../public/images/bannieres/top30.jpg";
import { NextSeo } from "next-seo";

const top30 = () => {
  return (
    <div>
      <NextSeo
        canonical="https://www.radioemotion.be/top30"
        title="Le top30"
        description="Le top30 de Radio Emotion"
        openGraph={{
          url: "https://www.radioemotion.be/top30",
          title: "Le top30",
          description: "Le top30 de Radio Emotion",
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
        <Banniere image={bantop30} />
      </LazyLoad>
      <LazyLoad>
        <Top30 />
      </LazyLoad>
    </div>
  );
};

export default top30;
