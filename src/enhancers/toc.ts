interface HeadingEntry {
  id: string;
  text: string;
  level: number;
}

function buildList(headings: HeadingEntry[], onLinkClick?: () => void): { list: HTMLUListElement; links: HTMLAnchorElement[] } {
  const list = document.createElement("ul");
  list.className = "space-y-2";
  const links: HTMLAnchorElement[] = [];

  headings.forEach((h) => {
    const li = document.createElement("li");
    li.style.paddingLeft = h.level === 3 ? "12px" : "0";
    const a = document.createElement("a");
    a.href = "#" + h.id;
    a.textContent = h.text;
    a.className =
      "block border-l text-[12.5px] leading-snug pl-3 transition-colors border-cyan/10 text-steel hover:text-cyan-bright hover:border-cyan/40";
    if (onLinkClick) a.addEventListener("click", onLinkClick);
    links.push(a);
    li.appendChild(a);
    list.appendChild(li);
  });

  return { list, links };
}

function setActive(linkGroups: HTMLAnchorElement[][], idx: number) {
  linkGroups.forEach((links) => {
    links.forEach((a, i) => {
      const active = i === idx;
      a.classList.toggle("border-cyan", active);
      a.classList.toggle("text-cyan", active);
      a.classList.toggle("border-cyan/10", !active);
      a.classList.toggle("text-steel", !active);
    });
  });
}

function initMobileDrawer(root: ParentNode) {
  const openBtn = root.querySelector<HTMLElement>("#bp-toc-mobile-open");
  const closeBtn = root.querySelector<HTMLElement>("#bp-toc-mobile-close");
  const drawer = root.querySelector<HTMLElement>("#bp-toc-mobile-drawer");
  const backdrop = root.querySelector<HTMLElement>("#bp-toc-mobile-backdrop");
  if (!openBtn || !closeBtn || !drawer || !backdrop) return null;

  function open() {
    drawer!.classList.remove("hidden", "translate-y-full");
    backdrop!.classList.remove("hidden");
    openBtn!.setAttribute("aria-expanded", "true");
  }
  function close() {
    drawer!.classList.add("translate-y-full");
    backdrop!.classList.add("hidden");
    openBtn!.setAttribute("aria-expanded", "false");
    window.setTimeout(() => drawer!.classList.add("hidden"), 200);
  }

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  backdrop.addEventListener("click", close);

  return { close, openBtn };
}

export function initTOC(root: ParentNode) {
  const desktopContainer = root.querySelector<HTMLElement>("#bp-toc");
  const mobileList = root.querySelector<HTMLElement>("#bp-toc-mobile-list");
  const mobileDrawer = initMobileDrawer(root);
  if (!desktopContainer && !mobileList) return;

  const scope: ParentNode = root instanceof Element ? root : document;
  const headingEls = Array.from(scope.querySelectorAll<HTMLElement>(".bp-prose h2, .bp-prose h3"));
  const headings: HeadingEntry[] = headingEls.map((h) => ({
    id: h.id,
    text: (h.textContent ?? "").replace(/#$/, ""),
    level: h.tagName === "H3" ? 3 : 2,
  }));

  if (headings.length === 0) {
    if (desktopContainer) desktopContainer.innerHTML = "";
    if (mobileList) mobileList.innerHTML = "";
    mobileDrawer?.openBtn.classList.add("hidden");
    return;
  }

  mobileDrawer?.openBtn.classList.remove("hidden");

  const linkGroups: HTMLAnchorElement[][] = [];

  if (desktopContainer) {
    const { list, links } = buildList(headings);
    desktopContainer.innerHTML =
      '<div class="mb-3 flex items-center gap-2 border-b border-cyan/15 pb-2"><span class="bp-label">On This Page</span></div>';
    desktopContainer.appendChild(list);
    linkGroups.push(links);
  }

  if (mobileList) {
    const { list, links } = buildList(headings, () => mobileDrawer?.close());
    mobileList.innerHTML = "";
    mobileList.appendChild(list);
    linkGroups.push(links);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const idx = headingEls.indexOf(entry.target as HTMLElement);
        setActive(linkGroups, idx);
      });
    },
    { rootMargin: "-100px 0px -70% 0px" }
  );
  headingEls.forEach((h) => observer.observe(h));
}
