import { Song } from "../../../interfaces/song";
import { NextApiRequest, NextApiResponse } from "next";
import { getConnection } from "../connection/connection";
import requestIp from "request-ip";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = getConnection();
  if (req.method === "POST") {
    const rows: any = await new Promise((resolve, reject) =>
      connection.query(
        `call radioemotion_get_playlist(${req.body.year},${req.body.month},${req.body.day}, ${req.body.hour}, ${req.body.minute})`,
        async (err: any, rows: [Song[]], _fields: any) => {
          if (err) {
            return reject(err);
          }
          rows[0].forEach((song: Song) => {
            if (song.photo === 0) {
              song.photo = `https://covers.radioemotion.be/emo5.jpg`;
            } else {
              song.photo = `https://covers.radioemotion.be/${song.id}.jpg`;
            }
            // verify if there is a youtube link
            if (song.youtube === "0") {
              song.youtube = "";
            }
          });
          resolve(rows[0]);
        }
      )
    );
    const getIp = async (id: number): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        connection.query(
          `call radioemotion_get_voted(${id}, '${requestIp.getClientIp(req)}')`,
          (err: any, rows: any, _fields: any) => {
            if (err) {
              return reject(err);
            }
            if (rows[0].length > 0) {
              return resolve(true);
            } else {
              return resolve(false);
            }
          }
        );
      });
    };

    const response = await Promise.all(
      rows.map(async (row: Song) => {
        row.voted = await getIp(row.id);
        return row;
      })
    );
    res.status(200).json(response);
    connection.end();
  } else {
    // Handle any other HTTP method
    res.status(500).json({ response: false, error: true });
    connection.end();
  }
}
