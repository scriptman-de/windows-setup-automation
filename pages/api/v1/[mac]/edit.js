import prisma from '../../../../lib/prisma';

export default async function EditSingle(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 400;
    return res.send({success: false, message: 'this is POST only'});
  }

  const {mac} = req.query;
  const {name, comment, mac: newmac} = req.body;

  try {
    const newComputer = await prisma.computer.update({
      where: {mac},
      data: {
        mac: newmac,
        comment,
        name: name.trim(),
      },
    });

    return res.send({success: true, computer: newComputer});
  } catch (e) {
    if (e.code === 'P2002') {
      return res.send({
        success: false,
        message: `Client exists. See ${e.meta.target}`,
      });
    }

    return res.status(400).send({
      success: false,
      code: e.code,
      message: 'Error. See error code',
    });
  }
}
