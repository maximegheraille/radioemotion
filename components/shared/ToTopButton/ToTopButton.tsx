import { faArrowAltCircleUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ToTopButton = () => {
  return (
    <button
      className="fixed left-[90vw] top-[90vh]"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      aria-label="Remonter au haut de la page"
    >
      <FontAwesomeIcon
        icon={faArrowAltCircleUp}
        className="text-[#bfbfbf]"
        size="2x"
      />
    </button>
  );
};

export default ToTopButton;
