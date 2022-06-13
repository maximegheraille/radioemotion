import React from "react";
import Image from "next/image";
import part2 from "../../../public/images/presentation/part2.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Title from "../../shared/title/Title";
const Part2 = () => {
  return (
    <div className="text-black dark:text-white pt-12">
      <Title
        title="Les atouts de la programmation"
        className="text-3xl lg:text-4xl"
      />
      <div className="lg:flex place-content-between pt-2">
        <div className="w-full lg:w-5/12">
          <Image src={part2} className="rounded-lg" layout="responsive" />
        </div>
        <div className="pt-8 lg:pt-0 lg:pl-6 w-full lg:w-7/12">
          <ul className="list-none">
            <li className="">
              <FontAwesomeIcon icon={faCheck} className="mr-4 text-[#2D2180]" />
              Radio Emotion propose une programmation généraliste, privilégiant
              le meilleur des hits des années 70 à nos jours.
            </li>
            <li className="pt-8">
              <FontAwesomeIcon icon={faCheck} className="mr-4 text-[#2D2180]" />
              Nos playlists se composent de plus de 40 % de chansons françaises.
            </li>
            <li className="pt-8">
              <FontAwesomeIcon icon={faCheck} className="mr-4 text-[#2D2180]" />
              Des productions issues de la Fédération Wallonie-Bruxelles sont
              également diffusées quotidiennement.le Play.
            </li>
            <li className="pt-8">
              <FontAwesomeIcon icon={faCheck} className="mr-4 text-[#2D2180]" />
              Nous proposons en moyenne une fois par heure un titre que nous
              qualifions de "découverte" . Il s'agit exclusivement de
              productions qui sont encore peu ou absolument pas connues du grand
              public. Ces nouveaux talents viennent donc côtoyer les autres
              grandes stars dans notre programmation de façon très fréquente.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Part2;
