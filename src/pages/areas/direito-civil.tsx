// pages/areas/direito-civil.tsx

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
  FaGavel,
  FaHandshake,
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
    console.error('[AREA CIVIL ERROR]', error);
    return { props: { menu: null } };
  } finally {
    await prisma.$disconnect();
  }
};

export default function DireitoCivilPage({ menu }: AreaPageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const canonicalUrl = `${baseUrl}/areas/direito-civil`;

  const title = 'Direito Civil em Belém | Pereira de Sousa Advogados';
  const description =
    'Atuação completa em Direito Civil: contratos, cobranças, execuções, responsabilidade civil, indenizações e resolução de conflitos patrimoniais, com foco em segurança jurídica e soluções eficazes.';

  /**
   * PADRÃO DAS ÁREAS
   */
  const heroImage = '/images/alan-direito.jpg';
  const areaImage = '/images/areas/direito-civil.jpg';

  const whatsappLink =
    'https://wa.me/5591986284970?text=Olá!%20Quero%20falar%20sobre%20um%20caso%20de%20Direito%20Civil.';

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Direito Civil — Pereira de Sousa Advogados',
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Analytics />
        <MenuComponent menuData={menu} />

        {/* HERO */}
        <section className="relative w-full h-[100vh] md:h-[600px] lg:h-[680px] overflow-hidden">
          <Image
            src={areaImage}
            alt="Atendimento jurídico em Direito Civil"
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
                Direito Civil
              </h1>

              <p className="max-w-3xl text-gray-200 text-base md:text-lg">
                Atuação em demandas cíveis que envolvem relações jurídicas do dia
                a dia entre pessoas físicas e jurídicas, com foco em segurança
                jurídica, prevenção de conflitos e soluções eficazes.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#fec655] text-black font-semibold px-5 py-3 rounded-2xl hover:opacity-90 transition"
                >
                  Falar com um advogado civil
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

                <h2>O que é Direito Civil</h2>
                <p>
                  O <strong>Direito Civil</strong> é o ramo do Direito que regula
                  as relações jurídicas entre pessoas físicas e jurídicas,
                  abrangendo direitos e deveres relacionados ao patrimônio,
                  contratos, obrigações, indenizações e responsabilidade civil.
                  Trata-se de uma das áreas mais amplas e presentes no cotidiano
                  das pessoas e das empresas.
                </p>

                <h2>Atuação cível com foco em prevenção e solução de conflitos</h2>
                <p>
                  O escritório atua de forma <strong>técnica e estratégica</strong>
                  em demandas cíveis, buscando sempre soluções jurídicas seguras,
                  eficazes e adequadas à realidade de cada cliente. A atuação
                  prioriza a <strong>prevenção de litígios</strong>, mas também
                  contempla a condução firme e responsável de processos judiciais
                  quando necessários.
                </p>

                {/* IMAGEM DA ÁREA */}
                {/* <figure className="not-prose my-10">
                  <div className="relative w-full overflow-hidden rounded-3xl border border-gray-200 shadow-lg">
                    <div className="relative w-full aspect-[16/9]">
                      <Image
                        src={areaImage}
                        alt="Direito Civil: contratos, responsabilidade civil e conflitos patrimoniais"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 900px"
                        onError={(e: any) => {
                          if (e?.currentTarget)
                            e.currentTarget.src =
                              '/images/blog-default-cover.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
                    </div>

                    <figcaption className="px-5 py-4 text-sm text-gray-600 bg-white">
                      Atuação em Direito Civil com foco na proteção patrimonial,
                      prevenção e resolução de conflitos.
                    </figcaption>
                  </div>
                </figure> */}

                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaFileContract /> Contratos e obrigações
                    </div>
                    <p className="mt-2 text-gray-700">
                      Elaboração, análise e revisão de contratos civis, prevenindo
                      riscos e garantindo segurança jurídica.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaHandshake /> Soluções extrajudiciais
                    </div>
                    <p className="mt-2 text-gray-700">
                      Negociação e mediação de conflitos como alternativa rápida
                      e eficaz à judicialização.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaGavel /> Atuação judicial
                    </div>
                    <p className="mt-2 text-gray-700">
                      Condução de processos cíveis com estratégia, técnica e
                      acompanhamento integral.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaBalanceScale /> Segurança jurídica
                    </div>
                    <p className="mt-2 text-gray-700">
                      Atuação voltada à proteção de direitos e do patrimônio,
                      reduzindo riscos e incertezas.
                    </p>
                  </div>
                </div>

                <h2>Principais serviços em Direito Civil</h2>
                <ul>
                  <li>
                    <strong>Responsabilidade civil e indenizações:</strong>{' '}
                    atuação em ações indenizatórias por danos materiais, morais
                    e patrimoniais.
                  </li>
                  <li>
                    <strong>Contratos civis:</strong> elaboração, análise,
                    revisão e interpretação de contratos e instrumentos
                    particulares.
                  </li>
                  <li>
                    <strong>Cobranças e execuções:</strong> recuperação de
                    créditos, cobranças extrajudiciais e ações de execução.
                  </li>
                  <li>
                    <strong>Obrigações:</strong> orientação e atuação em
                    inadimplemento, cumprimento ou revisão de obrigações
                    contratuais.
                  </li>
                  <li>
                    <strong>Direito do consumidor:</strong> demandas envolvendo
                    relações de consumo, cobranças indevidas e falhas na prestação
                    de serviços.
                  </li>
                  <li>
                    <strong>Conflitos patrimoniais:</strong> atuação em litígios
                    relacionados a bens, patrimônio e direitos civis em geral.
                  </li>
                </ul>

                <h2 id="como-funciona">Como funciona o atendimento</h2>
                <ol>
                  <li>
                    <strong>Análise inicial do caso:</strong> compreensão do
                    conflito e dos objetivos do cliente.
                  </li>
                  <li>
                    <strong>Avaliação jurídica:</strong> estudo técnico dos
                    documentos, fatos e riscos envolvidos.
                  </li>
                  <li>
                    <strong>Definição de estratégia:</strong> escolha da melhor
                    solução (preventiva, extrajudicial ou judicial).
                  </li>
                  <li>
                    <strong>Acompanhamento contínuo:</strong> condução do caso
                    com transparência e comunicação clara.
                  </li>
                </ol>

                <h2>Documentos que auxiliam na análise</h2>
                <p>
                  Em geral, são úteis: contratos, comprovantes de pagamento,
                  notificações, e-mails, mensagens, documentos pessoais, registros
                  patrimoniais e quaisquer provas relacionadas à demanda cível.
                </p>

                <h2>Atendimento em Belém e região</h2>
                <p>
                  Atuamos em demandas de Direito Civil com foco em soluções
                  seguras e eficazes. Se você enfrenta um conflito patrimonial,
                  contratual ou busca orientação jurídica preventiva, conte com
                  acompanhamento profissional do início ao fim.
                </p>

                <div className="not-prose mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white font-semibold px-6 py-4 rounded-2xl hover:opacity-90 transition text-center"
                  >
                    Quero falar com um advogado civil
                  </a>
                  <a
                    href="/#fale"
                    className="bg-gray-100 text-gray-900 font-semibold px-6 py-4 rounded-2xl hover:bg-gray-200 transition text-center"
                  >
                    Ir para Fale Conosco
                  </a>
                </div>

                <p className="text-sm text-gray-600 mt-8">
                  <strong>Atenção:</strong> o conteúdo desta página tem caráter
                  informativo e não substitui uma consulta jurídica
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
