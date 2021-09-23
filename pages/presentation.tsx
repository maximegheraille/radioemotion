import LazyLoad from "react-lazyload";
import Banniere from "../components/shared/banniere/Banniere";
import bantop30 from "../public/images/bannieres/presentation.jpg";
import Part1 from "../components/presentation/parts/Part1";
import Part2 from "../components/presentation/parts/Part2";
import Part3 from "../components/presentation/parts/Part3";
const presentation = () => {
  return (
    <div>
      <LazyLoad>
        <Banniere image={bantop30} />
      </LazyLoad>
      <LazyLoad>
        <Part1 />
      </LazyLoad>
      <LazyLoad>
        <Part2 />
      </LazyLoad>
      <LazyLoad>
        <Part3 />
      </LazyLoad>
    </div>
  );
};

export default presentation;
