import { Info } from "../../../../interfaces/info";
import { NextApiRequest, NextApiResponse } from "next";
import { getConnection2 } from "../../connection/connection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = getConnection2();
  if (req.method === "GET") {
    connection.query(
      `select * from radioemotion_get_all_infos`,
      async (err: any, rows: Info[], _fields: any) => {
        if (err) {
          res.status(500).json({ response: false, error: true });
          connection.end();
          return;
        }
        rows.forEach((info: Info) => {
          info.photo = `https://covers.radioemotion.be/images/infos/${rows[0].id}.jpg`;
        });
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
