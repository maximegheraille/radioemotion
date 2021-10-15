import { NextSeo } from "next-seo";
import React from "react";
import InfosPage from "../components/infos/Infos";
const actualites = () => {
  return (
    <div className="min-h-screen">
      <NextSeo
        canonical="https://www.radioemotion.be/actualites"
        title="L'info de votre région"
        description="Les infos de votre region"
        openGraph={{
          url: "https://www.radioemotion.be/actualites",
          title: "L'info de votre région",
          description: "Les infos de votre region",
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
      <InfosPage />
    </div>
  );
};

export default actualites;
