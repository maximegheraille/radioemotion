import { getWeekDayNumber } from "./../../../../components/shared/datetime/GetWeekDay";
import { NextApiRequest, NextApiResponse } from "next";
import { getFullDate } from "../../../../components/shared/datetime/GetFullDate";
import { getFullTime } from "../../../../components/shared/datetime/GetFullTime";
import { getConnection, getConnection2 } from "../../connection/connection";
import requestIp from "request-ip";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const connection = getConnection();
  const connection2 = getConnection2();

  if (req.method === "GET") {
    connection.query(
      `call radioemotion_get_current_song('${getFullDate()} ${getFullTime()}')`,
      function (error: any, results: any, _fields: any) {
        if (error) {
          res.status(500).json({ response: false, error: true });
          connection.end();
          connection2.end();
        } else if (results[0].length === 0) {
          connection2.query(
            `call radioemotion_get_live_emission('${getFullTime()}', '${getWeekDayNumber()}')`,
            function (error: any, emission: any, _fields: any) {
              if (error) {
                res.status(500).json(error);
                connection.end();
                connection2.end();
                return;
              }
              res.status(200).json({
                id: emission[0][0].id,
                artiste: emission[0][0].EMISSION,
                titre: emission[0][0].Nom,
                photo:
                  "https://covers.radioemotion.be/images/radioemotion-logo.png",
                youtube: "",
                voted: "",
                apple_music: "",
              });
              connection.end();
              connection2.end();
            }
          );
        } else {
          // verify if image for song is available
          if (results[0][0].photo === 0) {
            results[0][0].photo = "";
          } else {
            results[0][0].photo = `https://covers.radioemotion.be/${results[0][0].id}.jpg`;
          }
          // verify if there is a youtube link
          if (results[0][0].youtube === "0") {
            results[0][0].youtube = "";
          }
          connection.query(
            `call radioemotion_get_voted(${
              results[0][0].id
            }, '${requestIp.getClientIp(req)}')`,
            function (error: any, results2: any, _fields: any) {
              if (error) {
                results[0][0].voted = false;
                res.status(200).json(results[0][0]);
                connection.end();
                connection2.end();
              } else if (results2[0].length > 0) {
                results[0][0].voted = true;
                res.status(200).json(results[0][0]);
                connection.end();
                connection2.end();
              } else {
                results[0][0].voted = false;
                res.status(200).json(results[0][0]);
                connection.end();
                connection2.end();
              }
            }
          );
        }
      }
    );
  } else {
    // Handle any other HTTP method
    res.status(500).json({ response: false, error: true });
    connection.end();
  }
};
export default handler;
