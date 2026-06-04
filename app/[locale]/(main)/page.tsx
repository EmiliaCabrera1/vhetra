import { NavBar } from "@/app/components/NavBar";
import { HeroSection } from "@/app/components/sections/HeroSection";
import { ServiciosSection } from "@/app/components/sections/ServiciosSection";
import { ProyectosSection } from "@/app/components/sections/ProyectosSection";
import { ComoTrabajamosSection } from "@/app/components/sections/ComoTrabajamosSection";
import { ContactoSection } from "@/app/components/sections/ContactoSection";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <ServiciosSection />
        <ProyectosSection />
        <ComoTrabajamosSection />
        <ContactoSection />
      </main>
    </>
  );
}
