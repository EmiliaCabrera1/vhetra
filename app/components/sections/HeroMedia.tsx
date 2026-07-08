"use client";

import React from "react";

export function HeroMedia() {
  const heroVideoSrc = "/videos/hero-bg.mp4?v=20260707-2";
  const rootRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = React.useState(true);
  const [isPageVisible, setIsPageVisible] = React.useState(true);
  const [shouldLoadVideo, setShouldLoadVideo] = React.useState(false);
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

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const canLoadVideo = !reducedMotion.matches && !connection?.saveData;

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
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-black"
        aria-hidden="true"
      >
        {shouldLoadVideo && !videoFailed && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full scale-x-[-1.08] scale-y-[1.08] object-cover object-center"
            loop
            muted
            playsInline
            preload="metadata"
            onError={() => setVideoFailed(true)}
          >
            <source src={heroVideoSrc} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
}
