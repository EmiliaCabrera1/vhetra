import { ReactNode } from "react";

export type Servicio = {
  id: number;
  name: string;
  displayName: string;
  miniDescripcion: string;
  descripcionCompleta: ReactNode;
  texture: string;
  destacado: boolean;
};
