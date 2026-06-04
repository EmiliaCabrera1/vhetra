"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const BlenderModel = dynamic(() => import("@/app/components/BlenderModel"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" aria-hidden />,
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
  if (!mounted) return <div className="w-full h-full" aria-hidden />;
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
      className="relative min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden flex items-center pt-16"
      style={{ backgroundImage: "url(/img/bg.webp)" }}
    >
      {/* Overlay suave */}
      <div className="absolute inset-0 bg-white/10 pointer-events-none" />

      {/* Modelo 3D de fondo / lateral */}
      <div
        className="
      absolute
      z-0
      pointer-events-auto

      top-[58%]
      -translate-y-1/2

      right-[-310px]
      w-[360px]
      h-[360px]

      sm:right-[-360px]
      sm:w-[470px]
      sm:h-[470px]

      md:right-[-420px]
      md:w-[580px]
      md:h-[580px]

      lg:right-[-460px]
      lg:w-[760px]
      lg:h-[760px]

      xl:right-[-540px]
      xl:w-[900px]
      xl:h-[900px]

      2xl:right-[-600px]
      2xl:w-[980px]
      2xl:h-[980px]
    "
      >
        <DeferredBlenderModel
          path="/animations/vhetra-logo.glb"
          type="animated"
          scale={2.5}
          canInteract={true}
        />
      </div>

      {/* Contenido */}
      <div
        className="
      relative z-10
      w-full max-w-[1600px] mx-auto
      px-6 sm:px-12 lg:px-20
      py-24 sm:py-28 lg:py-32
    "
      >
        <div
          className="
        max-w-[92%]
        sm:max-w-[80%]
        md:max-w-[70%]
        lg:max-w-[62%]
        xl:max-w-[58%]
        flex flex-col
        gap-7 lg:gap-8
      "
        >
          <p
            className="
          text-black
          text-6xl
          sm:text-7xl
          md:text-8xl
          lg:text-[8rem]
          xl:text-[9rem]
          font-extralight
          tracking-[-0.055em]
          leading-[0.82]
        "
          >
            VHETRA<span className="text-accent ml-[0.005em]">.</span>
          </p>

          <h1
            className="
          text-black
          text-3xl
          sm:text-4xl
          md:text-5xl
          lg:text-6xl
          xl:text-7xl
          font-extralight
          uppercase
          leading-[0.92]
          tracking-[0.01em]
          max-w-4xl
        "
          >
            {t("heroHeading1")} {t("heroHeading2")}{" "}
            <span className="text-accent tracking-[0.06em]">
              {t("heroHeadingAccent")}
            </span>
          </h1>

          <p
            className="
          text-black/65
          text-sm sm:text-base lg:text-lg
          max-w-md sm:max-w-lg
          font-light
          leading-relaxed
          font-manrope
        "
          >
            {t("heroDescription")}
          </p>

          <a
            href="#contacto"
            onClick={scrollToContact}
            className="
          group inline-flex items-center gap-3 self-start
          bg-black text-white
          px-6 sm:px-7
          py-3 sm:py-3.5
          text-[11px] sm:text-sm
          font-light
          uppercase tracking-[0.16em]
          hover:bg-zinc-800
          transition-all duration-300
        "
          >
            {t("heroCta")}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
