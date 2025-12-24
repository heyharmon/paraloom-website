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
  // Logo carousel props
  logoCarouselHeadline: {
    type: String,
    default: "Trusted by 100+ FI's, globally",
  },
  logos: {
    type: Array,
    default: () => [
      { name: "Acadia FCU" },
      { name: "Advance Financial FCU" },
      { name: "Affinity Credit Union" },
      { name: "Allied FCU" },
      { name: "Alltru Credit Union" },
      { name: "Alta Vista CU" },
      { name: "Altamaha Bank" },
      { name: "AlumniFi" },
      { name: "America's First FCU" },
      { name: "Andover Bank" },
      { name: "Apple FCU" },
      { name: "BankBound" },
      { name: "Bank Social" },
      { name: "Baxter Credit Union" },
      { name: "BayCoast Bank" },
      { name: "Blackhawk Bank" },
      { name: "Blue Grass Federal" },
      { name: "Brightstar Credit Union" },
      { name: "Centier Bank" },
      { name: "Central One" },
      { name: "Central State CU" },
      { name: "Centricity CU" },
      { name: "Centris FCU" },
      { name: "CFFCU" },
      { name: "ChoiceOne Bank" },
      { name: "Clearwater Credit Union" },
      { name: "Collegiate CU" },
      { name: "Colorado CU" },
    ],
  },
  logoCarouselDuration: {
    type: Number,
    default: 120,
  },
});

// Current platform index
const currentIndex = ref(0);
const isTransitioning = ref(false);

// Current platform computed
const currentPlatform = computed(() => props.platforms[currentIndex.value]);

// Logo carousel
const trackRef = ref(null);
const singleSetWidth = ref(0);

const calculateWidth = () => {
  if (trackRef.value) {
    const items = trackRef.value.querySelectorAll("li");
    const halfCount = items.length / 2;
    let width = 0;
    for (let i = 0; i < halfCount; i++) {
      width += items[i].offsetWidth;
      if (i < halfCount) {
        width += 80; // gap-20 = 5rem = 80px
      }
    }
    singleSetWidth.value = width;
  }
};

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

  // Logo carousel width calculation
  calculateWidth();
  window.addEventListener("resize", calculateWidth);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  window.removeEventListener("resize", calculateWidth);
});
</script>

<template>
  <section class="relative w-full min-h-screen overflow-hidden flex flex-col">
    <!-- Mesh gradient background -->
    <div class="mesh-gradient-container">
      <div class="mesh-blob mesh-blob-1"></div>
      <div class="mesh-blob mesh-blob-2"></div>
      <div class="mesh-blob mesh-blob-3"></div>
      <div class="mesh-blob mesh-blob-4"></div>
    </div>

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

    <!-- Logo carousel at bottom -->
    <div class="relative z-10 w-full pb-8 lg:pb-12">
      <div class="flex justify-center mb-6">
        <p class="text-xs text-center font-sans text-slate-400">
          {{ logoCarouselHeadline }}
        </p>
      </div>

      <div class="overflow-hidden">
        <div class="logo-carousel-mask">
          <ul
            ref="trackRef"
            class="flex items-center gap-20 w-max list-none m-0 p-0 animate-marquee"
            :style="{
              animationDuration: `${logoCarouselDuration}s`,
              '--scroll-width': `${singleSetWidth}px`,
            }"
          >
            <li
              v-for="(logo, index) in logos"
              :key="`set1-${index}`"
              class="shrink-0 flex items-center justify-center text-slate-500"
            >
              <span>{{ logo.name }}</span>
            </li>

            <li
              v-for="(logo, index) in logos"
              :key="`set2-${index}`"
              class="shrink-0 flex items-center justify-center text-slate-500"
            >
              <span>{{ logo.name }}</span>
            </li>
          </ul>
        </div>
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

/* Logo carousel styles */
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(var(--scroll-width, 50%) * -1));
  }
}

.animate-marquee {
  animation: marquee linear infinite;
}

.logo-carousel-mask {
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 15%,
    black 85%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 15%,
    black 85%,
    transparent 100%
  );
}
</style>
