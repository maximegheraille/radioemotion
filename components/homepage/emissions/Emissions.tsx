import React from "react";
import { useQuery } from "react-query";
import Image from "next/image";
import { emission } from "../../../interfaces/emission";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import LoadingState from "../../shared/LoadingState";

const Emissions = () => {
  const {
    data: emissions,
    isLoading,
    isError,
  } = useQuery(
    "emissions",
    async () => {
      const info = await fetch("/api/index/emissions");
      return info.json();
    },
    {
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: true,
      refetchInterval: 3600,
    }
  );

  return (
    <div>
      {isError || isLoading ? (
        <>
          {[...Array(4)].map((emission: emission, index: number) => (
            <div className="flex  mb-5 shadow-lg card" key={index}>
              <LoadingState
                width="w-[100px]"
                heigth="h-[100px]"
                data={emissions}
                isLoading={isLoading}
                isError={isError}
              >
                <Image
                  width="100"
                  height="100"
                  src={emission?.photo}
                  className="rounded-l-lg"
                  alt="Image du présentateur"
                />
              </LoadingState>
              <div className="pl-2 my-2 space-y-4">
                <div className="flex items-center space-x-2">
                  <LoadingState
                    width="w-full"
                    heigth="h-4"
                    data={emission?.nom}
                    isLoading={isLoading}
                    isError={isError}
                  >
                    <p className="text-lg font-semibold">{emission?.nom}</p>
                  </LoadingState>
                  {emission?.is_live && (
                    <button
                      onClick={() =>
                        window.open(
                          "http://srv.radioemotion.be/live/",
                          "_blank",
                          "width=650,height=380"
                        )
                      }
                      aria-label="Ouvrir le player live"
                    >
                      <FontAwesomeIcon
                        icon={faVideo}
                        className="text-[#D53E3A]"
                      />
                    </button>
                  )}
                </div>
                <LoadingState
                  width="w-full"
                  heigth="h-4"
                  classNames="my-3"
                  data={emission?.end}
                  isLoading={isLoading}
                  isError={isError}
                >
                  <p className="text-md">
                    De {emission?.start} à {emission?.end}
                  </p>
                </LoadingState>
                <LoadingState
                  width="w-40"
                  heigth="h-4"
                  data={emission?.animateur_nom}
                  isLoading={isLoading}
                  isError={isError}
                >
                  <p className={`text-sm`}>
                    Présenté par : {emission?.animateur_nom}
                  </p>
                </LoadingState>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {emissions.map((emission: emission, index: number) => (
            <div className="flex shadow-lg mb-5 card" key={index}>
              <Image
                width="100"
                height="100"
                src={emission.photo}
                className="rounded-l-lg"
                alt="Image du présentateur"
              />

              <div className="pl-2 my-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <p className="text-lg font-semibold line-clamp-1">
                    {emission.nom}
                  </p>

                  {emission.is_live && (
                    <button
                      onClick={() =>
                        window.open(
                          "http://srv.radioemotion.be/live/",
                          "_blank",
                          "width=650,height=380"
                        )
                      }
                    >
                      <FontAwesomeIcon
                        icon={faVideo}
                        className="text-[#D53E3A]"
                      />
                    </button>
                  )}
                </div>

                <p className="text-md line-clamp-1">
                  De {emission.start} à {emission.end}
                </p>

                <p className={`text-sm line-clamp-1`}>
                  Présenté par : {emission.animateur_nom}
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Emissions;
