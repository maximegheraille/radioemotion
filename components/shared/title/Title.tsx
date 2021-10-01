import React from "react";

interface TitleProps {
  title: String;
  article?: boolean;
  className?: string;
}

const Title = ({ title, className = "", article }: TitleProps) => {
  {
    console.log(article);
  }
  return (
    <div>
      <h1
        className={`text-2xl font-bold pb-6 ${
          article === true ? className : "pt-4 lg:pt-10"
        } text-black dark:text-white ${className}`}
      >
        {title}
      </h1>
    </div>
  );
};

export default Title;
