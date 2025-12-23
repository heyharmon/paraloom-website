<template>
  <section class="bg-white py-[160px] px-8">
    <div
      class="w-full max-w-screen-2xl mx-auto flex flex-row justify-between items-start gap-[120px]"
    >
      <!-- Left Column - Scrolling Content -->
      <div class="w-[380px] flex-shrink-0">
        <div
          v-for="(feature, index) in features"
          :key="index"
          :ref="(el) => setFeatureRef(el, index)"
          :data-index="index"
          class="min-h-[70vh] flex flex-col justify-center transition-opacity duration-300 ease-out"
        >
          <h3
            class="text-[20px] font-medium leading-[28px] text-[#111827] mb-3"
          >
            {{ feature.title }}
          </h3>
          <p class="text-[16px] font-normal leading-[26px] text-[#9CA3AF] mb-8">
            {{ feature.description }}
          </p>
          <div class="w-[240px] h-px bg-[#E5E7EB] mb-6"></div>
          <ul class="space-y-3">
            <li
              v-for="(bullet, bulletIndex) in feature.bullets"
              :key="bulletIndex"
              class="flex items-center gap-2 text-[14px] leading-[22px] text-[#6B7280]"
            >
              <span
                class="w-1.5 h-1.5 rounded-full bg-[#6B7280] flex-shrink-0"
              ></span>
              {{ bullet }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Right Column - Sticky Card -->
      <div class="flex-1 sticky top-[15vh]">
        <div
          class="relative bg-slate-100 rounded-[32px] aspect-[4/3] min-h-[520px]"
        >
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="absolute inset-[40px] flex items-center justify-center feature-image"
            :class="
              activeIndex === index
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            "
          >
            <img
              :src="feature.image"
              :alt="feature.imageAlt"
              class="max-w-full max-h-full rounded-2xl object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feature-image {
  transition:
    opacity 350ms ease-out,
    transform 350ms ease-out;
}
</style>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const activeIndex = ref(0);
const featureContents = ref([]);

const features = [
  {
    title: "Full rights to your outputs",
    description:
      "Styles trained on your content are private by default, and the outputs are fully licensed for commercial use",
    bullets: ["Full ownership", "Commercial usage", "Private by default"],
    image:
      "https://framerusercontent.com/images/S2CUgOlvxWAp867GryO21X5MAc.png?width=1000",
    imageAlt: "Full rights illustration",
  },
  {
    title: "Share styles across your team",
    description:
      "Collaborate seamlessly by sharing custom styles with your entire team, ensuring brand consistency across all projects",
    bullets: ["Team workspaces", "Shared style libraries"],
    image:
      "https://framerusercontent.com/images/S2CUgOlvxWAp867GryO21X5MAc.png?width=1000",
    imageAlt: "Team sharing illustration",
  },
  {
    title: "Simple, targeted editing",
    description:
      "Select and regenerate any area with a prompt, while maintaining composition and style",
    bullets: ["Inpainting tools", "Consistency outputs"],
    image:
      "https://framerusercontent.com/images/S2CUgOlvxWAp867GryO21X5MAc.png?width=1000",
    imageAlt: "Editing illustration",
  },
  {
    title: "High-res image downloads",
    description:
      "Get production-ready ultra-high-resolution images ready for print, web, or large-scale visuals",
    bullets: ["Up to 8K resolution", "Raster and vector exports"],
    image:
      "https://framerusercontent.com/images/S2CUgOlvxWAp867GryO21X5MAc.png?width=1000",
    imageAlt: "Export illustration",
  },
  {
    title: "Animation",
    description:
      "Bring static layers to life with one-click keyframes and granular timeline control – making animation simple without losing the creative vision.",
    bullets: ["Veo 3 · Seedance 1.0 · Kling 2.5", "Up to 1024p resolution"],
    image:
      "https://framerusercontent.com/images/S2CUgOlvxWAp867GryO21X5MAc.png?width=1000",
    imageAlt: "Animation illustration",
  },
];

let observer = null;

onMounted(() => {
  const observerOptions = {
    root: null,
    rootMargin: "-50% 0px -50% 0px",
    threshold: 0,
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.dataset.index, 10);
        activeIndex.value = index;
      }
    });
  }, observerOptions);

  featureContents.value.forEach((section) => {
    if (section) {
      observer.observe(section);
    }
  });
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

const setFeatureRef = (el, index) => {
  if (el) {
    featureContents.value[index] = el;
  }
};
</script>
