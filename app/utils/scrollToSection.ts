export function scrollToSectionStart(id: string) {
  const section = document.getElementById(id);
  const page = section?.closest<HTMLElement>(".snap-page");
  if (!section || !page) return;

  section.scrollTop = 0;
  page.scrollTo({
    top: section.offsetTop,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
}
