import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faHeart, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import usePlayer from "../PlayerHook";
import { faHeart as faHeart2 } from "@fortawesome/free-regular-svg-icons";
import Apple_music from "../../../public/images/links/Apple_music.svg";
function PlayerLinks() {
  const { data, volume, isLoading, setVolume, refetch } = usePlayer();
  const vote = async (id: number | undefined, voted: boolean | undefined) => {
    const info = await fetch("/api/song/vote", {
      method: "POST",
      body: JSON.stringify({ id: id, voted: voted }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const playing = await info.json();
    if (playing.success) {
      refetch();
    }
  };
  return (
    <>
      <div className="flex items-center">
        <Popover className="relative h-full">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
                ${open ? "" : "text-opacity-90"}
                text-white h-full group bg-orange-700 px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <FontAwesomeIcon
                  icon={faVolumeUp}
                  className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                  aria-hidden="true"
                />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute transform z-10 w-36 px-4 mt-4 -translate-y-14 -translate-x-1/4">
                  <div className="flex transform -rotate-90 -translate-y-14 -translate-x-2">
                    <input
                      type="range"
                      className="w-full"
                      value={volume}
                      onChange={(e) => setVolume(parseInt(e.target.value))}
                      min={0}
                      max={100}
                    />
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <div className={`relative inline-flex align-middle flex-shrink-0 mr-4`}>
          <button
            className={` ${
              data?.voted ? "scale-100" : "scale-0"
            } flex items-center`}
            onClick={() => {
              // setvoted(!voted);
              vote(data?.id, data?.voted);
              //  refetch;
              // data?.votes === 50 ? setVotes(votes + 1) : setVotes(votes - 1);
            }}
          >
            <FontAwesomeIcon
              icon={data?.voted ? faHeart : faHeart2}
              size="2x"
              className={`p-1.5 text-white z-10 ${
                data?.voted ? "text-[#f44336]" : "text-white"
              } `}
              aria-hidden="true"
            />
          </button>
          <span className="text-xs flex items-center text-white absolute top-0 right-0 transform -translate-y-1/2 translate-x-2/4 bg-red-500 rounded-[100px] px-1 h-5">
            {data?.votes}
          </span>
        </div>
        {data?.apple_music === "" ? (
          <span className="w-8"></span>
        ) : (
          <a
            className={`flex items-center  ${
              data?.voted ? "bloc" : "scale-0"
            } m-3`}
            href={data?.apple_music}
            target="_blanc"
          >
            <img src={Apple_music} className={`h-5 w-5 text-white`} />
          </a>
        )}
        {isLoading || data?.youtube === "" ? (
          <span className="w-8"></span>
        ) : (
          <a
            href={data?.youtube}
            target="_blanc"
            className={`${
              data?.youtube === "0" ? "hidden" : "block"
            } flex items-center m-3 text-[#f44336]`}
          >
            <FontAwesomeIcon
              icon={faYoutube}
              size="2x"
              className={`p-1 text-opacity-70
              h-10 w-10 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
              aria-hidden="true"
            />
          </a>
        )}
      </div>
    </>
  );
}

export default PlayerLinks;
