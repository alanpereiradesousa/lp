// pages/areas/direito-da-saude.tsx

import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Menu as MenuComponent } from 'components/Menu';
import Footer from 'components/Footer';
import WhatsAppButton from 'components/WhatsAppButton';
import { MenuData, LinkItem } from '../../types/index';
import { Analytics } from '@vercel/analytics/next';
import { FaHeart, FaFileMedical, FaHandshake, FaShieldAlt } from 'react-icons/fa';

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
    console.error('[AREA SAUDE ERROR]', error);
    return { props: { menu: null } };
  } finally {
    await prisma.$disconnect();
  }
};

export default function DireitoDaSaudePage({ menu }: AreaPageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const canonicalUrl = `${baseUrl}/areas/direito-da-saude`;

  const title = 'Direito da Saúde em Belém | Pereira de Sousa Advogados';
  const description =
    'Atuação em Direito da Saúde: defesa do direito à saúde, demandas contra planos de saúde, negativa de cobertura, fornecimento de medicamentos, tratamentos, cirurgias, exames e internações, com atuação administrativa e judicial quando necessário.';

  /**
   * PADRÃO DAS ÁREAS
   */
  const heroImage = '/images/alan-direito.jpg';
  const areaImage = '/images/areas/direito-da-saude.jpg';

  const whatsappLink =
    'https://wa.me/5591986284970?text=Olá!%20Preciso%20de%20ajuda%20em%20Direito%20da%20Saúde%20(plano%20de%20saúde%2C%20medicamento%20ou%20tratamento).';

  const faq = [
    {
      q: 'O que fazer quando o plano de saúde nega cobertura?',
      a: 'Guarde a negativa (por escrito, e-mail, protocolo ou print), a prescrição/relatório médico e o contrato. Com esses documentos, é possível avaliar medidas administrativas e, quando necessário, medidas judiciais para buscar a cobertura, conforme o caso e a urgência.',
    },
    {
      q: 'É possível obter medicamento ou tratamento de alto custo?',
      a: 'Dependendo do caso, sim. A viabilidade depende da prescrição médica, do quadro clínico, do tipo de cobertura/entidade responsável e da documentação. Uma análise técnica define a melhor estratégia.',
    },
    {
      q: 'Vocês atuam em cirurgias, exames e internações?',
      a: 'Sim. Atuamos em demandas envolvendo autorização e cobertura de procedimentos, inclusive quando há urgência, negativa ou demora injustificada.',
    },
    {
      q: 'Quais documentos são importantes para análise?',
      a: 'Relatório/prescrição médica (com justificativa), exames, negativas e protocolos do plano/órgão, contrato do plano, comprovantes de pagamento, carteirinha, e qualquer comunicação formal sobre o caso.',
    },
    {
      q: 'O atendimento pode ser urgente?',
      a: 'Em situações de urgência (risco à saúde, agravamento do quadro), a estratégia pode priorizar medidas rápidas, sempre conforme a documentação e a realidade do caso.',
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
    name: 'Direito da Saúde — Pereira de Sousa Advogados',
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
            alt="Atendimento jurídico em Direito da Saúde"
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
                Direito da Saúde
              </h1>

              <p className="max-w-3xl text-gray-200 text-base md:text-lg">
                Atuação na defesa do direito à saúde, com demandas envolvendo planos de saúde, negativas de cobertura,
                fornecimento de medicamentos e tratamentos médicos, cirurgias, exames e internações, com estratégia e
                acompanhamento técnico.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#fec655] text-black font-semibold px-5 py-3 rounded-2xl hover:opacity-90 transition"
                >
                  Falar com um advogado de Saúde
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
                <h2>O que é Direito da Saúde</h2>
                <p>
                  O <strong>Direito da Saúde</strong> envolve a proteção do direito à saúde e a busca por acesso a
                  tratamentos, exames, medicamentos e procedimentos quando há negativa, demora injustificada ou
                  conflitos com planos de saúde e prestadores. A atuação pode ocorrer na esfera administrativa e, quando
                  necessário, na esfera judicial, com foco em segurança e efetividade.
                </p>

                <h2>Como podemos ajudar</h2>
                <p>
                  Atuamos com análise técnica do caso, organização de documentos e definição de estratégia para buscar
                  a solução adequada — especialmente em situações urgentes. O objetivo é garantir o acesso ao cuidado
                  necessário, com condução ética e comunicação clara.
                </p>

                {/* IMAGEM ESPECÍFICA DA ÁREA */}
                {/* <figure className="not-prose my-10">
                  <div className="relative w-full overflow-hidden rounded-3xl border border-gray-200 shadow-lg">
                    <div className="relative w-full aspect-[16/9]">
                      <Image
                        src={areaImage}
                        alt="Direito da Saúde: planos de saúde, medicamentos e tratamentos"
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
                      Planos de saúde, negativa de cobertura, medicamentos, tratamentos, exames, cirurgias e internações.
                    </figcaption>
                  </div>
                </figure> */}

                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaHeart /> Defesa do direito à saúde
                    </div>
                    <p className="mt-2 text-gray-700">
                      Atuação para garantir acesso a tratamentos e procedimentos, com foco em efetividade e urgência quando aplicável.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaFileMedical /> Negativa de cobertura
                    </div>
                    <p className="mt-2 text-gray-700">
                      Medidas contra negativas e limitações indevidas, com base em prescrição médica e documentação do caso.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaHandshake /> Atuação administrativa e judicial
                    </div>
                    <p className="mt-2 text-gray-700">
                      Estratégia de solução: tentativas administrativas e, quando necessário, medidas judiciais adequadas.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaShieldAlt /> Organização de provas e urgência
                    </div>
                    <p className="mt-2 text-gray-700">
                      Preservação de negativas e protocolos, relatórios médicos e documentos para dar força ao pedido.
                    </p>
                  </div>
                </div>

                <h2>Principais demandas em Direito da Saúde</h2>
                <ul>
                  <li>
                    <strong>Planos de saúde:</strong> negativa de cobertura, demora/recusa em autorizações, limitações contratuais e conflitos com operadoras.
                  </li>
                  <li>
                    <strong>Medicamentos:</strong> fornecimento/autorizações, medicamentos de alto custo e continuidade terapêutica (conforme o caso).
                  </li>
                  <li>
                    <strong>Tratamentos e terapias:</strong> sessões, procedimentos e protocolos indicados por médico assistente.
                  </li>
                  <li>
                    <strong>Cirurgias, exames e internações:</strong> cobertura, autorização e prazos, especialmente em casos urgentes.
                  </li>
                  <li>
                    <strong>Negativa de cobertura:</strong> análise do motivo da negativa e estratégia de resposta rápida, quando necessário.
                  </li>
                  <li>
                    <strong>Demandas relacionadas a benefícios:</strong> quando a condição de saúde impacta direitos previdenciários/assistenciais, conforme necessidade do caso.
                  </li>
                </ul>

                <h2 id="como-funciona">Como funciona o atendimento</h2>
                <ol>
                  <li>
                    <strong>Triagem e urgência:</strong> entender o quadro, o que foi solicitado e a situação atual.
                  </li>
                  <li>
                    <strong>Documentos:</strong> prescrição/relatório médico, exames, negativa do plano (ou protocolo), contrato e comunicações.
                  </li>
                  <li>
                    <strong>Estratégia:</strong> tentativa administrativa e/ou medidas judiciais, conforme viabilidade e necessidade.
                  </li>
                  <li>
                    <strong>Acompanhamento:</strong> condução do caso com foco em solução efetiva e comunicação clara.
                  </li>
                </ol>

                <h2>Documentos comuns (variam por caso)</h2>
                <p>
                  Em geral: prescrição médica, relatório com justificativa clínica, exames, negativa do plano (por escrito ou protocolo),
                  contrato do plano, comprovantes de pagamento e registros de comunicação com a operadora/prestador.
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
                  Atuamos em Direito da Saúde com orientação técnica e estratégica, principalmente em casos de negativa de cobertura,
                  fornecimento de medicamentos e tratamentos. Se você precisa garantir atendimento, procedimento, exame, cirurgia ou
                  internação, conte com acompanhamento profissional do início ao fim.
                </p>

                <div className="not-prose mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white font-semibold px-6 py-4 rounded-2xl hover:opacity-90 transition text-center"
                  >
                    Quero falar com um advogado da Saúde
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
