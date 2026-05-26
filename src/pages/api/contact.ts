import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import prisma from "../../../lib/prisma";
import { formatServiceOfInterest } from "../../utils/contactLabels";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_EMAIL =
  process.env.CONTACT_NOTIFY_EMAIL || "alanpereiradesousaads@gmail.com";

const FROM_EMAIL =
  process.env.EMAIL_FROM || "escritório@pereiradesousa.adv.br";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ success: false, message: `Método ${req.method} não permitido.` });
  }

  const { name, email, phone, serviceOfInterest, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Nome, e-mail e mensagem são obrigatórios.",
    });
  }

  const data = {
    name: String(name).trim(),
    email: String(email).trim(),
    phone: phone ? String(phone).trim() : null,
    serviceOfInterest: serviceOfInterest ? String(serviceOfInterest).trim() : null,
    message: String(message).trim(),
  };

  try {
    const newContact = await prisma.contact.create({ data });

    const area = formatServiceOfInterest(data.serviceOfInterest);
    const phoneLine = data.phone ? `<p><strong>Telefone:</strong> ${escapeHtml(data.phone)}</p>` : "";

    const notifyHtml = `
      <h2>Nova mensagem pelo formulário de contato</h2>
      <p><strong>Nome:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(data.email)}</p>
      ${phoneLine}
      <p><strong>Área de interesse:</strong> ${escapeHtml(area)}</p>
      <p><strong>Mensagem:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
      <hr />
      <p style="font-size:12px;color:#666">ID: ${newContact.id} · ${newContact.createdAt.toISOString()}</p>
    `;

    if (process.env.RESEND_API_KEY) {
      const emailTasks = [
        resend.emails.send({
          from: `Pereira de Sousa Associados <${FROM_EMAIL}>`,
          to: NOTIFY_EMAIL,
          replyTo: data.email,
          subject: `[Site] Novo contato: ${data.name}`,
          html: notifyHtml,
        }),
        resend.emails.send({
          from: `Pereira de Sousa Associados <${FROM_EMAIL}>`,
          to: data.email,
          subject: `Confirmação de recebimento — ${data.name}`,
          html: `
            <p>Olá, ${escapeHtml(data.name)}!</p>
            <p>Recebemos sua mensagem com sucesso. Nossa equipe entrará em contato em breve.</p>
            <p>Atenciosamente,<br/>Pereira de Sousa Associados</p>
          `,
        }),
      ];

      const results = await Promise.allSettled(emailTasks);
      results.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error(
            `[api/contact] Falha ao enviar e-mail (${index === 0 ? "notificação" : "confirmação"}):`,
            result.reason
          );
        }
      });
    } else {
      console.warn("[api/contact] RESEND_API_KEY ausente — mensagem salva, e-mails não enviados.");
    }

    return res.status(201).json({
      success: true,
      contact: newContact,
      message: "Mensagem enviada com sucesso!",
    });
  } catch (error) {
    console.error("[api/contact] Erro ao salvar contato:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor ao salvar sua mensagem.",
    });
  }
}
