import { computerSchema } from "validation/schema";
import prisma from "lib/prisma";

export default async function EnableMulti(req, res) {
  if (!req.method === "POST") {
    return res
      .status(400)
      .send({ success: false, message: "this is POST only" });
  }
  if (!req.body.computers || !Array.isArray(req.body.computers)) {
    return res.status(400).send({
      success: false,
      message: "computers has to be an array",
    });
  }
  if (req.body.computers.length < 1) {
    return res.status(201).send({ success: true, count: 0, computers: [] });
  }

  const { computers } = req.body;

  // check each field on required values
  const _err = [];
  const validComputers = [];

  for (let computer of computers) {
    try {
      computerSchema.validateSync(computer);
      let pc = await prisma.computer.create({ data: computer });
      validComputers.push(pc);
    } catch (err) {
      _err.push({
        ...computer,
        errors: err.errors,
      });
    }
  }

  if (_err.length > 0) {
    return res.send({
      success: false,
      message: "Some entries were not processed. check them.",
      computers: _err,
    });
  }

  return res.status(201).json({ success: true, computers: validComputers });

  // return res.status(501).json({success: false, message: 'not implemented'});
}
