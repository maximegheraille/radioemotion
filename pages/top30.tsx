import React from "react";
import LazyLoad from "react-lazyload";
import Banniere from "../components/shared/banniere/Banniere";
import Top30 from "../components/top30/Top30";
import bantop30 from "../public/images/bannieres/top30.jpg";

const top30 = () => {
  return (
    <div>
      <LazyLoad>
        <Banniere image={bantop30} />
      </LazyLoad>
      <LazyLoad>
        <Top30 />
      </LazyLoad>
    </div>
  );
};

export default top30;

//   return {
//     props: {
//       top30,
//     },
//   };
// };
