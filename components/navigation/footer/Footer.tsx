import {
  faAndroid,
  faApple,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faFile, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const Footer = () => {
  console.log("footer");
  return (
    <footer className="bg-[#2D2081] pb-[3rem] text-white ">
      <div className="text-center space-y-6 lg:space-y-0 lg:flex w-full justify-evenly p-6 ">
        <div className="lg:w-3/12 space-y-4">
          <p className="text-lg">RADIO EMOTION</p>
          <p>
            Emotion est la radio indépendante de Braine-L'Alleud / Waterloo /
            Braine-le-Château / Lasne /... ( Brabant Wallon - Belgique ).
            <br />
            Un média de proximité avec vos infos nationales, internationales et
            régionales ...
          </p>
        </div>
        <div className="">
          <p className="text-lg">LIENS</p>
          <div className="flex flex-col pt-4 space-y-2">
            <a
              href={
                "https://apps.apple.com/be/app/radio-emotion-belgique/id1406151362?mt=8"
              }
              target="_blank"
            >
              <FontAwesomeIcon icon={faApple} className="mr-2" /> Application
              IOS
            </a>
            <a
              href={
                "https://play.google.com/store/apps/details?id=com.Radio.Emotion&gl=BE"
              }
              target="_blank"
            >
              <FontAwesomeIcon icon={faAndroid} className="mr-1" /> Application
              Android
            </a>
          </div>
        </div>
        <div className="">
          <p className="text-lg">CONTACT</p>
          <div className="flex flex-col pt-4 space-y-2">
            <a href="mailto:info@radioemotion.be">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              info@radioemotion.be
            </a>
            <a href="tel: 02 318 66 39">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              02 318 66 39
            </a>
            <Link href="/mentionslegales">
              <a>
                <FontAwesomeIcon icon={faFile} className="mr-2" />
                Mentions Legales
              </a>
            </Link>
          </div>
        </div>

        <div className="">
          <p className="text-lg">SUIVEZ-NOUS</p>
          <div className="flex flex-col pt-4 space-y-2">
            <a
              href={
                "https://play.google.com/store/apps/details?id=com.Radio.Emotion&gl=BE"
              }
              target="_blank"
            >
              <FontAwesomeIcon icon={faFacebook} className="mr-1 " />
              Facebook
            </a>
            <a
              href={
                "https://play.google.com/store/apps/details?id=com.Radio.Emotion&gl=BE"
              }
              target="_blank"
            >
              <FontAwesomeIcon icon={faInstagram} className="mr-1" /> Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="bg-[#251A67] text-center py-3 flex justify-center">
        <p>
          Radio Emotion (Queen A.S.B.L) &copy; {new Date().getFullYear()}
          Copyright
        </p>
      </div>
    </footer>
  );
};

export default Footer;
