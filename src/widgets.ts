import { createApp, type App } from "vue";
import HeroSlider from "./components/HeroSlider.vue";
import SearchModal from "./components/SearchModal.vue";
import Comments from "./components/Comments.vue";
import Newsletter from "./components/Newsletter.vue";

// Any element with data-widget="Name" + a JSON data-widget-props attribute is
// mounted as a standalone Vue app scoped to that element. This is a plain
// client-replace pattern (not true SSR hydration) — Hexo/EJS renders real,
// crawlable static content into the element first; once the bundle loads,
// Vue takes over that element to add interactivity. See README "Architecture".
const registry: Record<string, any> = {
  HeroSlider,
  SearchModal,
  Comments,
  Newsletter,
};

const mountedApps = new WeakMap<Element, App>();
let searchModalMounted = false;

export function mountWidgetsIn(root: ParentNode) {
  const elements = root.querySelectorAll<HTMLElement>("[data-widget]");
  elements.forEach((el) => {
    if (el.dataset.mounted === "true") return;
    const name = el.dataset.widget as string;
    const Component = registry[name];
    if (!Component) return;

    let props: Record<string, unknown> = {};
    const propsAttr = el.getAttribute("data-widget-props");
    if (propsAttr) {
      try {
        props = JSON.parse(propsAttr);
      } catch {
        /* malformed props — mount with defaults */
      }
    }

    const app = createApp(Component, props);
    app.mount(el);
    mountedApps.set(el, app);
    el.dataset.mounted = "true";
  });

  mountGlobalSearchModal();
}

function mountGlobalSearchModal() {
  if (searchModalMounted) return;
  const root = document.getElementById("bp-widget-root");
  if (!root) return;
  const app = createApp(SearchModal);
  app.mount(root);
  searchModalMounted = true;
}

export function unmountWidgetsIn(root: ParentNode) {
  const elements = root.querySelectorAll<HTMLElement>("[data-widget]");
  elements.forEach((el) => {
    const app = mountedApps.get(el);
    if (app) {
      app.unmount();
      mountedApps.delete(el);
      delete el.dataset.mounted;
    }
  });
}
