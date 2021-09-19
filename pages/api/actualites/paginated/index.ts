import { InfoPaginated } from "../../../../interfaces/info";
import { NextApiRequest, NextApiResponse } from "next";
import { getConnection2 } from "../../connection/connection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = getConnection2();
  if (req.method === "GET") {
    // connection.query(
    //   `select * from radioemotion_actualites_main`,
    //   async (err: any, frows: [InfoPaginated], _fields: any) => {
    //     if (err) {
    //       console.log(err);
    //       res.status(500).json({ response: false, error: true });
    //       connection.destroy();
    //       return;
    //     }
    connection.query(
      `call radioemotion_get_paginated_infos(${
        Number(req.headers.start) === 1
          ? Number(req.headers.start) - 1
          : Number(req.headers.start) * 4 - 4
      }, '4', ${req.headers.exclude_id})`,
      async (err: any, rows: [InfoPaginated[]], _fields: any) => {
        if (err) {
          console.log(err);
          res.status(500).json({ response: false, error: true });
          connection.destroy();
          return;
        }
        rows[0].forEach((row: InfoPaginated) => {
          row.photo = `https://www.radioemotion.be/Images/Infos/${row.id}.jpg`;
        });
        res.status(200).json({
          data: rows[0],
          options: {
            max_page: Math.floor(Number(rows[0][0].hasMore) / 4),
            hasMore: rows[0][0].hasMore > req.body.count ? true : false,
          },
        });
        connection.destroy();
      }
    );
    //   }
    // );
  } else {
    // Handle any other HTTP method
    res.status(500).json({ response: false, error: true });
    connection.destroy();
  }
}