import prisma from '../../../lib/prisma';

export default async function EnabledComputer(req, res) {
  if (req.method !== 'GET') {
    return res.status(400).end();
  }

  const computers = await prisma.computer.findMany();

  if (!computers) {
    return res.status(404).end();
  }

  return res.send({success: true, computers});
}
