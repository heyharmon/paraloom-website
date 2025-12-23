<script setup>
import { defineAsyncComponent } from "vue";

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
});

// Check if we're in development mode (for template use)
const isDev = import.meta.dev;

// Lazy load section components to reduce initial bundle size
const componentMap = {
  hero: defineAsyncComponent(() => import("./sections/HeroSection.vue")),
  homepageHero: defineAsyncComponent(
    () => import("./sections/HomepageHeroSection.vue")
  ),
  homepageCaseStudies: defineAsyncComponent(
    () => import("./sections/HomepageCaseStudiesSection.vue")
  ),
  features: defineAsyncComponent(
    () => import("./sections/FeaturesSection.vue")
  ),
  featureSticky: defineAsyncComponent(
    () => import("./sections/FeatureStickySection.vue")
  ),
  logoCarousel: defineAsyncComponent(
    () => import("./sections/logoCarouselSection.vue")
  ),
  pricingTable: defineAsyncComponent(
    () => import("./sections/PricingTableSection.vue")
  ),
};

// Get list of available section types for error messages
const availableTypes = Object.keys(componentMap).join(", ");

const sectionComponent = computed(() => componentMap[props.section.type]);

// Development warning for unknown section types
if (isDev && !componentMap[props.section.type]) {
  console.warn(
    `[SectionRenderer] Unknown section type: "${props.section.type}"`,
    `\nAvailable types: ${availableTypes}`,
    `\nSection data:`,
    props.section
  );
}
</script>

<template>
  <component v-if="sectionComponent" :is="sectionComponent" v-bind="section" />
  <div
    v-else-if="isDev"
    class="py-8 px-6 text-center bg-amber-50 border border-amber-200 rounded-lg mx-6 my-4"
  >
    <p class="text-amber-800 font-medium">
      Unknown section type: "{{ section.type }}"
    </p>
    <p class="text-amber-600 text-sm mt-1">
      Available types: {{ availableTypes }}
    </p>
  </div>
  <!-- In production, silently skip unknown sections -->
</template>
