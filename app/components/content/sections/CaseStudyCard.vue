<template>
  <article
    class="group relative bg-slate-50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50"
  >
    <!-- Card Header -->
    <div class="flex items-center justify-between px-6 pt-6 pb-4">
      <!-- Company Logo -->
      <div class="h-8">
        <img
          :src="study.logo"
          :alt="study.client + ' logo'"
          class="h-full w-auto object-contain"
        />
      </div>

      <!-- Read More Link -->
      <NuxtLink
        :to="study.link"
        class="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-500 uppercase hover:text-slate-900 transition-colors"
      >
        <span>Read More</span>
        <svg
          class="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
      </NuxtLink>
    </div>

    <!-- Featured Image -->
    <div class="relative aspect-[4/3] mx-4 rounded-2xl overflow-hidden">
      <img
        :src="study.image"
        :alt="study.imageAlt"
        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
      ></div>
    </div>

    <!-- Card Content -->
    <div class="px-6 pt-5 pb-6">
      <!-- Title -->
      <h3
        class="text-lg font-medium leading-snug text-slate-900 mb-6 line-clamp-2"
      >
        {{ study.title }}
      </h3>

      <!-- Metric Highlight -->
      <div class="flex items-center gap-4">
        <div
          class="inline-flex items-center justify-center px-4 py-2 rounded-full text-lg font-bold"
          :class="metricBadgeClass"
        >
          {{ formattedMetric }}
        </div>
        <p class="text-xs font-medium uppercase tracking-wide text-slate-500">
          {{ study.resultLabel }}
        </p>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  study: {
    type: Object,
    required: true,
  },
  accentColor: {
    type: String,
    default: "violet",
    validator: (value) =>
      ["violet", "emerald", "amber", "rose", "sky", "orange"].includes(value),
  },
});

const formattedMetric = computed(() => {
  const { resultBefore, resultValue, resultUnit } = props.study;
  // If there's a before value and it differs, show the improvement
  if (resultBefore !== undefined && resultBefore !== resultValue) {
    const improvement = parseFloat(resultValue) - parseFloat(resultBefore);
    if (improvement > 0) {
      return `${improvement}${resultUnit}`;
    }
  }
  return `${props.study.resultValue}${props.study.resultUnit}`;
});

const metricBadgeClass = computed(() => {
  const colorMap = {
    violet: "bg-violet-100 text-violet-700",
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    rose: "bg-rose-100 text-rose-700",
    sky: "bg-sky-100 text-sky-700",
    orange: "bg-orange-100 text-orange-700",
  };
  return colorMap[props.accentColor] || colorMap.violet;
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

