import React from "react";

interface loadingStateProps {
  width: string;
  heigth: string;
  isLoading: boolean;
  isError: boolean;
  children: React.ReactChild;
  classNames?: string;
  data: string | boolean | number | undefined;
  bgColor?: boolean;
}

const LoadingState = ({
  width,
  heigth,
  classNames = "",
  children,
  isLoading,
  isError,
  data,
  bgColor = true,
}: loadingStateProps) => {
  return (
    <>
      {isLoading || isError || data === undefined ? (
        <>
          <span
            className={`${classNames} ${width} ${heigth} ${
              bgColor ? "bg-gray-400" : ""
            } flex place-content-center animate-pulse rounded`}
          ></span>
        </>
      ) : (
        <>
          {data === "" ? (
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
