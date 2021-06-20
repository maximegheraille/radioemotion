import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
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
          title={`${playing ? "Arreter la musique" : "Lancer la musique"}`}
          aria-label={`${playing ? "Arreter la musique" : "Lancer la musique"}`}
          className="pr-2 lg:pr-0 my-2 group"
          //   style={{ outline: "0px auto transparent" }}
        >
          <div
            className={`text-white transition-all duration-300 transform  ${
              playing ? " scale-100" : "scale-0"
            }`}
          >
            <FontAwesomeIcon
              className={`text-white p-1 flex place-content-center  ${
                playing ? "block" : "hidden"
              }`}
              size="2x"
              icon={faPause}
              aria-hidden="true"
            />
          </div>
          <div
            className={`text-white transition-all duration-300 transform ${
              !playing ? "scale-100 " : "scale-0"
            }`}
          >
            <FontAwesomeIcon
              className={`text-white p-1 flex place-content-center  group-focus:rounded-sm  ${
                playing ? "hidden" : "block"
              }`}
              size="2x"
              icon={faPlay}
              aria-hidden="true"
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
