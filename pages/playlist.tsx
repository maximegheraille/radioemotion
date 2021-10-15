import React from "react";
import LazyLoad from "react-lazyload";
import Banniere from "../components/shared/banniere/Banniere";
import playlistban from "../public/images/bannieres/playlist.jpg";
import Playlist from "../components/playlist/Playlist";
import { NextSeo } from "next-seo";
const playlist = () => {
  return (
    <>
      <NextSeo
        canonical="https://www.radioemotion.be/playlist"
        title="La playlist"
        description="La playlist de Radio Emotion"
        openGraph={{
          url: "https://www.radioemotion.be/playlist",
          title: "La playlist",
          description: "La playlist de Radio Emotion",
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
      <div className="min-h-screen">
        <LazyLoad>
          <Banniere image={playlistban} />
        </LazyLoad>
        <LazyLoad>
          <Playlist />
        </LazyLoad>
      </div>
    </>
  );
};

export default playlist;
