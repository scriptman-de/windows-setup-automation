import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { HttpResponseComputerEnabled } from "interfaces";

export default async function EnabledComputer(
  req: NextApiRequest,
  res: NextApiResponse<HttpResponseComputerEnabled>
) {
  if (req.method !== "GET") {
    return res.status(400).end("this is GET only");
  }

  const computers = await prisma.computer.findMany();

  if (!computers) {
    return res.status(404).end();
  }

  return res.send({ success: true, computers });
}
