import { NextSeo } from "next-seo";
import React from "react";
import AgendaPage from "../components/agenda/Agenda";

const agenda = () => {
  return (
    <div className="min-h-screen">
      <NextSeo
        canonical="https://www.radioemotion.be/agenda"
        title="L'agenda"
        description="L'agenda de votre region"
        openGraph={{
          url: "https://www.radioemotion.be/agenda",
          title: "L'agenda",
          description: "L'agenda de votre region",
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
      <AgendaPage />
    </div>
  );
};

export default agenda;
