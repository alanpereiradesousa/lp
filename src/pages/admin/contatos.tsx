import AdminLayout from "components/admin/AdminLayout";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { MdDelete, MdEmail, MdPhone } from "react-icons/md";
import prisma from "../../../lib/prisma";
import { formatServiceOfInterest } from "../../utils/contactLabels";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  serviceOfInterest: string | null;
  message: string;
  createdAt: string;
}

interface ContatosPageProps {
  contacts: ContactMessage[];
}

export const getServerSideProps: GetServerSideProps<ContatosPageProps> = async () => {
  const rows = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });

  return {
    props: {
      contacts: JSON.parse(JSON.stringify(rows)),
    },
  };
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export default function AdminContatosPage({ contacts: initialContacts }: ContatosPageProps) {
  const { data: session, status } = useSession();
  const [contactList, setContactList] = useState(initialContacts);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir esta mensagem permanentemente?")) return;

    setDeletingId(id);
    setError(null);

    try {
      const response = await fetch("/api/crud/contacts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Erro ao excluir.");
      }

      const updated = await response.json();
      setContactList(updated);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao excluir mensagem.");
    } finally {
      setDeletingId(null);
    }
  };

  if (status === "loading") {
    return (
      <AdminLayout>
        <p className="text-center mt-8">Carregando...</p>
      </AdminLayout>
    );
  }

  if (status === "authenticated" && (session?.user as { role?: string })?.role !== "ADMIN") {
    return (
      <AdminLayout>
        <p className="text-center mt-8 text-red-600">Acesso não autorizado.</p>
        <p className="text-center">
          <Link href="/" className="text-primary underline">
            Voltar ao site
          </Link>
        </p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Mensagens de contato
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Formulário &quot;Entre em contato conosco&quot; da página inicial e da seção de contato.
        </p>

        {error && (
          <p className="mb-4 p-3 rounded-lg bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200">
            {error}
          </p>
        )}

        {contactList.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">Nenhuma mensagem recebida ainda.</p>
        ) : (
          <ul className="space-y-4">
            {contactList.map((contact) => (
              <li
                key={contact.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {contact.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {formatDate(contact.createdAt)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(contact.id)}
                    disabled={deletingId === contact.id}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg disabled:opacity-50"
                    title="Excluir mensagem"
                  >
                    <MdDelete className="text-lg" />
                    {deletingId === contact.id ? "Excluindo..." : "Excluir"}
                  </button>
                </div>

                <div className="flex flex-wrap gap-4 text-sm mb-4">
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    <MdEmail />
                    {contact.email}
                  </a>
                  {contact.phone && (
                    <a
                      href={`tel:${contact.phone.replace(/\D/g, "")}`}
                      className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:underline"
                    >
                      <MdPhone />
                      {contact.phone}
                    </a>
                  )}
                  <span className="text-gray-600 dark:text-gray-400">
                    Área: {formatServiceOfInterest(contact.serviceOfInterest)}
                  </span>
                </div>

                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
                  {contact.message}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminLayout>
  );
}
