"use client";

import dynamic from "next/dynamic";
import React from "react";

const BlenderModel = dynamic(() => import("@/app/components/BlenderModel"), {
  ssr: false,
  loading: () => <div className="h-full w-full" aria-hidden />,
});

function scheduleAfterPageLoad(callback: () => void) {
  let idleId: number | undefined;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const schedule = () => {
    const idleWindow = window as Window & {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions,
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(callback, { timeout: 3000 });
    } else {
      timeoutId = globalThis.setTimeout(callback, 1500);
    }
  };

  if (document.readyState === "complete") {
    schedule();
  } else {
    window.addEventListener("load", schedule, { once: true });
  }

  return () => {
    window.removeEventListener("load", schedule);
    if (idleId !== undefined) {
      (
        window as Window & { cancelIdleCallback?: (handle: number) => void }
      ).cancelIdleCallback?.(idleId);
    }
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
  };
}

export function HeroMedia({ variant }: { variant: "background" | "model" }) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = React.useState(true);
  const [isPageVisible, setIsPageVisible] = React.useState(true);
  const [shouldLoadVideo, setShouldLoadVideo] = React.useState(false);
  const [shouldLoadModel, setShouldLoadModel] = React.useState(false);
  const [videoFailed, setVideoFailed] = React.useState(false);

  React.useEffect(() => {
    const section = rootRef.current?.closest("section");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const section = rootRef.current?.closest("section");
    if (!section) return;

    const desktop = window.matchMedia("(min-width: 769px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const canLoadVideo =
      desktop.matches && !reducedMotion.matches && !connection?.saveData;

    if (!canLoadVideo) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  React.useEffect(
    () => scheduleAfterPageLoad(() => setShouldLoadModel(true)),
    [],
  );

  React.useEffect(() => {
    const onVisibilityChange = () =>
      setIsPageVisible(document.visibilityState === "visible");
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video || videoFailed) return;

    if (!isVisible || !isPageVisible) {
      video.pause();
      return;
    }

    void video.play().catch(() => setVideoFailed(true));
  }, [isPageVisible, isVisible, shouldLoadVideo, videoFailed]);

  return (
    <div ref={rootRef} className="contents">
      {variant === "background" && (
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
      )}

      {variant === "model" && (
        <div className="pointer-events-auto order-first relative z-0 mx-auto mb-1 h-[220px] w-[220px] opacity-80 sm:order-none sm:absolute sm:top-[54%] sm:right-[-260px] sm:mx-0 sm:mb-0 sm:mt-0 sm:h-[360px] sm:w-[360px] sm:-translate-y-1/2 md:right-[-300px] md:h-[460px] md:w-[460px] lg:right-[-340px] lg:h-[620px] lg:w-[620px] xl:right-[-390px] xl:h-[720px] xl:w-[720px] 2xl:right-[-430px] 2xl:h-[800px] 2xl:w-[800px] min-[1800px]:!right-[-500px] min-[1800px]:!h-[960px] min-[1800px]:!w-[960px]">
          {shouldLoadModel && (
            <BlenderModel
              path="/animations/vhetra-logo.glb"
              type="animated"
              scale={2.5}
              canInteract
              active={isVisible && isPageVisible}
            />
          )}
        </div>
      )}
    </div>
  );
}
