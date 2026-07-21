<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { iconSvg } from "../lib/icons";
import { rootUrl } from "../lib/root-url";

interface SearchDoc {
  title: string;
  path: string;
  description: string;
  body: string;
  category: string;
  tags: string[];
  author: string;
}

const open = ref(false);
const query = ref("");
const docs = ref<SearchDoc[]>([]);
const inputRef = ref<HTMLInputElement | null>(null);

async function loadDocs() {
  if (docs.value.length) return;
  try {
    const res = await fetch(rootUrl("/assets/data/search.json"));
    docs.value = await res.json();
  } catch {
    /* search index unavailable — modal still opens, just empty */
  }
}

function show() {
  open.value = true;
  loadDocs();
  nextTick(() => inputRef.value?.focus());
}
function hide() {
  open.value = false;
  query.value = "";
}

function onOpenButtonClick() {
  show();
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && open.value) hide();
}

onMounted(() => {
  document.getElementById("bp-search-open")?.addEventListener("click", onOpenButtonClick);
  window.addEventListener("keydown", onKeydown);
});
onUnmounted(() => {
  document.getElementById("bp-search-open")?.removeEventListener("click", onOpenButtonClick);
  window.removeEventListener("keydown", onKeydown);
});

const results = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return [];
  return docs.value
    .filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.author.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q)) ||
        d.body.toLowerCase().includes(q)
    )
    .slice(0, 8);
});

// When a match is only found in the body (not the title/description), show
// a snippet of surrounding context instead of the generic description so the
// result is actually useful.
function snippet(doc: SearchDoc): string {
  const q = query.value.trim().toLowerCase();
  if (doc.description.toLowerCase().includes(q)) return doc.description;
  const idx = doc.body.toLowerCase().indexOf(q);
  if (idx === -1) return doc.description;
  const start = Math.max(0, idx - 40);
  const end = Math.min(doc.body.length, idx + q.length + 60);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < doc.body.length ? "…" : "";
  return prefix + doc.body.slice(start, end).trim() + suffix;
}
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-start justify-center bg-ink/80 backdrop-blur-sm px-4 pt-24" @click="hide">
    <div class="bp-panel w-full max-w-xl bg-navy-600 shadow-2xl" @click.stop>
      <span class="bp-corner tl"></span><span class="bp-corner tr"></span>
      <span class="bp-corner bl"></span><span class="bp-corner br"></span>

      <div class="flex items-center gap-3 border-b border-cyan/20 px-4 py-3">
        <span class="text-cyan flex-shrink-0" v-html="iconSvg('search', 16)"></span>
        <input
          ref="inputRef"
          v-model="query"
          placeholder="Search title, content, tags, category, author..."
          class="w-full bg-transparent font-mono text-sm text-white placeholder:text-steel-dim outline-none"
        />
        <button aria-label="Close search" class="text-steel hover:text-cyan flex-shrink-0" v-html="iconSvg('x', 16)" @click="hide"></button>
      </div>

      <div class="max-h-[60vh] overflow-y-auto">
        <div v-if="query.trim() && results.length === 0" class="px-4 py-8 text-center text-sm text-steel">
          No records match query <span class="text-cyan font-mono">&quot;{{ query }}&quot;</span>
        </div>

        <a
          v-for="r in results"
          :key="r.path"
          :href="r.path"
          class="flex items-start gap-3 border-b border-cyan/10 px-4 py-3 hover:bg-cyan/5 transition-colors group"
          @click="hide"
        >
          <span class="mt-0.5 flex-shrink-0 text-cyan-dim" v-html="iconSvg('hash', 15)"></span>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
              <span class="truncate text-sm text-white font-medium">{{ r.title }}</span>
              <span class="bp-label flex-shrink-0">{{ r.category }}</span>
            </div>
            <p class="truncate text-xs text-steel mt-0.5">{{ snippet(r) }}</p>
          </div>
          <span class="mt-1 flex-shrink-0 text-steel-dim group-hover:text-cyan transition-colors" v-html="iconSvg('arrow-right', 14)"></span>
        </a>

        <div v-if="!query.trim()" class="px-4 py-6 text-xs text-steel-dim font-mono">
          TIP // search indexes {{ docs.length || "…" }} technical documents by title, content, tag, category and author.
        </div>
      </div>
    </div>
  </div>
</template>
