// pages/areas/direito-bancario.tsx

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
  FaFileContract,
  FaPercentage,
  FaHandshake,
  FaGavel,
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
    console.error('[AREA BANCARIO ERROR]', error);
    return { props: { menu: null } };
  } finally {
    await prisma.$disconnect();
  }
};

export default function DireitoBancarioPage({ menu }: AreaPageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const canonicalUrl = `${baseUrl}/areas/direito-bancario`;

  const title = 'Direito Bancário em Belém | Pereira de Sousa Advogados';
  const description =
    'Atuação em Direito Bancário: revisão de contratos bancários, financiamentos e empréstimos, juros abusivos, cobranças indevidas, renegociação de dívidas e defesa em execuções, com foco em segurança contratual e proteção do consumidor e empresas.';

  /**
   * PADRÃO DAS ÁREAS
   */
  const heroImage = '/images/alan-direito.jpg';
  const areaImage = '/images/areas/direito-bancario.jpg';

  const whatsappLink =
    'https://wa.me/5591986284970?text=Olá!%20Preciso%20de%20orientação%20em%20Direito%20Bancário%20(contrato%2C%20juros%2C%20dívida%20ou%20execução).';

  const faq = [
    {
      q: 'O que são juros abusivos e quando podem ser questionados?',
      a: 'A análise depende do tipo de contrato, taxas praticadas, encargos, forma de cálculo e transparência das cláusulas. Em muitos casos é possível discutir cobranças, encargos e práticas que desequilibrem a relação contratual, especialmente quando há falta de informação clara ou encargos excessivos.',
    },
    {
      q: 'Vale a pena revisar contrato de financiamento ou empréstimo?',
      a: 'A revisão é indicada quando há dúvidas sobre taxas, encargos, seguros embutidos, tarifas, anatocismo/capitalização, ou quando a dívida cresce de forma inesperada. A análise técnica identifica o que é discutível e qual estratégia é mais segura.',
    },
    {
      q: 'Como funciona a renegociação de dívidas?',
      a: 'A renegociação envolve avaliar o contrato, o saldo, o orçamento e o risco de medidas de cobrança/executivas. Com base nisso, estrutura-se proposta com condições viáveis e juridicamente seguras, reduzindo riscos de novos desequilíbrios.',
    },
    {
      q: 'O que fazer ao receber uma ação de execução?',
      a: 'É essencial analisar rapidamente o processo, prazos, documentos e fundamentos. Dependendo do caso, pode ser possível discutir valores, cobranças, nulidades, excesso de execução e buscar alternativas como acordo ou medidas judiciais específicas.',
    },
    {
      q: 'Quais documentos são necessários para análise?',
      a: 'Contrato, aditivos, boletos/faturas, demonstrativos de evolução da dívida, extratos, comunicações do banco, comprovantes de pagamento e, se houver, documentos do processo judicial (citação, petição inicial e anexos).',
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
    name: 'Direito Bancário — Pereira de Sousa Advogados',
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
            alt="Atendimento jurídico em Direito Bancário"
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
                Direito Bancário
              </h1>

              <p className="max-w-3xl text-gray-200 text-base md:text-lg">
                Atuação na defesa de consumidores e empresas frente a instituições financeiras, com foco na revisão de
                contratos bancários, financiamentos e empréstimos, juros abusivos, cobranças indevidas, renegociação de
                dívidas e defesa em execuções, buscando segurança das relações contratuais.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#fec655] text-black font-semibold px-5 py-3 rounded-2xl hover:opacity-90 transition"
                >
                  Falar com um advogado bancário
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
                <h2>O que é Direito Bancário</h2>
                <p>
                  O <strong>Direito Bancário</strong> trata das relações jurídicas entre clientes (pessoas e empresas) e
                  instituições financeiras, envolvendo contratos de crédito, financiamentos, empréstimos, cartões,
                  garantias, cobranças e medidas judiciais decorrentes do inadimplemento. Na prática, busca-se correção
                  de abusos, transparência e equilíbrio contratual, além de estratégias para renegociação e defesa em
                  execuções.
                </p>

                <h2>Atuação preventiva e contenciosa</h2>
                <p>
                  O escritório atua tanto na <strong>orientação preventiva</strong> (análise e revisão de contratos antes
                  da assinatura, avaliação de riscos e condições) quanto no <strong>contencioso</strong> (cobranças,
                  negativação, ações de execução e discussões sobre encargos), sempre com análise técnica e estratégia
                  adequada ao caso.
                </p>

                {/* IMAGEM ESPECÍFICA DA ÁREA */}
                {/* <figure className="not-prose my-10">
                  <div className="relative w-full overflow-hidden rounded-3xl border border-gray-200 shadow-lg">
                    <div className="relative w-full aspect-[16/9]">
                      <Image
                        src={areaImage}
                        alt="Direito Bancário: revisão de contratos, juros abusivos e renegociação de dívidas"
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
                      Revisão de contratos bancários, juros, cobranças, renegociação e defesa em execuções.
                    </figcaption>
                  </div>
                </figure> */}

                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaFileContract /> Revisão de contratos
                    </div>
                    <p className="mt-2 text-gray-700">
                      Análise de cláusulas, encargos e condições em financiamentos, empréstimos e cartões.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaPercentage /> Juros e encargos
                    </div>
                    <p className="mt-2 text-gray-700">
                      Verificação de taxas, capitalização, tarifas e práticas que possam desequilibrar a relação.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaHandshake /> Renegociação de dívidas
                    </div>
                    <p className="mt-2 text-gray-700">
                      Estratégia para negociar condições viáveis e seguras, com foco em reduzir riscos futuros.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaGavel /> Defesa em execuções
                    </div>
                    <p className="mt-2 text-gray-700">
                      Atuação técnica em ações de execução e cobranças, com análise de prazos, valores e documentos.
                    </p>
                  </div>
                </div>

                <h2>Principais serviços em Direito Bancário</h2>
                <ul>
                  <li>
                    <strong>Revisão de contratos bancários:</strong> financiamentos, empréstimos, cartões de crédito, garantias e aditivos.
                  </li>
                  <li>
                    <strong>Juros abusivos e encargos:</strong> análise de taxas, tarifas, capitalização e demais encargos conforme o contrato.
                  </li>
                  <li>
                    <strong>Cobranças indevidas:</strong> contestação de valores e medidas para correção e reparação quando aplicável.
                  </li>
                  <li>
                    <strong>Renegociação de dívidas:</strong> avaliação do cenário e elaboração de estratégia para acordo seguro e viável.
                  </li>
                  <li>
                    <strong>Defesa em ações de execução:</strong> atuação técnica, análise de excesso de execução, documentos e alternativas de solução.
                  </li>
                  <li>
                    <strong>Orientação preventiva:</strong> suporte jurídico para evitar riscos e fortalecer decisões em operações de crédito.
                  </li>
                </ul>

                <h2 id="como-funciona">Como funciona o atendimento</h2>
                <ol>
                  <li>
                    <strong>Triagem e objetivo:</strong> entender o contrato, a dívida, a cobrança ou a execução, e a urgência.
                  </li>
                  <li>
                    <strong>Documentos:</strong> contrato, extratos, faturas, boletos, comprovantes e comunicações.
                  </li>
                  <li>
                    <strong>Análise técnica:</strong> encargos, taxas, saldo, riscos e opções (negociação, defesa, medidas judiciais).
                  </li>
                  <li>
                    <strong>Estratégia e condução:</strong> atuação extrajudicial/judicial e acompanhamento contínuo do caso.
                  </li>
                </ol>

                <h2>Documentos comuns (variam por caso)</h2>
                <p>
                  Normalmente: contrato e aditivos, demonstrativos da dívida, extratos, faturas, boletos, comprovantes de pagamento,
                  comunicações do banco e, se houver processo, a citação e peças principais.
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
                  Atuamos em Direito Bancário com foco em segurança contratual e solução eficaz de conflitos. Se você precisa
                  revisar contrato, discutir juros, renegociar dívida ou se defender em execução, conte com acompanhamento
                  profissional do início ao fim.
                </p>

                <div className="not-prose mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white font-semibold px-6 py-4 rounded-2xl hover:opacity-90 transition text-center"
                  >
                    Quero falar com um advogado bancário
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
