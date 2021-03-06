import { Info } from "../../../../interfaces/info";
import { getConnection2 } from "../../connection/connection";
import { NextApiRequest, NextApiResponse } from "next";

const Infos = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const connection = getConnection2();
      connection.query(
        `select * from radioemotion_get_infos`,
        async (err: any, rows: Info[], _fields: any) => {
          if (err) {
            res.status(500).json({ response: false, error: true });
            connection.end();
            return;
          }
          rows.forEach((row: Info) => {
            row.photo = `https://covers.radioemotion.be/Images/Infos/${row.id}.jpg`;
          });
          res.status(200).json(rows);
          connection.end();
        }
      );
    } catch (err) {
      res.status(500).json({ response: false, error: true });
    }
  } else {
    res.status(500).json({ response: false, error: true });
  }
};

export default Infos;
