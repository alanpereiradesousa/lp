import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import fs from "fs";
import {
  BACKUP_VERSION,
  importDatabaseBackup,
  type DatabaseBackupPayload,
} from "../../../../lib/backup/databaseBackup";
import { requireAdminApi } from "../../../../lib/backup/requireAdmin";

export const config = {
  api: {
    bodyParser: false,
  },
};

function parseBackupFile(filepath: string): DatabaseBackupPayload {
  const raw = fs.readFileSync(filepath, "utf-8");
  const parsed = JSON.parse(raw) as DatabaseBackupPayload;

  if (!parsed || typeof parsed !== "object" || !parsed.tables) {
    throw new Error("Arquivo de backup inválido.");
  }

  if (parsed.version !== BACKUP_VERSION) {
    throw new Error(`Versão de backup não suportada: ${parsed.version}`);
  }

  return parsed;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Método ${req.method} não permitido.` });
  }

  const session = await requireAdminApi(req, res);
  if (!session) return;

  const form = new IncomingForm({
    maxFileSize: 200 * 1024 * 1024,
  });

  try {
    const { fields, files } = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
      form.parse(req, (err, parsedFields, parsedFiles) => {
        if (err) return reject(err);
        resolve({ fields: parsedFields, files: parsedFiles });
      });
    });

    const confirm = Array.isArray(fields.confirm) ? fields.confirm[0] : fields.confirm;
    if (confirm !== "true") {
      return res.status(400).json({
        message: 'Confirmação obrigatória. Marque "Entendo que os dados atuais serão substituídos".',
      });
    }

    const uploaded = Array.isArray(files.backup) ? files.backup[0] : files.backup;
    if (!uploaded?.filepath) {
      return res.status(400).json({ message: "Envie um arquivo de backup (.json)." });
    }

    const payload = parseBackupFile(uploaded.filepath);
    await importDatabaseBackup(payload);

    return res.status(200).json({
      message: "Backup importado com sucesso. O banco de dados foi restaurado.",
      exportedAt: payload.exportedAt,
    });
  } catch (error) {
    console.error("[backup/import]", error);
    const message =
      error instanceof Error ? error.message : "Erro ao importar backup do banco de dados.";
    return res.status(500).json({ message });
  }
}
