import "./styles/main.css";

import { mountWidgetsIn, unmountWidgetsIn } from "./widgets";
import { initSpaNavigation } from "./spa";
import { initThemeToggle } from "./enhancers/theme-toggle";
import { initMobileMenu } from "./enhancers/mobile-menu";
import { initReadingProgress } from "./enhancers/reading-progress";
import { initTOC } from "./enhancers/toc";
import { initCodeBlocks } from "./enhancers/code-blocks";
import { initMermaid } from "./enhancers/mermaid";
import { initKatex } from "./enhancers/katex";
import { initImageZoom } from "./enhancers/image-zoom";
import { initCategoriesFilter } from "./enhancers/categories-filter";
import { initTimelineFilter } from "./enhancers/timeline-filter";

// Enhancers that operate on content inside #bp-main and must re-run every
// time that region is replaced (initial load AND every SPA-style navigation).
function enhanceContent(root: ParentNode) {
  initTOC(root);
  initCodeBlocks(root);
  initMermaid(root);
  initKatex(root);
  initImageZoom(root);
  initCategoriesFilter(root);
  initTimelineFilter(root);
  mountWidgetsIn(root);
}

function boot() {
  // Chrome (navbar/footer) never gets swapped, so these bind once.
  initThemeToggle();
  initMobileMenu();
  initReadingProgress();

  enhanceContent(document);

  initSpaNavigation({
    onBeforeSwap: () => {
      const main = document.getElementById("bp-main");
      if (main) unmountWidgetsIn(main);
    },
    onAfterSwap: (main) => {
      enhanceContent(main);
    },
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
