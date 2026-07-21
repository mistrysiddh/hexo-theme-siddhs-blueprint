export function initMobileMenu() {
  const btn = document.getElementById("bp-mobile-toggle");
  const panel = document.getElementById("bp-mobile-panel");
  if (!btn || !panel) return;
  const menuIcon = document.getElementById("bp-mobile-icon-menu");
  const closeIcon = document.getElementById("bp-mobile-icon-close");

  function close() {
    panel!.classList.add("hidden");
    btn!.setAttribute("aria-expanded", "false");
    menuIcon?.classList.remove("hidden");
    closeIcon?.classList.add("hidden");
  }

  function toggle() {
    const willOpen = panel!.classList.contains("hidden");
    panel!.classList.toggle("hidden", !willOpen);
    btn!.setAttribute("aria-expanded", String(willOpen));
    menuIcon?.classList.toggle("hidden", willOpen);
    closeIcon?.classList.toggle("hidden", !willOpen);
  }

  btn.addEventListener("click", toggle);
  panel.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).closest("a")) close();
  });
}
