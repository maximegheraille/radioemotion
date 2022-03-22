import React from "react";
import parse, { HTMLReactParserOptions } from "html-react-parser";

interface TextParserProps {
  text: string;
}

const options: HTMLReactParserOptions = {
  replace: (_domNode: any) => {
    // if (domNode.attribs && domNode.attribs.class === "remove") {
    //   return <></>;
    // }
  },
};
const TextParser = ({ text }: TextParserProps) => {
  return <article>{parse(text, options)}</article>;
};
export default TextParser;
