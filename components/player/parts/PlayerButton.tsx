import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { playerProps } from "../../../interfaces/playerProps";
import usePlayer from "../PlayerHook";

const PlayerButton = ({ volume, className }: playerProps) => {
  const { data: song, playerRef, playing, setPlaying } = usePlayer();
  const setplayer = () => {
    if (playerRef.current !== null) {
      if (playerRef.current?.paused) {
        playerRef.current.children[0].outerHTML =
          '<source src="https://stream1.dgnet.be/1" type="audio/ogg"></source>   <source src="https://stream1.dgnet.be/1" type="audio/mp3"></source>';
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
  useEffect(() => {
    if ("mediaSession" in navigator && song !== undefined) {
      navigator.mediaSession.setActionHandler("pause", function () {
        if (playerRef.current) {
          playerRef.current?.pause();
          playerRef.current.children[0].outerHTML =
            '<source src="" type="audio/ogg"></source>';

          playerRef.current.children[1].outerHTML =
            ' <source src="" type="audio/mp3"></source>';

          playerRef.current.load();
          setPlaying(false);
        }
      });
      navigator.mediaSession.setActionHandler("play", function () {
        if (playerRef.current) {
          playerRef.current.children[0].outerHTML =
            '<source src="https://stream1.dgnet.be/1" type="audio/ogg"></source>';
          playerRef.current.children[1].outerHTML =
            ' <source src="https://stream1.dgnet.be/1" type="audio/mp3"></source>';
          playerRef.current.play();
          setPlaying(true);
        }
      });
    }
  }, [playerRef.current?.paused]);

  useEffect(() => {
    if ("mediaSession" in navigator && song !== undefined) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: song?.titre,
        artist: song?.artiste,
        artwork: [
          {
            src: song?.photo!.toString(),
          },
        ],
      });
    }
  }, [song?.titre]);
  return (
    <>
      <div className={`lg:mr-2 flex align-middle lg:w-[2%] ${className}`}>
        <button
          onClick={() => {
            setplayer();
          }}
          title={`${playing ? "Arreter la musique" : "Lancer la musique"}`}
          aria-label={`${playing ? "Arreter la musique" : "Lancer la musique"}`}
          className="pr-2 lg:pr-0 group"
        >
          <div
            className={`text-white transition-all duration-300 transform  ${
              playing ? " scale-100 block" : "scale-0 hidden"
            }`}
          >
            <FontAwesomeIcon
              className={`text-white p-1 flex place-content-center  ${
                playing ? "" : ""
              }`}
              size="2x"
              icon={faPause}
              aria-hidden="true"
            />
          </div>
          <div
            className={`text-white transition-all duration-300 transform ${
              !playing ? "scale-100 block" : "scale-0 hidden"
            }`}
          >
            <FontAwesomeIcon
              className={`text-white p-1 flex place-content-center  group-focus:rounded-sm  ${
                playing ? "" : ""
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
