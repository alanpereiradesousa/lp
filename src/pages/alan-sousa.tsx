// pages/alan-sousa.tsx — cartão de links do Dr. Alan Sousa (conteúdo alinhado a direito-previdenciario.tsx)
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { FiGlobe, FiMessageCircle, FiStar, FiPhone, FiMail, FiMapPin, FiBriefcase } from "react-icons/fi";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

const OFFICE = {
  name: "Pereira de Sousa Advogados",
  domain: "https://pereiradesousa.adv.br",
  email: "contato@pereiradesousa.adv.br",
  instagram: "https://www.instagram.com/pereiradesousaescritorio",
  googleMaps:
    "https://www.google.com/maps/search/?api=1&query=Av.+Roberto+Camelier%2C+1642%2C+Bel%C3%A9m+-+PA%2C+66033-683",
  addressLine:
    "Av. Roberto Camelier, 1642, sala 03, CEP 66033-683 — Condor, Belém/PA",
};

/** Foto usada no card e no preview ao compartilhar (WhatsApp / redes) — URL absoluta em og:image */
const SHARE_PHOTO_PATH = "/images/alan.jpg";

/** Mesmos dados da página /areas/direito-previdenciario */
const ALAN = {
  displayName: "Dr. Alan Sousa",
  role: "Advogado Previdenciário",
  photo: SHARE_PHOTO_PATH,
  phoneDisplay: "(91) 98395-7965",
  phoneE164: "+5591986284970",
  whatsappNumber: "5591992047151",
  whatsappPreset:
    "Olá! Quero falar sobre um caso de Direito Previdenciário.",
  bioShort:
    "Atuação em RGPS e RPPS (BELÉMPREV, IGEPPS), pós-graduando em Direito Previdenciário pela Faculdade Brasília e ePREV — ética, transparência e orientação clara.",
};

function buildWhatsAppLink(message: string) {
  return `https://wa.me/${ALAN.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function absoluteUrl(base: string, path: string) {
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

export default function AlanSousaLinksPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || OFFICE.domain;
  const canonicalUrl = `${baseUrl.replace(/\/$/, "")}/alan-sousa`;
  /** Obrigatório URL absoluta https para og:image (WhatsApp / Facebook) */
  const shareImageUrl = absoluteUrl(baseUrl, SHARE_PHOTO_PATH);

  const title = "Dr. Alan Sousa | Advogado Previdenciário em Belém — Links";
  const description =
    "Dr. Alan Sousa atua em Direito Previdenciário (RGPS/INSS e RPPS), com demandas no BELÉMPREV e IGEPPS, planejamento previdenciário, aposentadorias, auxílio-doença, BPC/LOAS, pensão por morte, salário-maternidade, revisões, recursos e ações judiciais em Belém/PA.";

  const waPrev = buildWhatsAppLink(ALAN.whatsappPreset);
  const waGeral = buildWhatsAppLink(
    "Olá! Gostaria de falar com o Dr. Alan Sousa sobre uma demanda previdenciária."
  );

  const jsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Alan Sousa",
    honorificPrefix: "Dr.",
    jobTitle: ALAN.role,
    description,
    image: shareImageUrl,
    url: canonicalUrl,
    telephone: ALAN.phoneE164,
    worksFor: {
      "@type": "LegalService",
      name: OFFICE.name,
      url: OFFICE.domain,
    },
    sameAs: [OFFICE.instagram],
    knowsAbout: [
      "Direito Previdenciário",
      "RGPS",
      "RPPS",
      "INSS",
      "BELÉMPREV",
      "IGEPPS",
    ],
  };

  const linkButtons = [
    {
      label: "WhatsApp — Direito Previdenciário",
      href: waPrev,
      icon: <FaWhatsapp className="text-xl" />,
      highlight: true,
      external: true,
    },
    {
      label: "WhatsApp — mensagem livre",
      href: waGeral,
      icon: <FiMessageCircle className="text-lg" />,
      highlight: false,
      external: true,
    },
    {
      label: "Página: Direito Previdenciário",
      href: "/areas/direito-previdenciario",
      icon: <FiBriefcase className="text-lg" />,
      highlight: false,
      external: false,
    },
    {
      label: "Site — Pereira de Sousa Advogados",
      href: OFFICE.domain,
      icon: <FiGlobe className="text-lg" />,
      highlight: false,
      external: true,
    },
    {
      label: "Instagram do escritório",
      href: OFFICE.instagram,
      icon: <FaInstagram className="text-lg" />,
      highlight: false,
      external: true,
    },
    {
      label: "Como chegar (Maps)",
      href: OFFICE.googleMaps,
      icon: <FiMapPin className="text-lg" />,
      highlight: false,
      external: true,
    },
    {
      label: "Avaliações no Google",
      href: `https://www.google.com/search?q=${encodeURIComponent(
        "Pereira de Sousa Advogados Belém avaliações"
      )}`,
      icon: <FiStar className="text-lg" />,
      highlight: false,
      external: true,
    },
  ];

  const quickIcons = [
    { href: waPrev, label: "WhatsApp", icon: <FaWhatsapp className="text-xl text-white" />, bg: "bg-[#25D366]" },
    {
      href: `tel:${ALAN.phoneE164.replace(/\s/g, "")}`,
      label: "Ligar",
      icon: <FiPhone className="text-xl text-white" />,
      bg: "bg-zinc-700",
    },
    {
      href: OFFICE.instagram,
      label: "Instagram",
      icon: <FaInstagram className="text-xl text-white" />,
      bg: "bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888]",
    },
    {
      href: `mailto:${OFFICE.email}`,
      label: "E-mail",
      icon: <FiMail className="text-xl text-white" />,
      bg: "bg-zinc-600",
    },
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={canonicalUrl} />
        {/* Preview no WhatsApp: imagem absoluta + secure_url + alt (recomendado por crawlers) */}
        <meta property="og:image" content={shareImageUrl} />
        <meta property="og:image:secure_url" content={shareImageUrl} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta
          property="og:image:alt"
          content="Dr. Alan Sousa — Advogado Previdenciário em Belém, Pereira de Sousa Advogados"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={shareImageUrl} />
        <meta
          name="twitter:image:alt"
          content="Dr. Alan Sousa — Advogado Previdenciário em Belém, Pereira de Sousa Advogados"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        strategy="afterInteractive"
      />

      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <Analytics />

        <main className="w-full max-w-[300px] flex flex-col items-center">
          <div className="relative w-full rounded-t-[2rem] overflow-hidden bg-gradient-to-b from-amber-950/50 via-zinc-900 to-zinc-950 pt-10 pb-14 px-6 shadow-xl border border-white/10 border-b-0">
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 0%, rgba(254,198,85,0.25), transparent 55%)",
              }}
            />

            <div className="relative flex flex-col items-center">
              <div className="relative h-[112px] w-[112px] rounded-full border-4 border-[#fec655]/60 shadow-lg overflow-hidden bg-zinc-800">
                <Image
                  src={ALAN.photo}
                  alt={`${ALAN.displayName}, ${ALAN.role}`}
                  fill
                  className="object-cover object-top"
                  sizes="112px"
                  priority
                />
              </div>

              <h1
                className="mt-5 text-center text-[1.25rem] leading-tight font-bold tracking-tight text-white"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {ALAN.displayName}
              </h1>
              <p className="mt-1 text-center text-sm font-semibold text-[#fec655]">{ALAN.role}</p>
              <p className="mt-3 text-center text-[12px] text-zinc-300/95 leading-snug px-0.5">{ALAN.bioShort}</p>
            </div>
          </div>

          <div className="relative z-10 -mt-7 flex flex-wrap justify-center gap-3 px-2 mb-6">
            {quickIcons.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className={`flex h-14 w-14 items-center justify-center rounded-full ${item.bg} shadow-lg ring-2 ring-black/40 hover:scale-105 active:scale-95 transition-transform`}
              >
                {item.icon}
              </a>
            ))}
          </div>

          <div className="w-full space-y-2.5 pb-6">
            {linkButtons.map((item) => {
              const className = [
                "flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-semibold shadow-md transition hover:brightness-110 border",
                item.highlight
                  ? "bg-[#fec655] text-black border-[#fec655]"
                  : "bg-white/5 text-white border-white/15 hover:bg-white/10",
              ].join(" ");

              const inner = (
                <>
                  <span
                    className={[
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                      item.highlight ? "bg-black/10 text-black" : "bg-white/10",
                    ].join(" ")}
                  >
                    {item.icon}
                  </span>
                  <span className="flex-1 leading-tight">{item.label}</span>
                  <span
                    className={[
                      "text-lg",
                      item.highlight ? "text-black/35" : "text-white/40",
                    ].join(" ")}
                  >
                    ›
                  </span>
                </>
              );

              if (item.external) {
                return (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className={className}>
                    {inner}
                  </a>
                );
              }

              return (
                <Link key={item.label} href={item.href} className={className}>
                  {inner}
                </Link>
              );
            })}
          </div>

          <p className="text-center text-[11px] text-zinc-500 leading-relaxed px-2 max-w-[280px]">
            {OFFICE.name}
            <br />
            {OFFICE.addressLine}
          </p>

          <footer className="mt-6 text-center text-[10px] text-zinc-600 max-w-[260px]">
            © {new Date().getFullYear()} {OFFICE.name}. Todos os direitos reservados.
          </footer>

          <p className="mt-3 text-[10px] text-zinc-600 text-center max-w-[280px]">
            <strong className="text-zinc-500">Atenção:</strong> conteúdo informativo; não substitui consulta
            individualizada.
          </p>
        </main>
      </div>
    </>
  );
}
