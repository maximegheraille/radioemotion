import React, { useState } from "react";
import PlayerInfos from "./parts/PlayerInfos";
import PlayerButton from "./parts/PlayerButton";
import PlayerLinks from "./parts/PlayerLinks";
const Player = () => {
  const [volume, setVolume] = useState<number>(100);

  return (
    <div className="fixed bottom-0 bg-[#2d2180] w-full h-12 z-50">
      <div className="w-full flex mx-auto h-full max-h-full place-content-between px-1 lg:px-8 border-t-gray-600 border-t-2">
        <PlayerInfos />
        <PlayerButton setVolume={setVolume} volume={volume} />
        <PlayerLinks setVolume={setVolume} volume={volume} />
      </div>
    </div>
  );
};

export default Player;
