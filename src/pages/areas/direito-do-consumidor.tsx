// pages/areas/direito-do-consumidor.tsx

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
  FaBalanceScale,
  FaFileContract,
  FaExclamationTriangle,
  FaHandHoldingUsd,
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
    console.error('[AREA CONSUMIDOR ERROR]', error);
    return { props: { menu: null } };
  } finally {
    await prisma.$disconnect();
  }
};

export default function DireitoDoConsumidorPage({ menu }: AreaPageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const canonicalUrl = `${baseUrl}/areas/direito-do-consumidor`;

  const title = 'Direito do Consumidor em Belém | Pereira de Sousa Advogados';
  const description =
    'Atuação em Direito do Consumidor: cobranças indevidas, contratos abusivos, negativação irregular, vícios e defeitos de produtos/serviços, descumprimento de oferta e conflitos com bancos, operadoras e prestadores de serviços.';

  /**
   * PADRÃO DAS ÁREAS
   */
  const heroImage = '/images/alan-direito.jpg';
  const areaImage = '/images/areas/direito-do-consumidor.jpg';

  const whatsappLink =
    'https://wa.me/5591986284970?text=Olá!%20Preciso%20de%20orientação%20em%20Direito%20do%20Consumidor.';

  const faq = [
    {
      q: 'O que fazer em caso de cobrança indevida?',
      a: 'É importante guardar comprovantes, faturas, prints e protocolos de atendimento. Em muitos casos é possível exigir correção imediata, devolução de valores e, dependendo do contexto, reparação por danos. A estratégia depende do caso e da documentação.',
    },
    {
      q: 'Meu nome foi negativado indevidamente. O que posso fazer?',
      a: 'Reúna provas (comunicação, comprovantes, contrato, print da restrição e protocolos). É possível buscar a retirada do apontamento e reparação de danos conforme o caso. A análise técnica identifica a melhor medida (extrajudicial, administrativa ou judicial).',
    },
    {
      q: 'Tenho um produto com defeito ou serviço mal prestado. Como proceder?',
      a: 'Guarde nota fiscal, laudos, conversas e registros. Dependendo do caso, é possível exigir reparo, troca, abatimento do preço ou devolução, além de eventual indenização se houver prejuízos.',
    },
    {
      q: 'Vocês atuam contra bancos e instituições financeiras?',
      a: 'Sim. Atuamos em demandas envolvendo cobranças indevidas, contratos abusivos, renegociações, negativação irregular e conflitos com instituições financeiras, sempre conforme a situação do consumidor.',
    },
    {
      q: 'Quais documentos ajudam na análise do caso?',
      a: 'Contrato (se houver), faturas/boletos, comprovantes de pagamento, protocolos, e-mails, prints, notas fiscais, laudos, fotos/vídeos e qualquer registro do problema e da tentativa de solução.',
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
    name: 'Direito do Consumidor — Pereira de Sousa Advogados',
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
            alt="Atendimento jurídico em Direito do Consumidor"
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
                Direito do Consumidor
              </h1>

              <p className="max-w-3xl text-gray-200 text-base md:text-lg">
                Defesa e proteção dos direitos do consumidor, com foco em cobranças indevidas, contratos abusivos,
                negativação irregular e solução de conflitos com instituições financeiras e prestadores de serviços,
                buscando equilíbrio contratual e reparação de danos.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#fec655] text-black font-semibold px-5 py-3 rounded-2xl hover:opacity-90 transition"
                >
                  Falar com um advogado do consumidor
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
                <h2>O que é Direito do Consumidor</h2>
                <p>
                  O <strong>Direito do Consumidor</strong> é o ramo do Direito que protege o consumidor nas relações de consumo,
                  estabelecendo regras para contratos, ofertas, cobranças, atendimento e qualidade de produtos e serviços.
                  Na prática, o objetivo é garantir <strong>equilíbrio contratual</strong>, transparência e reparação de danos
                  quando houver abusos, falhas ou irregularidades.
                </p>

                <h2>Atuação completa: prevenção e solução de conflitos</h2>
                <p>
                  O escritório atua com orientação jurídica e estratégia para prevenir e solucionar conflitos envolvendo
                  relações de consumo, seja pela via extrajudicial (negociação e notificações) ou pela via administrativa e judicial,
                  quando necessário. Cada caso é analisado individualmente, com foco em solução eficiente e segura.
                </p>

                {/* IMAGEM ESPECÍFICA DA ÁREA */}
                {/* <figure className="not-prose my-10">
                  <div className="relative w-full overflow-hidden rounded-3xl border border-gray-200 shadow-lg">
                    <div className="relative w-full aspect-[16/9]">
                      <Image
                        src={areaImage}
                        alt="Direito do Consumidor: cobranças indevidas, contratos abusivos e negativação irregular"
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
                      Defesa do consumidor com foco em equilíbrio contratual, solução de conflitos e reparação de danos.
                    </figcaption>
                  </div>
                </figure> */}

                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaHandHoldingUsd /> Cobranças e pagamentos indevidos
                    </div>
                    <p className="mt-2 text-gray-700">
                      Atuação em cobranças indevidas, duplicadas ou não reconhecidas, com medidas para correção e reparação.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaFileContract /> Contratos e cláusulas abusivas
                    </div>
                    <p className="mt-2 text-gray-700">
                      Análise e revisão de contratos de consumo, buscando equilíbrio e proteção contra abusos.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaExclamationTriangle /> Negativação indevida
                    </div>
                    <p className="mt-2 text-gray-700">
                      Medidas para retirada de restrições irregulares e reparação, conforme as provas e o contexto do caso.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaBalanceScale /> Atuação administrativa e judicial
                    </div>
                    <p className="mt-2 text-gray-700">
                      Negociação, atuação em órgãos competentes e ações judiciais quando a solução amigável não resolve.
                    </p>
                  </div>
                </div>

                <h2>Principais serviços em Direito do Consumidor</h2>
                <ul>
                  <li>
                    <strong>Análise e revisão de contratos de consumo:</strong> cláusulas abusivas, dever de informação, cobranças e condições.
                  </li>
                  <li>
                    <strong>Cobranças indevidas:</strong> contestação de valores, repetição de indébito (quando cabível) e orientações estratégicas.
                  </li>
                  <li>
                    <strong>Negativação indevida:</strong> atuação para retirada do apontamento e reparação por danos, conforme o caso.
                  </li>
                  <li>
                    <strong>Vícios e defeitos de produtos e serviços:</strong> problemas de qualidade, falhas na prestação do serviço, assistência e garantias.
                  </li>
                  <li>
                    <strong>Descumprimento de oferta:</strong> publicidade enganosa, entrega diferente do contratado, prazos e obrigações do fornecedor.
                  </li>
                  <li>
                    <strong>Conflitos com instituições financeiras:</strong> relações com bancos, cartões, empréstimos e serviços financeiros.
                  </li>
                  <li>
                    <strong>Operadoras e prestadores de serviços:</strong> telefonia, internet, serviços essenciais e relações contratuais em geral.
                  </li>
                </ul>

                <h2 id="como-funciona">Como funciona o atendimento</h2>
                <ol>
                  <li>
                    <strong>Triagem e entendimento do problema:</strong> o que aconteceu, com quem, e quais documentos/provas existem.
                  </li>
                  <li>
                    <strong>Organização de evidências:</strong> contratos, faturas, protocolos, prints, notas fiscais, laudos e registros.
                  </li>
                  <li>
                    <strong>Estratégia:</strong> tentativa extrajudicial/administrativa ou judicial, conforme urgência e viabilidade.
                  </li>
                  <li>
                    <strong>Acompanhamento:</strong> condução do caso com comunicação clara e foco em solução eficaz.
                  </li>
                </ol>

                <h2>Documentos comuns (variam por caso)</h2>
                <p>
                  Em geral: contratos, faturas/boletos, comprovantes de pagamento, notas fiscais, protocolos, e-mails, prints
                  de conversas, anúncios/ofertas, laudos e qualquer registro do defeito, cobrança ou restrição.
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
                  Atuamos em Direito do Consumidor com foco na proteção do consumidor, equilíbrio contratual e reparação de danos.
                  Se você enfrenta cobrança indevida, negativação irregular, contrato abusivo ou falha em produto/serviço,
                  conte com acompanhamento profissional do início ao fim.
                </p>

                <div className="not-prose mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white font-semibold px-6 py-4 rounded-2xl hover:opacity-90 transition text-center"
                  >
                    Quero falar com um advogado do consumidor
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
