// pages/areas/direito-penal.tsx

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
  FaGavel,
  FaUserShield,
  FaBalanceScale,
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
    console.error('[AREA PENAL ERROR]', error);
    return { props: { menu: null } };
  } finally {
    await prisma.$disconnect();
  }
};

export default function DireitoPenalPage({ menu }: AreaPageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const canonicalUrl = `${baseUrl}/areas/direito-penal`;

  const title = 'Direito Penal em Belém | Pereira de Sousa Advogados';
  const description =
    'Atuação em Direito Penal: defesa técnica e estratégica desde a fase policial até o processo judicial, acompanhamento em audiências, pedidos de liberdade, recursos e atuação ética, sigilosa e comprometida com a ampla defesa.';

  /**
   * PADRÃO DAS ÁREAS
   */
  const heroImage = '/images/alan-direito.jpg';
  const areaImage = '/images/areas/direito-penal.jpg';

  const whatsappLink =
    'https://wa.me/5591986284970?text=Olá!%20Preciso%20de%20orientação%20em%20Direito%20Penal.';

  const faq = [
    {
      q: 'Quando devo procurar um advogado criminalista?',
      a: 'O ideal é procurar o quanto antes, especialmente na fase policial (intimação, depoimento, prisão em flagrante, busca e apreensão). A atuação desde o início ajuda a proteger direitos, orientar condutas e construir uma estratégia de defesa.',
    },
    {
      q: 'Vocês atuam na delegacia e na fase de investigação?',
      a: 'Sim. Acompanhamos depoimentos, analisamos procedimentos, orientamos o investigado e atuamos para garantir direitos e legalidade dos atos, além de construir a estratégia para as próximas fases.',
    },
    {
      q: 'O que é audiência de custódia?',
      a: 'É a apresentação da pessoa presa ao juiz em prazo legal, para avaliar a legalidade da prisão e a necessidade de manter ou substituir a medida por alternativas, garantindo direitos fundamentais.',
    },
    {
      q: 'É possível responder ao processo em liberdade?',
      a: 'Dependendo do caso, é possível requerer liberdade provisória, revogação de prisão preventiva ou medidas cautelares alternativas. A estratégia depende dos fatos, do histórico e das provas.',
    },
    {
      q: 'Quais documentos ajudam na análise do caso?',
      a: 'Boletim de ocorrência, intimações, despacho/decisão judicial (se houver), peças do inquérito/processo, prints, conversas, vídeos, documentos pessoais e qualquer prova relacionada aos fatos.',
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
    name: 'Direito Penal — Pereira de Sousa Advogados',
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
            alt="Atendimento jurídico em Direito Penal"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/80" />

          <div className="relative z-10 h-full flex items-end">
            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-10 w-full text-left">
              <p className="text-sm md:text-base text-gray-200 mb-3">
                Área de atuação
              </p>

              <h1 className="font-display text-3xl md:text-5xl font-extrabold mb-4">
                Direito Penal
              </h1>

              <p className="max-w-3xl text-gray-200 text-base md:text-lg">
                Defesa técnica e estratégica desde a fase policial até o processo judicial, com atuação ética, sigilosa e
                comprometida com a ampla defesa e a proteção de direitos e garantias fundamentais.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#fec655] text-black font-semibold px-5 py-3 rounded-2xl hover:opacity-90 transition"
                >
                  Falar com um advogado criminalista
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
                <h2>O que é Direito Penal</h2>
                <p>
                  O <strong>Direito Penal</strong> regula condutas consideradas crimes ou contravenções e estabelece as
                  consequências jurídicas aplicáveis. Na prática, envolve a atuação em investigações (fase policial),
                  processos judiciais, audiências, medidas cautelares e recursos, sempre com respeito às garantias
                  constitucionais do investigado ou acusado.
                </p>

                <h2>Defesa técnica desde o início: fase policial e processo judicial</h2>
                <p>
                  Em casos criminais, a atuação no início do procedimento costuma ser decisiva. O escritório realiza
                  acompanhamento e orientação desde a fase policial (delegacia, inquérito, depoimentos e medidas
                  investigativas) até o processo judicial (audiências, elaboração de defesas e recursos).
                </p>

                {/* IMAGEM ESPECÍFICA DA ÁREA */}
                {/* <figure className="not-prose my-10">
                  <div className="relative w-full overflow-hidden rounded-3xl border border-gray-200 shadow-lg">
                    <div className="relative w-full aspect-[16/9]">
                      <Image
                        src={areaImage}
                        alt="Direito Penal: defesa criminal e atuação estratégica"
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
                      Atuação em Direito Penal com ética, sigilo e estratégia — da fase policial ao processo judicial.
                    </figcaption>
                  </div>
                </figure> */}

                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaUserShield /> Direitos e garantias fundamentais
                    </div>
                    <p className="mt-2 text-gray-700">
                      Atuação voltada à proteção de direitos do investigado/acusado, com respeito ao devido processo legal.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaShieldAlt /> Atuação com sigilo e ética
                    </div>
                    <p className="mt-2 text-gray-700">
                      Condução responsável, com confidencialidade e estratégia em cada etapa do caso.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaGavel /> Defesa e audiências
                    </div>
                    <p className="mt-2 text-gray-700">
                      Elaboração de defesas técnicas e acompanhamento em audiências, com atuação estratégica.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaBalanceScale /> Pedidos de liberdade e recursos
                    </div>
                    <p className="mt-2 text-gray-700">
                      Medidas cabíveis para responder em liberdade, revogar prisões e interpor recursos quando necessário.
                    </p>
                  </div>
                </div>

                <h2>Principais atuações em Direito Penal</h2>
                <ul>
                  <li>
                    <strong>Fase policial:</strong> acompanhamento em delegacia, orientações em depoimento, análise de
                    procedimentos e proteção de garantias.
                  </li>
                  <li>
                    <strong>Prisão em flagrante e audiência de custódia:</strong> análise imediata e atuação para medidas
                    cabíveis, conforme o caso.
                  </li>
                  <li>
                    <strong>Pedidos de liberdade:</strong> liberdade provisória, revogação de prisão preventiva e medidas
                    cautelares alternativas.
                  </li>
                  <li>
                    <strong>Elaboração de defesas:</strong> resposta à acusação, memoriais, alegações finais e demais peças
                    técnicas.
                  </li>
                  <li>
                    <strong>Audiências e instrução processual:</strong> acompanhamento e atuação estratégica na produção de
                    provas.
                  </li>
                  <li>
                    <strong>Recursos:</strong> atuação em recursos cabíveis conforme a decisão e a estratégia do caso.
                  </li>
                </ul>

                <h2 id="como-funciona">Como funciona o atendimento</h2>
                <ol>
                  <li>
                    <strong>Atendimento e triagem:</strong> entendimento do contexto e urgência do caso.
                  </li>
                  <li>
                    <strong>Análise de documentos e informações:</strong> leitura de intimações, BO, decisões e peças do
                    procedimento.
                  </li>
                  <li>
                    <strong>Definição de estratégia:</strong> medidas urgentes, defesa técnica e planejamento processual.
                  </li>
                  <li>
                    <strong>Atuação e acompanhamento:</strong> condução do caso, audiências, recursos e comunicação clara.
                  </li>
                </ol>

                <h2>Documentos e informações úteis</h2>
                <p>
                  Para agilizar a análise, normalmente são úteis: boletim de ocorrência, intimações, decisões judiciais,
                  peças do inquérito/processo (quando disponíveis), documentos pessoais, prints/conversas e demais provas
                  relacionadas aos fatos.
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
                  Atuamos em Direito Penal com defesa técnica e estratégica, sempre com ética, sigilo e compromisso com a
                  ampla defesa. Se você precisa de orientação em investigação, processo ou medidas urgentes, conte com
                  acompanhamento profissional do início ao fim.
                </p>

                <div className="not-prose mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white font-semibold px-6 py-4 rounded-2xl hover:opacity-90 transition text-center"
                  >
                    Preciso de orientação em Direito Penal
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
                  jurídica individualizada. Cada caso exige análise própria.
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
