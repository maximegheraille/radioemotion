import { Info } from "../../../../interfaces/info";
import { NextApiRequest, NextApiResponse } from "next";
import { getConnection2 } from "../../connection/connection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = getConnection2();
  if (req.method === "GET") {
    console.log(req.headers.id);
    connection.query(
      `call radioemotion_get_one_info(${req.headers.id})`,
      async (err: any, rows: [Info[]], _fields: any) => {
        if (err) {
          res.status(500).json({ response: false, error: true });
          connection.destroy();
          console.log(err);
          return;
        }
        console.log(rows);
        rows[0][0].photo = `https://www.radioemotion.be/images/infos/${rows[0][0].id}.jpg`;
        res.status(200).json(rows[0][0]);
        connection.destroy();
      }
    );
  } else {
    // Handle any other HTTP method
    res.status(500).json({ response: false, error: true });
    connection.destroy();
  }
}
