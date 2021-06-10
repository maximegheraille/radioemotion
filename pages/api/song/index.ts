import { NextApiRequest, NextApiResponse } from "next";
import { getFullDate } from "../../../components/shared/datetime/GetFullDate";
import { getFullTime } from "../../../components/shared/datetime/GetFullTime";
import { getWeekDay } from "../../../components/shared/datetime/GetWeekDay";
var mysql = require("mysql");
const post = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    var connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    connection.query(
      `call radioemotion_get_current_song('${getFullDate()} ${getFullTime()}')`,
      function (error: any, results: any, _fields: any) {
        if (error) {
          console.log(error);
          res.status(500).json({ response: false, error: error });
          return;
        }
        if (results[0].length === 0) {
          var connection2 = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME2,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
          });
          connection2.query(
            `call radioemotion_get_live_emission('${getFullTime()}', ${getWeekDay()})`,
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
          if (results[0][0].photo === "0") {
            results[0][0].photo = "";
          } else {
            results[0][0].photo = `https://www.radioemotion.be/covers/${results[0][0].id}.jpg`;
          }
          if (results[0][0].youtube === "0") {
            results[0][0].youtube = "";
          }
          console.log(
            `call radioemotion_get_voted(${results[0][0].id}, '${req.connection.remoteAddress}')`
          );
          connection.query(
            `call radioemotion_get_voted(${results[0][0].id}, '${req.connection.remoteAddress}')`,
            function (error: any, results2: any, _fields: any) {
              console.log(results2);
              if (error) {
                results[0][0].voted = false;
                res.status(200).json(results[0][0]);
                console.log("error");
                connection.destroy();
              } else if (results2[0].length > 0) {
                console.log(" voted");
                results[0][0].voted = true;
                res.status(200).json(results[0][0]);
                connection.destroy();
                return;
              } else {
                console.log("not voted");
                results[0][0].voted = false;
                res.status(200).json(results[0][0]);
                connection.destroy();
              }
              console.log(results[0][0]);
            }
          );
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ response: false, error: true });
    connection.destroy();
  }
};

export default post;
