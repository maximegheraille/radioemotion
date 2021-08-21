import { Song } from "../../../../interfaces/song";
import { NextApiRequest, NextApiResponse } from "next";
import { getConnection } from "../../connection/connection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = getConnection();
  if (req.method === "GET") {
    const rows: any = await new Promise((resolve, reject) =>
      connection.query(
        "SELECT * FROM radioemotion_new_songs",
        async (err: any, rows: Song[], _fields: any) => {
          if (err) {
            return reject(err);
          }
          rows.forEach((song: Song) => {
            if (song.photo === "0") {
              song.photo = "";
            } else {
              song.photo = `https://www.radioemotion.be/covers/${song.id}.jpg`;
            }
            // verify if there is a youtube link
            if (song.youtube === "0") {
              song.youtube = "";
            }
          });
          resolve(rows);
        }
      )
    );
    const getIp = async (id: number): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        console.log(req.socket.remoteAddress);
        console.log(
          `call radioemotion_get_voted(${id}, '${req.socket.remoteAddress}')`
        );
        connection.query(
          `call radioemotion_get_voted(${id}, '${req.socket.remoteAddress}')`,
          (err: any, rows: any, _fields: any) => {
            console.log("here" + rows[0]);
            if (err) {
              return reject(err);
            }
            console.log(rows[0].length);
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
    connection.destroy();
  } else {
    // Handle any other HTTP method
    res.status(500).json({ response: false, error: true });
    connection.destroy();
  }
}
