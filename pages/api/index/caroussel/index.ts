import { NextApiRequest, NextApiResponse } from "next";
import { getConnection2 } from "../../connection/connection";

interface Caroussel {
  id: number;
  url: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection2 = getConnection2();

  if (req.method === "GET") {
    connection2.query(
      `call radioemotion_get_caroussel()`,
      function (error: any, results: [Caroussel[]], _fields: any) {
        if (error) {
          res.status(500).json({ response: false, error: true });
          connection2.end();
          return;
        }
        results[0].forEach((caroussel: Caroussel) => {
          caroussel.url = `https://covers.radioemotion.be${caroussel.url}.jpg`;
        });
        res.status(200).json(results[0]);

        connection2.end();
        //connection2.end();
      }
    );
  } else {
    // Handle any other HTTP method
    res.status(500).json({ response: false, error: true });
    connection2.end();
  }
}
