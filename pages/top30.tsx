//import { GetStaticProps, InferGetServerSidePropsType } from "next";
import React from "react";
import LazyLoad from "react-lazyload";
import Top30 from "../components/top30/Top30";
//import { server } from "../config/nextjs";
//import { Song } from "../interfaces/song";
const top30 = (/*{
  top30,
}: InferGetServerSidePropsType<typeof getServerSideProps>*/) => {
  return (
    <div>
      <LazyLoad>
        <Top30 /*top30={top30} */ />
      </LazyLoad>
    </div>
  );
};

export default top30;
// export const getServerSideProps: GetStaticProps = async (_context) => {
//   const res = await fetch(`${server}/api/top30`);
//   const top30: Song[] = await res.json();
//   console.log(top30);
//   console.log("ss");

//   return {
//     props: {
//       top30,
//     },
//   };
// };
