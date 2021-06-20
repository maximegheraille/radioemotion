import { getCorrectFormat } from "./GetCorrectFormat";

export const getFullDate = (): string => {
  const today = new Date();
  return `${today.getFullYear()}-${getCorrectFormat(
    today.getMonth() + 1
  )}-${getCorrectFormat(today.getDate())}`;
};
