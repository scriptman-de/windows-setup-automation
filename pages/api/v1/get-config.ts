import Handlebars from "handlebars";
import Cors from "cors";
import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";
import initMiddleware from "../../../lib/init-middleware";

const cors = initMiddleware(Cors({ methods: ["POST", "OPTIONS"], origin: "http://www.aulenbach.info"}));

export default async function GetConfig(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  if (req.method !== "GET") return res.status(400).send("this is GET only");

  const {
    query: { mac }
  } = req;

  // load db content
  const computer = await prisma.computer.findUnique({
    where: { mac: mac.toString() }
  });

  if (!computer) {
    return res.status(404).end();
  }

  // produce xmlfile
  const templatepath = path.resolve(
    "./public/unattended.template.hbs"
  );
  const templatefile = fs.readFileSync(templatepath).toString();
  const template = Handlebars.compile(templatefile);
  const unattendedXml = template({ COMPUTERNAME: computer.name });

  return res.send(unattendedXml);
}
