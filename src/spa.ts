interface SpaOptions {
  onBeforeSwap: () => void;
  onAfterSwap: (mainEl: HTMLElement) => void;
}

// Progressive-enhancement "pjax"-style navigation: every URL is still a real
// Hexo-generated static page (works with JS disabled, fully crawlable). When
// JS is available, internal link clicks are intercepted, the destination is
// fetched, and only #bp-main is swapped — giving the SPA-like transitions
// Aurora is known for without giving up static-site SEO/no-JS robustness.
export function initSpaNavigation(opts: SpaOptions) {
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented) return;
    const link = (e.target as HTMLElement).closest("a");
    if (!link) return;
    if (link.target === "_blank" || link.hasAttribute("download")) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

    let url: URL;
    try {
      url = new URL(href, window.location.href);
    } catch {
      return;
    }
    if (url.origin !== window.location.origin) return;
    if (url.pathname === window.location.pathname && url.hash) return;

    e.preventDefault();
    navigateTo(url.href, true);
  });

  window.addEventListener("popstate", () => {
    navigateTo(window.location.href, false);
  });

  async function navigateTo(url: string, pushState: boolean) {
    const main = document.getElementById("bp-main");
    const progress = document.getElementById("bp-progress-bar");
    if (!main) {
      window.location.href = url;
      return;
    }

    try {
      if (progress) {
        progress.style.opacity = "1";
        progress.style.width = "30%";
      }
      main.classList.add("bp-nav-loading");

      const res = await fetch(url);
      if (!res.ok) throw new Error("Navigation fetch failed with status " + res.status);
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const newMain = doc.getElementById("bp-main");
      if (!newMain) {
        window.location.href = url;
        return;
      }

      opts.onBeforeSwap();
      document.title = doc.title;
      main.innerHTML = newMain.innerHTML;
      window.scrollTo(0, 0);
      if (pushState) history.pushState({}, "", url);
      updateActiveNavLinks(url);
      announceNavigation(doc.title);

      if (progress) {
        progress.style.width = "100%";
        setTimeout(() => {
          progress.style.opacity = "0";
          progress.style.width = "0%";
        }, 250);
      }
      main.classList.remove("bp-nav-loading");
      opts.onAfterSwap(main);

      // Move focus to the new content so keyboard/screen-reader users land
      // at the top of the page instead of on a now-detached link, mirroring
      // what a full navigation would do.
      main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
    } catch {
      // Any failure (offline, non-HTML response, etc.) falls back to a
      // normal full navigation rather than leaving the page half-updated.
      window.location.href = url;
    }
  }

  function announceNavigation(title: string) {
    const announcer = document.getElementById("bp-route-announcer");
    if (!announcer) return;
    // Clear first — assistive tech won't re-announce identical consecutive
    // text in a live region, so briefly emptying it forces the update.
    announcer.textContent = "";
    window.setTimeout(() => {
      announcer.textContent = "Navigated to " + title;
    }, 100);
  }

  function updateActiveNavLinks(url: string) {
    const path = new URL(url).pathname;
    document.querySelectorAll<HTMLAnchorElement>("header nav a[href]").forEach((a) => {
      const active = new URL(a.href).pathname === path;
      a.classList.toggle("text-cyan", active);
      a.classList.toggle("text-steel", !active);
    });
  }
}
