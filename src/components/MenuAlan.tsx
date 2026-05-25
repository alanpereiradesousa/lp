import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import { LinkItem } from "../types";
import { MdMenu, MdClose, MdAccountCircle } from "react-icons/md";

interface MenuProps {
  menuData: {
    logoUrl: string;
    links: LinkItem[];
  } | null;
}

export function MenuAlan({ menuData }: MenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const whatsappLink =
    'https://wa.me/5591986284970?text=Olá!%20Quero%20falar%20sobre%20um%20caso%20de%20Direito%20Previdenciário.';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  if (!menuData) return null;

  const { logoUrl, links } = menuData;

  const authButton =
    status === "loading" ? (
      <span className="text-white/70">Carregando...</span>
    ) : (
      session && (
        <Link
          href="/admin"
          onClick={() => setMenuOpen(false)}
          className="relative flex items-center gap-1 text-white hover:text-[#fec655] transition-colors duration-300 group"
        >
          <MdAccountCircle className="w-5 h-5 text-white" />
          Minha Conta
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#fec655] transition-all duration-300 group-hover:w-full" />
        </Link>
      )
    );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 shadow-lg transition-all duration-300 ${
        isScrolled ? "bg-black py-3" : "bg-black/50 backdrop-blur-sm py-3 md:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="#" aria-label="Página inicial">
          <img
            src={"/images/logo-alan.jpg"}
            alt="Logomarca Pereira de Sousa – Advocacia"
            className={`transition-all duration-300 ${isScrolled ? "w-28 md:w-36" : "w-44 md:w-52"
              }`}
          />
        </Link>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg text-sm transition"
          >
            Conversar Agora
          </a>
          {authButton}
        </nav>

        {/* Botão Mobile */}
        <button
          aria-label="Abrir menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex items-center justify-center p-2 rounded-md bg-black border border-[#fec655]/40 hover:border-[#fec655] transition-colors"
        >
          {menuOpen ? (
            <MdClose className="w-6 h-6 text-white" />
          ) : (
            <MdMenu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Menu Mobile */}
      <nav
        className={`fixed inset-0 z-50 bg-black md:hidden transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Fechar */}
        <div className="flex justify-end p-6">
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
            className="p-2 rounded-md border border-[#fec655]/40 hover:border-[#fec655] transition-colors"
          >
            <MdClose className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Links */}
        <ul className="list-none flex flex-col gap-4 px-6 pb-10 text-white text-lg">
          <li>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg text-sm transition"
            >
              Conversar Agora
            </a>
          </li>

          {session && (
            <li>
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 py-4 hover:text-[#fec655] transition-colors"
              >
                <MdAccountCircle className="w-5 h-5 text-white" />
                Minha Conta
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
