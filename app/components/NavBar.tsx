"use client";

import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { twMerge } from "tailwind-merge";

const SECTIONS = [
  { key: "home" as const, id: "inicio" },
  { key: "services" as const, id: "servicios" },
  { key: "projects" as const, id: "proyectos" },
  { key: "philosophy" as const, id: "filosofia" },
  { key: "contact" as const, id: "contacto" },
];

export const NavBar = () => {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();
  const [activeSection, setActiveSection] = useState("inicio");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed mt-8 top-0 left-0 right-0 z-50 bg-black border-b border-zinc-800">
      <div className="relative flex items-center px-4 sm:px-8 py-4">
        {/* Desktop nav */}
        <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-3 sm:gap-5 md:gap-8">
          {SECTIONS.map(({ key, id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={scrollTo(id)}
                className={twMerge(
                  "text-white text-xs sm:text-sm md:text-[15px] lg:text-base font-extralight uppercase tracking-[0.2em] transition-opacity duration-300",
                  activeSection === id
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-80",
                )}
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-[6px] z-50"
          aria-label="Abrir menú"
        >
          <span
            className={twMerge(
              "block h-px w-7 bg-white transition-all duration-300",
              isMenuOpen && "translate-y-[7px] rotate-45",
            )}
          />
          <span
            className={twMerge(
              "block h-px w-7 bg-white transition-all duration-300",
              isMenuOpen && "opacity-0",
            )}
          />
          <span
            className={twMerge(
              "block h-px w-7 bg-white transition-all duration-300",
              isMenuOpen && "-translate-y-[7px] -rotate-45",
            )}
          />
        </button>

        {/* Idiomas */}
        <div className="ml-auto flex gap-2 text-xs items-center z-50">
          <Link
            href={pathname}
            locale="es"
            className={twMerge(
              "text-white transition-opacity",
              locale === "es"
                ? "opacity-100 font-semibold"
                : "opacity-50 hover:opacity-80",
            )}
          >
            ES
          </Link>

          <span className="text-white opacity-30">|</span>

          <Link
            href={pathname}
            locale="en"
            className={twMerge(
              "text-white transition-opacity",
              locale === "en"
                ? "opacity-100 font-semibold"
                : "opacity-50 hover:opacity-80",
            )}
          >
            EN
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={twMerge(
          "md:hidden overflow-hidden bg-black border-t border-zinc-800 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
          isMenuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="flex flex-col px-6 py-6 gap-5">
          {SECTIONS.map(({ key, id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => {
                  scrollTo(id)(e);
                  setIsMenuOpen(false);
                }}
                className={twMerge(
                  "block text-white text-sm font-extralight uppercase tracking-[0.2em] transition-opacity duration-300",
                  activeSection === id
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-80",
                )}
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
