// pages/areas/direito-do-trabalho.tsx

import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Menu as MenuComponent } from 'components/Menu';
import Footer from 'components/Footer';
import WhatsAppButton from 'components/WhatsAppButton';
import { MenuData, LinkItem } from '../../types/index';
import { Analytics } from '@vercel/analytics/next';
import { FaGavel, FaHandshake, FaShieldAlt, FaUserTie } from 'react-icons/fa';

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
    console.error('[AREA TRABALHO ERROR]', error);
    return { props: { menu: null } };
  } finally {
    await prisma.$disconnect();
  }
};

export default function DireitoDoTrabalhoPage({ menu }: AreaPageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const canonicalUrl = `${baseUrl}/areas/direito-do-trabalho`;

  const title = 'Direito do Trabalho em Belém | Pereira de Sousa Advogados';
  const description =
    'Atuação completa e estratégica em Direito do Trabalho: defesa de trabalhadores e empregadores, prevenção de conflitos, reclamatórias trabalhistas, acordos, consultoria e assessoria empresarial contínua.';

  /**
   * PADRÃO DAS ÁREAS
   * - HERO (comum a todas): imagem de atendimento
   * - Imagem específica (varia por serviço): no meio do texto
   */
  const heroImage = '/images/alan-direito.jpg';
  const areaImage = '/images/areas/direito-do-trabalho.jpg';

  const whatsappLink =
    'https://wa.me/5591986284970?text=Olá!%20Quero%20falar%20sobre%20um%20caso%20de%20Direito%20do%20Trabalho.';

  const faq = [
    {
      q: 'Quando devo procurar um advogado trabalhista?',
      a: 'Quando houver risco de conflito, dúvidas sobre direitos e obrigações, necessidade de acordo, rescisão, cobrança de verbas, ou para orientação preventiva antes de decisões importantes (contratação, demissão, mudanças de jornada, benefícios, etc.).',
    },
    {
      q: 'Vocês atendem tanto trabalhadores quanto empresas?',
      a: 'Sim. Atuamos na defesa de trabalhadores e empregadores, com estratégia adequada ao caso, sempre buscando segurança jurídica, prevenção de litígios e efetividade de resultados.',
    },
    {
      q: 'O que é reclamatória trabalhista?',
      a: 'É uma ação judicial proposta na Justiça do Trabalho para discutir direitos trabalhistas e verbas decorrentes do contrato, como horas extras, verbas rescisórias, adicional de insalubridade/periculosidade, reconhecimento de vínculo, entre outros.',
    },
    {
      q: 'É possível resolver por acordo sem processo?',
      a: 'Em muitos casos, sim. A negociação extrajudicial pode ser uma alternativa eficiente e menos desgastante. Também há hipóteses de acordo formal com acompanhamento jurídico, conforme a estratégia do caso.',
    },
    {
      q: 'Quais documentos ajudam na análise do caso?',
      a: 'Contrato de trabalho, carteira de trabalho, holerites, comprovantes de pagamento, controles de ponto, conversas/e-mails, termo de rescisão, aviso-prévio, extratos (quando aplicável) e demais provas relacionadas à rotina laboral.',
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
    name: 'Direito do Trabalho — Pereira de Sousa Advogados',
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

        {/* Open Graph / Social */}
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

        {/* HERO (comum a todas as áreas) */}
        <section className="relative w-full h-[100vh] md:h-[600px] lg:h-[680px] overflow-hidden">
          <Image
            src={areaImage}
            alt="Atendimento jurídico trabalhista"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/80" />

          <div className="relative z-10 h-full flex items-end">
            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-10 w-full text-left">
              <p className="text-sm md:text-base text-gray-200 mb-3">Área de atuação</p>

              <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight mb-4">
                Direito do Trabalho
              </h1>

              <p className="max-w-3xl text-gray-200 text-base md:text-lg">
                Atuação completa e estratégica na área trabalhista, tanto na defesa de trabalhadores quanto na assessoria
                e defesa de empregadores e empresas, com foco na prevenção de conflitos, segurança jurídica e efetividade
                dos resultados.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#fec655] text-black font-semibold px-5 py-3 rounded-2xl hover:opacity-90 transition"
                >
                  Falar com um advogado trabalhista
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
                <h2>O que é Direito do Trabalho</h2>
                <p>
                  O <strong>Direito do Trabalho</strong> regula as relações entre empregado e empregador, estabelecendo
                  direitos, deveres e garantias durante o contrato de trabalho e também no momento de sua extinção.
                  Uma atuação jurídica bem conduzida ajuda a prevenir conflitos, reduzir riscos e proteger interesses,
                  seja na perspectiva do trabalhador, seja na perspectiva da empresa.
                </p>

                <h2>Atuação para trabalhadores e empregadores</h2>
                <p>
                  Nosso atendimento é pautado por análise criteriosa do caso, orientação clara e estratégia adequada.
                  Atuamos na <strong>defesa de trabalhadores</strong> (direitos e verbas trabalhistas) e na{' '}
                  <strong>assessoria e defesa de empregadores</strong> (prevenção de passivos, conformidade e atuação em
                  processos), sempre com foco em <strong>segurança jurídica</strong> e <strong>efetividade</strong>.
                </p>

                {/* ✅ IMAGEM ESPECÍFICA DA ÁREA (no meio do texto) */}
                {/* <figure className="not-prose my-10">
                  <div className="relative w-full overflow-hidden rounded-3xl border border-gray-200 shadow-lg">
                    <div className="relative w-full aspect-[16/9]">
                      <Image
                        src={areaImage}
                        alt="Direito do Trabalho: consultoria e atuação em demandas trabalhistas"
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
                      Orientação e atuação estratégica em Direito do Trabalho, com foco em prevenção de conflitos e segurança jurídica.
                    </figcaption>
                  </div>
                </figure> */}

                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaShieldAlt /> Prevenção de conflitos
                    </div>
                    <p className="mt-2 text-gray-700">
                      Orientação preventiva para reduzir passivos trabalhistas e evitar litígios desnecessários.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaHandshake /> Negociações e acordos
                    </div>
                    <p className="mt-2 text-gray-700">
                      Condução técnica em negociações para soluções eficazes, com segurança jurídica.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaUserTie /> Assessoria contínua para empresas
                    </div>
                    <p className="mt-2 text-gray-700">
                      Suporte na rotina empresarial (contratações, advertências, rescisões, políticas internas e compliance).
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaGavel /> Reclamatórias trabalhistas
                    </div>
                    <p className="mt-2 text-gray-700">
                      Atuação estratégica em ações trabalhistas, com análise probatória e defesa bem fundamentada.
                    </p>
                  </div>
                </div>

                <h2>Principais serviços em Direito do Trabalho</h2>
                <h3>Para trabalhadores</h3>
                <ul>
                  <li>
                    <strong>Reclamatória trabalhista:</strong> análise de direitos e verbas (horas extras, verbas rescisórias,
                    adicionais, diferenças salariais, reconhecimento de vínculo, entre outros).
                  </li>
                  <li>
                    <strong>Rescisão do contrato:</strong> conferência de valores, documentos rescisórios e orientações sobre
                    alternativas legais.
                  </li>
                  <li>
                    <strong>Acordos:</strong> apoio jurídico em negociações, buscando soluções efetivas e seguras.
                  </li>
                  <li>
                    <strong>Provas e estratégia:</strong> organização de documentos e provas para fortalecer o caso.
                  </li>
                </ul>

                <h3>Para empresas e empregadores</h3>
                <ul>
                  <li>
                    <strong>Assessoria trabalhista preventiva:</strong> revisão de práticas internas, rotinas e documentos,
                    reduzindo risco de passivos.
                  </li>
                  <li>
                    <strong>Elaboração e revisão de documentos:</strong> contratos, termos, políticas internas, regulamentos,
                    notificações e documentos relacionados à relação de emprego.
                  </li>
                  <li>
                    <strong>Gestão de riscos e conformidade:</strong> orientação estratégica para decisões sensíveis (jornada,
                    banco de horas, benefícios, desligamentos e mudanças estruturais).
                  </li>
                  <li>
                    <strong>Defesa em reclamatórias trabalhistas:</strong> contestação, produção de provas, audiências,
                    recursos e acompanhamento do processo.
                  </li>
                </ul>

                <h2 id="como-funciona">Como funciona o atendimento</h2>
                <ol>
                  <li>
                    <strong>Triagem do caso:</strong> entendimento do contexto e do objetivo (trabalhador ou empresa).
                  </li>
                  <li>
                    <strong>Análise documental e probatória:</strong> avaliação de documentos, fatos e riscos.
                  </li>
                  <li>
                    <strong>Estratégia e orientação:</strong> definição de abordagem (preventiva, acordo, defesa ou ação).
                  </li>
                  <li>
                    <strong>Atuação técnica:</strong> condução do caso com acompanhamento integral e comunicação clara.
                  </li>
                </ol>

                <h2>Documentos que ajudam na análise</h2>
                <p>
                  Normalmente (quando aplicável): carteira de trabalho, contrato, holerites, comprovantes de pagamento,
                  controles de ponto, comunicações (e-mails/mensagens), advertências, termo de rescisão, aviso-prévio,
                  recibos e demais provas da rotina laboral.
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
                  Atuamos em Direito do Trabalho com foco em prevenção de conflitos, segurança jurídica e condução estratégica
                  de demandas. Se você precisa de orientação, negociação, assessoria ou atuação em processo trabalhista,
                  conte com acompanhamento profissional do início ao fim.
                </p>

                <div className="not-prose mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white font-semibold px-6 py-4 rounded-2xl hover:opacity-90 transition text-center"
                  >
                    Quero falar com um advogado trabalhista
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
