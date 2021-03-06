import { Agenda } from "./../../../../interfaces/agenda";
import { NextApiRequest, NextApiResponse } from "next";
import { getConnection2 } from "../../connection/connection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = getConnection2();
  if (req.method === "GET") {
    connection.query(
      `select * from radioemotion_get_all_agenda`,
      async (err: any, rows: Agenda[], _fields: any) => {
        if (err) {
          console.log(err);
          res.status(500).json({ response: false, error: true });
          connection.end();
          return;
        }
        res.status(200).json(rows);
        connection.end();
      }
    );
  } else {
    // Handle any other HTTP method
    res.status(500).json({ response: false, error: true });
    connection.end();
  }
}
