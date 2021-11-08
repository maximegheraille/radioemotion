import { emission } from "./../../../../interfaces/emission";
import { getFullTime } from "./../../../../components/shared/datetime/GetFullTime";
import { getConnection2 } from "./../../connection/connection";
import { NextApiRequest, NextApiResponse } from "next";
import { getWeekDayNumber } from "../../../../components/shared/datetime/GetWeekDay";

const post = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const connection = getConnection2();
      connection.query(
        `call radioemotion_get_emissions(${getWeekDayNumber()})`,
        async (err: any, rows: [emission[]], _fields: any) => {
          if (err) {
            res.status(500).json({ response: false, error: true });
            connection.end();
            return;
          }
          rows[0].forEach((row: emission) => {
            row.photo = `https://covers.radioemotion.be${row.photo}.jpg`;
            row.start = row.start.slice(0, -3);
            row.end = row.end.slice(0, -3);
            if (
              row.start < getFullTime() &&
              row.end > getFullTime() &&
              row.livecam === 1
            ) {
              row.is_live = true;
            } else {
              row.is_live = false;
            }
          });
          res.status(200).json(rows[0]);
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

export default post;
