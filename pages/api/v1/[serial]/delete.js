import prisma from "../../../../lib/prisma";

export default async function DisableSetup(req, res) {
  if (req.method !== "DELETE") {
    res.statusCode = 400;
    return res.send({
      success: false,
      message: "this is DELETE only",
    });
  }

  const {
    query: { serial },
  } = req;

  try {
    const computer = await prisma.computer.delete({
      where: { serial },
    });

    return res.json({ success: true, message: "Client deleted", computer });
  } catch (e) {
    return res
      .status(400)
      .send({ success: false, message: `Error: ${e.message}` });
  }
}
