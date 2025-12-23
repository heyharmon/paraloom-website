<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import CardsAnimation from "~/components/CardsAnimation.vue";

const sectionRef = ref(null);
const featureContents = ref([]);
const scrollProgress = ref(0);

const features = [
  {
    title: "Full rights to your outputs",
    description:
      "Styles trained on your content are private by default, and the outputs are fully licensed for commercial use",
    bullets: ["Full ownership", "Commercial usage", "Private by default"],
  },
  {
    title: "Share styles across your team",
    description:
      "Collaborate seamlessly by sharing custom styles with your entire team, ensuring brand consistency across all projects",
    bullets: ["Team workspaces", "Shared style libraries"],
  },
  {
    title: "Simple, targeted editing",
    description:
      "Select and regenerate any area with a prompt, while maintaining composition and style",
    bullets: ["Inpainting tools", "Consistency outputs"],
  },
  {
    title: "High-res image downloads",
    description:
      "Get production-ready ultra-high-resolution images ready for print, web, or large-scale visuals",
    bullets: ["Up to 8K resolution", "Raster and vector exports"],
  },
  {
    title: "Animation",
    description:
      "Bring static layers to life with one-click keyframes and granular timeline control – making animation simple without losing the creative vision.",
    bullets: ["Veo 3 · Seedance 1.0 · Kling 2.5", "Up to 1024p resolution"],
  },
];

const updateScrollProgress = () => {
  if (!sectionRef.value) return;

  const rect = sectionRef.value.getBoundingClientRect();
  const sectionHeight = rect.height;
  const viewportHeight = window.innerHeight;

  // Calculate progress: 0 when section top reaches viewport bottom, 1 when section bottom leaves viewport top
  const scrollableDistance = sectionHeight + viewportHeight;
  const scrolled = viewportHeight - rect.top;

  scrollProgress.value = Math.max(
    0,
    Math.min(1, scrolled / scrollableDistance)
  );
};

onMounted(() => {
  updateScrollProgress();
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  window.addEventListener("resize", updateScrollProgress);
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateScrollProgress);
  window.removeEventListener("resize", updateScrollProgress);
});
</script>

<template>
  <section ref="sectionRef" class="bg-white py-[160px] px-8">
    <div
      class="max-w-[1600px] mx-auto flex flex-row justify-between items-start gap-[120px]"
    >
      <!-- Left Column - Scrolling Content -->
      <div class="w-[380px] flex-shrink-0">
        <div
          v-for="(feature, index) in features"
          :key="index"
          :ref="
            (el) => {
              if (el) featureContents[index] = el;
            }
          "
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

      <!-- Right Column - Sticky Cards Animation -->
      <div class="flex-1 sticky top-[15vh]">
        <CardsAnimation
          :embedded="true"
          :progress="scrollProgress"
          container-class="bg-slate-100 rounded-[32px] aspect-[4/3] min-h-[520px]"
        />
      </div>
    </div>
  </section>
</template>
