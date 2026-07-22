<script setup lang="ts">
import { ref, computed } from "vue";
import { iconSvg } from "../lib/icons";

interface ListmonkConfig {
  url: string;
  list_uuid: string;
}

const props = defineProps<{
  compact?: boolean;
  provider?: string;
  listmonk?: ListmonkConfig;
}>();

type Status = "idle" | "sending" | "sent" | "pending" | "error";

const email = ref("");
const status = ref<Status>("idle");
const errorMessage = ref("");

// Real, self-hosted listmonk (https://listmonk.app) integration. Falls back to
// a local no-op demo state when unconfigured, same as Comments.vue's provider
// pattern — see the README's "Newsletter" section for setup.
const useListmonk = computed(
  () => props.provider === "listmonk" && !!props.listmonk?.url && !!props.listmonk?.list_uuid
);

async function submit() {
  if (status.value === "sending" || !email.value.includes("@")) return;

  if (!useListmonk.value) {
    status.value = "sent";
    email.value = "";
    setTimeout(() => (status.value = "idle"), 4000);
    return;
  }

  status.value = "sending";
  errorMessage.value = "";

  try {
    const base = props.listmonk!.url.replace(/\/+$/, "");
    const res = await fetch(`${base}/api/public/subscription`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        list_uuids: [props.listmonk!.list_uuid],
      }),
    });

    const body = await res.json().catch(() => null);
    if (!res.ok) throw new Error(body?.message || "Subscription request failed.");

    status.value = body?.data?.has_optin ? "pending" : "sent";
    email.value = "";
    setTimeout(() => (status.value = "idle"), 6000);
  } catch {
    status.value = "error";
    errorMessage.value = "Couldn't reach the subscription service. Try again shortly.";
  }
}

const icon = computed(() => {
  if (status.value === "sent" || status.value === "pending") return "check-circle-2";
  if (status.value === "error") return "x-circle";
  return "send";
});

const caption = computed(() => {
  switch (status.value) {
    case "sending":
      return "// Transmitting...";
    case "sent":
      return "// Subscription logged. Check your inbox.";
    case "pending":
      return "// Almost there — confirm via the email we just sent you.";
    case "error":
      return `// ${errorMessage.value}`;
    default:
      return "// No spam. Unsubscribe anytime.";
  }
});
</script>

<template>
  <form class="flex flex-col gap-2" @submit.prevent="submit">
    <label class="bp-label sr-only">Email address</label>
    <div class="flex">
      <input
        v-model="email"
        type="email"
        required
        :disabled="status === 'sending'"
        placeholder="you@domain.com"
        class="flex-1 min-w-0 border border-cyan/25 bg-navy-700/60 px-3 font-mono text-xs text-white placeholder:text-steel-dim outline-none focus:border-cyan disabled:opacity-60"
        :class="compact ? 'py-2.5' : 'py-3'"
      />
      <button
        type="submit"
        :disabled="status === 'sending'"
        aria-label="Subscribe"
        class="flex flex-shrink-0 items-center gap-1.5 border border-l-0 border-cyan/40 bg-cyan/10 px-3 font-mono text-xs uppercase tracking-wider text-cyan hover:bg-cyan hover:text-navy-900 transition-colors disabled:opacity-60 disabled:hover:bg-cyan/10 disabled:hover:text-cyan"
      >
        <span v-html="iconSvg(icon, 14)"></span>
        <span v-if="!compact">{{ status === "sending" ? "Sending" : "Subscribe" }}</span>
      </button>
    </div>
    <p class="text-[10px] font-mono" :class="status === 'error' ? 'text-red-400' : 'text-steel-dim'">
      {{ caption }}
    </p>
  </form>
</template>
