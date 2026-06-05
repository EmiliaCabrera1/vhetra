"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import CardChica from "@/app/components/CardChica";
import { Servicio } from "@/app/model/servicio.type";

const CardGrande = dynamic(
  () => import("@/app/components/CardGrande").then((mod) => mod.CardGrande),
  { ssr: false },
);

const SERVICE_KEYS = [
  {
    id: 1,
    name: "automatizaciones",
    displayKey: "automatizaciones",
    miniKey: "automatizacionesMini",
    fullKey: "automatizacionesFull",
  },
  {
    id: 2,
    name: "landing-page",
    displayKey: "landingPage",
    miniKey: "landingPageMini",
    fullKey: "landingPageFull",
  },
  {
    id: 3,
    name: "paginas-personalizadas",
    displayKey: "paginasPersonalizadas",
    miniKey: "paginasPersonalizadasMini",
    fullKey: "paginasPersonalizadasFull",
  },
  {
    id: 4,
    name: "ecommerce",
    displayKey: "ecommerce",
    miniKey: "ecommerceMini",
    fullKey: "ecommerceFull",
  },
  {
    id: 5,
    name: "mantenimiento-web",
    displayKey: "mantenimientoWeb",
    miniKey: "mantenimientoWebMini",
    fullKey: "mantenimientoWebFull",
  },
] as const;

export function ServiciosSection() {
  const t = useTranslations("services");
  const [selectedCard, setSelectedCard] = useState<Servicio | null>(null);

  const servicios: Servicio[] = useMemo(
    () =>
      SERVICE_KEYS.map((s) => ({
        id: s.id,
        name: s.name,
        displayName: t(s.displayKey),
        miniDescripcion: t(s.miniKey),
        descripcionCompleta: t.rich(s.fullKey, {
          br: () => <br />,
          ul: (chunks) => (
            <ul className="my-2 list-inside list-disc space-y-1">{chunks}</ul>
          ),
          li: (chunks) => <li>{chunks}</li>,
        }),
        destacado: false,
      })),
    [t],
  );

  return (
    <section
      id="servicios"
      className="snap-panel section-render-window relative overflow-hidden bg-black px-6 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,40,17,0.18),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_42%)]" />

      <div className="section-panel-content relative z-10 mx-auto max-w-[1040px] min-[1400px]:max-w-[1400px]">
        <div className="mb-10 max-w-6xl sm:mb-12 lg:mb-14">
          <div className="mb-4 h-px w-20 bg-[#A82811] sm:mb-6 sm:w-24" />

          <p className="mb-3 font-manrope text-xs uppercase tracking-[0.18em] text-white/45 sm:mb-4">
            Soluciones digitales
          </p>

          <h2 className="font-khanda text-5xl font-light uppercase leading-[0.8] tracking-[-0.075em] text-white sm:text-6xl lg:text-[5.8rem]">
            SOLUCIONES QUE GENERAN
          </h2>

          <h2 className="mt-1 font-khanda text-5xl font-light uppercase leading-[0.8] tracking-[-0.075em] text-[#A82811] sm:text-6xl lg:text-[5.8rem]">
            RESULTADOS REALES.
          </h2>
        </div>

        <div className="group/cards grid grid-cols-1 gap-3 min-[340px]:grid-cols-2 min-[650px]:grid-cols-3 min-[650px]:gap-4 min-[1400px]:grid-cols-5 min-[1400px]:gap-5">
          {servicios.map((servicio) => (
            <div
              key={servicio.id}
              className="
                transition-all
                duration-500
                ease-out
                group-hover/cards:opacity-60
                hover:!z-20
                hover:!-translate-y-3
                hover:!scale-[1.04]
                hover:!opacity-100
                hover:drop-shadow-[0_25px_55px_rgba(0,0,0,0.35)]
              "
            >
              <CardChica
                servicio={servicio}
                onClick={() => setSelectedCard(servicio)}
              />
            </div>
          ))}
        </div>
      </div>

      {selectedCard && (
        <CardGrande
          servicio={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </section>
  );
}
