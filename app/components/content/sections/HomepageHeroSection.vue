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
  <section class="relative w-full min-h-[60vh] overflow-hidden flex flex-col">
    <!-- Mesh gradient background -->
    <!-- <div class="mesh-gradient-container">
      <div class="mesh-blob mesh-blob-1"></div>
      <div class="mesh-blob mesh-blob-2"></div>
      <div class="mesh-blob mesh-blob-3"></div>
      <div class="mesh-blob mesh-blob-4"></div>
    </div> -->

    <!-- Main content container -->
    <div
      class="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center px-6 flex-1 gap-6 pt-20"
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

/* Mesh gradient background */
.mesh-gradient-container {
  position: absolute;
  inset: -50%;
  width: 200%;
  height: 200%;
  pointer-events: none;
  z-index: 0;
  filter: blur(80px);
  opacity: 0.4;
}

.mesh-blob {
  position: absolute;
  border-radius: 50%;
  mix-blend-mode: normal;
}

.mesh-blob-1 {
  width: 45%;
  height: 45%;
  top: 10%;
  left: 15%;
  background: radial-gradient(
    circle at center,
    rgba(147, 197, 253, 0.6) 0%,
    rgba(147, 197, 253, 0.2) 40%,
    transparent 70%
  );
}

.mesh-blob-2 {
  width: 50%;
  height: 50%;
  top: 25%;
  right: 10%;
  background: radial-gradient(
    circle at center,
    rgba(196, 181, 253, 0.5) 0%,
    rgba(196, 181, 253, 0.15) 40%,
    transparent 70%
  );
}

.mesh-blob-3 {
  width: 40%;
  height: 40%;
  bottom: 15%;
  left: 25%;
  background: radial-gradient(
    circle at center,
    rgba(253, 186, 116, 0.35) 0%,
    rgba(253, 186, 116, 0.1) 40%,
    transparent 70%
  );
}

.mesh-blob-4 {
  width: 35%;
  height: 35%;
  bottom: 20%;
  right: 20%;
  background: radial-gradient(
    circle at center,
    rgba(167, 243, 208, 0.4) 0%,
    rgba(167, 243, 208, 0.1) 40%,
    transparent 70%
  );
}
</style>
