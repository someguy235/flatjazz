import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc()
  .get((req: NextApiRequest, res: NextApiResponse) => {
    res.json({ message: "ok" });
  })
  .post((req, res) => {});

export default handler;

// export default (req: Http2ServerRequest, res: Http2ServerResponse) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "application/json");
//   res.end(JSON.stringify({ message: "hello" }));
// };
