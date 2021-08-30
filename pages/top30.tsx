import React from "react";
import LazyLoad from "react-lazyload";
import Top30 from "../components/top30/Top30";
const top30 = () => {
  return (
    <div>
      <LazyLoad>
        <Top30 />
      </LazyLoad>
    </div>
  );
};

export default top30;
