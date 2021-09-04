import React from "react";
import LazyLoad from "react-lazyload";
import Banniere from "../components/shared/banniere/Banniere";
import Votes from "../components/votes/Votes";
import votes from "../public/images/bannieres/votes.jpg";
const votes2021 = () => {
  return (
    <div>
      <LazyLoad>
        <Banniere image={votes} />
      </LazyLoad>
      <LazyLoad>
        <Votes />
      </LazyLoad>
    </div>
  );
};

export default votes2021;
