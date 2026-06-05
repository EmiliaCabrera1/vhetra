"use client";

import { useTranslations } from "next-intl";

const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "5492616050615";

const whatsappHref = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
  "Hola! Me gustaría saber más sobre cómo trabajan en Vhetra.",
)}`;

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
      className="relative overflow-hidden bg-[#171717] px-6 py-24 sm:px-12 lg:px-20 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,40,17,0.18),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-0 bg-black/30" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-20 max-w-6xl">
          <div className="mb-8 h-px w-24 bg-[#A82811]" />

          <p className="mb-5 font-manrope text-xs uppercase tracking-[0.18em] text-white/45">
            Nuestra visión
          </p>

          <h2 className="font-khanda text-6xl font-light uppercase leading-[0.78] tracking-[-0.085em] text-[#F9F9F9] sm:text-7xl lg:text-[7rem]">
            {t("title")}
          </h2>
        </div>

        <div className="group/steps grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-6">
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
      mb-12
      w-fit
      font-khanda
      text-8xl
      font-light
      leading-none
      tracking-[-0.08em]
      text-[#F9F9F9]
      sm:text-9xl
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
      mb-5
      font-khanda
      text-4xl
      font-light
      uppercase
      leading-[0.85]
      tracking-[-0.06em]
      text-[#F9F9F9]
      sm:text-5xl
    "
              >
                {t(titleKey)}
              </h3>

              <p
                className="
      max-w-[320px]
      font-manrope
      text-sm
      leading-7
      text-[#F9F9F9]/68
    "
              >
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
            className="
              group
              inline-flex
              w-full
              items-center
              justify-between
              overflow-hidden
              rounded-sm
              border
              border-[#F9F9F9]
              bg-[#F9F9F9]
              px-8
              py-4
              font-khanda
              text-2xl
              font-light
              tracking-[-0.02em]
              text-[#171717]
              transition-all
              duration-500
              hover:border-[#A82811]
              hover:bg-[#A82811]
              hover:px-10
              hover:text-white
              md:w-[460px]
              md:hover:w-[500px]
            "
          >
            <span>{t("cta")}</span>

            <span className="text-5xl font-light leading-none transition-transform duration-300 group-hover:translate-x-2">
              ⟶
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
