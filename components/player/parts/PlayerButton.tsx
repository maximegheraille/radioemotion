import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { playerProps } from "../../../interfaces/playerProps";
import usePlayer from "../PlayerHook";

const PlayerButton = ({ volume }: playerProps) => {
  const { data: song, playerRef, playing, setPlaying } = usePlayer();
  const setplayer = () => {
    if (playerRef.current !== null) {
      if (playerRef.current?.paused) {
        playerRef.current.children[0].outerHTML =
          '<source src="https://stream1.dgnet.be/1" type="audio/ogg"></source>';
        playerRef.current.play();
        setPlaying(true);
      } else {
        playerRef.current?.pause();
        playerRef.current.children[0].outerHTML =
          '<source src="" type="audio/ogg"></source>';
        playerRef.current.load();
        setPlaying(false);
      }
    }
  };
  useEffect(() => {
    if (playerRef.current !== null) {
      playerRef.current.volume = volume / 100;
    }
  }, [volume]);
  return (
    <>
      <div className={`${playerRef.current?.paused} lg:mr-2 flex align-middle`}>
        <button
          onClick={() => {
            setplayer();
          }}
          className="hover:outline-none"
        >
          <div
            className={`text-white transition-all duration-300 transform  ${
              playing ? " scale-100" : "scale-0"
            }`}
          >
            <FontAwesomeIcon
              className={`text-white p-1 flex place-content-center ${
                playing ? "block" : "hidden"
              }`}
              size="2x"
              icon={faPause}
            />
          </div>
          <div
            className={`text-white transition-all duration-300 transform ${
              !playing ? "scale-100 " : "scale-0"
            }`}
          >
            <FontAwesomeIcon
              className={`text-white p-1 flex place-content-center ${
                playing ? "hidden" : "block"
              }`}
              size="2x"
              icon={faPlay}
            />
          </div>
          <audio ref={playerRef} preload="none" title={song?.titre}>
            <source src="https://stream1.dgnet.be/1" type="audio/ogg"></source>
            <source src="https://stream1.dgnet.be/1" type="audio/mp3"></source>
          </audio>
        </button>
      </div>
    </>
  );
};

export default PlayerButton;
