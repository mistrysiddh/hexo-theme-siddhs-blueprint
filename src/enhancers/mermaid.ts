let initialized = false;
let counter = 0;

// Mermaid is a large dependency — only fetched (via dynamic import, so
// Rollup code-splits it into its own chunk) on pages that actually contain
// a {% mermaid %} diagram.
async function loadMermaid() {
  const { default: mermaid } = await import("mermaid");
  if (!initialized) {
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      themeVariables: {
        background: "#0A2540",
        primaryColor: "#0B3D91",
        primaryTextColor: "#FFFFFF",
        primaryBorderColor: "#5EDFFF",
        lineColor: "#5EDFFF",
        secondaryColor: "#0A2540",
        fontFamily: "JetBrains Mono, monospace",
      },
    });
    initialized = true;
  }
  return mermaid;
}

export function initMermaid(root: ParentNode) {
  const blocks = root.querySelectorAll<HTMLElement>(".bp-mermaid[data-chart]");
  if (blocks.length === 0) return;

  blocks.forEach(async (el) => {
    if (el.dataset.rendered === "true") return;
    el.dataset.rendered = "true";
    const chart = el.getAttribute("data-chart") ?? "";
    const renderTarget = el.querySelector(".bp-mermaid-render");
    if (!renderTarget) return;
    try {
      const mermaid = await loadMermaid();
      const id = "bp-mermaid-" + counter++;
      const { svg } = await mermaid.render(id, chart);
      renderTarget.innerHTML = svg;
    } catch {
      renderTarget.innerHTML = '<p class="text-sm text-error">Diagram could not be rendered.</p>';
    }
  });
}
