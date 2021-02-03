import prisma from "../../../../lib/prisma";

export default async function EnabledComputer(req, res) {
  if (req.method !== "GET") {
    res.statusCode = 400;
    res.send({ success: false, message: "only serving GET" });
  }

  const computers = await prisma.computer.findMany();

  if (!computers) {
    return res
      .status(404)
      .end({ success: false, message: "no devices found" });
  }

  return res.send({ success: true, computers });
}
