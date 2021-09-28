import React from "react";
import LazyLoad from "react-lazyload";
import Banniere from "../components/shared/banniere/Banniere";
import Top30 from "../components/top30/Top30";
import bantop30 from "../public/images/bannieres/top30.jpg";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { server } from "../config/nextjs";
import { Song } from "../interfaces/song";
interface top30Props {
  top30: Song[];
}
const top30 = ({ top30 }: top30Props) => {
  return (
    <div>
      <LazyLoad>
        <Banniere image={bantop30} />
      </LazyLoad>
      <LazyLoad>
        <Top30 top30={top30} />
      </LazyLoad>
    </div>
  );
};

export default top30;
export const getStaticProps: GetStaticProps = async (
  _context: GetStaticPropsContext<ParsedUrlQuery>
) => {
  const res = await fetch(`${server}/api/top30`);
  const top30 = await res.json();
  return {
    props: {
      top30,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  };
};
