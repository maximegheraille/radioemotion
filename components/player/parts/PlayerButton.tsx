import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import usePlayer from "../PlayerHook";

const PlayerButton = () => {
  const { playing, setPlaying } = usePlayer();
  return (
    <>
      <div className="mr-2 flex align-middle">
        <button
          onClick={() => {
            setPlaying(!playing);
          }}
        >
          <div
            className={`text-white transition-all duration-300 transform ${
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
        </button>
      </div>
    </>
  );
};

export default PlayerButton;
