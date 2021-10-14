import React, { useState } from "react";
import PlayerInfos from "./parts/PlayerInfos";
import PlayerButton from "./parts/PlayerButton";
import PlayerLinks from "./parts/PlayerLinks";
import Draggable from "react-draggable";

const Player = () => {
  const [volume, setVolume] = useState<number>(100);
  return (
    <div>
      <div
        className={`lg:hidden fixed bottom-0 px-4 lg:px-0 bg-[#2d2180] w-full h-[4.2rem] lg:h-12 z-10`}
      >
        <div className="w-full flex mx-auto h-full max-h-full place-content-between lg:place-self-auto px-1 lg:px-8 border-t-gray-600 border-t-2">
          <PlayerInfos />
          <PlayerButton
            setVolume={setVolume}
            volume={volume}
            className={`${
              typeof window !== "undefined" &&
              window.location.href.includes("app.radioemotion.be")
                ? "hidden"
                : ""
            }`}
          />
          <PlayerLinks setVolume={setVolume} volume={volume} />
        </div>
      </div>
      {typeof window !== "undefined" && (
        <>
          <Draggable
            defaultClassName="hidden lg:block rounded-l-lg right-0 top-[3.2rem]"
            onStop={(DraggableEventHandler) => {
              console.log(DraggableEventHandler);
            }}
            enableUserSelectHack={true}
            cancel=".noDrag"
          >
            <div
              className={`${
                window.innerHeight - 250
              } fixed px-4 lg:px-0 bg-[#2d2180] w-[35rem] h-[4.2rem] lg:h-12 z-50`}
            >
              <div className="w-full flex mx-auto h-full max-h-full place-content-between lg:place-self-auto lg:px-2 top-1">
                <PlayerInfos />
                <PlayerButton
                  setVolume={setVolume}
                  volume={volume}
                  className={`${
                    typeof window !== "undefined" &&
                    window.location.href.includes("app.radioemotion.be")
                      ? "hidden"
                      : ""
                  }`}
                />
                <PlayerLinks setVolume={setVolume} volume={volume} />
              </div>
            </div>
          </Draggable>
        </>
      )}
    </div>
  );
};

export default Player;
