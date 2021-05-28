import { NextApiRequest, NextApiResponse } from "next";
var mysql = require("mysql");
const post = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    var connection = mysql.createConnection({
      host: "localhost",
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    connection.query(
      "SELECT * FROM radioemotion_current_song",
      function (error: any, results: any, _fields: any) {
        if (error) {
          console.log(error);
          res.status(500).json({ response: false, error: true });
        }
        if (results[0].photo === "0") {
          results[0].photo = "";
        } else {
          results[0].photo = `https://www.radioemotion.be/covers/${results[0].id}.jpg`;
        }
        if (results[0].youtube === "0") {
          results[0].youtube = "";
        }
        console.log(
          `call radioemotion_get_voted(${results[0].id}, '${req.connection.remoteAddress}')`
        );
        connection.query(
          `call radioemotion_get_voted(${results[0].id}, '${req.connection.remoteAddress}')`,
          function (error: any, results2: any, _fields: any) {
            console.log(results2[0]);
            console.log(results2[0].length);
            if (error) {
              //throw error;
              results[0].voted = false;
              res.status(200).json(results[0]);
              console.log("error");
              connection.destroy();
            } else if (results2[0].length > 0) {
              console.log(" voted");
              results[0].voted = true;
              res.status(200).json(results[0]);
              connection.destroy();
              return;
            } else {
              console.log("not voted");
              results[0].voted = false;
              res.status(200).json(results[0]);
              connection.destroy();
            }
            console.log(results[0]);
          }
        );
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ response: false, error: true });
  }
};

export default post;
