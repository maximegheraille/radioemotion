import { NextApiRequest, NextApiResponse } from "next";
import { getConnection2 } from "../../connection/connection";
import { Agenda } from "../../../../interfaces/agenda";

const agenda = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const connection = getConnection2();
      connection.query(
        `select * from radioemotion_get_agenda`,
        async (err: any, rows: Agenda[], _fields: any) => {
          if (err) {
            res.status(500).json({ response: false, error: true });
            connection.destroy();
            return;
          }
          rows.forEach((row: Agenda) => {
            row.photo = `https://www.radioemotion.be/Images/Agenda/${row.id}.jpg`;
          });
          res.status(200).json(rows);
          connection.destroy();
        }
      );
    } catch (err) {
      res.status(500).json({ response: false, error: true });
    }
  } else {
    res.status(500).json({ response: false, error: true });
  }
};

export default agenda;
