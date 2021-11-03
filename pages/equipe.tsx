import LazyLoad from "react-lazyload";
import Banniere from "../components/shared/banniere/Banniere";
import banequipe from "../public/images/bannieres/equipe.jpg";
import { Equipe } from "../interfaces/equipe";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { NextSeo } from "next-seo";
import { useQuery } from "react-query";

const Equipe = () => {
  const { data: equipe, isLoading } = useQuery(
    "equipe",
    async () => {
      const info = await fetch("/api/equipe");
      return info.json();
    },
    {
      refetchOnWindowFocus: false,
      retry: 500,
      retryDelay: 10,
    }
  );
  return (
    <div className="min-h-screen">
      <NextSeo
        canonical="https://www.radioemotion.be/equipe"
        title="L'équipe"
        description="L'équipe sur Radio Emotion"
        openGraph={{
          url: "https://www.radioemotion.be/equipe",
          title: "L'équipe",
          description: "L'équipe sur Radio Emotion",
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
        <Banniere image={banequipe} />
      </LazyLoad>
      <div className="flex place-content-center flex-row flex-wrap">
        {!isLoading &&
          equipe.map((person: Equipe, index: number) => (
            <div
              className="card place-content-center w-3/4 lg:w-64 xl:w-80 space-y-6 m-3 p-5 mb-8 items-center text-center flex flex-col "
              key={index}
            >
              <Image
                src={person.photo}
                height={150}
                width={150}
                className="rounded-full"
              />
              <div className="flex flex-col space-y-6 flex-1">
                <p className="font-bold">{person.nom}</p>
                <p>{person.role}</p>
                <p className="text-gray-400">{person.text}</p>
              </div>
              <div className="flex place-content-evenly w-full">
                {person.linkedin !== "" && (
                  <a href={person.linkedin} target="_blank">
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      size="2x"
                      className="text-[#0B66C3]"
                    />
                  </a>
                )}
                {person.instagram !== "" && (
                  <a href={person.instagram} target="_blank">
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                  </a>
                )}
                {person.facekook !== "" && (
                  <a href={person.facekook} target="_blank">
                    <FontAwesomeIcon
                      icon={faFacebook}
                      size="2x"
                      className="text-[#0D89EF]"
                    />
                  </a>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Equipe;
