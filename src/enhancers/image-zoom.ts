export function initImageZoom(root: ParentNode) {
  const imgs = root.querySelectorAll<HTMLImageElement>(".bp-prose img");
  imgs.forEach((img) => {
    if (img.dataset.zoomBound === "true") return;
    img.dataset.zoomBound = "true";
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openZoom(img.src, img.alt));
  });
}

function openZoom(src: string, alt: string) {
  const overlay = document.createElement("div");
  overlay.className =
    "fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-6";
  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  image.className = "max-h-full max-w-full object-contain border border-cyan/30";
  overlay.appendChild(image);
  overlay.addEventListener("click", () => close());

  function onKey(e: KeyboardEvent) {
    if (e.key === "Escape") close();
  }
  function close() {
    overlay.remove();
    document.removeEventListener("keydown", onKey);
  }
  document.addEventListener("keydown", onKey);
  document.body.appendChild(overlay);
}
