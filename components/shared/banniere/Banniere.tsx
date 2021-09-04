import React from "react";
import Image from "next/image";

interface BannierProps {
  image: StaticImageData;
  className?: string;
}

const Banniere = ({ image, className }: BannierProps) => {
  return (
    <div className=" w-full flex items-center pb-8">
      <Image src={image} className={`${className} rounded-lg`} />
    </div>
  );
};

export default Banniere;
