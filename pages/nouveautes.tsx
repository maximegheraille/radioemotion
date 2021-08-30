import React from "react";
import Nouveautes from "../components/nouveautes/Nouveautes";
import LazyLoad from "react-lazyload";

const nouveautes = () => {
  return (
    <div>
      <LazyLoad>
        <Nouveautes />
      </LazyLoad>
    </div>
  );
};

export default nouveautes;
