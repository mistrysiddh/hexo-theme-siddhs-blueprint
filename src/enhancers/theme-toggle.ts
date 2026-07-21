export function initThemeToggle() {
  const btn = document.getElementById("bp-theme-toggle");
  if (!btn) return;
  const sun = document.getElementById("bp-theme-icon-sun");
  const moon = document.getElementById("bp-theme-icon-moon");

  function sync() {
    const isLight = document.documentElement.classList.contains("light");
    sun?.classList.toggle("hidden", isLight);
    moon?.classList.toggle("hidden", !isLight);
  }
  sync();

  btn.addEventListener("click", () => {
    const next = !document.documentElement.classList.contains("light");
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("bp-theme", next ? "light" : "dark");
    } catch {
      /* ignore */
    }
    sync();
  });
}
