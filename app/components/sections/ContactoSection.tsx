"use client";

import { useTranslations } from "next-intl";
import CardContacto from "@/app/components/CardContacto";

const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "5492616050615";
const whatsappHref = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent("Hola !\nTe contacto desde la web de VHETRA.")}`;

const CONTACTOS = [
  { id: 1, img: "/icons/instagramIco.svg", titleKey: "instagramTitle" as const, actionKey: "instagramAction" as const, href: "https://www.instagram.com/somosvhetra/" },
  { id: 2, img: "/icons/gmailIco.svg", titleKey: "gmailTitle" as const, actionKey: "gmailAction" as const, href: "mailto:hola.vhetra@gmail.com" },
  { id: 3, img: "/icons/whatsappIco.svg", titleKey: "whatsappTitle" as const, actionKey: "whatsappAction" as const, href: whatsappHref },
];

export function ContactoSection() {
  const t = useTranslations("contact");

  const contactos = CONTACTOS.map((c) => ({
    ...c,
    title: t(c.titleKey),
    action: t.rich(c.actionKey, { br: () => <br /> }),
  }));

  return (
    <section
      id="contacto"
      className="relative bg-cover bg-center bg-no-repeat py-20 px-6 sm:px-12 lg:px-20 overflow-hidden"
      style={{ backgroundImage: "url(/img/bg.webp)" }}
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 items-start">
        {/* Left: heading + cards */}
        <div className="flex-1 flex flex-col gap-8">
          <div>
            <h2 className="text-black text-2xl sm:text-3xl lg:text-4xl font-black uppercase leading-tight tracking-tight">
              {t("spaHeading1")}
            </h2>
            <h2 className="text-black text-2xl sm:text-3xl lg:text-4xl font-black uppercase leading-tight tracking-tight">
              {t("spaHeading2")}{" "}
              <span className="text-accent">{t("spaHeadingAccent")}</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {contactos.map((contacto) => (
              <CardContacto
                key={contacto.titleKey}
                id={contacto.id}
                img={contacto.img}
                title={contacto.title}
                action={contacto.action}
                href={contacto.href}
              />
            ))}
          </div>
        </div>

        {/* Right: VH. branding */}
        <div className="hidden lg:flex items-end justify-end flex-1 self-end pb-4">
          <span className="text-black font-black text-[10rem] xl:text-[14rem] leading-none opacity-10 select-none">
            VH<span className="text-accent">.</span>
          </span>
        </div>
      </div>
    </section>
  );
}
