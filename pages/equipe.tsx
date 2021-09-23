import LazyLoad from "react-lazyload";
import Banniere from "../components/shared/banniere/Banniere";
import banequipe from "../public/images/bannieres/equipe.jpg";
import Part1 from "../components/presentation/parts/Part1";
import Part2 from "../components/presentation/parts/Part2";
import Part3 from "../components/presentation/parts/Part3";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { server } from "../config/nextjs";
import { ParsedUrlQuery } from "querystring";
import { Equipe } from "../interfaces/equipe";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faFacebookF,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
interface propsEquipe {
  equipe: Equipe[];
}
//#202938
const equipe = ({ equipe }: propsEquipe) => {
  console.log(equipe.length);
  return (
    <div>
      <LazyLoad>
        <Banniere image={banequipe} />
      </LazyLoad>
      <div className="flex place-content-center flex-row flex-wrap">
        {equipe.map((person: Equipe, index: number) => (
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
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
              )}
              {person.instagram !== "" && (
                <a href={person.instagram} target="_blank">
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
              )}
              {person.facekook !== "" && (
                <a href={person.facekook} target="_blank">
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default equipe;

export const getStaticProps: GetStaticProps = async (
  _context: GetStaticPropsContext<ParsedUrlQuery>
) => {
  const res = await fetch(`${server}/api/equipe`);
  const equipe: Equipe[] = await res.json();
  return {
    props: {
      equipe,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  };
};
