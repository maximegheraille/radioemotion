import { emission } from "./../../../../interfaces/emission";
import { getFullTime } from "./../../../../components/shared/datetime/GetFullTime";
import { getConnection2 } from "./../../connection/connection";
import { NextApiRequest, NextApiResponse } from "next";
import { getWeekDayNumber } from "../../../../components/shared/datetime/GetWeekDay";

const post = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      console.log(getWeekDayNumber());
      const connection = getConnection2();
      connection.query(
        `call radioemotion_get_emissions(${getWeekDayNumber()})`,
        async (err: any, rows: [emission[]], _fields: any) => {
          if (err) {
            res.status(500).json({ response: false, error: true });
            connection.destroy();
            return;
          }
          rows[0].forEach((row: emission) => {
            row.photo = `https://www.radioemotion.be${row.photo}.jpg`;
            console.log("livecam" + row.livecam);
            if (
              (row.start < getFullTime() && row.end > getFullTime()) ||
              row.livecam === true
            ) {
              row.is_live = true;
            } else {
              row.is_live = false;
            }
          });
          res.status(200).json(rows[0]);
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

export default post;
