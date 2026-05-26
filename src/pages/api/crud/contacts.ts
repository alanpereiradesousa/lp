import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || (session.user as { role?: string })?.role !== "ADMIN") {
    return res.status(401).json({ message: "Acesso não autorizado." });
  }

  if (req.method === "GET") {
    try {
      const contacts = await prisma.contact.findMany({
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json(contacts);
    } catch (error) {
      console.error("[api/crud/contacts] GET:", error);
      return res.status(500).json({ message: "Erro ao buscar mensagens." });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "ID é obrigatório." });
    }

    try {
      await prisma.contact.delete({ where: { id } });
      const contacts = await prisma.contact.findMany({
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json(contacts);
    } catch (error) {
      console.error("[api/crud/contacts] DELETE:", error);
      return res.status(500).json({ message: "Erro ao excluir mensagem." });
    }
  }

  res.setHeader("Allow", ["GET", "DELETE"]);
  return res.status(405).json({ message: `Método ${req.method} não permitido.` });
}
