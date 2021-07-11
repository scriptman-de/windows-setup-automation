import prisma from "lib/prisma";
import { HttpResponseComputerCreate, HttpResponseComputerCreateError } from "interfaces";
import { NextApiRequest, NextApiResponse } from "next";

export default async function EnableSingle(
  req: NextApiRequest,
  res: NextApiResponse<HttpResponseComputerCreate|HttpResponseComputerCreateError>
) {
  if (req.method !== "POST") {
    res.statusCode = 400;
    return res.send({ success: false, message: "This is POST only" });
  }

  const { name, serial, uuid, manufacturer, model, mac, comment } = req.body;

  try {
    const newComputer = await prisma.computer.create({
      data: {
        name: name.trim(),
        serial: serial?.trim(),
        uuid: uuid?.trim(),
        manufacturer: manufacturer.trim(),
        model: model.trim(),
        mac: mac.trim(),
        comment: comment,
      },
    });

    return res.status(201).json({ success: true, computer: newComputer });
  } catch (e) {
    if (e.code === "P2002") {
      return res.send({
        success: false,
        message: `Client exists. See ${e.meta.target}`,
      });
    }

    return res.status(400).json({
      success: false,
      message: `Error ${e.code}; ${e.message}`,
    });
  }
}
