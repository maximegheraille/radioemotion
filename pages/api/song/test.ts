import { NextApiRequest, NextApiResponse } from "next";

const test = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    // if (process.env.local) {
    res.status(200).json({
      titre_id: "5086",
      YouTube: "0",
      titre_label: [
        "https://itunes.apple.com/fr/album/your-latest-trick/id7593643?i=7593713&uo=6&at=10luqD&ct=&mt=1&app=music",
      ],
      titre_photo: "1",
      artiste: "Dire Straits",
      titre: "So Far Away",
      voted: false,
    });
    //}
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default test;
