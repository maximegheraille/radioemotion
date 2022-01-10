import { NextApiRequest, NextApiResponse } from "next";

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

    if (req.body.voted) {
      connection.query(
        `call radioemotion_delete_vote(${req.body.id},'${req.socket.remoteAddress}')`,
        function (error: any, _results: any, _fields: any) {
          if (error) {
            res.status(500).json({ response: false, error: true });
            return;
          }
          res.status(200).json({ success: true });
        }
      );
    } else {
      connection.query(
        `call radioemotion_add_vote(${req.body.id},'${
          req.connection.remoteAddress
        }',${new Date().getDate()})`,
        function (error: any, _results: any, _fields: any) {
          console.log(req.connection.remoteAddress);
          console.log(req.headers["x-real-ip"]);
          if (error) {
            res.status(500).json({ response: false, error: true });
            return;
          }
          res.status(200).json({ success: true });
        }
      );
    }
  } catch (err) {
    res.status(500).json({ response: false, error: true });
  }
};

export default post;
