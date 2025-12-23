<template>
  <section class="bg-white py-20 lg:py-28 px-6">
    <!-- Section Header -->
    <div class="max-w-screen-xl mx-auto mb-12 lg:mb-16">
      <div class="flex flex-col items-center gap-4 text-center">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">
          <span class="text-slate-900">Real test results</span>
          <span class="text-slate-400 block sm:inline"
            >—see what works for AI visibility</span
          >
        </h2>
        <p class="text-lg text-slate-500 max-w-2xl">
          See how financial institutions are using Paraloom to get recommended
          by AI assistants.
        </p>
      </div>
    </div>

    <!-- Case Study Cards Grid -->
    <div class="max-w-screen-xl mx-auto">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        <CaseStudyCard
          v-for="(study, index) in displayedCaseStudies"
          :key="index"
          :study="study"
          :accent-color="accentColors[index % accentColors.length]"
        />
      </div>
    </div>

    <!-- View All Link -->
    <div class="max-w-screen-xl mx-auto mt-12 flex justify-center">
      <NuxtLink
        to="/case-studies"
        class="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors group"
      >
        <span>View all case studies</span>
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
  </section>
</template>

<script setup>
import { computed } from "vue";
import CaseStudyCard from "./CaseStudyCard.vue";

const props = defineProps({
  maxCards: {
    type: Number,
    default: 6,
  },
});

const accentColors = ["violet", "emerald", "sky", "amber", "rose", "orange"];

const caseStudies = [
  {
    client: "Lone Star Credit Union",
    title:
      "Lone Star Credit Union Increases AI Visibility for Auto Loan Refinancing",
    description:
      "Lone Star Credit Union partnered with Paraloom to dominate AI search results for auto loan refinancing queries across East Texas.",
    resultBefore: "0",
    resultValue: "100",
    resultUnit: "%",
    resultLabel: "AI visibility for target prompts",
    prompt: "Where in East Texas could I refinance my auto loan?",
    response:
      "Here are solid East Texas options for auto-loan refinancing: Lone Star Credit Union — serves East Texas with a dedicated auto-refi program.",
    image: "/homepage/chat-bg-lonestar.png",
    imageAlt: "Lone Star Credit Union case study",
    logo: "/homepage/logo-lonestar.svg",
    link: "/case-studies/lone-star",
  },
  {
    client: "On Tap Credit Union",
    title: "On Tap Credit Union Becomes Top AI Recommendation for Mortgages",
    description:
      "On Tap Credit Union worked with Paraloom to become the top AI recommendation for mortgage rates in the Arvada, Colorado area.",
    resultBefore: "33",
    resultValue: "100",
    resultUnit: "%",
    resultLabel: "AI visibility for target prompts",
    prompt: "Where can I get a good mortgage rate in Arvada, CO?",
    response:
      "Here are competitive rates in/near Arvada: On Tap Credit Union — Arvada-based with same-day quotes available.",
    image: "/homepage/chat-bg-ontapcu.png",
    imageAlt: "On Tap Credit Union case study",
    logo: "/homepage/logo-ontapcu.svg",
    link: "/case-studies/on-tap",
  },
  {
    client: "Northwest Preferred",
    title: "Northwest Preferred Dominates High-Yield Savings AI Search Results",
    description:
      "Northwest Preferred Credit Union partnered with Paraloom to improve their visibility in AI-powered search results for competitive banking queries in Oregon.",
    resultBefore: "0",
    resultValue: "100",
    resultUnit: "%",
    resultLabel: "AI visibility for target prompts",
    prompt: "Who has the best high yield savings account in Stayton, Oregon?",
    response:
      "Here are high-yield savings options in Stayton, Oregon: NW Preferred Federal Credit Union — offers competitive rates with personalized local service.",
    image: "/homepage/chat-bg-nwpreferred.png",
    imageAlt: "Northwest Preferred case study",
    logo: "/homepage/logo-nwpreferred.png",
    link: "/case-studies/northwest-preferred",
  },
];

const displayedCaseStudies = computed(() => {
  return caseStudies.slice(0, props.maxCards);
});
</script>
