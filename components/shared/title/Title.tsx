import React from "react";

interface TitleProps {
  title: String;
  className?: string;
}

const Title = ({ title, className = "" }: TitleProps) => {
  return (
    <div>
      <h1
        className={`${className} text-2xl font-bold pb-6 pt-12 text-black dark:text-white`}
      >
        {title}
      </h1>
    </div>
  );
};

export default Title;
