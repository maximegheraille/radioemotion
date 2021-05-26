import React from "react";
import PlayerInfos from "./parts/PlayerInfos";
import PlayerButton from "./parts/PlayerButton";
import PlayerLinks from "./parts/PlayerLinks";

const Player = () => {
  return (
    <div className="fixed bottom-0 bg-[#2d2180] dark:bg-[#2d2180] w-full h-12">
      <div className="w-full flex mx-auto h-full max-h-full place-content-between px-8">
        <PlayerInfos />
        <PlayerButton />
        <PlayerLinks />
      </div>
    </div>
  );
};

export default Player;
