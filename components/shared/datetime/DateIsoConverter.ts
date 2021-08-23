export const DateIsoConverter = (datetime: string): string => {
  var date = new Date(`${datetime}`);
  return `${date.getUTCDay()}-${
    date.getUTCMonth() + 1
  }-${date.getUTCFullYear()}`;
};
