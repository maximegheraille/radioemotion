export const DateIsoConverter = (datetime: string): string => {
  var date = new Date(`${datetime}`);
  return `${date.getDate()}-${date.getUTCMonth() + 1}-${date.getUTCFullYear()}`;
};
