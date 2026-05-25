// pages/areas/direito-das-pessoas-com-tea.tsx

import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Menu as MenuComponent } from 'components/Menu';
import Footer from 'components/Footer';
import WhatsAppButton from 'components/WhatsAppButton';
import { MenuData, LinkItem } from '../../types/index';
import { Analytics } from '@vercel/analytics/next';
import { FaHandsHelping, FaSchool, FaHeartbeat, FaFileAlt } from 'react-icons/fa';

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
    console.error('[AREA TEA ERROR]', error);
    return { props: { menu: null } };
  } finally {
    await prisma.$disconnect();
  }
};

export default function DireitoDasPessoasComTEAPage({ menu }: AreaPageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const canonicalUrl = `${baseUrl}/areas/direito-das-pessoas-com-tea`;

  const title =
    'Direito das Pessoas com TEA em Belém | Pereira de Sousa Advogados';
  const description =
    'Atuação comprometida com a proteção dos direitos das pessoas com Transtorno do Espectro Autista (TEA), assegurando acesso à saúde, educação inclusiva, atendimento prioritário e benefícios assistenciais, com orientação, atuação administrativa e judicial.';

  /**
   * PADRÃO DAS ÁREAS
   */
  const heroImage = '/images/alan-direito.jpg';
  const areaImage = '/images/areas/direito-das-pessoas-com-tea.jpg';

  const whatsappLink =
    'https://wa.me/5591986284970?text=Olá!%20Preciso%20de%20orientação%20sobre%20Direitos%20das%20Pessoas%20com%20TEA%20(saúde%2C%20educação%20ou%20benefícios).';

  const faq = [
    {
      q: 'Em quais situações o escritório pode ajudar?',
      a: 'Quando há negativa ou dificuldade de acesso a serviços de saúde e terapias, barreiras na educação inclusiva, descumprimento de prioridade/atendimento adequado, ou dúvidas e problemas envolvendo benefícios assistenciais e direitos correlatos. Cada caso é analisado individualmente.',
    },
    {
      q: 'Vocês atuam administrativamente e judicialmente?',
      a: 'Sim. A atuação pode envolver orientação e medidas administrativas (protocolos, notificações, requerimentos) e, quando necessário, medidas judiciais para efetivação de direitos.',
    },
    {
      q: 'Quais documentos ajudam na análise?',
      a: 'Documentos pessoais, relatórios/laudos e prescrições quando aplicáveis, comunicações/negativas (protocolos, e-mails, prints), documentos escolares (comunicados, relatórios pedagógicos) e documentos relacionados a requerimentos/benefícios, conforme o caso.',
    },
    {
      q: 'Posso buscar orientação mesmo sem negativa formal?',
      a: 'Sim. Muitas situações podem ser encaminhadas preventivamente, com orientação para reunir documentos e formalizar pedidos corretamente, o que aumenta as chances de solução eficiente.',
    },
    {
      q: 'O que é atendimento prioritário?',
      a: 'É um conjunto de garantias para facilitar o acesso e reduzir barreiras no atendimento e na prestação de serviços, conforme regras aplicáveis ao caso. A análise jurídica identifica como isso se aplica na prática à sua situação.',
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
    name: 'Direito das Pessoas com TEA — Pereira de Sousa Advogados',
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
            alt="Atendimento jurídico — Direitos das Pessoas com TEA"
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
                Direito das Pessoas com TEA
              </h1>

              <p className="max-w-3xl text-gray-200 text-base md:text-lg">
                Atuação comprometida com a proteção, inclusão e respeito às pessoas
                com Transtorno do Espectro Autista (TEA), buscando assegurar acesso
                à saúde, educação inclusiva, atendimento prioritário e benefícios
                assistenciais, com orientação técnica e acompanhamento completo.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#fec655] text-black font-semibold px-5 py-3 rounded-2xl hover:opacity-90 transition"
                >
                  Falar no WhatsApp
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
                <h2>O que envolve o Direito das Pessoas com TEA</h2>
                <p>
                  O Direito das Pessoas com TEA busca garantir a{' '}
                  <strong>proteção, inclusão e respeito</strong>, assegurando o
                  acesso a direitos fundamentais como <strong>saúde</strong>,{' '}
                  <strong>educação inclusiva</strong>, <strong>prioridade</strong>{' '}
                  no atendimento e <strong>benefícios assistenciais</strong>,
                  além do combate a qualquer forma de discriminação. Na prática,
                  isso pode envolver orientações para formalizar pedidos,
                  organização documental, atuação administrativa e medidas
                  judiciais quando necessário.
                </p>

                <h2>Como o escritório atua</h2>
                <p>
                  Atuamos de forma comprometida na <strong>aplicação e efetivação</strong>{' '}
                  desses direitos, prestando orientação jurídica, análise de casos
                  e atuação administrativa e judicial para garantir que pessoas
                  com TEA e suas famílias tenham seus direitos respeitados e
                  plenamente exercidos — sempre com linguagem clara e condução
                  humanizada.
                </p>

                {/* IMAGEM ESPECÍFICA DA ÁREA */}
                {/* <figure className="not-prose my-10">
                  <div className="relative w-full overflow-hidden rounded-3xl border border-gray-200 shadow-lg">
                    <div className="relative w-full aspect-[16/9]">
                      <Image
                        src={areaImage}
                        alt="Direitos das Pessoas com TEA: saúde, educação inclusiva e benefícios"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 900px"
                        onError={(e: any) => {
                          if (e?.currentTarget)
                            e.currentTarget.src = '/images/blog-default-cover.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
                    </div>

                    <figcaption className="px-5 py-4 text-sm text-gray-600 bg-white">
                      Proteção de direitos, inclusão e efetivação de acesso à saúde,
                      educação e benefícios assistenciais.
                    </figcaption>
                  </div>
                </figure> */}

                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaHeartbeat /> Saúde e tratamentos
                    </div>
                    <p className="mt-2 text-gray-700">
                      Orientação e atuação para garantir acesso a cuidados de saúde,
                      terapias e tratamentos, conforme a necessidade e o caso.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaSchool /> Educação inclusiva
                    </div>
                    <p className="mt-2 text-gray-700">
                      Apoio em situações envolvendo inclusão escolar, adaptações e
                      medidas para assegurar atendimento adequado.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaFileAlt /> Benefícios e requerimentos
                    </div>
                    <p className="mt-2 text-gray-700">
                      Orientação para organização de documentos e condução de
                      requerimentos e recursos, conforme a realidade do caso.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaHandsHelping /> Proteção e não discriminação
                    </div>
                    <p className="mt-2 text-gray-700">
                      Atuação para combater práticas discriminatórias e garantir
                      respeito e efetividade de direitos no dia a dia.
                    </p>
                  </div>
                </div>

                <h2>Principais frentes de atuação</h2>
                <ul>
                  <li>
                    <strong>Acesso à saúde:</strong> orientações e medidas para garantir
                    atendimento e continuidade de cuidados, conforme o caso.
                  </li>
                  <li>
                    <strong>Educação inclusiva:</strong> suporte para efetivação de
                    inclusão e atendimento adequado no ambiente escolar.
                  </li>
                  <li>
                    <strong>Atendimento prioritário:</strong> orientações sobre prioridade
                    e garantias aplicáveis a serviços e atendimentos.
                  </li>
                  <li>
                    <strong>Benefícios assistenciais e direitos correlatos:</strong> análise,
                    organização documental e acompanhamento de requerimentos e recursos.
                  </li>
                  <li>
                    <strong>Combate à discriminação:</strong> medidas para proteção de direitos
                    e responsabilização quando cabível.
                  </li>
                </ul>

                <h2 id="como-funciona">Como funciona o atendimento</h2>
                <ol>
                  <li>
                    <strong>Triagem e objetivo:</strong> entender a situação (saúde, escola,
                    atendimento, benefício) e a urgência.
                  </li>
                  <li>
                    <strong>Organização de documentos:</strong> reunir relatórios, registros,
                    comunicações e negativas quando existirem.
                  </li>
                  <li>
                    <strong>Estratégia:</strong> orientação preventiva, atuação administrativa
                    e, se necessário, medidas judiciais.
                  </li>
                  <li>
                    <strong>Acompanhamento:</strong> condução do caso com clareza e foco em
                    solução prática.
                  </li>
                </ol>

                <h2>Documentos comuns (variam por caso)</h2>
                <p>
                  Em geral: documentos pessoais, relatórios/laudos e prescrições quando aplicáveis,
                  registros e comunicações (protocolos, e-mails, prints), documentos escolares e
                  documentos relacionados a requerimentos/benefícios.
                </p>

                <h2>Perguntas frequentes</h2>
                <div className="not-prose space-y-3">
                  {faq.map((item) => (
                    <details key={item.q} className="rounded-2xl border border-gray-200 p-5">
                      <summary className="cursor-pointer font-semibold text-gray-900">
                        {item.q}
                      </summary>
                      <p className="mt-2 text-gray-700">{item.a}</p>
                    </details>
                  ))}
                </div>

                <h2>Atendimento em Belém e região</h2>
                <p>
                  Atuamos com compromisso e responsabilidade para proteger os direitos das pessoas com TEA e de suas famílias.
                  Se você enfrenta dificuldades de acesso a saúde, educação inclusiva, prioridade ou benefícios, conte com
                  acompanhamento profissional do início ao fim.
                </p>

                <div className="not-prose mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white font-semibold px-6 py-4 rounded-2xl hover:opacity-90 transition text-center"
                  >
                    Quero orientação sobre meu caso
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
