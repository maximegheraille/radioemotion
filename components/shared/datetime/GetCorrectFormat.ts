export const getCorrectFormat = (data: number) => {
  return `${data < 10 ? `0${data}` : data}`;
};
