import { NextApiRequest, NextApiResponse } from "next";

import nc from "next-connect";

const handler = nc().get(async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getBearerToken();
  const searchUrl = `${API_BASE}/search?q=${req.params.search}&type=artist&limit=10`;
  const bandInfoRequest = await fetch(searchUrl, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
});
