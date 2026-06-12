"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import ProyectoCardChica from "@/app/components/ProyectoCardChica";
import { Proyecto } from "@/app/model/proyecto.type";

const ProyectoCardGrande = dynamic(
  () => import("@/app/components/ProyectoCardGrande"),
  { ssr: false },
);

const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "5493875038714";

const whatsappHref = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
  "Hola! Me gustaría empezar mi proyecto con Vhetra.",
)}`;

export function ProyectosSection() {
  const t = useTranslations("projects");

  const [selectedProyecto, setSelectedProyecto] = useState<Proyecto | null>(
    null,
  );

  const carouselRef = useRef<HTMLDivElement>(null);

  const proyectos = useMemo<Proyecto[]>(
    () => [
      {
        id: 1,
        name: "Acrodata",
        miniTitulo: t("acrodata.miniTitulo"),
        titulo: t("acrodata.titulo"),
        miniDescripcion: t("acrodata.miniDescripcion"),
        descripcionCompleta: (
          <>
            {t("acrodata.descripcionP1")}
            <br />
            <br />
            {t("acrodata.descripcionP2")}
            <br />
            <br />
            {t("acrodata.technologies")}
          </>
        ),
        miniatura: "/projects/acrodata1.svg",
        imagen: "/projects/acrodata2.svg",
        webUrl: "https://www.acrodata.vhetra.com.ar/",
        imgClassName: "w-28 h-40 self-center -rotate-12",
      },
      {
        id: 2,
        name: "EstacionAlemania",
        miniTitulo: t("estacionAlemania.miniTitulo"),
        titulo: t("estacionAlemania.titulo"),
        miniDescripcion: t("estacionAlemania.miniDescripcion"),
        descripcionCompleta: (
          <>
            {t("estacionAlemania.descripcionP1")}
            <br />
            <br />
            {t("estacionAlemania.descripcionP2")}
            <br />
            <br />
            {t("estacionAlemania.technologies")}
          </>
        ),
        miniatura: "/projects/estacion1.svg",
        imagen: "/projects/estacion2.svg",
        webUrl: "https://estacionalemania.vhetra.com.ar/",
        layoutType: "textImage",
        imgClassName: "flex w-40 h-40 self-end -mb-11 -ml-4",
      },

      {
        id: 4,
        name: "Laboragro",
        miniTitulo: "Laboragro",
        titulo: "Laboragro",
        miniDescripcion: "Sistema digital",
        descripcionCompleta: (
          <>Proyecto de muestra para visualizar el carrusel.</>
        ),
        miniatura: "/projects/acrodata1.svg",
        imagen: "/projects/acrodata2.svg",
        webUrl: "#",
      },
      {
        id: 5,
        name: "Loza Studio",
        miniTitulo: "Loza Studio",
        titulo: "Loza Studio",
        miniDescripcion: "Identidad web",
        descripcionCompleta: (
          <>Proyecto de muestra para visualizar el carrusel.</>
        ),
        miniatura: "/projects/estacion1.svg",
        imagen: "/projects/estacion2.svg",
        webUrl: "#",
      },
      {
        id: 6,
        name: "Cha Usandivaras Inmobiliaria",
        miniTitulo: "Cha Usandivaras",
        titulo: "Cha Usandivaras Inmobiliaria",
        miniDescripcion: "Sitio inmobiliario",
        descripcionCompleta: (
          <>Proyecto de muestra para visualizar el carrusel.</>
        ),
        miniatura: "/projects/fili1.svg",
        imagen: "/projects/fili2.svg",
        webUrl: "#",
      },
    ],
    [t],
  );

  const proyectosLoop = useMemo(
    () => [...proyectos, ...proyectos, ...proyectos],
    [proyectos],
  );

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    requestAnimationFrame(() => {
      carousel.scrollLeft = carousel.scrollWidth / 3;
    });
  }, []);

  const scrollProyecto = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const firstCard = carousel.querySelector<HTMLElement>(
      "[data-project-card]",
    );
    if (!firstCard) return;

    const gap = 32;
    const scrollAmount = firstCard.offsetWidth + gap;
    const third = carousel.scrollWidth / 3;

    carousel.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });

    window.setTimeout(() => {
      if (carousel.scrollLeft >= third * 2 - scrollAmount) {
        carousel.scrollLeft -= third;
      }
    }, 500);
  }, []);

  return (
    <section
      id="proyectos"
      className="snap-panel section-render-window relative overflow-x-hidden overflow-y-auto bg-cover bg-center bg-no-repeat px-6 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[#F9F9F9]/20" />

      <div className="section-panel-content relative">
        <div className="relative mb-8 max-w-6xl sm:mb-10 lg:mb-12">
          <div className="mb-4 h-px w-20 origin-left bg-[#A82811] sm:mb-6 sm:w-24" />

          <p className="mb-3 font-manrope text-xs uppercase tracking-[0.18em] text-black/50 sm:mb-4">
            Portfolio seleccionado
          </p>

          <h2 className="font-khanda text-5xl font-light uppercase leading-[0.8] tracking-[-0.075em] text-black sm:text-6xl lg:text-[5.8rem]">
            {t("spaHeading")}
          </h2>

          <h2 className="mt-1 w-fit font-khanda text-5xl font-light uppercase leading-[0.8] tracking-[-0.075em] text-[#A82811] sm:text-6xl lg:text-[5.8rem]">
            {t("spaAccent")}
          </h2>
        </div>

        <div className="group/carousel relative -mx-6 py-4 sm:-mx-12 sm:py-6 lg:-mx-20 lg:py-8">
          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-14 bg-gradient-to-r from-[#F9F9F9]/95 to-transparent sm:w-20" />
          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-14 bg-gradient-to-l from-[#F9F9F9]/95 to-transparent sm:w-20" />

          <div
            ref={carouselRef}
            className="scrollbar-hide overflow-x-auto scroll-smooth px-16 sm:px-24 lg:px-32"
          >
            <div className="flex w-max gap-4 py-16 group-hover/carousel:animate-[projects-marquee_35s_linear_infinite] sm:gap-6 sm:py-20 lg:gap-8">
              {proyectosLoop.map((proyecto, index) => (
                <div
                  key={`${proyecto.id}-${index}`}
                  data-project-card
                  className="
                  w-[240px]
                  shrink-0
                  transition-all
                  duration-500
                  ease-out
                  group-hover/carousel:opacity-55
                  hover:!z-30
                  hover:!-translate-y-6
                  hover:!scale-[1.08]
                  hover:!opacity-100
                  hover:drop-shadow-[0_28px_55px_rgba(0,0,0,0.22)]
                  sm:w-[300px]
                  lg:w-[340px]
                "
                >
                  <ProyectoCardChica
                    proyecto={proyecto}
                    onClick={() => setSelectedProyecto(proyecto)}
                    imgClassName={proyecto.imgClassName}
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-1 flex justify-end">
          <button
            type="button"
            onClick={scrollProyecto}
            className="
            group/button
            flex
            items-center
            gap-4
            font-khanda
            text-[clamp(1.05rem,5vw,1.5rem)]
            font-light
            uppercase
            tracking-[-0.03em]
            text-black
            transition-all
            duration-300
            hover:gap-6
            hover:font-medium
          "
          >
            {t("viewAll")}
            <span className="text-[clamp(2rem,8vw,2.5rem)] font-light leading-none transition-all duration-300 group-hover/button:translate-x-2 group-hover/button:scale-110 group-hover/button:font-medium">
              ⟶
            </span>
          </button>
        </div>

        <div className="relative mt-6 flex justify-center sm:mt-8">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="
            group
            vhetra-cta
            inline-flex
            items-center
            justify-between
            overflow-hidden
            rounded-sm
            border
            border-black
            bg-black
            font-khanda
            font-light
            tracking-[-0.02em]
            text-white
            transition-all
            duration-500
            hover:w-full
            hover:border-[#A82811]
            hover:bg-[#A82811]
          "
          >
            <span>{t("spaCta")}</span>

            <span className="vhetra-cta-arrow font-light transition-transform duration-300 group-hover:translate-x-2">
              ⟶
            </span>
          </a>
        </div>
      </div>

      {selectedProyecto && (
        <ProyectoCardGrande
          proyecto={
            proyectos.find((p) => p.id === selectedProyecto.id) ??
            selectedProyecto
          }
          onClose={() => setSelectedProyecto(null)}
        />
      )}
    </section>
  );
}
