import { getWeekDayNumber } from "./../../../../components/shared/datetime/GetWeekDay";
import { NextApiRequest, NextApiResponse } from "next";
import { getFullDate } from "../../../../components/shared/datetime/GetFullDate";
import { getFullTime } from "../../../../components/shared/datetime/GetFullTime";
import { getConnection, getConnection2 } from "../../connection/connection";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const connection = getConnection();
  const connection2 = getConnection2();

  if (req.method === "GET") {
    // Process a POST request
    connection.query(
      `call radioemotion_get_current_song('${getFullDate()} ${getFullTime()}')`,
      function (error: any, results: any, _fields: any) {
        if (error) {
          res.status(500).json({ response: false, error: true });
          connection.end();
        } else if (results[0].length === 0) {
          connection2.query(
            `call radioemotion_get_live_emission('${getFullTime()}', '${getWeekDayNumber()}')`,
            function (error: any, emission: any, _fields: any) {
              if (error) {
                res.status(500).json(error);
                connection2.end();
                return;
              }
              res.status(200).json({
                id: emission[0][0].id,
                artiste: emission[0][0].EMISSION,
                titre: emission[0][0].Nom,
                photo: "/images/RadioEmotion-logo.png",
                youtube: "",
                voted: "",
                apple_music: "",
              });
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
            `call radioemotion_get_voted(${results[0][0].id}, '${req.socket.remoteAddress}')`,
            function (error: any, results2: any, _fields: any) {
              if (error) {
                results[0][0].voted = false;
                res.status(200).json(results[0][0]);
                connection.end();
              } else if (results2[0].length > 0) {
                results[0][0].voted = true;
                res.status(200).json(results[0][0]);
                connection.end();
                return;
              } else {
                results[0][0].voted = false;
                res.status(200).json(results[0][0]);
                connection.end();
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
