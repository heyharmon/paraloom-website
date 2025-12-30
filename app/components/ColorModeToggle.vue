<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "light",
    validator: (value) => ["light", "dark"].includes(value),
  },
});

const colorMode = useColorMode();

const modes = [
  { value: "light", label: "Light", icon: "sun" },
  { value: "dark", label: "Dark", icon: "moon" },
  { value: "system", label: "System", icon: "system" },
];

const setMode = (mode) => {
  colorMode.preference = mode;
};
</script>

<template>
  <div
    class="color-mode-toggle flex items-center gap-1 p-1 rounded-full"
    :class="[variant === 'dark' ? 'bg-white/10' : 'bg-surface-secondary']"
  >
    <button
      v-for="mode in modes"
      :key="mode.value"
      :aria-label="`Switch to ${mode.label} mode`"
      :aria-pressed="colorMode.preference === mode.value"
      class="relative p-2 rounded-full transition-all duration-200"
      :class="[
        colorMode.preference === mode.value
          ? variant === 'dark'
            ? 'bg-white/20 text-white shadow-sm'
            : 'bg-surface text-heading shadow-sm'
          : variant === 'dark'
            ? 'text-white/50 hover:text-white/80'
            : 'text-muted hover:text-body',
      ]"
      @click="setMode(mode.value)"
    >
      <!-- Sun Icon -->
      <svg
        v-if="mode.icon === 'sun'"
        class="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <circle cx="12" cy="12" r="4" />
        <path
          d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
        />
      </svg>

      <!-- Moon Icon -->
      <svg
        v-if="mode.icon === 'moon'"
        class="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>

      <!-- System Icon -->
      <svg
        v-if="mode.icon === 'system'"
        class="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    </button>
  </div>
</template>
