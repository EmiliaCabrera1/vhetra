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
  const sectionRef = React.useRef<HTMLElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isPageVisible, setIsPageVisible] = React.useState(true);
  const [shouldLoadVideo, setShouldLoadVideo] = React.useState(false);
  const [videoFailed, setVideoFailed] = React.useState(false);
  const whatsappHref = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    t("whatsappMessage"),
  )}`;

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const desktopQuery = window.matchMedia("(min-width: 769px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean };
      }
    ).connection;

    const canLoadVideo = () =>
      desktopQuery.matches && !motionQuery.matches && !connection?.saveData;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && canLoadVideo()) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === "visible");
    };

    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video || videoFailed) return;

    if (!isVisible || !isPageVisible) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      setVideoFailed(true);
    });
  }, [isPageVisible, isVisible, shouldLoadVideo, videoFailed]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="snap-panel isolate relative flex items-center overflow-x-hidden overflow-y-auto bg-[#F9F9F9] px-6 pt-20 pb-8 sm:px-12 sm:pb-10 lg:px-20"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[url('/videos/hero-poster.webp')] bg-cover bg-center"
        aria-hidden="true"
      >
        {shouldLoadVideo && !videoFailed && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            loop
            muted
            playsInline
            preload="metadata"
            poster="/videos/hero-poster.webp"
            onError={() => setVideoFailed(true)}
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[#F9F9F9]/55"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_top_right,rgba(168,40,17,0.14),transparent_34%)]"
        aria-hidden="true"
      />

      <div className="section-panel-content relative z-20 mx-auto w-full max-w-[1600px] py-8 sm:py-10 lg:py-12 min-[1800px]:!max-w-[1900px] min-[1800px]:!py-16">
        <div className="flex max-w-[94%] flex-col gap-4 sm:max-w-[80%] sm:gap-5 md:max-w-[70%] lg:max-w-[62%] lg:gap-6 xl:max-w-[58%] min-[1800px]:!max-w-[54%] min-[1800px]:!gap-8">
          <div>
            <div className="mb-4 h-px w-20 bg-[#A82811] sm:mb-6 sm:w-24 min-[1800px]:!mb-8 min-[1800px]:!w-32" />

            <p className="mb-3 font-manrope text-xs uppercase tracking-[0.18em] text-black/50 sm:mb-4 min-[1800px]:!text-sm">
              {t("eyebrow")}
            </p>

            <p className="font-khanda text-6xl font-light leading-[0.78] tracking-[-0.085em] text-black sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] min-[1800px]:!text-[10.5rem]">
              VHETRA<span className="ml-[0.005em] text-[#A82811]">.</span>
            </p>
          </div>

          <h1 className="max-w-5xl font-khanda text-4xl font-light uppercase leading-[0.82] tracking-[-0.075em] text-black sm:text-5xl md:text-6xl lg:text-[4.7rem] xl:text-[5.4rem] min-[1800px]:!max-w-7xl min-[1800px]:!text-[6.7rem]">
            {t("heroHeading1")} {t("heroHeading2")}{" "}
            <span className="text-[#A82811]">{t("heroHeadingAccent")}</span>
          </h1>

          <p className="max-w-xl font-manrope text-sm font-light leading-6 text-black/65 sm:text-base lg:text-[1rem] min-[1800px]:!max-w-2xl min-[1800px]:!text-xl min-[1800px]:!leading-8">
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

          <div
            className="
              pointer-events-auto
              order-first
              relative
              z-0
              mx-auto
              mb-1
              h-[220px]
              w-[220px]
              opacity-80
              sm:order-none
              sm:absolute
              sm:top-[54%]
              sm:right-[-260px]
              sm:mx-0
              sm:mb-0
              sm:mt-0
              sm:h-[360px]
              sm:w-[360px]
              sm:-translate-y-1/2
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
              min-[1800px]:!right-[-500px]
              min-[1800px]:!h-[960px]
              min-[1800px]:!w-[960px]
            "
          >
            <DeferredBlenderModel
              path="/animations/vhetra-logo.glb"
              type="animated"
              scale={2.5}
              canInteract={true}
              active={isVisible && isPageVisible}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
