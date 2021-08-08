import { NextApiRequest, NextApiResponse } from "next";
import { getConnection2 } from "../../connection/connection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection2 = getConnection2();

  if (req.method === "GET") {
    // Process a POST request
    connection2.query(
      `call radioemotion_get_caroussel()`,
      function (error: any, results: any, _fields: any) {
        if (error) {
          console.log(error);
          res.status(500).json({ response: false, error: true });
          connection2.destroy();
          return;
        }
        res.status(200).json(results[0]);
        console.log(connection2.threadId);

        connection2.destroy();
        //connection2.end();
      }
    );
  } else {
    // Handle any other HTTP method
    res.status(500).json({ response: false, error: true });
    connection2.destroy();
  }
}
