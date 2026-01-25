'use client';

import CardChica from "@/app/components/CardChica"
import { CardGrande } from "@/app/components/CardGrande";
import { Servicio } from "@/app/model/servicio.type";
import { useState } from "react";

const SERVICIOS = [
  { id: 1, name: 'landing-page', displayName: 'LANDING PAGE', miniDescripcion: 'Descripción breve, rango de costos, bla bla' },
  { id: 2, name: 'ecommerce', displayName: 'E-COMMERCE', miniDescripcion: 'Descripción breve, rango de costos, bla bla' },
  { id: 3, name: 'specific-web', displayName: 'WEB ESPECIALIZADA', miniDescripcion: 'Descripción breve, rango de costos, bla bla' },
  { id: 4, name: 'eco-web', displayName: 'WEB ECONÓMICA', miniDescripcion: 'Descripción breve, rango de costos, bla bla' },
  { id: 5, name: 'digital-design', displayName: 'DISEÑO DIGITAL', miniDescripcion: 'Descripción breve, rango de costos, bla bla' },
]

export default function Servicios() {

  const [selectedCard, setSelectedCard] = useState<Servicio | null>(null);

  return (
    <div className="grid grid-cols-2 gap-10 items-center mx-auto relative">
      {SERVICIOS.map((servicio) => <CardChica key={servicio.id} servicio={servicio} onClick={() => { setSelectedCard(servicio) }} />)}
      {selectedCard && <CardGrande servicio={selectedCard} onClose={() => { setSelectedCard(null) }} />}
    </div>
  );
}
