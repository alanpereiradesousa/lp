import prisma from "../../../lib/prisma";

export const BACKUP_VERSION = 1;

export type DatabaseBackupPayload = {
  version: number;
  exportedAt: string;
  tables: {
    user: unknown[];
    account: unknown[];
    session: unknown[];
    verificationToken: unknown[];
    menu: unknown[];
    banner: unknown[];
    homepageSection: unknown[];
    testimonial: unknown[];
    faq: unknown[];
    colecao: unknown[];
    colecaoItem: unknown[];
    site: unknown[];
    subscriber: unknown[];
    task: unknown[];
    comment: unknown[];
    file: unknown[];
    message: unknown[];
    projetos: unknown[];
    projetoFoto: unknown[];
    contact: unknown[];
    blog: unknown[];
    blogFoto: unknown[];
    fileAccess: { A: string; B: string }[];
  };
};

function reviveDates<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => reviveDates(item)) as T;
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const out: Record<string, unknown> = {};

    for (const [key, val] of Object.entries(record)) {
      if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(val)) {
        out[key] = new Date(val);
      } else {
        out[key] = reviveDates(val);
      }
    }

    return out as T;
  }

  return value;
}

export async function exportDatabaseBackup(): Promise<DatabaseBackupPayload> {
  const fileAccess = await prisma.$queryRaw<{ A: string; B: string }[]>`
    SELECT "A", "B" FROM "_FileAccess"
  `;

  return {
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    tables: {
      user: await prisma.user.findMany(),
      account: await prisma.account.findMany(),
      session: await prisma.session.findMany(),
      verificationToken: await prisma.verificationToken.findMany(),
      menu: await prisma.menu.findMany(),
      banner: await prisma.banner.findMany(),
      homepageSection: await prisma.homepageSection.findMany(),
      testimonial: await prisma.testimonial.findMany(),
      faq: await prisma.fAQ.findMany(),
      colecao: await prisma.colecao.findMany(),
      colecaoItem: await prisma.colecaoItem.findMany(),
      site: await prisma.site.findMany(),
      subscriber: await prisma.subscriber.findMany(),
      task: await prisma.task.findMany(),
      comment: await prisma.comment.findMany(),
      file: await prisma.file.findMany(),
      message: await prisma.message.findMany(),
      projetos: await prisma.projetos.findMany(),
      projetoFoto: await prisma.projetoFoto.findMany(),
      contact: await prisma.contact.findMany(),
      blog: await prisma.blog.findMany(),
      blogFoto: await prisma.blogFoto.findMany(),
      fileAccess,
    },
  };
}

export async function importDatabaseBackup(payload: DatabaseBackupPayload): Promise<void> {
  if (payload.version !== BACKUP_VERSION) {
    throw new Error(`Versão de backup não suportada: ${payload.version}`);
  }

  const tables = payload.tables;

  await prisma.$transaction(
    async (tx) => {
      await tx.$executeRawUnsafe(`
        TRUNCATE TABLE
          "Comment",
          "File",
          "_FileAccess",
          "Task",
          "Message",
          "ProjetoFoto",
          "Projetos",
          "BlogFoto",
          "Blog",
          "ColecaoItem",
          "Colecao",
          "Contact",
          "Subscriber",
          "FAQ",
          "Testimonial",
          "HomepageSection",
          "Banner",
          "Menu",
          "Site",
          "Session",
          "Account",
          "VerificationToken",
          "User"
        RESTART IDENTITY CASCADE
      `);

      const data = reviveDates(tables) as DatabaseBackupPayload["tables"];

      if (data.user.length) await tx.user.createMany({ data: data.user as any[] });
      if (data.account.length) await tx.account.createMany({ data: data.account as any[] });
      if (data.session.length) await tx.session.createMany({ data: data.session as any[] });
      if (data.verificationToken.length) {
        await tx.verificationToken.createMany({ data: data.verificationToken as any[] });
      }
      if (data.menu.length) await tx.menu.createMany({ data: data.menu as any[] });
      if (data.banner.length) await tx.banner.createMany({ data: data.banner as any[] });
      if (data.homepageSection.length) {
        await tx.homepageSection.createMany({ data: data.homepageSection as any[] });
      }
      if (data.testimonial.length) await tx.testimonial.createMany({ data: data.testimonial as any[] });
      if (data.faq.length) await tx.fAQ.createMany({ data: data.faq as any[] });
      if (data.colecao.length) await tx.colecao.createMany({ data: data.colecao as any[] });
      if (data.colecaoItem.length) await tx.colecaoItem.createMany({ data: data.colecaoItem as any[] });
      if (data.site.length) await tx.site.createMany({ data: data.site as any[] });
      if (data.subscriber.length) await tx.subscriber.createMany({ data: data.subscriber as any[] });
      if (data.projetos.length) await tx.projetos.createMany({ data: data.projetos as any[] });
      if (data.projetoFoto.length) await tx.projetoFoto.createMany({ data: data.projetoFoto as any[] });
      if (data.blog.length) await tx.blog.createMany({ data: data.blog as any[] });
      if (data.blogFoto.length) await tx.blogFoto.createMany({ data: data.blogFoto as any[] });
      if (data.task.length) await tx.task.createMany({ data: data.task as any[] });
      if (data.comment.length) await tx.comment.createMany({ data: data.comment as any[] });
      if (data.file.length) await tx.file.createMany({ data: data.file as any[] });
      if (data.message.length) await tx.message.createMany({ data: data.message as any[] });
      if (data.contact.length) await tx.contact.createMany({ data: data.contact as any[] });

      for (const row of data.fileAccess) {
        await tx.$executeRaw`
          INSERT INTO "_FileAccess" ("A", "B") VALUES (${row.A}, ${row.B})
        `;
      }
    },
    { timeout: 120000 }
  );
}
