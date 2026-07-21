<script setup lang="ts">
import { ref } from "vue";
import { iconSvg } from "../lib/icons";

const props = defineProps<{ compact?: boolean }>();
const email = ref("");
const sent = ref(false);

function submit() {
  if (!email.value.includes("@")) return;
  sent.value = true;
  email.value = "";
  setTimeout(() => (sent.value = false), 4000);
}
</script>

<template>
  <form class="flex flex-col gap-2" @submit.prevent="submit">
    <label class="bp-label sr-only">Email address</label>
    <div class="flex">
      <input
        v-model="email"
        type="email"
        required
        placeholder="you@domain.com"
        class="flex-1 min-w-0 border border-cyan/25 bg-navy-700/60 px-3 font-mono text-xs text-white placeholder:text-steel-dim outline-none focus:border-cyan"
        :class="compact ? 'py-2.5' : 'py-3'"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        class="flex flex-shrink-0 items-center gap-1.5 border border-l-0 border-cyan/40 bg-cyan/10 px-3 font-mono text-xs uppercase tracking-wider text-cyan hover:bg-cyan hover:text-navy-900 transition-colors"
      >
        <span v-html="iconSvg(sent ? 'check-circle-2' : 'send', 14)"></span>
        <span v-if="!compact">{{ sent ? "Sent" : "Subscribe" }}</span>
      </button>
    </div>
    <p class="text-[10px] font-mono text-steel-dim">
      {{ sent ? "// Subscription logged. Check your inbox." : "// No spam. Unsubscribe anytime." }}
    </p>
  </form>
</template>
