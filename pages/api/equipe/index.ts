import { Equipe } from "./../../../interfaces/equipe";
import { NextApiRequest, NextApiResponse } from "next";
import { getConnection2 } from "../connection/connection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = getConnection2();
  if (req.method === "GET") {
    connection.query(
      `select * from radioemotion_get_equipe`,
      async (err: any, rows: Equipe[], _fields: any) => {
        if (err) {
          res.status(500).json({ response: false, error: true });
          connection.destroy();
          return;
        }
        rows.forEach((person: Equipe) => {
          person.photo = `https://covers.radioemotion.be${person.photo}.jpg`;
        });
        res.status(200).json(rows);
        connection.destroy();
      }
    );
  } else {
    // Handle any other HTTP method
    res.status(500).json({ response: false, error: true });
    connection.destroy();
  }
}
