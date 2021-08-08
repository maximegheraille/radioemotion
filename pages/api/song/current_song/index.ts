import { NextApiRequest, NextApiResponse } from "next";
import { getFullDate } from "../../../../components/shared/datetime/GetFullDate";
import { getFullTime } from "../../../../components/shared/datetime/GetFullTime";
import { getConnection, getConnection2 } from "../../connection/connection";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const connection = getConnection();
  const connection2 = getConnection2();

  if (req.method === "GET") {
    // Process a POST request
    connection.query(
      `call radioemotion_get_current_song('${getFullDate()} ${getFullTime()}')`,
      function (error: any, results: any, _fields: any) {
        if (error) {
          res.status(500).json({ response: false, error: true });
          return;
        }
        if (results[0].length === 0) {
          connection2.query(
            `call radioemotion_get_live_emission('${getFullTime()}', '${new Date().getDay()}')`,
            function (error: any, emission: any, _fields: any) {
              if (error) {
                res.status(500).json(error);
                connection2.destroy();
                return;
              }
              res.status(200).json({
                artiste: emission[0][0].EMISSION,
                titre: emission[0][0].Nom,
              });
              connection2.destroy();
            }
          );
        } else {
          // verify if image for song is available
          if (results[0][0].photo === "0") {
            results[0][0].photo = "";
          } else {
            results[0][0].photo = `https://www.radioemotion.be/covers/${results[0][0].id}.jpg`;
          }
          // verify if there is a youtube link
          if (results[0][0].youtube === "0") {
            results[0][0].youtube = "";
          }
          connection.query(
            `call radioemotion_get_voted(${results[0][0].id}, '${req.socket.remoteAddress}')`,
            function (error: any, results2: any, _fields: any) {
              if (error) {
                results[0][0].voted = false;
                res.status(200).json(results[0][0]);
                connection.destroy();
              } else if (results2[0].length > 0) {
                results[0][0].voted = true;
                res.status(200).json(results[0][0]);
                connection.destroy();
                return;
              } else {
                results[0][0].voted = false;
                res.status(200).json(results[0][0]);
                connection.destroy();
              }
            }
          );
        }
      }
    );
  } else {
    // Handle any other HTTP method
    res.status(500).json({ response: false, error: true });
    connection.destroy();
  }
}
