"use client";

import { useTranslations } from "next-intl";

const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "5492616050615";
const whatsappHref = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent("Hola! Me gustaría saber más sobre cómo trabajan en Vhetra.")}`;

const STEPS = [
  { num: "01", titleKey: "step1Title" as const, descKey: "step1Desc" as const },
  { num: "02", titleKey: "step2Title" as const, descKey: "step2Desc" as const },
  { num: "03", titleKey: "step3Title" as const, descKey: "step3Desc" as const },
];

export function ComoTrabajamosSection() {
  const t = useTranslations("howWeWork");

  return (
    <section
      id="filosofia"
      className="relative overflow-hidden bg-[#171717] px-6 py-20 sm:px-12 lg:px-20 lg:py-28"
    >
      {/* textura / profundidad */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_45%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_35%)]" />
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10">
        <h2 className="mb-16 max-w-4xl font-khanda text-4xl font-semibold uppercase tracking-[0.02em] text-[#F9F9F9] sm:text-5xl lg:text-6xl">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-12 lg:gap-20">
          {STEPS.map(({ num, titleKey, descKey }) => (
            <article key={num} className="flex flex-col">
              <span className="relative mb-12 w-fit font-khanda text-7xl font-light leading-none text-[#F9F9F9] sm:text-8xl">
                {num}
                <span className="absolute -bottom-3 left-1 h-[2px] w-16 bg-[#A82811]" />
              </span>

              <h3 className="mb-5 font-khanda text-3xl font-light leading-none text-[#F9F9F9] sm:text-4xl">
                {t(titleKey)}
              </h3>

              <p className="max-w-[260px] font-manrope text-sm leading-7 text-[#F9F9F9]/75">
                {t(descKey)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-20 flex justify-start md:justify-end">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-between rounded-md bg-[#F9F9F9] px-7 py-4 font-manrope text-base font-semibold text-[#171717] transition-all duration-300 hover:bg-white hover:pl-9 md:w-[460px]"
          >
            <span>{t("cta")}</span>
            <span className="text-4xl font-light leading-none transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
