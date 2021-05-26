import { NextApiRequest, NextApiResponse } from "next";
import { Song } from "../../../interfaces/song";
var mysql = require("mysql");
const post = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(req.body);
    var connection = mysql.createConnection({
      host: "localhost",
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    if (req.body.voted) {
      connection.query(
        `call delete_vote(${req.body.id},'${req.connection.remoteAddress}')`,
        function (error: any, results: any, _fields: any) {
          if (error) {
            console.log(error);
            //throw error;
            res.status(500).json({ response: false, error: true });
          }
          res.status(200).json({ success: true });
        }
      );
    } else {
      connection.query(
        `call vote(${req.body.id},'${
          req.connection.remoteAddress
        }',${new Date().getDate()})`,
        function (error: any, results: any, _fields: any) {
          if (error) {
            console.log(error);
            //throw error;
            res.status(500).json({ response: false, error: true });
          }
          connection.query(
            `call add_vote(${req.body.id})`,
            function (error: any, results: any, _fields: any) {
              if (error) {
                console.log(error);
                res.status(500).json({ response: false, error: true });
              }
              res.status(200).json({ success: true });
            }
          );
          //res.status(200).json({ success: true });
        }
      );
    }
  } catch (err) {
    //res.status(500).json({ response: false, error: true });
  }
};

export default post;
