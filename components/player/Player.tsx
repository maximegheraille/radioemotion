import React, { useEffect, useState } from "react";
import PlayerInfos from "./parts/PlayerInfos";
import PlayerButton from "./parts/PlayerButton";
import PlayerLinks from "./parts/PlayerLinks";
const Player = () => {
  const [volume, setVolume] = useState<number>(100);
  const [url, setUrl] = useState<string>("");
  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  return (
    <div
      className={`fixed bottom-0 px-4 lg:px-0 bg-[#2d2180] w-full h-[4.2rem] lg:h-12 z-50`}
    >
      <div className="w-full flex mx-auto h-full max-h-full place-content-between lg:place-self-auto px-1 lg:px-8 border-t-gray-600 border-t-2">
        <PlayerInfos />
        <PlayerButton
          setVolume={setVolume}
          volume={volume}
          className={`${url.includes("app.radioemotion.be") ? "hidden" : ""}`}
        />
        <PlayerLinks setVolume={setVolume} volume={volume} />
      </div>
    </div>
  );
};

export default Player;
