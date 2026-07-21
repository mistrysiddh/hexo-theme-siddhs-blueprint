export function initReadingProgress() {
  const bar = document.getElementById("bp-progress-bar");
  if (!bar) return;

  function onScroll() {
    const article = document.querySelector(".bp-prose");
    if (!article) {
      bar!.style.opacity = "0";
      bar!.style.width = "0%";
      return;
    }
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
    const pct = scrollHeight > 0 ? Math.min(100, (scrollTop / scrollHeight) * 100) : 0;
    bar!.style.opacity = "1";
    bar!.style.width = pct + "%";
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
