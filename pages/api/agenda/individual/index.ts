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
      `call radioemotion_get_one_agenda(${req.headers.id})`,
      async (err: any, rows: [Agenda[]], _fields: any) => {
        if (err) {
          res.status(500).json({ response: false, error: true });
          connection.end();
          return;
        }
        if (rows[0][0] === undefined) {
          res.status(200).json({});
        } else {
          rows[0][0].photo = `https://covers.radioemotion.be/images/agenda/${rows[0][0].id}.jpg`;
          res.status(200).json(rows[0][0]);
        }
        connection.end();
      }
    );
  } else {
    // Handle any other HTTP method
    res.status(500).json({ response: false, error: true });
    connection.end();
  }
}
