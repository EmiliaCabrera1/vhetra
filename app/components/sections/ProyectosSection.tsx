"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import ProyectoCardChica from "@/app/components/ProyectoCardChica";
import ProyectoCardGrande from "@/app/components/ProyectoCardGrande";
import { Proyecto } from "@/app/model/proyecto.type";

const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "5492616050615";

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
        id: 3,
        name: "FiliSuites",
        miniTitulo: t("filiSuites.miniTitulo"),
        titulo: t("filiSuites.titulo"),
        miniDescripcion: t("filiSuites.miniDescripcion"),
        descripcionCompleta: (
          <>
            {t("filiSuites.descripcionP1")}
            <br />
            <br />
            {t("filiSuites.descripcionP2")}
          </>
        ),
        miniatura: "/projects/fili1.svg",
        imagen: "/projects/fili2.svg",
        webUrl: "https://www.instagram.com/filisuites_oax/",
        ctaLabelKey: "visitInstagram",
        imgClassName: "flex w-30 h-30 -mt-3",
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

  const proyectosLoop = [...proyectos, ...proyectos, ...proyectos];

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
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat px-6 py-24 sm:px-12 lg:px-20 lg:py-32"
      style={{ backgroundImage: "url(/img/bg.webp)" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#F9F9F9]/20" />

      <div className="relative mb-24 max-w-6xl">
        <div className="mb-8 h-px w-24 origin-left bg-[#A82811]" />

        <p className="mb-5 font-manrope text-xs uppercase tracking-[0.18em] text-black/50">
          Portfolio seleccionado
        </p>

        <h2 className="font-khanda text-6xl font-light uppercase leading-[0.78] tracking-[-0.085em] text-black sm:text-7xl lg:text-[7.2rem]">
          {t("spaHeading")}
        </h2>

        <h2 className="mt-1 w-fit font-khanda text-6xl font-light uppercase leading-[0.78] tracking-[-0.085em] text-[#A82811] sm:text-7xl lg:text-[7.2rem]">
          {t("spaAccent")}
        </h2>
      </div>

      <div className="group/carousel relative -mx-6 overflow-hidden py-14 sm:-mx-12 lg:-mx-20">
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-28 bg-gradient-to-r from-[#F9F9F9]/95 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-28 bg-gradient-to-l from-[#F9F9F9]/95 to-transparent" />

        <div
          ref={carouselRef}
          className="scrollbar-hide overflow-x-auto scroll-smooth px-6 sm:px-12 lg:px-20"
        >
          <div className="flex w-max gap-8 py-10 pr-10 group-hover/carousel:animate-[projects-marquee_35s_linear_infinite]">
            {proyectosLoop.map((proyecto, index) => (
              <div
                key={`${proyecto.id}-${index}`}
                data-project-card
                className="
                  w-[280px]
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
                  sm:w-[340px]
                  lg:w-[380px]
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

      <div className="relative mt-2 flex justify-end">
        <button
          type="button"
          onClick={scrollProyecto}
          className="
            group/button
            flex
            items-center
            gap-4
            font-khanda
            text-3xl
            font-light
            uppercase
            tracking-[-0.03em]
            text-black
            transition-all
            duration-300
            hover:gap-7
            hover:font-medium
          "
        >
          {t("viewAll")}
          <span className="text-5xl font-light leading-none transition-all duration-300 group-hover/button:translate-x-2 group-hover/button:scale-110 group-hover/button:font-medium">
            ⟶
          </span>
        </button>
      </div>

      <div className="relative mt-14 flex justify-center">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="
            group
            inline-flex
            w-full
            items-center
            justify-between
            overflow-hidden
            rounded-sm
            border
            border-black
            bg-black
            px-8
            py-4
            font-khanda
            text-2xl
            font-light
            tracking-[-0.02em]
            text-white
            transition-all
            duration-500
            hover:w-full
            hover:border-[#A82811]
            hover:bg-[#A82811]
            hover:px-10
            sm:w-[460px]
            sm:hover:w-[500px]
          "
        >
          <span>{t("spaCta")}</span>

          <span className="text-5xl font-light leading-none transition-transform duration-300 group-hover:translate-x-2">
            ⟶
          </span>
        </a>
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
