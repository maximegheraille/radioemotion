import LazyLoad from "react-lazyload";
import Banniere from "../components/shared/banniere/Banniere";
import bantop30 from "../public/images/bannieres/presentation.jpg";
import Part1 from "../components/presentation/parts/Part1";
import Part2 from "../components/presentation/parts/Part2";
import Part3 from "../components/presentation/parts/Part3";
import { NextSeo } from "next-seo";
const presentation = () => {
  return (
    <div>
      <NextSeo
        canonical="https://www.radioemotion.be/presentation"
        title="Présentation de votre radio"
        description="Présentation de votre radio"
        openGraph={{
          url: "https://www.radioemotion.be/presentation",
          title: "Présentation de votre radio",
          description: "Présentation de votre radio",
          images: [
            {
              url: "https://www.radioemotion.be/images/radioemotion-logo.png",
              width: 150,
              height: 150,
              alt: "Logo de Radio Emotion",
              type: "image/png",
            },
            { url: "https://www.radioemotion.be/images/radioemotion-logo.png" },
          ],
          site_name: "Radio Emotion",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
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
