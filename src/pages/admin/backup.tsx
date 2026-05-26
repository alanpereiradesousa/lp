import { useState } from "react";
import AdminLayout from "components/admin/AdminLayout";
import { MdCloudDownload, MdCloudUpload, MdWarning } from "react-icons/md";

export default function AdminBackupPage() {
  const [importFile, setImportFile] = useState<File | null>(null);
  const [confirmReplace, setConfirmReplace] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);
  const [loadingImport, setLoadingImport] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleExport = async () => {
    setLoadingExport(true);
    setMessage(null);

    try {
      const response = await fetch("/api/admin/backup/export");
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Falha ao gerar backup.");
      }

      const blob = await response.blob();
      const disposition = response.headers.get("Content-Disposition") || "";
      const match = disposition.match(/filename="(.+)"/);
      const filename = match?.[1] || `backup-${Date.now()}.json`;

      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);

      setMessage({ type: "success", text: "Backup gerado e download iniciado com sucesso." });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Erro ao exportar backup.",
      });
    } finally {
      setLoadingExport(false);
    }
  };

  const handleImport = async () => {
    if (!importFile) {
      setMessage({ type: "error", text: "Selecione um arquivo de backup (.json)." });
      return;
    }

    if (!confirmReplace) {
      setMessage({
        type: "error",
        text: "Marque a confirmação antes de importar o backup.",
      });
      return;
    }

    setLoadingImport(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("backup", importFile);
      formData.append("confirm", "true");

      const response = await fetch("/api/admin/backup/import", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Falha ao importar backup.");
      }

      setMessage({ type: "success", text: data.message });
      setImportFile(null);
      setConfirmReplace(false);
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Erro ao importar backup.",
      });
    } finally {
      setLoadingImport(false);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Backup do banco de dados</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Exporte um arquivo JSON com todos os dados do site ou restaure um backup gerado anteriormente.
        </p>

        {message && (
          <div
            className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
              message.type === "success"
                ? "border-green-300 bg-green-50 text-green-800 dark:border-green-700 dark:bg-green-900/30 dark:text-green-200"
                : "border-red-300 bg-red-50 text-red-800 dark:border-red-700 dark:bg-red-900/30 dark:text-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-6">
          <section className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <MdCloudDownload className="text-2xl text-primary" />
              Exportar backup
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Gera um arquivo <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1 rounded">.json</code> com
              usuários, menu, banner, blog, tarefas, arquivos e demais tabelas do PostgreSQL.
            </p>
            <button
              type="button"
              onClick={handleExport}
              disabled={loadingExport}
              className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-white font-semibold hover:bg-orange-600 disabled:opacity-60 transition"
            >
              <MdCloudDownload />
              {loadingExport ? "Gerando backup..." : "Fazer backup agora"}
            </button>
          </section>

          <section className="rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-amber-900 dark:text-amber-200">
              <MdWarning className="text-2xl" />
              Importar backup
            </h2>
            <p className="text-sm text-amber-900/90 dark:text-amber-100/90 mb-4">
              <strong>Atenção:</strong> esta ação substitui todos os dados atuais do banco pelos dados do arquivo
              enviado. Faça um backup antes de importar.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="backup-file">
                  Arquivo de backup (.json)
                </label>
                <input
                  id="backup-file"
                  type="file"
                  accept=".json,application/json"
                  onChange={(e) => setImportFile(e.target.files?.[0] ?? null)}
                  className="block w-full text-sm text-gray-700 dark:text-gray-200 file:mr-4 file:rounded-lg file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:text-white file:font-semibold hover:file:bg-orange-600"
                />
              </div>

              <label className="flex items-start gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmReplace}
                  onChange={(e) => setConfirmReplace(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  Entendo que os dados atuais do banco serão apagados e substituídos pelo conteúdo deste backup.
                </span>
              </label>

              <button
                type="button"
                onClick={handleImport}
                disabled={loadingImport || !importFile || !confirmReplace}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-white font-semibold hover:bg-red-700 disabled:opacity-60 transition"
              >
                <MdCloudUpload />
                {loadingImport ? "Importando..." : "Importar backup"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
}
