export const votesFormatter = (votes: number): string | number => {
  if (votes > 999 && votes < 1000000) {
    return (votes / 1000).toFixed(0) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (votes > 1000000) {
    return (votes / 1000000).toFixed(0) + "M"; // convert to M for number from > 1 million
  } else {
    return votes;
  }
};
