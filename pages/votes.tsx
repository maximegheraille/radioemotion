import { NextSeo } from "next-seo";
import React from "react";
import LazyLoad from "react-lazyload";
import Banniere from "../components/shared/banniere/Banniere";
import Votes from "../components/votes/Votes";
import votes from "../public/images/bannieres/votes.jpg";
const votes2021 = () => {
  return (
    <div>
      <NextSeo
        canonical="https://www.radioemotion.be/votes"
        title={`votes ${new Date().getFullYear()}`}
        description="Le classement de vos titres préférés"
        openGraph={{
          url: "https://www.radioemotion.be/",
          title: "Le classement de vos titres préférés",
          description: `votes ${new Date().getFullYear()}`,
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
        <Banniere image={votes} />
      </LazyLoad>
      <LazyLoad>
        <Votes />
      </LazyLoad>
    </div>
  );
};

export default votes2021;
