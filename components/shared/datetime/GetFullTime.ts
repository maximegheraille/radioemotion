import { getCorrectFormat } from "./GetCorrectFormat";

export const getFullTime = (): string => {
  const today = new Date();
  return `${getCorrectFormat(
    today.getHours()
  )}:${today.getMinutes()}:${getCorrectFormat(today.getSeconds())}`;
};
