import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";
import initMiddleware from "../../../lib/init-middleware";

const cors = initMiddleware(
  Cors({ methods: ["DELETE", "OPTIONS"], origin: "*" })
);

export default async function Unattend(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  const {
    body: { computers },
  } = req;

  const _err = [];

  for (const computer of computers) {
    try {
      const deletedCount = await prisma.computer.deleteMany({
        where: {
          serial: {
            in: computers,
          },
        },
      });

      return res.send({ success: true, ...deletedCount });
    } catch (e) {
      _err.push({ computer, message: e.message });
    }
  }

  return res.status(500).send({ success: false });
}
