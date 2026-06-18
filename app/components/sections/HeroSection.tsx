"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "5493875038714";

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
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const whatsappHref = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    t("whatsappMessage"),
  )}`;

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="inicio"
      className="snap-panel relative flex items-center overflow-x-hidden overflow-y-auto bg-[#F9F9F9] px-6 pt-20 pb-8 sm:px-12 sm:pb-10 lg:px-20"
    >
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 bg-[#F9F9F9]/55" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,40,17,0.14),transparent_34%)]" />

      <div
        className="
          pointer-events-auto
          absolute
          top-[54%]
          right-[-230px]
          z-0
          h-[280px]
          w-[280px]
          -translate-y-1/2
          opacity-80
          sm:right-[-260px]
          sm:h-[360px]
          sm:w-[360px]
          md:right-[-300px]
          md:h-[460px]
          md:w-[460px]
          lg:right-[-340px]
          lg:h-[620px]
          lg:w-[620px]
          xl:right-[-390px]
          xl:h-[720px]
          xl:w-[720px]
          2xl:right-[-430px]
          2xl:h-[800px]
          2xl:w-[800px]
        "
      >
        <DeferredBlenderModel
          path="/animations/vhetra-logo.glb"
          type="animated"
          scale={2.5}
          canInteract={true}
        />
      </div>

      <div className="section-panel-content relative z-10 mx-auto w-full max-w-[1600px] py-8 sm:py-10 lg:py-12">
        <div className="flex max-w-[94%] flex-col gap-4 sm:max-w-[80%] sm:gap-5 md:max-w-[70%] lg:max-w-[62%] lg:gap-6 xl:max-w-[58%]">
          <div>
            <div className="mb-4 h-px w-20 bg-[#A82811] sm:mb-6 sm:w-24" />

            <p className="mb-3 font-manrope text-xs uppercase tracking-[0.18em] text-black/50 sm:mb-4">
              {t("eyebrow")}
            </p>

            <p className="font-khanda text-6xl font-light leading-[0.78] tracking-[-0.085em] text-black sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem]">
              VHETRA<span className="ml-[0.005em] text-[#A82811]">.</span>
            </p>
          </div>

          <h1 className="max-w-5xl font-khanda text-4xl font-light uppercase leading-[0.82] tracking-[-0.075em] text-black sm:text-5xl md:text-6xl lg:text-[4.7rem] xl:text-[5.4rem]">
            {t("heroHeading1")} {t("heroHeading2")}{" "}
            <span className="text-[#A82811]">{t("heroHeadingAccent")}</span>
          </h1>

          <p className="max-w-xl font-manrope text-sm font-light leading-6 text-black/65 sm:text-base lg:text-[1rem]">
            {t("heroDescription")}
          </p>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              vhetra-cta
              mt-2
              inline-flex
              items-center
              justify-between
              self-start
              overflow-hidden
              rounded-sm
              border
              border-black
              bg-black
              font-khanda
              font-light
              tracking-[-0.02em]
              text-white
              transition-all
              duration-500
              hover:border-[#A82811]
              hover:bg-[#A82811]
            "
          >
            <span>{t("heroCta")}</span>

            <span className="vhetra-cta-arrow font-light transition-transform duration-300 group-hover:translate-x-2">
              ⟶
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
