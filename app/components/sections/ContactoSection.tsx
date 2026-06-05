"use client";

import { useTranslations } from "next-intl";
import CardContacto from "@/app/components/CardContacto";

const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "5492616050615";

const whatsappHref = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
  "Hola !\nTe contacto desde la web de VHETRA.",
)}`;

const CONTACTOS = [
  {
    id: 1,
    img: "/icons/instagramIco.svg",
    titleKey: "instagramTitle" as const,
    actionKey: "instagramAction" as const,
    href: "https://www.instagram.com/somosvhetra/",
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
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat px-6 py-24 sm:px-12 lg:px-20 lg:py-32"
      style={{ backgroundImage: "url(/img/bg.webp)" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#F9F9F9]/20" />

      <div className="relative grid items-end gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-12">
          <div>
            <div className="mb-8 h-px w-24 bg-[#A82811]" />

            <p className="mb-5 font-manrope text-xs uppercase tracking-[0.18em] text-black/50">
              Contacto directo
            </p>

            <h2 className="font-khanda text-6xl font-light uppercase leading-[0.78] tracking-[-0.085em] text-black sm:text-7xl lg:text-[7rem]">
              {t("spaHeading1")}
            </h2>

            <h2 className="mt-1 font-khanda text-6xl font-light uppercase leading-[0.78] tracking-[-0.085em] text-black sm:text-7xl lg:text-[7rem]">
              {t("spaHeading2")}{" "}
              <span className="text-[#A82811]">{t("spaHeadingAccent")}</span>
            </h2>
          </div>

          <div className="flex max-w-2xl flex-col gap-5">
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

        <div className="pointer-events-none hidden select-none justify-end lg:flex">
          <span className="font-khanda text-[13rem] font-light leading-none tracking-[-0.12em] text-black/10 xl:text-[18rem]">
            VH<span className="text-[#A82811]/70">.</span>
          </span>
        </div>
      </div>
    </section>
  );
}
