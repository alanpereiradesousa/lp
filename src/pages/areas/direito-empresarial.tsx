// pages/areas/direito-empresarial.tsx

import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Menu as MenuComponent } from 'components/Menu';
import Footer from 'components/Footer';
import WhatsAppButton from 'components/WhatsAppButton';
import { MenuData, LinkItem } from '../../types/index';
import { Analytics } from '@vercel/analytics/next';
import { FaBalanceScale, FaFileContract, FaBuilding, FaHandshake } from 'react-icons/fa';

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
    console.error('[AREA EMPRESARIAL ERROR]', error);
    return { props: { menu: null } };
  } finally {
    await prisma.$disconnect();
  }
};

export default function DireitoEmpresarialPage({ menu }: AreaPageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const canonicalUrl = `${baseUrl}/areas/direito-empresarial`;

  const title = 'Direito Empresarial em Belém | Pereira de Sousa Advogados';
  const description =
    'Assessoria jurídica completa em Direito Empresarial: contratos, reorganizações societárias, cobrança empresarial, orientação preventiva e suporte jurídico estratégico para empresas.';

  /**
   * PADRÃO DAS ÁREAS
   */
  const heroImage = '/images/alan-direito.jpg'; // imagem padrão (atendimento)
  const areaImage = '/images/areas/direito-empresarial.jpg'; // imagem específica

  const whatsappLink =
    'https://wa.me/5591986284970?text=Olá!%20Quero%20falar%20sobre%20Direito%20Empresarial.';

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Direito Empresarial — Pereira de Sousa Advogados',
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
            alt="Atendimento jurídico empresarial"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/80" />

          <div className="relative z-10 h-full flex items-end">
            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-10 w-full">
              <p className="text-sm text-gray-200 mb-3">Área de atuação</p>
              <h1 className="font-display text-3xl md:text-5xl font-extrabold mb-4">
                Direito Empresarial
              </h1>
              <p className="max-w-3xl text-gray-200 text-base md:text-lg">
                Assessoria jurídica completa a empresários e sociedades empresárias, desde a constituição da empresa até
                a sua gestão cotidiana, com foco em segurança jurídica, prevenção de riscos e crescimento sustentável.
              </p>

              <div className="mt-6">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#fec655] text-black font-semibold px-6 py-3 rounded-2xl hover:opacity-90 transition"
                >
                  Falar com um advogado empresarial
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CONTEÚDO */}
        <main className="relative z-10">
          <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-12">
              <article className="prose prose-base md:prose-lg max-w-none text-gray-800">

                <h2>O que é Direito Empresarial</h2>
                <p>
                  O <strong>Direito Empresarial</strong> é o ramo do Direito responsável por regular a atividade econômica
                  organizada, disciplinando a atuação de empresários e sociedades empresárias. Envolve normas
                  relacionadas à constituição, organização, funcionamento, relações contratuais e responsabilidades
                  jurídicas das empresas.
                </p>

                <h2>Atuação estratégica para empresas</h2>
                <p>
                  O escritório atua de forma <strong>preventiva e estratégica</strong>, auxiliando empresários na tomada
                  de decisões jurídicas seguras, reduzindo riscos legais e fortalecendo a estrutura do negócio.
                </p>

                {/* IMAGEM ESPECÍFICA */}
                {/* <figure className="not-prose my-10">
                  <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-lg">
                    <Image
                      src={areaImage}
                      alt="Direito Empresarial e assessoria jurídica para empresas"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="text-sm text-gray-600 mt-3 text-center">
                    Assessoria jurídica empresarial voltada à segurança, organização e crescimento do negócio.
                  </figcaption>
                </figure> */}

                <h2>Principais serviços em Direito Empresarial</h2>
                <ul>
                  <li>
                    <strong>Constituição e regularização de empresas:</strong> orientação na escolha do tipo societário,
                    elaboração de contratos sociais e adequação legal.
                  </li>
                  <li>
                    <strong>Elaboração e análise de contratos empresariais:</strong> contratos comerciais, prestação de
                    serviços, fornecimento, parcerias e negociações estratégicas.
                  </li>
                  <li>
                    <strong>Reorganizações societárias:</strong> alterações contratuais, entrada e saída de sócios,
                    fusões, cisões e incorporações.
                  </li>
                  <li>
                    <strong>Dissolução societária:</strong> orientação jurídica em encerramento de atividades e conflitos
                    entre sócios.
                  </li>
                  <li>
                    <strong>Cobranças empresariais:</strong> atuação extrajudicial e judicial para recuperação de créditos.
                  </li>
                  <li>
                    <strong>Consultoria preventiva:</strong> análise de riscos legais e adequação da empresa às normas
                    vigentes.
                  </li>
                </ul>

                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
                  <div className="rounded-2xl border p-5">
                    <FaFileContract className="text-2xl mb-2" />
                    <strong>Contratos seguros</strong>
                    <p className="text-sm text-gray-700 mt-2">
                      Redação clara e estratégica para evitar litígios e prejuízos futuros.
                    </p>
                  </div>

                  <div className="rounded-2xl border p-5">
                    <FaBuilding className="text-2xl mb-2" />
                    <strong>Estrutura societária</strong>
                    <p className="text-sm text-gray-700 mt-2">
                      Organização jurídica adequada ao porte e objetivo do negócio.
                    </p>
                  </div>

                  <div className="rounded-2xl border p-5">
                    <FaHandshake className="text-2xl mb-2" />
                    <strong>Negociações empresariais</strong>
                    <p className="text-sm text-gray-700 mt-2">
                      Apoio jurídico em negociações estratégicas e relações comerciais.
                    </p>
                  </div>

                  <div className="rounded-2xl border p-5">
                    <FaBalanceScale className="text-2xl mb-2" />
                    <strong>Segurança jurídica</strong>
                    <p className="text-sm text-gray-700 mt-2">
                      Atuação preventiva para proteger o patrimônio e a atividade empresarial.
                    </p>
                  </div>
                </div>

                <h2>Atendimento personalizado</h2>
                <p>
                  Cada empresa possui uma realidade própria. Por isso, o atendimento é realizado de forma
                  <strong> personalizada</strong>, considerando o porte do negócio, o segmento de atuação e os objetivos
                  estratégicos do empresário.
                </p>

                <div className="not-prose mt-8">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white px-6 py-4 rounded-2xl font-semibold hover:opacity-90 transition"
                  >
                    Solicitar assessoria empresarial
                  </a>
                </div>

                <p className="text-sm text-gray-600 mt-8">
                  <strong>Atenção:</strong> este conteúdo possui caráter informativo e não substitui uma consulta jurídica
                  individualizada.
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
