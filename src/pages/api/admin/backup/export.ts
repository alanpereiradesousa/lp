import type { NextApiRequest, NextApiResponse } from "next";
import { exportDatabaseBackup } from "../../../../lib/backup/databaseBackup";
import { requireAdminApi } from "../../../../lib/backup/requireAdmin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: `Método ${req.method} não permitido.` });
  }

  const session = await requireAdminApi(req, res);
  if (!session) return;

  try {
    const backup = await exportDatabaseBackup();
    const filename = `backup-pereira-de-sousa-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    return res.status(200).send(JSON.stringify(backup, null, 2));
  } catch (error) {
    console.error("[backup/export]", error);
    return res.status(500).json({ message: "Erro ao gerar backup do banco de dados." });
  }
}
