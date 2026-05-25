// pages/areas/direito-tributario.tsx

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
  FaCalculator,
  FaFileInvoiceDollar,
  FaBalanceScale,
  FaSearchDollar,
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
    console.error('[AREA TRIBUTARIO ERROR]', error);
    return { props: { menu: null } };
  } finally {
    await prisma.$disconnect();
  }
};

export default function DireitoTributarioPage({ menu }: AreaPageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const canonicalUrl = `${baseUrl}/areas/direito-tributario`;

  const title = 'Direito Tributário em Belém | Pereira de Sousa Advogados';
  const description =
    'Atuação em Direito Tributário: planejamento tributário, revisão de tributos, recuperação de créditos fiscais e defesa em autos de infração, com foco na proteção do contribuinte e segurança jurídica.';

  /**
   * PADRÃO DAS ÁREAS
   */
  const heroImage = '/images/alan-direito.jpg';
  const areaImage = '/images/areas/direito-tributario.jpg';

  const whatsappLink =
    'https://wa.me/5591986284970?text=Olá!%20Quero%20falar%20sobre%20um%20caso%20de%20Direito%20Tributário.';

  const faq = [
    {
      q: 'O que é planejamento tributário e quando vale a pena?',
      a: 'É a análise da atividade e da estrutura do contribuinte para reduzir riscos e buscar eficiência fiscal dentro da lei, avaliando regime tributário, operações, contratos e procedimentos. É indicado quando há crescimento do negócio, mudança de faturamento, operações recorrentes ou histórico de autuações.',
    },
    {
      q: 'O que fazer ao receber um auto de infração?',
      a: 'O ideal é agir rapidamente: analisar o auto, identificar fundamentos, checar documentos e prazos, e definir estratégia (defesa administrativa, impugnação, recursos e, se necessário, medidas judiciais). Cada caso depende do tributo e do órgão autuante.',
    },
    {
      q: 'É possível recuperar créditos tributários?',
      a: 'Em muitos casos, sim. É possível identificar pagamentos indevidos ou a maior, créditos acumulados ou oportunidades de compensação/restituição, conforme a legislação aplicável e a documentação.',
    },
    {
      q: 'Vocês atendem empresas e pessoas físicas?',
      a: 'Sim. A atuação pode envolver contribuintes pessoa física ou jurídica, conforme a demanda: regularização, defesas, revisões, planejamento e acompanhamento.',
    },
    {
      q: 'Quais documentos ajudam na análise tributária?',
      a: 'Documentos fiscais e contábeis, apurações, guias de recolhimento, notificações/autos, contratos, SPED (quando aplicável), extratos e relatórios financeiros/contábeis.',
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
    name: 'Direito Tributário — Pereira de Sousa Advogados',
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
            alt="Atendimento jurídico em Direito Tributário"
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
                Direito Tributário
              </h1>

              <p className="max-w-3xl text-gray-200 text-base md:text-lg">
                Atuação estratégica na defesa do contribuinte, com foco em planejamento tributário, revisão de tributos,
                recuperação de créditos fiscais e defesa em autos de infração, sempre com segurança jurídica e análise
                técnica do caso.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#fec655] text-black font-semibold px-5 py-3 rounded-2xl hover:opacity-90 transition"
                >
                  Falar com um advogado tributarista
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
                <h2>O que é Direito Tributário</h2>
                <p>
                  O <strong>Direito Tributário</strong> é o ramo do Direito que regula a relação entre o contribuinte e o
                  Estado na instituição, cobrança e fiscalização de tributos. Na prática, envolve planejamento,
                  conformidade, defesas administrativas e judiciais, revisão de recolhimentos e estratégias para reduzir
                  riscos fiscais, sempre dentro dos limites legais.
                </p>

                <h2>Atuação na defesa do contribuinte</h2>
                <p>
                  A atuação tributária exige análise técnica e estratégica: entender a atividade do contribuinte, revisar
                  documentos fiscais/contábeis, identificar oportunidades legais e estruturar uma defesa consistente em
                  fiscalizações e autos de infração. O objetivo é buscar <strong>segurança jurídica</strong> e
                  <strong> eficiência fiscal</strong>, evitando prejuízos e litígios desnecessários.
                </p>

                {/* IMAGEM ESPECÍFICA DA ÁREA */}
                {/* <figure className="not-prose my-10">
                  <div className="relative w-full overflow-hidden rounded-3xl border border-gray-200 shadow-lg">
                    <div className="relative w-full aspect-[16/9]">
                      <Image
                        src={areaImage}
                        alt="Direito Tributário: planejamento, revisão de tributos e defesa fiscal"
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
                      Planejamento tributário, revisão de tributos, recuperação de créditos e defesa em autos de infração.
                    </figcaption>
                  </div>
                </figure> */}

                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaCalculator /> Planejamento tributário
                    </div>
                    <p className="mt-2 text-gray-700">
                      Avaliação de regime tributário e operações para reduzir riscos e melhorar eficiência fiscal dentro da lei.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaSearchDollar /> Revisão e recuperação de créditos
                    </div>
                    <p className="mt-2 text-gray-700">
                      Identificação de recolhimentos indevidos/a maior e oportunidades de compensação ou restituição.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaFileInvoiceDollar /> Autos de infração e fiscalizações
                    </div>
                    <p className="mt-2 text-gray-700">
                      Defesa técnica em fiscalizações, notificações e autuações, com estratégia e atenção a prazos.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaBalanceScale /> Atuação administrativa e judicial
                    </div>
                    <p className="mt-2 text-gray-700">
                      Impugnações e recursos no âmbito administrativo e, quando necessário, medidas judiciais adequadas ao caso.
                    </p>
                  </div>
                </div>

                <h2>Principais serviços em Direito Tributário</h2>
                <ul>
                  <li>
                    <strong>Planejamento tributário:</strong> estudo da atividade, faturamento e estrutura para orientar decisões e reduzir riscos fiscais.
                  </li>
                  <li>
                    <strong>Revisão de tributos:</strong> análise de apurações e recolhimentos, identificando divergências e oportunidades legais.
                  </li>
                  <li>
                    <strong>Recuperação de créditos fiscais:</strong> avaliação de créditos, pagamentos indevidos ou a maior e medidas para restituição/compensação quando cabível.
                  </li>
                  <li>
                    <strong>Defesa em autos de infração:</strong> impugnação, recursos e acompanhamento do processo administrativo tributário.
                  </li>
                  <li>
                    <strong>Atuação em fiscalizações:</strong> orientação e suporte na organização de documentos e respostas técnicas.
                  </li>
                  <li>
                    <strong>Regularização e estratégia:</strong> análise de riscos, alternativas de adequação e medidas preventivas conforme o caso.
                  </li>
                </ul>

                <h2 id="como-funciona">Como funciona o atendimento</h2>
                <ol>
                  <li>
                    <strong>Triagem e entendimento do cenário:</strong> objetivo do contribuinte, histórico e urgências (fiscalização, auto, notificação).
                  </li>
                  <li>
                    <strong>Levantamento documental:</strong> documentos fiscais/contábeis, guias, notificações e registros.
                  </li>
                  <li>
                    <strong>Análise técnica e estratégia:</strong> definição do caminho (planejamento, revisão, defesa administrativa ou judicial).
                  </li>
                  <li>
                    <strong>Execução e acompanhamento:</strong> atuação com monitoramento de prazos, comunicações e evolução do caso.
                  </li>
                </ol>

                <h2>Documentos comuns (variam por caso)</h2>
                <p>
                  Normalmente (quando aplicável): guias e comprovantes de recolhimento, apurações, livros e relatórios contábeis,
                  notas fiscais, SPED, notificações/autos, contratos e documentos da operação.
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
                  Atuamos em Direito Tributário com foco na defesa do contribuinte, segurança jurídica e estratégia.
                  Se você precisa de planejamento, revisão de tributos, recuperação de créditos ou defesa em autuação,
                  conte com acompanhamento profissional do início ao fim.
                </p>

                <div className="not-prose mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white font-semibold px-6 py-4 rounded-2xl hover:opacity-90 transition text-center"
                  >
                    Quero falar com um advogado tributarista
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
