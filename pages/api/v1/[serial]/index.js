import prisma from "../../../../lib/prisma";

/**
 * Is the setup enabled for a given MAC address
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
export default async function ComputerInfo(req, res) {
  // ====================================================
  // GET
  if (req.method === "GET") {
    const {
      query: { serial },
    } = req;

    const computer = await prisma.computer.findUnique({ where: { serial } });

    if (!computer) {
      return res
        .status(404)
        .end({ success: false, message: "no device found" });
    }

    return res.send({ success: true, computer });
  }

  // ====================================================
  // POST
  if (req.method === "POST" || req.method === "PUT") {
  }

  // ====================================================
  // OTHER
  return res.status(400).end();
}
