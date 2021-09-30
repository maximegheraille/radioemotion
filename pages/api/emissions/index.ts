import { AllEmission } from "./../../../interfaces/emission";
import { NextApiRequest, NextApiResponse } from "next";
import { getConnection2 } from "../connection/connection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = getConnection2();
  if (req.method === "GET") {
    connection.query(
      `select * from radioemotion_get_all_emissions`,
      async (err: any, rows: AllEmission[], _fields: any) => {
        if (err) {
          res.status(500).json({ response: false, error: true });
          connection.destroy();
          console.log(err);
          return;
        }
        rows.forEach((person: AllEmission) => {
          person.photo = `https://www.radioemotion.be${person.photo}.jpg`;
        });
        res.status(200).json({
          lundi: rows.filter((person) => person.jour_id === 1),
          mardi: rows.filter((person) => person.jour_id === 2),
          mercredi: rows.filter((person) => person.jour_id === 3),
          jeudi: rows.filter((person) => person.jour_id === 4),
          vendredi: rows.filter((person) => person.jour_id === 5),
          samedi: rows.filter((person) => person.jour_id === 6),
          dimanche: rows.filter((person) => person.jour_id === 7),
        });
        connection.destroy();
      }
    );
  } else {
    // Handle any other HTTP method
    res.status(500).json({ response: false, error: true });
    connection.destroy();
  }
}
