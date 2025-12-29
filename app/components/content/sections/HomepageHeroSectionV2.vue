<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  // Array of use cases to cycle through
  useCases: {
    type: Array,
    default: () => [
      { emoji: "🚗", label: "auto loan" },
      { emoji: "🏠", label: "home loan" },
      { emoji: "💳", label: "credit card" },
      { emoji: "💵", label: "personal loan" },
      { emoji: "🐖", label: "savings account" },
    ],
  },
  // Fixed provider shown in headline
  provider: {
    type: Object,
    default: () => ({
      logo: "/logos/logo-chatgpt.svg",
      name: "ChatGPT.",
      alt: "ChatGPT logo",
    }),
  },
  // Cycle interval in milliseconds
  cycleInterval: {
    type: Number,
    default: 4500,
  },
  subheadline: {
    type: String,
    default: "AI that scales your brand with consistency.",
  },
  primaryButtonText: {
    type: String,
    default: "Start for free",
  },
  primaryButtonHref: {
    type: String,
    default: "",
  },
  secondaryButtonText: {
    type: String,
    default: "Book a demo",
  },
  secondaryButtonHref: {
    type: String,
    default: "/book-a-demo",
  },
});

// Current use case index
const currentIndex = ref(0);
const isTransitioning = ref(false);

// Current use case computed
const currentUseCase = computed(() => props.useCases[currentIndex.value]);

// Cycle through use cases
let intervalId = null;

const cycleUseCase = () => {
  if (props.useCases.length <= 1) return;

  // Start blur out
  isTransitioning.value = true;

  // After blur out, switch use case and blur in
  setTimeout(() => {
    currentIndex.value = (currentIndex.value + 1) % props.useCases.length;

    // Small delay before removing blur for smooth effect
    setTimeout(() => {
      isTransitioning.value = false;
    }, 50);
  }, 300); // Duration of blur out
};

onMounted(() => {
  if (props.useCases.length > 1) {
    // Shorter initial delay before first cycle, then regular interval
    setTimeout(() => {
      cycleUseCase();
      intervalId = setInterval(cycleUseCase, props.cycleInterval);
    }, 1500);
  }
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <section class="relative w-full min-h-[60vh] overflow-hidden flex flex-col">
    <!-- Main content container -->
    <div
      class="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center px-6 flex-1 gap-6 pt-20"
    >
      <h1
        class="text-center text-slate-900 text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight"
      >
        The next
        <span
          class="use-case-cycle inline-flex items-baseline"
          :class="{ 'is-transitioning': isTransitioning }"
        >
          <span class="use-case-emoji">{{ currentUseCase?.emoji }}</span>
          <span class="use-case-label">{{ currentUseCase?.label }}</span>
        </span>
        will start on
        <span class="provider-display inline-flex items-baseline gap-2">
          <img
            v-if="provider?.logo"
            :src="provider.logo"
            :alt="provider.alt || ''"
            class="inline-block h-[0.85em] w-auto align-baseline translate-y-[0.05em] rounded-lg"
          />
          <span class="font-serif">{{ provider?.name }}</span>
        </span>
      </h1>

      <p class="max-w-2xl text-xl text-slate-400 text-center">
        {{ subheadline }}
      </p>

      <div class="flex flex-row items-center gap-3">
        <Button variant="primary" :href="primaryButtonHref">
          {{ primaryButtonText }}
        </Button>
        <Button variant="secondary" :href="secondaryButtonHref">
          {{ secondaryButtonText }}
        </Button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.use-case-cycle {
  transition:
    filter 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
  filter: blur(0px);
  opacity: 1;
}

.use-case-cycle.is-transitioning {
  filter: blur(8px);
  opacity: 0.4;
}

.use-case-emoji {
  margin-right: 0.25em;
}

.provider-display {
  /* Keep the provider static, no animation */
}
</style>

