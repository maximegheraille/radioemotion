import React from "react";
import Image from "next/image";
import part3 from "../../../public/images/presentation/part3.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import Title from "../../shared/title/Title";

const Part3 = () => {
  return (
    <div className="text-black dark:text-white pt-12">
      <Title
        title="L’information locale, nationale et internationale"
        className="text-3xl lg:text-4xl"
      />
      <div className="flex flex-col lg:flex-row place-content-between pt-2">
        <div className="order-last lg:order-none pt-8 pr-0 lg:pt-0 lg:pr-6 w-full lg:w-7/12">
          <ul>
            <li className="">
              <FontAwesomeIcon icon={faMicrophone} className="mr-4" />
              Radio Emotion, c’est avant tout de la musique mais également de
              l’information nationale, internationale, culturelle et sportive.
            </li>
            <li className="pt-8">
              <FontAwesomeIcon icon={faMicrophone} className="mr-4" />
              Radio Emotion soutient également les acteurs locaux qui dynamisent
              la région en participant aux différents évènements régionaux afin
              de leurs garantir une couverture médiatique de proximité.
            </li>
            <li className="pt-8">
              <FontAwesomeIcon icon={faMicrophone} className="mr-4" />
              Radio Emotion vous propose différentes émissions dans sa grille
              qui mettent en avant l'information purement locale . Qu'elle soit
              sportive , culturelle ou même associtive.
            </li>
          </ul>
        </div>
        <div className="w-full lg:w-5/12">
          <Image src={part3} className="rounded-lg" layout="responsive" />
        </div>
      </div>
    </div>
  );
};

export default Part3;
