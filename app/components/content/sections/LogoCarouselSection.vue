<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  headline: {
    type: String,
    default: "Trusted by hundreds of FI's, globally",
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
  animationDuration: {
    type: Number,
    default: 120,
  },
});

const trackRef = ref(null);
const singleSetWidth = ref(0);

const calculateWidth = () => {
  if (trackRef.value) {
    // Get all list items
    const items = trackRef.value.querySelectorAll("li");
    const halfCount = items.length / 2;
    let width = 0;

    // Calculate width of first set including gaps
    for (let i = 0; i < halfCount; i++) {
      width += items[i].offsetWidth;
      if (i < halfCount) {
        // Add gap (gap-20 = 5rem = 80px)
        width += 80;
      }
    }
    singleSetWidth.value = width;
  }
};

onMounted(() => {
  calculateWidth();
  window.addEventListener("resize", calculateWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", calculateWidth);
});
</script>

<template>
  <section class="w-full max-w-screen-2xl mx-auto px-2 pb-20 lg:pb-32 bg-white">
    <div class="flex justify-center mb-10 pt-10">
      <p class="text-xs text-center font-sans text-neutral-400">
        {{ headline }}
      </p>
    </div>

    <div class="overflow-hidden">
      <div class="logo-carousel-mask">
        <ul
          ref="trackRef"
          class="flex items-center gap-20 w-max list-none m-0 p-0 animate-marquee"
          :style="{
            animationDuration: `${animationDuration}s`,
            '--scroll-width': `${singleSetWidth}px`,
          }"
        >
          <li
            v-for="(logo, index) in logos"
            :key="`set1-${index}`"
            class="shrink-0 flex items-center justify-center text-gray-500"
          >
            <span>{{ logo.name }}</span>
          </li>

          <li
            v-for="(logo, index) in logos"
            :key="`set2-${index}`"
            class="shrink-0 flex items-center justify-center text-gray-500"
          >
            <span>{{ logo.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
    black 25%,
    black 75%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 25%,
    black 75%,
    transparent 100%
  );
}
</style>
