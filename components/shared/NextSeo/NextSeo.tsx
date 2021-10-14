import Head from "next/head";
import React from "react";
interface NextSeoProps {
  canonical: string;
  title: string;
  description: string;
  image?: string;
}
const NextSeo = ({
  canonical,
  title,
  description,
  image = "",
}: NextSeoProps) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="canonical" href={canonical} key="canonical" />
      <meta name="description" content={description}></meta>
      <meta name="theme-color" content="#000000" />
      <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      {/* og types */}
      <meta property="og:locale" content="be_FR" />
      <meta property="og:title" content={`${title}`} />
      <meta property="og:type" content="URL" />
      <meta property="og:url" content={canonical} />
      <meta
        property="og:image"
        content="https://www.radioemotion.be/mstile-150x150.png"
      />

      {/* twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={`${title}`} />
      <meta property="twitter:description" content={description} />
      <meta
        property="twitter:image"
        content={
          image === ""
            ? "https://www.radioemotion.be/mstile-150x150.png"
            : `${image}`
        }
      />
    </Head>
  );
};

export default NextSeo;
