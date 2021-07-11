import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";
import { HttpResponseComputerDeleteMany, HttpResponseComputerDeleteManyError} from "interfaces";

import prisma from "lib/prisma";
import initMiddleware from "lib/init-middleware";

const cors = initMiddleware(
  Cors({ methods: ["DELETE", "OPTIONS"], origin: "*" })
);

export default async function DeleteComputer(
  req: NextApiRequest,
  res: NextApiResponse<HttpResponseComputerDeleteMany|HttpResponseComputerDeleteManyError>
) {
  await cors(req, res);

  const {
    body: { computers },
  } = req;

  const _err = [],
    _deleted = [];

  for (const computer of computers) {
    try {
      await prisma.computer.delete({
        where: {
          serial: computer,
        },
      });

      _deleted.push(computer);
    } catch (e) {
      _err.push({ computer, message: e.message });
    }
  }

  if (_deleted.length > 0) {
    return res.json({
      success: true,
      deleted: _deleted,
      errors: _err,
    });
  }

  return res.status(500).send({ success: false, message: `Allgemeiner Fehler` });
}
