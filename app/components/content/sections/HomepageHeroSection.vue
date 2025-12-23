<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  // Headline segments for flexible inline content
  headlineBefore: {
    type: String,
    default: "The next billion financial decisions will start on",
  },
  // Array of platforms to cycle through
  platforms: {
    type: Array,
    default: () => [
      {
        logo: "/logos/logo-chatgpt.svg",
        name: "ChatGPT.",
        alt: "ChatGPT logo",
      },
    ],
  },
  // Optional text after the highlighted portion
  headlineAfter: {
    type: String,
    default: "",
  },
  // Cycle interval in milliseconds
  cycleInterval: {
    type: Number,
    default: 3000,
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

// Current platform index
const currentIndex = ref(0);
const isTransitioning = ref(false);

// Current platform computed
const currentPlatform = computed(() => props.platforms[currentIndex.value]);

// Cycle through platforms
let intervalId = null;

const cyclePlatform = () => {
  if (props.platforms.length <= 1) return;

  // Start blur out
  isTransitioning.value = true;

  // After blur out, switch platform and blur in
  setTimeout(() => {
    currentIndex.value = (currentIndex.value + 1) % props.platforms.length;

    // Small delay before removing blur for smooth effect
    setTimeout(() => {
      isTransitioning.value = false;
    }, 50);
  }, 300); // Duration of blur out
};

onMounted(() => {
  if (props.platforms.length > 1) {
    // Shorter initial delay before first cycle, then regular interval
    setTimeout(() => {
      cyclePlatform();
      intervalId = setInterval(cyclePlatform, props.cycleInterval);
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
  <section
    class="w-full max-w-4xl mx-auto flex flex-col items-center justify-center px-6 h-[73vh] gap-6"
  >
    <h1
      class="text-center text-slate-900 text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight"
    >
      {{ headlineBefore }}
      <span
        class="platform-cycle inline-flex items-baseline gap-2"
        :class="{ 'is-transitioning': isTransitioning }"
      >
        <img
          v-if="currentPlatform?.logo"
          :src="currentPlatform.logo"
          :alt="currentPlatform.alt || ''"
          class="inline-block h-[0.85em] w-auto align-baseline translate-y-[0.05em] rounded-lg"
        />
        <span class="font-serif">{{ currentPlatform?.name }}</span>
      </span>
      <template v-if="headlineAfter">{{ headlineAfter }}</template>
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
  </section>
</template>

<style scoped>
.platform-cycle {
  transition:
    filter 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
  filter: blur(0px);
  opacity: 1;
}

.platform-cycle.is-transitioning {
  filter: blur(8px);
  opacity: 0.4;
}
</style>
