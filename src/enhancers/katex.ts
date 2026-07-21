// KaTeX's auto-render extension is only fetched (dynamic import → its own
// chunk) when the page's content actually contains a `$`/`$$` delimiter, so
// pages with no math never pay for it.
export async function initKatex(root: ParentNode) {
  const article = root.querySelector<HTMLElement>(".bp-prose");
  if (!article) return;
  if (!/\$[^\n$]+\$/.test(article.textContent ?? "")) return;

  try {
    // @ts-ignore -- katex's auto-render contrib entry ships without its own types
    const { default: renderMathInElement } = await import("katex/contrib/auto-render");
    renderMathInElement(article, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
      ],
      throwOnError: false,
    });
  } catch {
    /* no math in this document, or a delimiter mismatch — non-fatal */
  }
}
