import { NavBar } from "@/app/components/NavBar";
import { HeroSection } from "@/app/components/sections/HeroSection";
import { ServiciosSection } from "@/app/components/sections/ServiciosSection";
import { ProyectosSection } from "@/app/components/sections/ProyectosSection";
import { ComoTrabajamosSection } from "@/app/components/sections/ComoTrabajamosSection";
import { ContactoSection } from "@/app/components/sections/ContactoSection";
import { SectionScrollController } from "@/app/components/SectionScrollController";

export default function Home() {
  return (
    <>
      <NavBar />
      <SectionScrollController>
        <HeroSection />
        <ServiciosSection />
        <ProyectosSection />
        <ComoTrabajamosSection />
        <ContactoSection />
      </SectionScrollController>
    </>
  );
}
