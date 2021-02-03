import prisma from "../../../../lib/prisma";

/**
 * Is the setup enabled for a given MAC address
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
export default async function EnabledComputerSingle(req, res) {
  if (req.method !== "GET") {
    res.statusCode = 400;
    res.send({ success: false, message: "only serving GET" });
  }

  const {
    query: { mac }
  } = req;

  const computer = await prisma.computer.findUnique({ where: { mac } });

  if (!computer) {
    return res
      .status(404)
      .end({ success: false, message: "no device found" });
  }

  return res.send({ success: true, computer });
}
