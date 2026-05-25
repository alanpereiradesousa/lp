// pages/areas/direito-de-familia-e-sucessoes.tsx

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
  FaHeart,
  FaUsers,
  FaBalanceScale,
  FaFileAlt,
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
    console.error('[AREA FAMILIA ERROR]', error);
    return { props: { menu: null } };
  } finally {
    await prisma.$disconnect();
  }
};

export default function DireitoFamiliaSucessoesPage({ menu }: AreaPageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const canonicalUrl = `${baseUrl}/areas/direito-de-familia-e-sucessoes`;

  const title =
    'Direito de Família e Sucessões em Belém | Pereira de Sousa Advogados';
  const description =
    'Atendimento humanizado e técnico em Direito de Família e Sucessões: divórcio, pensão alimentícia, guarda, inventário, partilha, testamento e planejamento sucessório.';

  /**
   * PADRÃO DAS ÁREAS
   */
  const heroImage = '/images/alan-direito.jpg';
  const areaImage = '/images/areas/direito-familia-sucessoes.jpg';

  const whatsappLink =
    'https://wa.me/5591986284970?text=Olá!%20Preciso%20de%20orientação%20em%20Direito%20de%20Família%20ou%20Sucessões.';

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Direito de Família e Sucessões — Pereira de Sousa Advogados',
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
            alt="Atendimento jurídico em Direito de Família"
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
                Direito de Família e Sucessões
              </h1>

              <p className="max-w-3xl text-gray-200 text-base md:text-lg">
                Atendimento humanizado e técnico em questões sensíveis que
                envolvem vínculos familiares e patrimoniais, com foco na proteção
                de direitos, pacificação de conflitos e segurança jurídica.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#fec655] text-black font-semibold px-5 py-3 rounded-2xl hover:opacity-90 transition"
                >
                  Falar com um advogado de família
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

                <h2>O que é Direito de Família e Sucessões</h2>
                <p>
                  O <strong>Direito de Família e Sucessões</strong> é o ramo do
                  Direito que trata das relações familiares e da organização do
                  patrimônio em vida e após o falecimento. Envolve temas
                  sensíveis, que exigem não apenas conhecimento técnico, mas
                  também <strong>escuta qualificada, empatia e responsabilidade</strong>.
                </p>

                <h2>Atendimento humanizado e técnico</h2>
                <p>
                  O escritório atua com abordagem <strong>humanizada e estratégica</strong>,
                  compreendendo que conflitos familiares exigem soluções
                  jurídicas seguras, mas também respeito às pessoas envolvidas.
                  Sempre que possível, busca-se a <strong>resolução consensual</strong>,
                  preservando vínculos e reduzindo desgastes emocionais.
                </p>

                {/* IMAGEM DA ÁREA */}
                {/* <figure className="not-prose my-10">
                  <div className="relative w-full overflow-hidden rounded-3xl border border-gray-200 shadow-lg">
                    <div className="relative w-full aspect-[16/9]">
                      <Image
                        src={areaImage}
                        alt="Direito de Família e Sucessões: atendimento humanizado"
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
                      Atuação em Direito de Família e Sucessões com foco na
                      proteção de direitos e pacificação de conflitos.
                    </figcaption>
                  </div>
                </figure> */}

                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaHeart /> Atendimento humanizado
                    </div>
                    <p className="mt-2 text-gray-700">
                      Sensibilidade e respeito na condução de conflitos
                      familiares.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaUsers /> Proteção da família
                    </div>
                    <p className="mt-2 text-gray-700">
                      Atuação voltada ao melhor interesse das partes envolvidas,
                      especialmente crianças e adolescentes.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaFileAlt /> Organização patrimonial
                    </div>
                    <p className="mt-2 text-gray-700">
                      Planejamento e regularização patrimonial com segurança
                      jurídica.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaBalanceScale /> Soluções jurídicas seguras
                    </div>
                    <p className="mt-2 text-gray-700">
                      Condução técnica em processos judiciais quando necessário.
                    </p>
                  </div>
                </div>

                <h2>Principais serviços em Direito de Família</h2>
                <ul>
                  <li>
                    <strong>Divórcio:</strong> consensual ou litigioso, com
                    orientação jurídica completa.
                  </li>
                  <li>
                    <strong>Pensão alimentícia:</strong> fixação, revisão e
                    exoneração.
                  </li>
                  <li>
                    <strong>Guarda:</strong> definição e regulamentação de guarda
                    unilateral ou compartilhada.
                  </li>
                  <li>
                    <strong>Regulamentação de visitas:</strong> organização do
                    convívio familiar.
                  </li>
                  <li>
                    <strong>Reconhecimento e dissolução de união estável.</strong>
                  </li>
                </ul>

                <h2>Direito das Sucessões</h2>
                <ul>
                  <li>
                    <strong>Inventário:</strong> judicial e extrajudicial.
                  </li>
                  <li>
                    <strong>Partilha de bens:</strong> orientação e condução do
                    processo sucessório.
                  </li>
                  <li>
                    <strong>Testamentos:</strong> elaboração e orientação
                    sucessória.
                  </li>
                  <li>
                    <strong>Planejamento sucessório:</strong> organização
                    patrimonial para evitar conflitos futuros.
                  </li>
                </ul>

                <h2>Como funciona o atendimento</h2>
                <ol>
                  <li>
                    <strong>Escuta inicial:</strong> compreensão da situação e
                    das necessidades do cliente.
                  </li>
                  <li>
                    <strong>Análise jurídica:</strong> avaliação técnica dos
                    documentos e possibilidades legais.
                  </li>
                  <li>
                    <strong>Definição de estratégia:</strong> escolha da solução
                    mais adequada ao caso.
                  </li>
                  <li>
                    <strong>Acompanhamento:</strong> condução responsável do
                    caso, com comunicação clara.
                  </li>
                </ol>

                <h2>Atendimento em Belém e região</h2>
                <p>
                  Atuamos em Direito de Família e Sucessões com foco na proteção
                  dos direitos e na pacificação dos conflitos. Se você enfrenta
                  uma situação familiar ou sucessória que exige orientação
                  jurídica, conte com acompanhamento profissional do início ao
                  fim.
                </p>

                <div className="not-prose mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white font-semibold px-6 py-4 rounded-2xl hover:opacity-90 transition text-center"
                  >
                    Quero falar com um advogado de família
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
