import React from "react";
import { Tab } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { AllEmission } from "../interfaces/emission";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { useQuery } from "react-query";

const emissions = () => {
  const { data, isLoading } = useQuery(
    "emissions_page",
    async () => {
      const request = await fetch("/api/emissions");
      return request.json();
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
        canonical="https://www.radioemotion.be/emissions"
        title="Les Emissions"
        description="Les Emissions sur Radio Emotion"
        openGraph={{
          url: "https://www.radioemotion.be/emissions",
          title: "Les Emissions",
          description: "Les Emissions sur Radio Emotion",
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
      {!isLoading ? (
        <div className="w-full px-2 pb-16 sm:px-0 lg:pt-2">
          <Tab.Group
            defaultIndex={
              new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
            }
          >
            <Tab.List className="flex flex-wrap lg:flex-nowrap p-1 bg-[#2D2180] rounded-xl">
              {data &&
                Object.keys(data).map((category) => (
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
              {data &&
                Object.values(data).map((emission: any, index) => (
                  <Tab.Panel key={index} className="rounded-lg p-3">
                    <div className="container mx-auto w-full h-full">
                      {emission &&
                        emission.map((emission: AllEmission, index: number) => (
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
                              <div className="card flex-1 lg:flex-none order-1  rounded-lg shadow-xl lg:w-5/12">
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
                                      alt="image de l'animateur"
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
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default emissions;
