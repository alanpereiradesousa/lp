// pages/areas/direito-digital.tsx

import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Menu as MenuComponent } from 'components/Menu';
import Footer from 'components/Footer';
import WhatsAppButton from 'components/WhatsAppButton';
import { MenuData, LinkItem } from '../../types/index';
import { Analytics } from '@vercel/analytics/next';
import {
  FaShieldAlt,
  FaUserLock,
  FaFileSignature,
  FaExclamationTriangle,
} from 'react-icons/fa';

const prisma =
  (globalThis as any).prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  (globalThis as any).prisma = prisma;
}

interface AreaPageProps {
  menu: MenuData | null;
}

export const getServerSideProps: GetServerSideProps<AreaPageProps> = async () => {
  try {
    const menus = await prisma.menu.findMany();
    const rawMenu = menus[0] ?? null;

    let formattedMenu: MenuData | null = null;

    if (rawMenu && Array.isArray(rawMenu.links)) {
      const links: LinkItem[] = rawMenu.links.map((link: any) => ({
        id: link.id,
        text: link.text,
        url: link.url,
      }));

      formattedMenu = {
        logoUrl: rawMenu.logoUrl || '/images/logo.png',
        links,
      };
    }

    return { props: { menu: formattedMenu } };
  } catch (error) {
    console.error('[AREA DIGITAL ERROR]', error);
    return { props: { menu: null } };
  } finally {
    await prisma.$disconnect();
  }
};

export default function DireitoDigitalPage({ menu }: AreaPageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const canonicalUrl = `${baseUrl}/areas/direito-digital`;

  const title = 'Direito Digital e LGPD em Belém | Pereira de Sousa Advogados';
  const description =
    'Atuação em Direito Digital: LGPD, adequação e consultoria em privacidade, termos de uso e políticas, remoção de conteúdos, vazamento de dados, fraudes e golpes digitais, crimes digitais e proteção da reputação online.';

  /**
   * PADRÃO DAS ÁREAS
   */
  const heroImage = '/images/alan-direito.jpg';
  const areaImage = '/images/areas/direito-digital.jpg';

  const whatsappLink =
    'https://wa.me/5591986284970?text=Olá!%20Preciso%20de%20orientação%20em%20Direito%20Digital%20(LGPD%2C%20conteúdo%20online%2C%20fraudes%20ou%20vazamento%20de%20dados).';

  const faq = [
    {
      q: 'O que é a LGPD e quem precisa se adequar?',
      a: 'A LGPD (Lei Geral de Proteção de Dados) define regras para coleta, uso, armazenamento e compartilhamento de dados pessoais. Empresas e profissionais que tratam dados pessoais (clientes, leads, funcionários, usuários) podem precisar se adequar, adotando medidas técnicas e jurídicas compatíveis com sua realidade.',
    },
    {
      q: 'Como funciona a remoção de conteúdo indevido na internet?',
      a: 'Depende do caso e da plataforma. Pode envolver notificação extrajudicial, uso de canais formais de denúncia, pedidos de preservação de evidências e, quando necessário, medidas judiciais para remoção, identificação de responsáveis e reparação.',
    },
    {
      q: 'O que fazer em caso de vazamento de dados?',
      a: 'É importante agir rápido: apurar o incidente, registrar evidências, avaliar impacto, adotar medidas para contenção, revisar controles de segurança e, quando aplicável, cumprir obrigações legais (comunicações, documentação e adequações).',
    },
    {
      q: 'Vocês atuam em fraudes e golpes digitais?',
      a: 'Sim. Atuamos na orientação e condução jurídica conforme o caso, incluindo preservação de provas, medidas para responsabilização e estratégias administrativas/judiciais quando cabível.',
    },
    {
      q: 'Quais documentos e evidências ajudam na análise?',
      a: 'Prints, links/URLs, conversas, e-mails, boletins/relatos, logs, contratos, termos aceitos, políticas, registros de transações e quaisquer dados que demonstrem o ocorrido e o impacto.',
    },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Direito Digital — Pereira de Sousa Advogados',
    areaServed: 'Belém/PA e região',
    url: canonicalUrl,
    description,
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${baseUrl}${areaImage}`} />
        <meta name="twitter:card" content="summary_large_image" />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Analytics />
        <MenuComponent menuData={menu} />

        {/* HERO */}
        <section className="relative w-full h-[100vh] md:h-[600px] lg:h-[680px] overflow-hidden">
          <Image
            src={areaImage}
            alt="Atendimento jurídico em Direito Digital e LGPD"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/80" />

          <div className="relative z-10 h-full flex items-end">
            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-10 w-full text-left">
              <p className="text-sm md:text-base text-gray-200 mb-3">Área de atuação</p>

              <h1 className="font-display text-3xl md:text-5xl font-extrabold mb-4">
                Direito Digital
              </h1>

              <p className="max-w-3xl text-gray-200 text-base md:text-lg">
                Atuação jurídica no ambiente digital, com foco em LGPD, prevenção de riscos, remoção de conteúdos,
                vazamento de dados, fraudes e golpes digitais, crimes digitais e proteção da reputação online, com
                estratégia e acompanhamento técnico.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#fec655] text-black font-semibold px-5 py-3 rounded-2xl hover:opacity-90 transition"
                >
                  Falar com um advogado de Direito Digital
                </a>
                <a
                  href="#como-funciona"
                  className="bg-white/10 text-white font-semibold px-5 py-3 rounded-2xl hover:bg-white/15 transition"
                >
                  Entenda como funciona
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CONTEÚDO */}
        <main className="relative z-10">
          <section className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-16">
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-12">
              <article className="prose prose-base md:prose-lg max-w-none text-gray-800 leading-relaxed">
                <h2>O que é Direito Digital</h2>
                <p>
                  O <strong>Direito Digital</strong> envolve as relações jurídicas no ambiente online, incluindo privacidade,
                  proteção de dados, contratos digitais, responsabilidade por condutas ilícitas, crimes digitais, fraudes,
                  remoção de conteúdo e proteção da reputação. A atuação acompanha a evolução tecnológica e a legislação aplicável,
                  sempre com foco em prevenção de riscos e soluções eficazes.
                </p>

                <h2>Atuação preventiva e contenciosa para pessoas e empresas</h2>
                <p>
                  O escritório presta assessoria jurídica <strong>preventiva</strong> (para reduzir riscos e evitar litígios)
                  e também <strong>contenciosa</strong> (quando o conflito já ocorreu), apoiando pessoas físicas e jurídicas.
                  Entre as demandas mais comuns estão adequação à LGPD, revisão de termos e políticas, remoção de conteúdo indevido,
                  vazamento de dados, fraudes e responsabilização de autores de ilícitos.
                </p>

                {/* IMAGEM ESPECÍFICA DA ÁREA */}
                {/* <figure className="not-prose my-10">
                  <div className="relative w-full overflow-hidden rounded-3xl border border-gray-200 shadow-lg">
                    <div className="relative w-full aspect-[16/9]">
                      <Image
                        src={areaImage}
                        alt="Direito Digital: LGPD, privacidade, fraudes digitais e reputação online"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 900px"
                        onError={(e: any) => {
                          if (e?.currentTarget) e.currentTarget.src = '/images/blog-default-cover.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
                    </div>

                    <figcaption className="px-5 py-4 text-sm text-gray-600 bg-white">
                      LGPD, privacidade, remoção de conteúdo, vazamento de dados, fraudes digitais e reputação online.
                    </figcaption>
                  </div>
                </figure> */}

                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaUserLock /> LGPD e privacidade
                    </div>
                    <p className="mt-2 text-gray-700">
                      Adequação à LGPD, mapeamento de dados, bases legais, políticas, contratos e orientações de conformidade.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaFileSignature /> Termos e políticas
                    </div>
                    <p className="mt-2 text-gray-700">
                      Elaboração e revisão de termos de uso, políticas de privacidade e documentos digitais para negócios e apps.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaExclamationTriangle /> Fraudes e incidentes digitais
                    </div>
                    <p className="mt-2 text-gray-700">
                      Orientação e medidas em golpes, fraudes, invasões, vazamentos e incidentes, com preservação de provas.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaShieldAlt /> Reputação e conteúdo online
                    </div>
                    <p className="mt-2 text-gray-700">
                      Remoção de conteúdos indevidos, responsabilização e proteção de imagem, privacidade e reputação na internet.
                    </p>
                  </div>
                </div>

                <h2>Principais serviços em Direito Digital</h2>
                <ul>
                  <li>
                    <strong>LGPD:</strong> diagnóstico, adequação, políticas internas, orientações e medidas para conformidade.
                  </li>
                  <li>
                    <strong>Termos de uso e políticas de privacidade:</strong> elaboração e revisão para sites, e-commerces, apps e negócios digitais.
                  </li>
                  <li>
                    <strong>Remoção de conteúdos indevidos:</strong> atuação para retirada de conteúdo ofensivo/ilegal e medidas cabíveis conforme o caso.
                  </li>
                  <li>
                    <strong>Vazamento de dados e incidentes:</strong> apuração inicial, orientação, documentação e estratégia de resposta.
                  </li>
                  <li>
                    <strong>Fraudes e golpes digitais:</strong> preservação de evidências e medidas para responsabilização quando aplicável.
                  </li>
                  <li>
                    <strong>Crimes digitais e condutas ilícitas:</strong> orientação e atuação jurídica conforme a natureza do caso.
                  </li>
                  <li>
                    <strong>Proteção de reputação online:</strong> estratégias para defesa de imagem, privacidade e direitos no ambiente digital.
                  </li>
                </ul>

                <h2 id="como-funciona">Como funciona o atendimento</h2>
                <ol>
                  <li>
                    <strong>Triagem e objetivo:</strong> entender o problema (conteúdo, vazamento, fraude, LGPD) e a urgência.
                  </li>
                  <li>
                    <strong>Levantamento de evidências:</strong> prints, URLs, logs, conversas, e-mails, contratos e documentos.
                  </li>
                  <li>
                    <strong>Estratégia:</strong> medidas extrajudiciais/administrativas ou judiciais, conforme viabilidade e necessidade.
                  </li>
                  <li>
                    <strong>Acompanhamento:</strong> condução do caso e orientações contínuas, com comunicação clara e foco em solução.
                  </li>
                </ol>

                <h2>Documentos e evidências comuns</h2>
                <p>
                  Em geral: prints, links/URLs, e-mails, conversas, registros de transações, políticas e termos aceitos,
                  contratos, relatórios internos, logs (quando aplicável) e qualquer evidência que demonstre o ocorrido.
                </p>

                <h2>Perguntas frequentes</h2>
                <div className="not-prose space-y-3">
                  {faq.map((item) => (
                    <details key={item.q} className="rounded-2xl border border-gray-200 p-5">
                      <summary className="cursor-pointer font-semibold text-gray-900">{item.q}</summary>
                      <p className="mt-2 text-gray-700">{item.a}</p>
                    </details>
                  ))}
                </div>

                <h2>Atendimento em Belém e região</h2>
                <p>
                  Atuamos em Direito Digital com abordagem técnica e estratégica, acompanhando a evolução tecnológica e a legislação aplicável.
                  Se você precisa de adequação à LGPD, remoção de conteúdo, resposta a vazamentos, orientação em fraudes digitais ou proteção
                  da reputação, conte com acompanhamento profissional do início ao fim.
                </p>

                <div className="not-prose mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white font-semibold px-6 py-4 rounded-2xl hover:opacity-90 transition text-center"
                  >
                    Quero falar com um advogado de Direito Digital
                  </a>
                  <a
                    href="/#fale"
                    className="bg-gray-100 text-gray-900 font-semibold px-6 py-4 rounded-2xl hover:bg-gray-200 transition text-center"
                  >
                    Ir para Fale Conosco
                  </a>
                </div>

                <p className="text-sm text-gray-600 mt-8">
                  <strong>Atenção:</strong> o conteúdo desta página tem caráter informativo e não substitui uma consulta
                  individualizada. Cada caso exige análise própria.
                </p>
              </article>
            </div>
          </section>
        </main>

        <Footer menuData={menu} />
        <WhatsAppButton />
      </div>
    </>
  );
}
