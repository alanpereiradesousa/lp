// pages/areas/direito-agrario.tsx

import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Menu as MenuComponent } from 'components/Menu';
import Footer from 'components/Footer';
import WhatsAppButton from 'components/WhatsAppButton';
import { MenuData, LinkItem } from '../../types/index';
import { Analytics } from '@vercel/analytics/next';
import { FaTractor, FaFileContract, FaMapMarkedAlt, FaBalanceScale } from 'react-icons/fa';

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
    console.error('[AREA AGRARIO ERROR]', error);
    return { props: { menu: null } };
  } finally {
    await prisma.$disconnect();
  }
};

export default function DireitoAgrarioPage({ menu }: AreaPageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const canonicalUrl = `${baseUrl}/areas/direito-agrario`;

  const title = 'Direito Agrário em Belém e Pará | Pereira de Sousa Advogados';
  const description =
    'Assessoria em Direito Agrário para produtor rural: regularização fundiária, contratos agrários (arrendamento e parceria rural), conflitos possessórios, segurança jurídica da propriedade e da atividade no campo.';

  /**
   * PADRÃO DAS ÁREAS
   */
  const heroImage = '/images/alan-direito.jpg';
  const areaImage = '/images/areas/direito-agrario.jpg';

  const whatsappLink =
    'https://wa.me/5591986284970?text=Olá!%20Quero%20falar%20sobre%20um%20caso%20de%20Direito%20Agrário.';

  const faq = [
    {
      q: 'O que é regularização fundiária e quando é necessária?',
      a: 'É o conjunto de medidas para corrigir, reconhecer e formalizar a situação jurídica da propriedade/posse (documentos, registros e requisitos legais). É indicada quando há inconsistências documentais, ausência de registro, problemas de confrontação, cadeia dominial incompleta ou necessidade de adequação para financiamento e segurança jurídica.',
    },
    {
      q: 'Qual a diferença entre arrendamento e parceria rural?',
      a: 'No arrendamento, há cessão do uso mediante pagamento (em dinheiro ou equivalente), enquanto na parceria rural há divisão de resultados/riscos conforme contrato. A estrutura mais adequada depende da realidade do imóvel, do cultivo/atividade e do objetivo das partes.',
    },
    {
      q: 'Como agir em caso de invasão ou conflito possessório?',
      a: 'O caminho depende da urgência e do tipo de situação (posse, propriedade, ameaças, turbação ou esbulho). Em geral, é essencial reunir provas, registrar ocorrências quando cabível e adotar medidas judiciais apropriadas, além de buscar solução técnica e segura para evitar agravamento do conflito.',
    },
    {
      q: 'Quais documentos ajudam na análise de um caso agrário?',
      a: 'Documentos do imóvel (matrícula/registro, CCIR, CAR, ITR), mapas/geo, contratos, recibos, provas de posse/exploração, fotos, certidões e quaisquer documentos que demonstrem histórico e situação atual da área.',
    },
    {
      q: 'Vocês fazem revisão e elaboração de contratos rurais?',
      a: 'Sim. Elaboramos e revisamos contratos agrários para reduzir riscos, aumentar previsibilidade e proteger o produtor em negociações e parcerias.',
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
    name: 'Direito Agrário — Pereira de Sousa Advogados',
    areaServed: 'Belém/PA, Pará e região',
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
        <meta property="og:image" content={`${baseUrl}${heroImage}`} />
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
            alt="Atendimento jurídico em Direito Agrário"
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
                Direito Agrário
              </h1>

              <p className="max-w-3xl text-gray-200 text-base md:text-lg">
                Assessoria jurídica ao produtor rural e a atividades do campo, com foco em regularização fundiária,
                contratos agrários, prevenção e solução de conflitos possessórios, garantindo segurança jurídica para o
                imóvel e para a operação rural.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#fec655] text-black font-semibold px-5 py-3 rounded-2xl hover:opacity-90 transition"
                >
                  Falar com um advogado agrário
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
                <h2>O que é Direito Agrário</h2>
                <p>
                  O <strong>Direito Agrário</strong> é o ramo do Direito voltado às relações jurídicas do campo,
                  envolvendo a propriedade e a posse rural, a exploração econômica da terra e os contratos ligados à
                  atividade rural. Na prática, abrange desde a regularização documental do imóvel até a prevenção e a
                  solução de conflitos, sempre buscando <strong>segurança jurídica</strong> para o produtor e para o negócio.
                </p>

                <h2>Assessoria jurídica voltada ao produtor rural</h2>
                <p>
                  O escritório atua com orientação técnica e estratégica para proprietários, possuidores e produtores,
                  apoiando decisões que impactam diretamente a operação rural: contratos, regularização, gestão de riscos
                  e atuação em litígios possessórios. O objetivo é <strong>proteger a terra, o patrimônio e a atividade</strong>.
                </p>

                {/* IMAGEM ESPECÍFICA DA ÁREA */}
                {/* <figure className="not-prose my-10">
                  <div className="relative w-full overflow-hidden rounded-3xl border border-gray-200 shadow-lg">
                    <div className="relative w-full aspect-[16/9]">
                      <Image
                        src={areaImage}
                        alt="Direito Agrário: regularização fundiária e contratos rurais"
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
                      Segurança jurídica para a propriedade e para a atividade rural: regularização, contratos e prevenção de conflitos.
                    </figcaption>
                  </div>
                </figure> */}

                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaMapMarkedAlt /> Regularização fundiária
                    </div>
                    <p className="mt-2 text-gray-700">
                      Análise documental e estratégias para formalização e segurança do imóvel rural.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaFileContract /> Contratos agrários
                    </div>
                    <p className="mt-2 text-gray-700">
                      Elaboração e revisão de contratos de arrendamento, parceria rural e negociações do campo.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaBalanceScale /> Conflitos possessórios
                    </div>
                    <p className="mt-2 text-gray-700">
                      Atuação em turbação, esbulho e disputas de posse, com medidas judiciais e estratégicas.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaTractor /> Segurança da atividade rural
                    </div>
                    <p className="mt-2 text-gray-700">
                      Orientação preventiva para reduzir riscos e proteger a continuidade da produção.
                    </p>
                  </div>
                </div>

                <h2>Principais serviços em Direito Agrário</h2>
                <ul>
                  <li>
                    <strong>Regularização fundiária e documental:</strong> análise de matrículas, cadeia dominial, situação de posse e medidas necessárias para formalização e segurança do imóvel.
                  </li>
                  <li>
                    <strong>Contratos agrários:</strong> elaboração e revisão de contratos de <em>arrendamento</em>, <em>parceria rural</em>, cessões, compras e vendas e instrumentos correlatos.
                  </li>
                  <li>
                    <strong>Conflitos possessórios:</strong> atuação em disputas de posse, medidas preventivas e judiciais, com suporte para produção de provas e estratégias legais.
                  </li>
                  <li>
                    <strong>Negociações e orientação preventiva:</strong> apoio jurídico em negociações e tomadas de decisão para reduzir riscos e litígios.
                  </li>
                  <li>
                    <strong>Assessoria para segurança patrimonial e operacional:</strong> orientações para proteger o patrimônio rural, a exploração econômica e a continuidade da atividade.
                  </li>
                </ul>

                <h2 id="como-funciona">Como funciona o atendimento</h2>
                <ol>
                  <li>
                    <strong>Triagem e entendimento do cenário:</strong> objetivo do produtor, histórico do imóvel e urgência.
                  </li>
                  <li>
                    <strong>Análise documental:</strong> verificação de documentos do imóvel, contratos e registros disponíveis.
                  </li>
                  <li>
                    <strong>Estratégia jurídica:</strong> definição do caminho (regularização, contrato, negociação, medida judicial).
                  </li>
                  <li>
                    <strong>Acompanhamento e execução:</strong> atuação técnica e acompanhamento contínuo do caso.
                  </li>
                </ol>

                <h2>Documentos comuns (variam por caso)</h2>
                <p>
                  Normalmente (quando aplicável): matrícula/registro do imóvel, CCIR, CAR, ITR, mapas, georreferenciamento,
                  contratos, recibos, provas de posse e exploração, certidões e outros documentos relacionados à área e à atividade.
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

                <h2>Atendimento no Pará e região</h2>
                <p>
                  Atuamos em Direito Agrário com foco em segurança jurídica e soluções eficazes para o produtor rural. Se
                  você precisa regularizar imóvel, elaborar contratos ou tratar de conflitos possessórios, conte com
                  acompanhamento profissional do início ao fim.
                </p>

                <div className="not-prose mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white font-semibold px-6 py-4 rounded-2xl hover:opacity-90 transition text-center"
                  >
                    Quero falar com um advogado agrário
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
