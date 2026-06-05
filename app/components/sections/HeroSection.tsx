"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const BlenderModel = dynamic(() => import("@/app/components/BlenderModel"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-transparent" aria-hidden />,
});

function scheduleIdle(cb: () => void, options?: IdleRequestOptions): number {
  if (typeof requestIdleCallback !== "undefined") {
    return requestIdleCallback(cb, options);
  }

  return window.setTimeout(cb, Math.min(options?.timeout ?? 500, 500));
}

function cancelScheduledIdle(id: number): void {
  if (typeof cancelIdleCallback !== "undefined") {
    cancelIdleCallback(id);
  } else {
    window.clearTimeout(id);
  }
}

function DeferredBlenderModel(
  props: React.ComponentProps<typeof BlenderModel>,
) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const id = scheduleIdle(() => setMounted(true), { timeout: 500 });

    return () => cancelScheduledIdle(id);
  }, []);

  if (!mounted) return <div className="h-full w-full" aria-hidden />;

  return <BlenderModel {...props} />;
}

export function HeroSection() {
  const t = useTranslations("home");

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden bg-cover bg-center bg-no-repeat px-6 pt-16 sm:px-12 lg:px-20"
      style={{ backgroundImage: "url(/img/bg.webp)" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#F9F9F9]/20" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,40,17,0.14),transparent_34%)]" />

      <div
        className="
          pointer-events-auto
          absolute
          top-[58%]
          right-[-310px]
          z-0
          h-[360px]
          w-[360px]
          -translate-y-1/2
          opacity-95
          sm:right-[-360px]
          sm:h-[470px]
          sm:w-[470px]
          md:right-[-420px]
          md:h-[580px]
          md:w-[580px]
          lg:right-[-460px]
          lg:h-[760px]
          lg:w-[760px]
          xl:right-[-540px]
          xl:h-[900px]
          xl:w-[900px]
          2xl:right-[-600px]
          2xl:h-[980px]
          2xl:w-[980px]
        "
      >
        <DeferredBlenderModel
          path="/animations/vhetra-logo.glb"
          type="animated"
          scale={2.5}
          canInteract={true}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] py-24 sm:py-28 lg:py-32">
        <div className="flex max-w-[92%] flex-col gap-7 sm:max-w-[80%] md:max-w-[70%] lg:max-w-[62%] xl:max-w-[58%] lg:gap-8">
          <div>
            <div className="mb-8 h-px w-24 bg-[#A82811]" />

            <p className="mb-6 font-manrope text-xs uppercase tracking-[0.18em] text-black/50">
              Estudio digital
            </p>

            <p className="font-khanda text-7xl font-light leading-[0.78] tracking-[-0.085em] text-black sm:text-8xl md:text-[8rem] lg:text-[9rem] xl:text-[10rem]">
              VHETRA<span className="ml-[0.005em] text-[#A82811]">.</span>
            </p>
          </div>

          <h1 className="max-w-5xl font-khanda text-5xl font-light uppercase leading-[0.8] tracking-[-0.075em] text-black sm:text-6xl md:text-7xl lg:text-[5.8rem] xl:text-[6.6rem]">
            {t("heroHeading1")} {t("heroHeading2")}{" "}
            <span className="text-[#A82811]">{t("heroHeadingAccent")}</span>
          </h1>

          <p className="max-w-xl font-manrope text-sm font-light leading-7 text-black/65 sm:text-base lg:text-lg">
            {t("heroDescription")}
          </p>

          <a
            href="#contacto"
            onClick={scrollToContact}
            className="
              group
              mt-3
              inline-flex
              w-full
              items-center
              justify-between
              self-start
              overflow-hidden
              rounded-sm
              border
              border-black
              bg-black
              px-8
              py-4
              font-khanda
              text-2xl
              font-light
              tracking-[-0.02em]
              text-white
              transition-all
              duration-500
              hover:border-[#A82811]
              hover:bg-[#A82811]
              hover:px-10
              sm:w-[420px]
              sm:hover:w-[460px]
            "
          >
            <span>{t("heroCta")}</span>

            <span className="text-5xl font-light leading-none transition-transform duration-300 group-hover:translate-x-2">
              ⟶
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
