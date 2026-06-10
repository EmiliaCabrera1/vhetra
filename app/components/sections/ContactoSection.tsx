"use client";

import { useTranslations } from "next-intl";
import CardContacto from "@/app/components/CardContacto";

const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "5493875038714";

const whatsappHref = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
  "Hola !\nTe contacto desde la web de VHETRA.",
)}`;

const CONTACTOS = [
  {
    id: 1,
    img: "/icons/instagramIco.svg",
    titleKey: "instagramTitle" as const,
    actionKey: "instagramAction" as const,
    href: "https://www.instagram.com/hola.vhetra/",
  },
  {
    id: 2,
    img: "/icons/gmailIco.svg",
    titleKey: "gmailTitle" as const,
    actionKey: "gmailAction" as const,
    href: "mailto:hola.vhetra@gmail.com",
  },
  {
    id: 3,
    img: "/icons/whatsappIco.svg",
    titleKey: "whatsappTitle" as const,
    actionKey: "whatsappAction" as const,
    href: whatsappHref,
  },
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
      className="snap-panel section-render-window relative overflow-x-hidden overflow-y-auto bg-cover bg-center bg-no-repeat px-6 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[#F9F9F9]/20" />

      <div className="section-panel-content relative">
        <div className="relative z-10 flex w-full max-w-6xl flex-col gap-8 sm:gap-10 xl:max-w-7xl">
          <div>
            <div className="mb-4 h-px w-20 bg-[#A82811] sm:mb-6 sm:w-24" />

            <p className="mb-3 font-manrope text-xs uppercase tracking-[0.18em] text-black/50 sm:mb-4">
              Contacto directo
            </p>

            <h2 className="font-khanda text-5xl font-light uppercase leading-[0.8] tracking-[-0.075em] text-black sm:text-6xl lg:text-[5.8rem]">
              {t("spaHeading1")}
            </h2>

            <h2 className="mt-1 font-khanda text-5xl font-light uppercase leading-[0.8] tracking-[-0.075em] text-black sm:text-6xl lg:text-[5.8rem]">
              {t("spaHeading2")}{" "}
              <span className="text-[#A82811]">{t("spaHeadingAccent")}</span>
            </h2>
          </div>

          <div className="flex w-full max-w-4xl flex-col gap-3 sm:gap-4 lg:w-[calc(100%-20rem)] lg:max-w-none xl:w-[calc(100%-28rem)]">
            {contactos.map((contacto) => (
              <div
                key={contacto.titleKey}
                className="
                  transition-all
                  duration-500
                  ease-out
                  hover:-translate-y-2
                  hover:scale-[1.025]
                  hover:drop-shadow-[0_22px_45px_rgba(0,0,0,0.16)]
                "
              >
                <CardContacto
                  id={contacto.id}
                  img={contacto.img}
                  title={contacto.title}
                  action={contacto.action}
                  href={contacto.href}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute right-0 bottom-0 hidden select-none justify-end lg:flex">
          <span className="font-khanda text-[13rem] font-light leading-none tracking-[-0.12em] text-black/70 xl:text-[18rem]">
            VH<span className="text-[#A82811]">.</span>
          </span>
        </div>
      </div>
    </section>
  );
}
