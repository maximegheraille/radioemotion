import React from "react";

interface TitleProps {
  title: String;
  className?: string;
}

const Title = ({ title, className = "" }: TitleProps) => {
  return (
    <div>
      <h1
        className={`text-2xl font-bold pb-6 pt-4 lg:pt-10 text-black dark:text-white ${className}`}
      >
        {title}
      </h1>
    </div>
  );
};

export default Title;
