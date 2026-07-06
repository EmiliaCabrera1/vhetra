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

export function ProyectosSection() {
  const t = useTranslations("projects");
  const whatsappHref = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    t("whatsappMessage"),
  )}`;

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
            {t("acrodata.descripcionP3")}
            <br />
            <br />
            {t("acrodata.descripcionP4")}
            <br />
            <br />
            {t("acrodata.technologies")}
          </>
        ),
        imagen: "/projects/acrodata2.svg",
        webUrl: "https://www.acrodata.vhetra.com.ar/",
        technologies: ["React", "Tailwind CSS", "Responsive UI"],
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
            {t("estacionAlemania.descripcionP3")}
            <br />
            <br />
            {t("estacionAlemania.descripcionP4")}
            <br />
            <br />
            {t("estacionAlemania.technologies")}
          </>
        ),
        imagen: "/projects/estacion2.svg",
        webUrl: "https://estacionalemania.vhetra.com.ar/",
        layoutType: "textImage",
        technologies: ["Next.js", "React", "Tailwind CSS"],
      },

      {
        id: 4,
        name: "Laboragro",
        miniTitulo: t("laboragro.miniTitulo"),
        titulo: t("laboragro.titulo"),
        miniDescripcion: t("laboragro.miniDescripcion"),
        descripcionCompleta: (
          <>
            {t("laboragro.descripcionP1")}
            <br />
            <br />
            {t("laboragro.descripcionP2")}
            <br />
            <br />
            {t("laboragro.descripcionP3")}
            <br />
            <br />
            {t("laboragro.descripcionP4")}
          </>
        ),
        webUrl: "https://www.laboragro.com.ar/",
        technologies: ["Next.js", "React", "Tailwind CSS", "Technical SEO"],
      },
      {
        id: 5,
        name: "Loza Studio",
        miniTitulo: t("lozaStudio.miniTitulo"),
        titulo: t("lozaStudio.titulo"),
        miniDescripcion: t("lozaStudio.miniDescripcion"),
        descripcionCompleta: (
          <>
            {t("lozaStudio.descripcionP1")}
            <br />
            <br />
            {t("lozaStudio.descripcionP2")}
            <br />
            <br />
            {t("lozaStudio.descripcionP3")}
            <br />
            <br />
            {t("lozaStudio.descripcionP4")}
            <br />
            <br />
            {t("lozaStudio.technologies")}
          </>
        ),
        webUrl: "https://loza.vhetra.com.ar/",
        technologies: [
          "Next.js",
          "React",
          "Supabase",
          "Supabase Authentication",
          "Mercado Pago",
        ],
      },
      {
        id: 6,
        name: "Cha Usandivaras Inmobiliaria",
        miniTitulo: t("chaUsandivaras.miniTitulo"),
        titulo: t("chaUsandivaras.titulo"),
        miniDescripcion: t("chaUsandivaras.miniDescripcion"),
        descripcionCompleta: (
          <>
            {t("chaUsandivaras.descripcionP1")}
            <br />
            <br />
            {t("chaUsandivaras.descripcionP2")}
            <br />
            <br />
            {t("chaUsandivaras.descripcionP3")}
            <br />
            <br />
            {t("chaUsandivaras.descripcionP4")}
          </>
        ),
        webUrl: "https://chausandivaraspropiedades.vhetra.com.ar/",
        technologies: ["Next.js", "React", "Tailwind CSS", "Responsive UI"],
      },
      {
        id: 7,
        name: "Flavia",
        miniTitulo: t("flavia.miniTitulo"),
        titulo: t("flavia.titulo"),
        miniDescripcion: t("flavia.miniDescripcion"),
        descripcionCompleta: (
          <>
            {t("flavia.descripcionP1")}
            <br />
            <br />
            {t("flavia.descripcionP2")}
            <br />
            <br />
            {t("flavia.descripcionP3")}
            <br />
            <br />
            {t("flavia.descripcionP4")}
          </>
        ),
        webUrl: "https://flavia.vhetra.com.ar/",
        technologies: ["Next.js", "React", "Tailwind CSS", "Blender"],
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

      <div className="section-panel-content relative min-[1800px]:!mx-auto min-[1800px]:!max-w-[1900px]">
        <div className="relative max-w-6xl sm:mb-10 lg:mb-12 min-[1800px]:!mb-16 min-[1800px]:!max-w-[1500px]">
          <div className="mb-4 h-px w-20 origin-left bg-[#A82811] sm:mb-6 sm:w-24 min-[1800px]:!mb-8 min-[1800px]:!w-32" />

          <p className="mb-3 font-manrope text-xs uppercase tracking-[0.18em] text-black/50 sm:mb-4 min-[1800px]:!text-sm">
            {t("eyebrow")}
          </p>

          <h2 className="font-khanda text-5xl font-light uppercase leading-[0.8] tracking-[-0.075em] text-black sm:text-6xl lg:text-[5.8rem] min-[1800px]:!text-[7.2rem]">
            {t("spaHeading")}
          </h2>

          <h2 className="mt-1 w-fit font-khanda text-5xl font-light uppercase leading-[0.8] tracking-[-0.075em] text-[#A82811] sm:text-6xl lg:text-[5.8rem] min-[1800px]:!text-[7.2rem]">
            {t("spaAccent")}
          </h2>

          <p className="mt-6 max-w-3xl font-manrope text-sm leading-relaxed text-black/65 sm:text-base lg:text-lg min-[1800px]:!mt-8 min-[1800px]:!max-w-5xl min-[1800px]:!text-xl min-[1800px]:!leading-8">
            {t("salesIntro")}
          </p>
        </div>

        <div className="project-carousel relative -mx-6 overflow-visible sm:-mx-12 lg:-mx-20 min-[1800px]:!-mx-28">
          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-14 bg-gradient-to-r from-[#F9F9F9]/95 to-transparent sm:w-20 min-[1800px]:!w-28" />
          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-14 bg-gradient-to-l from-[#F9F9F9]/95 to-transparent sm:w-20 min-[1800px]:!w-28" />

          <div
            ref={carouselRef}
            data-project-carousel-viewport
            className="scrollbar-hide pointer-events-none relative z-10 -my-10 overflow-x-auto overflow-y-hidden scroll-smooth px-16 py-10 sm:px-24 lg:px-32 min-[1800px]:!px-44"
          >
            <div className="project-carousel-track pointer-events-auto flex w-max gap-4 py-4 sm:gap-6 lg:gap-8 min-[1800px]:!gap-10">
              {proyectosLoop.map((proyecto, index) => (
                <div
                  key={`${proyecto.id}-${index}`}
                  data-project-card
                  className="
                  w-[240px]
                  shrink-0
                  project-card
                  transition-all
                  duration-500
                  ease-out
                  sm:w-[300px]
                  lg:w-[340px]
                  min-[1800px]:!w-[430px]
                "
                >
                  <ProyectoCardChica
                    proyecto={proyecto}
                    onClick={() => setSelectedProyecto(proyecto)}
                    imgClassName={proyecto.imgClassName}
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
