import React from "react";
import Image from "next/image";
import part1 from "../../../public/images/presentation/part1.webp";
import apple from "../../../public/images/presentation/apple.svg";
import google from "../../../public/images/presentation/google.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const Part1 = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:pt-12">
      <div className="text-black dark:text-white order-last lg:order-none w-full lg:w-8/12 pr-6">
        <ul className="list-none">
          <li className="pt-8">
            <FontAwesomeIcon icon={faComment} className="mr-4 text-[#D53E3A]" />
            Radio Emotion est la radio indépendante de proximité qui émet au
            départ de Braine-l’Alleud sur le 104.9 FM
          </li>
          <li className="pt-8">
            <FontAwesomeIcon icon={faComment} className="mr-4 text-[#D53E3A]" />
            Radio Emotion se démarque des autres radios de par son implication
            dans l’animation locale et en proposant un choix musical varié et
            cohérent avec son public cible : les 30 – 60 ans.
          </li>
          <li className="pt-8">
            <FontAwesomeIcon icon={faComment} className="mr-4 text-[#D53E3A]" />
            Radio Emotion vous accompagne tout au long de la journée, que ce
            soit dans la région de Braine-l’Alleud sur le 104.9 FM, mais
            également partout ailleurs via nos applications mobiles « Radio
            Emotion Belgique » disponibles sur App Store et Google Play.
            <div className="flex items-center place-content-start pl-8 w-8/12">
              <a
                href="https://apps.apple.com/be/app/radio-emotion-belgique/id1406151362?mt=8"
                target="_blank"
              >
                <Image src={apple} className="w-full" />
              </a>
              <div className="w-[60%] lg:w-[30%]">
                <a
                  href="https://play.google.com/store/apps/details?id=com.Radio.Emotion&gl=BE"
                  target="_blank"
                >
                  <Image src={google} />
                </a>
              </div>
            </div>
          </li>
          <li className="pt-8">
            <FontAwesomeIcon icon={faComment} className="mr-4 text-[#D53E3A]" />
            Vous pouvez également écouter Radio Emotion sur toutes les enceintes
            connectées ( Sonos, Homepod, …. )
          </li>
        </ul>
      </div>
      <div className="">
        <Image src={part1} className="rounded-lg" />
      </div>
    </div>
  );
};

export default Part1;
