import React, { HTMLAttributes } from "react";

interface loadingStateProps {
  width: string;
  heigth: string;
  isLoading: boolean;
  isError: boolean;
  children: React.ReactChild;
  classNames?: string;
  data: string | boolean | undefined;
  bgColor?: boolean;
}

const LoadingState = ({
  width,
  heigth,
  classNames,
  children,
  isLoading,
  isError,
  data,
  bgColor = true,
}: loadingStateProps) => {
  return (
    <>
      {isLoading || isError ? (
        <span
          className={`${classNames} ${width} ${heigth} ${
            bgColor ? "bg-white" : ""
          } animate-pulse rounded `}
        ></span>
      ) : (
        <>
          {data === undefined ? (
            <span className={`${classNames} ${width} ${heigth}`}></span>
          ) : (
            children
          )}
        </>
      )}
    </>
  );
};

export default LoadingState;
