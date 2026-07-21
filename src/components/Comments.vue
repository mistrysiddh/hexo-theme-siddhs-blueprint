<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { iconSvg } from "../lib/icons";

interface GiscusConfig {
  repo: string;
  repo_id: string;
  category: string;
  category_id: string;
  mapping: string;
  reactions_enabled: boolean;
  input_position: string;
}

const props = defineProps<{
  slug: string;
  path?: string;
  provider?: string;
  giscus?: GiscusConfig;
}>();

const useGiscus = computed(
  () => props.provider === "giscus" && !!props.giscus?.repo && !!props.giscus?.repo_id && !!props.giscus?.category_id
);

// ---------- Giscus (GitHub Discussions) ----------
const giscusHost = ref<HTMLElement | null>(null);

function giscusTheme(): string {
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

function mountGiscus() {
  if (!giscusHost.value || !props.giscus) return;
  const g = props.giscus;
  const script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.async = true;
  script.crossOrigin = "anonymous";
  script.setAttribute("data-repo", g.repo);
  script.setAttribute("data-repo-id", g.repo_id);
  script.setAttribute("data-category", g.category);
  script.setAttribute("data-category-id", g.category_id);
  script.setAttribute("data-mapping", g.mapping || "pathname");
  script.setAttribute("data-reactions-enabled", g.reactions_enabled ? "1" : "0");
  script.setAttribute("data-input-position", g.input_position || "top");
  script.setAttribute("data-theme", giscusTheme());
  script.setAttribute("data-lang", "en");
  giscusHost.value.appendChild(script);
}

function onThemeToggle() {
  const iframe = giscusHost.value?.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
  iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme: giscusTheme() } } }, "https://giscus.app");
}

// ---------- Local (session-only) fallback ----------
interface Comment {
  id: number;
  name: string;
  message: string;
  date: string;
}

const comments = ref<Comment[]>([]);
const name = ref("");
const message = ref("");

function submit() {
  if (!name.value.trim() || !message.value.trim()) return;
  comments.value.unshift({ id: Date.now(), name: name.value, message: message.value, date: new Date().toISOString() });
  name.value = "";
  message.value = "";
}

onMounted(() => {
  if (useGiscus.value) {
    mountGiscus();
    document.getElementById("bp-theme-toggle")?.addEventListener("click", onThemeToggle);
  }
});
onUnmounted(() => {
  document.getElementById("bp-theme-toggle")?.removeEventListener("click", onThemeToggle);
});
</script>

<template>
  <div>
    <div v-if="useGiscus" ref="giscusHost" class="bp-giscus-host"></div>

    <template v-else>
      <form class="border border-cyan/20 p-4 mb-6 space-y-3" @submit.prevent="submit">
        <input
          v-model="name"
          placeholder="Name"
          class="w-full border border-cyan/25 bg-navy-700/60 px-3 py-2 font-mono text-sm text-white placeholder:text-steel-dim outline-none focus:border-cyan"
        />
        <textarea
          v-model="message"
          placeholder="Add a technical note..."
          rows="3"
          class="w-full border border-cyan/25 bg-navy-700/60 px-3 py-2 text-sm text-white placeholder:text-steel-dim outline-none focus:border-cyan resize-none"
        ></textarea>
        <button
          type="submit"
          class="flex items-center gap-2 border border-cyan/40 bg-cyan/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-cyan hover:bg-cyan hover:text-navy-900 transition-colors"
          v-html="iconSvg('send', 13) + ' Post Note'"
        ></button>
      </form>

      <p v-if="comments.length === 0" class="flex items-center gap-2 text-sm text-steel-dim font-mono">
        <span v-html="iconSvg('message-circle', 14)"></span> No field notes yet — be the first to log one.
      </p>
      <ul v-else class="space-y-4">
        <li v-for="c in comments" :key="c.id" class="border-l-2 border-cyan/30 pl-4">
          <div class="flex items-center gap-2 text-xs font-mono text-cyan-dim">
            <span class="text-white">{{ c.name }}</span>
            <span>{{ new Date(c.date).toLocaleString() }}</span>
          </div>
          <p class="mt-1 text-sm text-steel-bright/90">{{ c.message }}</p>
        </li>
      </ul>
    </template>
  </div>
</template>
