import React from "react";
import Nouveautes from "../components/nouveautes/Nouveautes";
import LazyLoad from "react-lazyload";
import nouveautesban from "../public/images/bannieres/nouveautes.jpg";
import Banniere from "../components/shared/banniere/Banniere";
const nouveautes = () => {
  return (
    <div>
      <LazyLoad>
        <Banniere image={nouveautesban} />
      </LazyLoad>
      <LazyLoad>
        <Nouveautes />
      </LazyLoad>
    </div>
  );
};

export default nouveautes;
