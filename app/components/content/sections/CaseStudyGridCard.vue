<script setup>
import { computed } from "vue";

const props = defineProps({
  company: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    default: null,
  },
  change: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    validator: (value) => ["win", "no-change", "loss"].includes(value),
  },
  link: {
    type: String,
    default: "/case-studies",
  },
});

// Generate initials from company name
const initials = computed(() => {
  return props.company
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
});

// Status badge styling
const statusBadgeClass = computed(() => {
  switch (props.status) {
    case "win":
      return "bg-emerald-50 text-emerald-600";
    case "loss":
      return "bg-rose-50 text-rose-600";
    default:
      return "bg-slate-100 text-slate-500";
  }
});

// Status display text
const statusText = computed(() => {
  switch (props.status) {
    case "win":
      return "Win";
    case "loss":
      return "Loss";
    default:
      return "No change";
  }
});

// Change value styling
const changeClass = computed(() => {
  switch (props.status) {
    case "win":
      return "text-slate-900";
    case "loss":
      return "text-rose-600";
    default:
      return "text-slate-400";
  }
});
</script>

<template>
  <NuxtLink
    :to="link"
    class="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
  >
    <!-- Header: Logo + Company + Status -->
    <div class="mb-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-card"
        >
          <img
            v-if="logo"
            :src="logo"
            :alt="company"
            class="h-5 w-5 object-contain"
          />
          <span v-else class="text-xs font-semibold text-slate-500">
            {{ initials }}
          </span>
        </div>
        <span class="text-sm font-semibold text-slate-800">
          {{ company }}
        </span>
      </div>
      <span
        :class="[
          'rounded-full px-2.5 py-1 text-xs font-semibold',
          statusBadgeClass,
        ]"
      >
        {{ statusText }}
      </span>
    </div>

    <!-- Change Value -->
    <div :class="['text-3xl font-medium', changeClass]">
      {{ change }}
    </div>

    <!-- Description -->
    <p class="mt-1 text-sm text-muted">
      {{ description }}
    </p>

    <!-- Footer: Category + Arrow -->
    <div
      class="mt-3 flex items-center justify-between border-t border-slate-100 pt-3"
    >
      <span class="text-xs text-slate-400">{{ category }}</span>
      <svg
        class="h-4 w-4 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-slate-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </div>
  </NuxtLink>
</template>
