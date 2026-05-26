import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export async function requireAdminApi(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || (session.user as { role?: string })?.role !== "ADMIN") {
    res.status(401).json({ message: "Acesso não autorizado." });
    return null;
  }

  return session;
}
