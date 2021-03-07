import prisma from "../../../lib/prisma";

export default async function EnableSingle(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 400;
    return res.send({ success: false, message: "this is POST only" });
  }

  const { name, serial, manufacturer, model, mac, comment } = req.body;

  try {
    const newComputer = await prisma.computer.create({
      data: {
        name: name.trim(),
        serial: serial.trim(),
        manufacturer: manufacturer.trim(),
        model: model.trim(),
        mac: mac.trim(),
        comment: comment
      }
    });

    return res
      .status(201)
      .send({ success: true, computer: newComputer });
  } catch (e) {
    if (e.code === "P2002") {
      return res.send({
        success: false,
        message: `Client exists. See ${e.meta.target}`
      });
    }

    return res.status(400).send({
      success: false,
      code: e.code,
      message: "Error. See error code"
    });
  }
}
