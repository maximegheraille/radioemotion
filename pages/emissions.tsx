import React from "react";
import { Tab } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { AllEmission } from "../interfaces/emission";
import { server } from "../config/nextjs";
import Image from "next/image";

const emissions = ({ emissions }: any) => {
  return (
    <div>
      <div className="w-full max-w-md*/ px-2 pb-16 sm:px-0">
        <Tab.Group defaultIndex={new Date().getDay() - 1}>
          <Tab.List className="flex flex-wrap lg:flex-nowrap p-1 bg-[#2D2180] rounded-xl">
            {Object.keys(emissions).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  `${
                    selected
                      ? "bg-white shadow"
                      : "text-white hover:bg-white/[0.12] hover:text-white"
                  } w-3/12 lg:w-full py-2.5 justify-between lg:justify-self-auto text-sm leading-5 font-medium rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60`
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {Object.values(emissions).map((emissions: any, index) => (
              <Tab.Panel key={index} className="rounded-lg p-3">
                <div className="container mx-auto w-full h-full">
                  {emissions.map((emission: AllEmission, index: number) => (
                    <div
                      className="relative wrap overflow-hidden py-5 lg:py-10 h-full"
                      key={index}
                    >
                      <div className="border-2-2 hidden lg:flex absolute lg:left-2/4 border-opacity-20 border-black dark:border-white h-full border"></div>
                      <div
                        className={`${
                          index % 2 === 0 ? "lg:flex-row-reverse" : ""
                        } mb-8 flex lg:justify-between items-center w-full space-x-2 lg:space-x-0`}
                      >
                        <div className="order-1 lg:w-5/12"></div>
                        <div className="hidden lg:flex z-20 items-center order-1 shadow-xl w-8 h-8 rounded-full bg-[#2D2180]">
                          <FontAwesomeIcon
                            icon={faClock}
                            className="mx-auto font-semibold text-lg text-white"
                          />
                        </div>
                        <div className="card flex-1 lg:flex-none order-1  rounded-lg shadow-xl lg:w-5/12 /*px-6 py-4*/">
                          <div className="w-full text-white dark:text-white text-xl rounded-t-lg text-center bg-[#EF4444] px-6 py-4 ">
                            De {emission.start_time.slice(0, -3)} à{" "}
                            {emission.end_time.slice(0, -3)}
                          </div>
                          <div className="flex flex-col lg:flex-row text-center px-6 py-4">
                            <div className="space-y-6">
                              <Image
                                src={emission.photo}
                                height={150}
                                width={150}
                                className="rounded-full"
                              />
                              <p>Présenté par: {emission.equipe_nom}</p>
                            </div>
                            <div className="order-first lg:order-1 text-base flex-1 px-6 py-4 space-y-6">
                              <h3 className="mb-3 font-bold text-black dark:text-white w-full text-2xl">
                                {emission.emission_name}
                              </h3>
                              <p className="mb-3 text-black dark:text-white whitespace-pre-line">
                                {emission.emission_description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default emissions;
export const getStaticProps: GetStaticProps = async (
  _context: GetStaticPropsContext<ParsedUrlQuery>
) => {
  const res = await fetch(`${server}/api/emissions`);
  const emissions: AllEmission[] = await res.json();
  return {
    props: {
      emissions,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  };
};
