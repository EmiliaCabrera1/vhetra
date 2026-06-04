"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import CardChica from "@/app/components/CardChica";
import { CardGrande } from "@/app/components/CardGrande";
import { Servicio } from "@/app/model/servicio.type";

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

  const servicios: Servicio[] = SERVICE_KEYS.map((s) => ({
    id: s.id,
    name: s.name,
    displayName: t(s.displayKey),
    miniDescripcion: t(s.miniKey),
    descripcionCompleta: t.rich(s.fullKey, {
      br: () => <br />,
      ul: (chunks) => (
        <ul className="list-disc list-inside my-2 space-y-1">{chunks}</ul>
      ),
      li: (chunks) => <li>{chunks}</li>,
    }),
    destacado: false,
  }));

  return (
    <section
      id="servicios"
      className="relative bg-black py-24 sm:py-28 lg:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* detalle visual sutil de fondo */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,40,17,0.16),transparent_35%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-14 sm:mb-16 lg:mb-20 max-w-5xl">
          <p className="flex items-center gap-3 text-[10px] sm:text-xs uppercase tracking-[0.28em] text-tiza/70 mb-5">
            <span className="w-8 h-px bg-accent inline-block" />
            LO QUE HACEMOS
          </p>

          <div className="space-y-1">
            <h2 className="text-[2.5rem] sm:text-5xl lg:text-7xl font-extralight uppercase text-tiza leading-[0.88] tracking-[0.01em]">
              SOLUCIONES QUE GENERAN
            </h2>

            <h2 className="text-[2.5rem] sm:text-5xl lg:text-7xl font-extralight uppercase text-accent leading-[0.88] tracking-[0.18em]">
              RESULTADOS REALES.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {servicios.map((servicio) => (
            <CardChica
              key={servicio.id}
              servicio={servicio}
              onClick={() => setSelectedCard(servicio)}
            />
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
