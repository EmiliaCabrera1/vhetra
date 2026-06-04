"use client";

import { useMemo, useRef, useState } from "react";
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

      // De muestra
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

  const proyectosLoop = [...proyectos, ...proyectos];

  const scrollProyecto = () => {
    carouselRef.current?.scrollBy({
      left: 380,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="proyectos"
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat px-6 py-20 sm:px-12 lg:px-20 lg:py-28"
      style={{ backgroundImage: "url(/img/bg.webp)" }}
    >
      <div className="mb-24 max-w-5xl">
        <h2 className="font-khanda text-3xl font-black uppercase leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl">
          {t("spaHeading")}
        </h2>

        <h2 className="mt-2 w-fit  font-khanda text-3xl font-black uppercase leading-tight tracking-tight text-[#A82811] sm:text-4xl lg:text-5xl">
          {t("spaAccent")}
        </h2>
      </div>

      <div className="group relative -mx-6 overflow-hidden sm:-mx-12 lg:-mx-20">
        <div
          ref={carouselRef}
          className="
      flex
      w-max
      gap-8
      overflow-x-auto
      scroll-smooth
      scrollbar-hide
      px-6
      pb-4
      sm:px-12
      lg:px-20
      group-hover:animate-[projects-marquee_35s_linear_infinite]
    "
        >
          {proyectosLoop.map((proyecto, index) => (
            <div
              key={`${proyecto.id}-${index}`}
              className="w-[280px] shrink-0 sm:w-[340px] lg:w-[380px]"
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

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={scrollProyecto}
          className="
      flex
      items-center
      gap-6
      font-khanda
      text-2xl
      uppercase
      tracking-wide
      text-black
      transition-all
      duration-300
      hover:opacity-60
    "
        >
          {t("viewAll")}
          <span className="text-5xl font-light leading-none">→</span>
        </button>
      </div>
      <div className="mt-10 flex justify-center">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex w-full items-center justify-between rounded-md bg-black px-7 py-4 font-khanda text-xl text-white transition-all duration-300 hover:bg-[#A82811] sm:w-[460px]"
        >
          <span>{t("spaCta")}</span>
          <span className="text-4xl font-light leading-none transition-transform duration-300 group-hover:translate-x-2">
            →
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
