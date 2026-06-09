"use client";

import { animate } from "framer-motion";
import React from "react";

const SNAP_COOLDOWN_MS = 1300;
const WHEEL_THRESHOLD = 1;
const TOUCH_THRESHOLD = 42;
const SCROLL_EDGE_TOLERANCE = 2;
const SECTION_NAVIGATE_EVENT = "vhetra:section-navigate";
const EDITORIAL_EASE = [0.22, 1, 0.36, 1] as const;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function canUseNativeScroll(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;

  return Boolean(target.closest(".modal-content, [data-native-scroll]"));
}

export function SectionScrollController({
  children,
}: {
  children: React.ReactNode;
}) {
  const mainRef = React.useRef<HTMLElement>(null);
  const lastSnapRef = React.useRef(0);
  const touchStartYRef = React.useRef<number | null>(null);
  const touchStartXRef = React.useRef<number | null>(null);
  const scrollAnimationRef = React.useRef<{ stop: () => void } | null>(null);
  const panelAnimationRef = React.useRef<{ stop: () => void } | null>(null);
  const animatedPanelRef = React.useRef<HTMLElement | null>(null);
  const transitionIdRef = React.useRef(0);

  React.useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const getPanels = () =>
      Array.from(main.querySelectorAll<HTMLElement>(".snap-panel"));

    const currentPanelIndex = () => {
      const panels = getPanels();
      if (panels.length === 0) return 0;

      const panelTops = panels.map((panel) => panel.offsetTop);
      const currentTop = main.scrollTop;

      return panelTops.reduce((closestIndex, top, index) => {
        const closestDistance = Math.abs(panelTops[closestIndex] - currentTop);
        const distance = Math.abs(top - currentTop);
        return distance < closestDistance ? index : closestIndex;
      }, 0);
    };

    const getActivePanel = (target: EventTarget | null) => {
      if (target instanceof Element) {
        const targetPanel = target.closest<HTMLElement>(".snap-panel");
        if (targetPanel && main.contains(targetPanel)) return targetPanel;
      }

      return getPanels()[currentPanelIndex()] ?? null;
    };

    const canPanelScroll = (panel: HTMLElement, direction: 1 | -1) => {
      if (direction === 1) {
        return (
          panel.scrollTop + panel.clientHeight <
          panel.scrollHeight - SCROLL_EDGE_TOLERANCE
        );
      }

      return panel.scrollTop > SCROLL_EDGE_TOLERANCE;
    };

    const animateToPanel = (panel: HTMLElement) => {
      scrollAnimationRef.current?.stop();
      panelAnimationRef.current?.stop();
      if (animatedPanelRef.current && animatedPanelRef.current !== panel) {
        animatedPanelRef.current.style.transform = "translate3d(0, 0, 0)";
        animatedPanelRef.current.style.opacity = "1";
      }
      animatedPanelRef.current = panel;

      if (prefersReducedMotion()) {
        ++transitionIdRef.current;
        delete main.dataset.sectionTransition;
        main.scrollTop = panel.offsetTop;
        return;
      }

      const transitionId = ++transitionIdRef.current;
      main.dataset.sectionTransition = "true";
      panel.style.transform = "translate3d(0, 80px, 0)";
      panel.style.opacity = "0.9";

      scrollAnimationRef.current = animate(main.scrollTop, panel.offsetTop, {
        duration: 1.6,
        ease: EDITORIAL_EASE,
        onUpdate: (value) => {
          main.scrollTop = value;
        },
        onComplete: () => {
          if (transitionId === transitionIdRef.current) {
            main.scrollTop = panel.offsetTop;
            panel.style.transform = "translate3d(0, 0, 0)";
            panel.style.opacity = "1";
            delete main.dataset.sectionTransition;
          }
        },
      });

      panelAnimationRef.current = animate(
        panel,
        {
          transform: "translate3d(0, 0px, 0)",
          opacity: 1,
        },
        {
          duration: 1.6,
          ease: EDITORIAL_EASE,
        },
      );
    };

    const snapTo = (direction: 1 | -1, activePanel?: HTMLElement | null) => {
      const now = window.performance.now();
      if (now - lastSnapRef.current < SNAP_COOLDOWN_MS) return;

      const panels = getPanels();
      if (panels.length === 0) return;

      const currentIndex = activePanel
        ? panels.indexOf(activePanel)
        : currentPanelIndex();
      const nextIndex = Math.min(
        Math.max(currentIndex + direction, 0),
        panels.length - 1,
      );

      if (nextIndex === currentIndex) return;

      lastSnapRef.current = now;
      panels[nextIndex].scrollTop =
        direction === 1
          ? 0
          : panels[nextIndex].scrollHeight - panels[nextIndex].clientHeight;
      animateToPanel(panels[nextIndex]);
    };

    const handleSectionNavigate = (event: Event) => {
      const id = (event as CustomEvent<{ id: string }>).detail?.id;
      const panel = id ? document.getElementById(id) : null;
      if (!(panel instanceof HTMLElement) || !main.contains(panel)) return;

      event.preventDefault();
      panel.scrollTop = 0;
      lastSnapRef.current = window.performance.now();
      animateToPanel(panel);
    };

    const handleWheel = (event: WheelEvent) => {
      if (canUseNativeScroll(event.target)) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) return;
      if (main.dataset.sectionTransition === "true") {
        event.preventDefault();
        return;
      }

      const direction = event.deltaY > 0 ? 1 : -1;
      const activePanel = getActivePanel(event.target);
      if (activePanel && canPanelScroll(activePanel, direction)) return;

      event.preventDefault();
      snapTo(direction, activePanel);
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (canUseNativeScroll(event.target)) return;

      const touch = event.touches[0];
      touchStartYRef.current = touch.clientY;
      touchStartXRef.current = touch.clientX;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (canUseNativeScroll(event.target)) return;
      if (touchStartYRef.current === null || touchStartXRef.current === null) {
        return;
      }

      const touch = event.touches[0];
      const deltaY = touchStartYRef.current - touch.clientY;
      const deltaX = touchStartXRef.current - touch.clientX;

      if (Math.abs(deltaX) > Math.abs(deltaY)) return;
      if (Math.abs(deltaY) < TOUCH_THRESHOLD) return;

      const direction = deltaY > 0 ? 1 : -1;
      const activePanel = getActivePanel(event.target);
      if (activePanel && canPanelScroll(activePanel, direction)) return;

      event.preventDefault();
      snapTo(direction, activePanel);
      touchStartYRef.current = null;
      touchStartXRef.current = null;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (canUseNativeScroll(event.target)) return;

      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        const activePanel = getActivePanel(event.target);
        if (activePanel && canPanelScroll(activePanel, 1)) {
          event.preventDefault();
          activePanel.scrollBy({
            top: event.key === "ArrowDown" ? 48 : activePanel.clientHeight * 0.8,
            behavior: prefersReducedMotion() ? "auto" : "smooth",
          });
          return;
        }

        event.preventDefault();
        snapTo(1, activePanel);
      }

      if (["ArrowUp", "PageUp"].includes(event.key)) {
        const activePanel = getActivePanel(event.target);
        if (activePanel && canPanelScroll(activePanel, -1)) {
          event.preventDefault();
          activePanel.scrollBy({
            top: event.key === "ArrowUp" ? -48 : -activePanel.clientHeight * 0.8,
            behavior: prefersReducedMotion() ? "auto" : "smooth",
          });
          return;
        }

        event.preventDefault();
        snapTo(-1, activePanel);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    main.addEventListener(SECTION_NAVIGATE_EVENT, handleSectionNavigate);

    return () => {
      scrollAnimationRef.current?.stop();
      panelAnimationRef.current?.stop();
      if (animatedPanelRef.current) {
        animatedPanelRef.current.style.transform = "translate3d(0, 0, 0)";
        animatedPanelRef.current.style.opacity = "1";
      }
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      main.removeEventListener(SECTION_NAVIGATE_EVENT, handleSectionNavigate);
    };
  }, []);

  return (
    <main ref={mainRef} className="snap-page">
      {children}
    </main>
  );
}
