"use client";

import { useTranslations } from "next-intl";

const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "5493875038714";

const STEPS = [
  { num: "01", titleKey: "step1Title" as const, descKey: "step1Desc" as const },
  { num: "02", titleKey: "step2Title" as const, descKey: "step2Desc" as const },
  { num: "03", titleKey: "step3Title" as const, descKey: "step3Desc" as const },
];

export function ComoTrabajamosSection() {
  const t = useTranslations("howWeWork");
  const whatsappHref = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    t("whatsappMessage"),
  )}`;

  return (
    <section
      id="filosofia"
      className="snap-panel section-render-window relative overflow-x-hidden overflow-y-auto bg-[#171717] px-6 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,40,17,0.18),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-0 bg-black/30" />

      <div className="section-panel-content relative z-10 mx-auto max-w-7xl min-[1800px]:!max-w-[1680px]">
        <div className="mb-10 max-w-6xl sm:mb-12 lg:mb-14 min-[1800px]:!mb-20 min-[1800px]:!max-w-[1500px]">
          <div className="mb-4 h-px w-20 bg-[#A82811] sm:mb-6 sm:w-24 min-[1800px]:!mb-8 min-[1800px]:!w-32" />

          <p className="mb-3 font-manrope text-xs uppercase tracking-[0.18em] text-white/45 sm:mb-4 min-[1800px]:!text-sm">
            {t("eyebrow")}
          </p>

          <h2 className="font-khanda text-5xl font-light uppercase leading-[0.8] tracking-[-0.075em] text-[#F9F9F9] sm:text-6xl lg:text-[5.8rem] min-[1800px]:!text-[7.2rem]">
            {t("title")}
          </h2>
        </div>

        <div className="group/steps grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3 lg:gap-6 min-[1800px]:!gap-12">
          {STEPS.map(({ num, titleKey, descKey }) => (
            <article
              key={num}
              className="
    flex
    flex-col
    transition-all
    duration-500
    ease-out
    hover:-translate-y-2
  "
            >
              <span
                className="
      relative
      mb-8
      w-fit
      font-khanda
      text-6xl
      font-light
      leading-none
      tracking-[-0.08em]
      text-[#F9F9F9]
      sm:text-7xl
      lg:text-8xl
      min-[1800px]:!text-[8.5rem]
    "
              >
                {num}

                <span
                  className="
        absolute
        -bottom-4
        left-1
        h-[2px]
        w-20
        bg-[#A82811]
        transition-all
        duration-500
        group-hover:w-28
      "
                />
              </span>

              <h3
                className="
      mb-3
      font-khanda
      text-3xl
      font-light
      uppercase
      leading-[0.85]
      tracking-[-0.06em]
      text-[#F9F9F9]
      sm:text-4xl
      lg:text-5xl
      min-[1800px]:!text-[4.3rem]
    "
              >
                {t(titleKey)}
              </h3>

              <p
                className="
      max-w-[320px]
      font-manrope
      text-sm
      leading-6
      text-[#F9F9F9]/68
      min-[1800px]:!max-w-[400px]
      min-[1800px]:!text-lg
      min-[1800px]:!leading-8
    "
              >
                {t(descKey)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 flex justify-start sm:mt-20 md:justify-end lg:mt-24">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              vhetra-cta
              inline-flex
              items-center
              justify-between
              overflow-hidden
              rounded-sm
              border
              border-[#F9F9F9]
              bg-[#F9F9F9]
              font-khanda
              font-light
              tracking-[-0.02em]
              text-[#171717]
              transition-all
              duration-500
              hover:border-[#A82811]
              hover:bg-[#A82811]
              hover:text-white
            "
          >
            <span>{t("cta")}</span>

            <span className="vhetra-cta-arrow font-light transition-transform duration-300 group-hover:translate-x-2">
              ⟶
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
