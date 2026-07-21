<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { iconSvg } from "../lib/icons";

interface PostSummary {
  title: string;
  description: string;
  cover: string;
  path: string;
  author: string;
  authorAvatar: string;
  dateDisplay: string;
  dateShort: string;
  readingTime: number;
  categoryName: string;
  moduleCode: string;
  drawingNumber: string;
  revisionCode: string;
}

const props = defineProps<{ posts: PostSummary[]; autoplayMs?: number }>();
const index = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

function next() {
  index.value = (index.value + 1) % props.posts.length;
}
function prev() {
  index.value = (index.value - 1 + props.posts.length) % props.posts.length;
}
function goTo(i: number) {
  index.value = i;
}
function startTimer() {
  stopTimer();
  if (props.posts.length > 1) timer = setInterval(next, props.autoplayMs || 5000);
}
function stopTimer() {
  if (timer) clearInterval(timer);
  timer = null;
}

onMounted(startTimer);
onUnmounted(stopTimer);
</script>

<template>
  <div
    v-if="posts.length"
    class="relative border-b border-cyan/20 overflow-hidden"
    @mouseenter="stopTimer"
    @mouseleave="startTimer"
  >
    <div class="absolute inset-0 bg-blueprint-grid-major bg-grid-major opacity-40" aria-hidden="true"></div>
    <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div class="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-cyan/[0.05] to-transparent animate-scanline"></div>
    </div>

    <div class="relative mx-auto max-w-7xl px-4 md:px-6 pt-8 pb-4">
      <div class="flex items-center justify-between font-mono text-[10px] text-cyan-dim uppercase tracking-wider mb-3">
        <span>DWG. COVER SHEET — FEATURED PUBLICATIONS</span>
        <span>{{ posts[index].drawingNumber }} / {{ posts[index].revisionCode }}</span>
      </div>
    </div>

    <div class="relative mx-auto max-w-7xl px-4 md:px-6 pb-10">
      <div class="bp-panel bg-navy-700/40">
        <span class="bp-corner tl !w-5 !h-5"></span><span class="bp-corner tr !w-5 !h-5"></span>
        <span class="bp-corner bl !w-5 !h-5"></span><span class="bp-corner br !w-5 !h-5"></span>

        <div class="grid grid-cols-1 lg:grid-cols-2">
          <div class="relative aspect-[16/10] lg:aspect-auto overflow-hidden border-b lg:border-b-0 lg:border-r border-cyan/20">
            <img :src="posts[index].cover" :alt="posts[index].title" class="absolute inset-0 h-full w-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/10 to-transparent"></div>
            <div class="absolute inset-0 bg-blueprint-grid bg-grid opacity-20"></div>
            <div class="absolute top-3 left-3 flex items-center gap-1.5">
              <span class="h-1.5 w-1.5 rounded-full bg-cyan animate-blink"></span>
              <span class="font-mono text-[9px] text-cyan-bright bg-navy-900/60 px-1.5 py-0.5 border border-cyan/30">
                LIVE FEATURE {{ index + 1 }}/{{ posts.length }}
              </span>
            </div>
            <span class="absolute bottom-3 right-3 font-mono text-[9px] text-steel-bright bg-navy-900/60 px-1.5 py-0.5 border border-cyan/20">
              SCALE 1:1 · {{ posts[index].dateShort }}
            </span>
          </div>

          <div class="flex flex-col justify-center p-6 md:p-10">
            <span class="mb-4 inline-flex w-fit items-center gap-2 border border-cyan/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan">
              {{ posts[index].moduleCode }} · {{ posts[index].categoryName }}
            </span>
            <h1 class="font-display text-2xl md:text-4xl font-semibold text-white leading-tight">{{ posts[index].title }}</h1>
            <p class="mt-3 text-sm md:text-base text-steel leading-relaxed line-clamp-3">{{ posts[index].description }}</p>

            <div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-steel-dim">
              <span class="flex items-center gap-1.5">
                <img :src="posts[index].authorAvatar" class="h-[18px] w-[18px] rounded-full border border-cyan/30" />
                {{ posts[index].author }}
              </span>
              <span class="flex items-center gap-1.5" v-html="iconSvg('calendar', 12) + ' ' + posts[index].dateDisplay"></span>
              <span class="flex items-center gap-1.5" v-html="iconSvg('clock', 12) + ' ' + posts[index].readingTime + ' MIN READ'"></span>
            </div>

            <a
              :href="posts[index].path"
              class="mt-7 inline-flex w-fit items-center gap-2 border border-cyan bg-cyan/10 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-cyan hover:bg-cyan hover:text-navy-900 transition-colors"
            >
              Open Document →
            </a>
          </div>
        </div>
      </div>

      <div class="mt-5 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <button
            v-for="(p, i) in posts"
            :key="p.path"
            :aria-label="'Go to slide ' + (i + 1)"
            class="h-1.5 transition-all"
            :class="i === index ? 'w-8 bg-cyan' : 'w-3 bg-cyan/25 hover:bg-cyan/50'"
            @click="goTo(i)"
          ></button>
        </div>
        <div class="flex items-center gap-2">
          <button
            aria-label="Previous slide"
            class="flex h-9 w-9 items-center justify-center border border-cyan/25 text-steel hover:border-cyan hover:text-cyan transition-colors"
            v-html="iconSvg('chevron-left', 15)"
            @click="prev"
          ></button>
          <button
            aria-label="Next slide"
            class="flex h-9 w-9 items-center justify-center border border-cyan/25 text-steel hover:border-cyan hover:text-cyan transition-colors"
            v-html="iconSvg('chevron-right', 15)"
            @click="next"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>
