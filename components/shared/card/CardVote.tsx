interface CardVote {
  id: number | undefined;
  voted: boolean | undefined;
}

const vote = async (values: CardVote): Promise<Response> => {
  return await fetch("/api/song/vote", {
    method: "PATCH",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export default vote;
