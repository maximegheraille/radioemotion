import React from "react";
import { useQuery } from "react-query";
import Image from "next/image";
import { emission } from "../../../interfaces/emission";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

const Emissions = () => {
  const { data: emissions, isLoading } = useQuery(
    "emissions",
    async () => {
      const info = await fetch("/api/index/emissions");
      return info.json();
    }
    // { refetchOnWindowFocus: false }
  );

  return (
    <div>
      {isLoading ? (
        <p className="text-white">loading</p>
      ) : (
        <>
          {!isLoading &&
            emissions.map((emission: emission, index: number) => (
              <div
                className="flex mb-5 text-black dark:text-white bg-[#E4E7EA] dark:bg-[#1F1F1E] rounded-lg"
                key={index}
              >
                <Image
                  width="100"
                  height="100"
                  src={emission.photo}
                  className="rounded-l-lg"
                />
                <div className="pl-2 py-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <p className="text-lg font-semibold">{emission.nom}</p>
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
                  <p className="text-md">
                    De {emission.start} à {emission.end}
                  </p>
                  <p className="text-sm">
                    Presenté par: {emission.animateur_nom}
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
