import React from "react";
import { useQuery } from "react-query";
import { Info } from "../../../interfaces/info";
import Image from "next/image";
const Infos = () => {
  const {
    data: infos,
    isLoading,
    isError,
  } = useQuery(
    "infos",
    async () => {
      const info = await fetch("/api/index/infos");
      return info.json();
    },
    { refetchOnWindowFocus: false }
  );
  return (
    <div className="lg:flex lg:flex-wrap pb-16">
      {infos &&
        infos.map((info: Info, index: number) => (
          <>
            {index === 0 ? (
              <div
                key={index}
                className="shadow-lg mb-6 mr-14 w-full lg:flex text-center text-black dark:text-white bg-[#E4E7EA] dark:bg-[#1F1F1E] rounded-lg"
              >
                <Image
                  width="430"
                  height="200"
                  src={info?.photo}
                  className="rounded-lg"
                />
                <div className="lg:w-6/12 h-full p-3 place-content-center align-middle justify-center items-center">
                  <p className="text-xl place-content-center items-center flex  font-semibold line-clamp-2">
                    {info?.titre}
                  </p>
                  <p className="hidden lg:flex text-base pt-4 place-content-center items-center line-clamp-2">
                    {info?.preview}
                  </p>
                </div>
              </div>
            ) : (
              <div
                key={index}
                className="shadow-lg mb-6 lg:w-72 lg:mr-7 text-center text-black dark:text-white bg-[#E4E7EA] dark:bg-[#1F1F1E] rounded-lg"
              >
                <Image
                  width="435"
                  height="190"
                  src={info?.photo}
                  className="rounded-lg"
                />
                {/* // flex p-2 font-semibold min-h-[72px] line-clamp-2
                w-full h-full align-middle */}
                <div className="p-2">
                  <p className="text-lg font-semibold line-clamp-2 text-center w-full">
                    {info?.titre}
                  </p>
                </div>
              </div>
            )}
          </>
        ))}
    </div>
  );
};

export default Infos;
