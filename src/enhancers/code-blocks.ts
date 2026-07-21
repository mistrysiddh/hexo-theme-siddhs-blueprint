import { iconSvg } from "../lib/icons";

// hexo-renderer-markdown-it already syntax-highlights fenced code blocks
// server-side (with real line numbers) into `<figure class="highlight lang">`.
// This enhancer only adds the blueprint chrome — language badge + copy
// button — around that existing markup. No client-side highlighter needed.
export function initCodeBlocks(root: ParentNode) {
  const figures = root.querySelectorAll<HTMLElement>(".bp-prose figure.highlight");

  figures.forEach((figure) => {
    if (figure.dataset.enhanced === "true") return;
    figure.dataset.enhanced = "true";

    const lang =
      Array.from(figure.classList).find((c) => c !== "highlight") || "text";

    const codeCell = figure.querySelector(".code");
    if (!codeCell) return;

    const header = document.createElement("div");
    header.className = "bp-code-header";
    header.innerHTML =
      '<span class="flex items-center gap-1.5">' +
      iconSvg("terminal-square", 12) +
      " " +
      lang +
      '</span><button type="button" class="bp-code-copy" aria-label="Copy code">' +
      '<span class="bp-copy-icon">' +
      iconSvg("copy", 12) +
      '</span><span class="bp-copy-label">Copy</span></button>';

    figure.insertBefore(header, figure.firstChild);
    figure.classList.add("bp-code-block");

    const btn = header.querySelector(".bp-code-copy") as HTMLButtonElement;
    const iconSpan = header.querySelector(".bp-copy-icon") as HTMLElement;
    const labelSpan = header.querySelector(".bp-copy-label") as HTMLElement;

    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(extractCodeText(codeCell));
        iconSpan.innerHTML = iconSvg("check", 12);
        labelSpan.textContent = "Copied";
        setTimeout(() => {
          iconSpan.innerHTML = iconSvg("copy", 12);
          labelSpan.textContent = "Copy";
        }, 1800);
      } catch {
        /* clipboard unavailable */
      }
    });
  });
}

// Lines are separated with <br>, not newlines, in the renderer's markup —
// swap them for real newlines before reading textContent so Copy preserves
// line breaks.
function extractCodeText(codeCell: Element): string {
  const clone = codeCell.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("br").forEach((br) => br.replaceWith("\n"));
  return clone.textContent ?? "";
}
