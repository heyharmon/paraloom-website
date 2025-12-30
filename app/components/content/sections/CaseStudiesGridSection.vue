<script setup>
import { ref, computed } from "vue";
import CaseStudyGridCard from "./CaseStudyGridCard.vue";

// Filter state
const activeStatus = ref("all");
const activeCategory = ref("all");

// Case studies data
const caseStudies = ref([
  {
    id: 1,
    company: "Northwest Preferred FCU",
    logo: "/homepage/logo-nwpreferred.png",
    change: "+100%",
    description: "AI visibility increased from 0% to 100%",
    category: "Credit Union",
    status: "win",
    link: "/case-studies/northwest-preferred",
  },
  {
    id: 2,
    company: "Lone Star Credit Union",
    logo: "/homepage/logo-lonestar.svg",
    change: "+100%",
    description: "AI visibility increased from 0% to 100%",
    category: "Credit Union",
    status: "win",
    link: "/case-studies/lone-star",
  },
  {
    id: 3,
    company: "HFS Federal Credit Union",
    logo: null,
    change: "+89%",
    description: "AI visibility increased from 0% to 89%",
    category: "Credit Union",
    status: "win",
    link: "/case-studies/hfs-federal",
  },
  {
    id: 4,
    company: "On Tap Credit Union",
    logo: "/homepage/logo-ontapcu.svg",
    change: "+67%",
    description: "AI visibility increased from 33% to 100%",
    category: "Credit Union",
    status: "win",
    link: "/case-studies/on-tap",
  },
  {
    id: 5,
    company: "Heritage Bank",
    logo: null,
    change: "+54%",
    description: "Visibility increased from 9% to 63%",
    category: "Banking",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 6,
    company: "Pacific Credit Union",
    logo: null,
    change: "+49%",
    description: "AI visibility from 22% to 71%",
    category: "Credit Union",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 7,
    company: "Mountain West Bank",
    logo: null,
    change: "+34%",
    description: "Visibility increased within 1 week",
    category: "Banking",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 8,
    company: "Coastal FCU",
    logo: null,
    change: "+58%",
    description: "Immediate visibility boost",
    category: "Credit Union",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 9,
    company: "Summit FCU",
    logo: null,
    change: "-3%",
    description: "Visibility unchanged after test period",
    category: "Credit Union",
    status: "no-change",
    link: "/case-studies",
  },
  {
    id: 10,
    company: "First Metro Bank",
    logo: null,
    change: "+74%",
    description: "Immediate visibility increase",
    category: "Banking",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 11,
    company: "Valley Credit Union",
    logo: null,
    change: "+62%",
    description: "Visibility increased within days",
    category: "Credit Union",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 12,
    company: "Metro FCU",
    logo: null,
    change: "-2%",
    description: "Visibility unchanged after optimization",
    category: "Credit Union",
    status: "no-change",
    link: "/case-studies",
  },
]);

// Filter options
const statusFilters = [
  { value: "all", label: "All" },
  { value: "win", label: "Wins" },
  { value: "no-change", label: "No Change" },
  { value: "loss", label: "Losses" },
];

const categoryFilters = [
  { value: "all", label: "All" },
  { value: "Credit Union", label: "Credit Unions" },
  { value: "Banking", label: "Banks" },
];

// Filtered case studies
const filteredCaseStudies = computed(() => {
  return caseStudies.value.filter((study) => {
    const matchesStatus =
      activeStatus.value === "all" || study.status === activeStatus.value;
    const matchesCategory =
      activeCategory.value === "all" || study.category === activeCategory.value;
    return matchesStatus && matchesCategory;
  });
});

// Results count text
const resultsText = computed(() => {
  const filtered = filteredCaseStudies.value.length;
  const total = caseStudies.value.length;
  if (filtered === total) {
    return `Showing all ${total} case studies`;
  }
  return `Showing ${filtered} of ${total} case studies`;
});
</script>

<template>
  <section class="bg-white px-6 py-16 md:py-24">
    <div class="mx-auto max-w-screen-2xl">
      <!-- Filters -->
      <div
        class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <!-- Status Filters -->
        <div class="flex flex-wrap gap-3">
          <span class="mr-2 self-center text-sm font-medium text-slate-500"
            >Status:</span
          >
          <div class="flex rounded-full bg-slate-100 p-1">
            <button
              v-for="filter in statusFilters"
              :key="filter.value"
              :class="[
                'rounded-full px-4 py-2 text-sm font-medium transition-all',
                activeStatus === filter.value
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900',
              ]"
              @click="activeStatus = filter.value"
            >
              {{ filter.label }}
            </button>
          </div>
        </div>

        <!-- Category Filters -->
        <div class="flex flex-wrap gap-3">
          <span class="mr-2 self-center text-sm font-medium text-slate-500"
            >Category:</span
          >
          <div class="flex rounded-full bg-slate-100 p-1">
            <button
              v-for="filter in categoryFilters"
              :key="filter.value"
              :class="[
                'rounded-full px-4 py-2 text-sm font-medium transition-all',
                activeCategory === filter.value
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900',
              ]"
              @click="activeCategory = filter.value"
            >
              {{ filter.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Results Count -->
      <p class="mb-6 text-sm text-muted">{{ resultsText }}</p>

      <!-- Case Studies Grid -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CaseStudyGridCard
          v-for="study in filteredCaseStudies"
          :key="study.id"
          :company="study.company"
          :logo="study.logo"
          :change="study.change"
          :description="study.description"
          :category="study.category"
          :status="study.status"
          :link="study.link"
        />
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredCaseStudies.length === 0"
        class="flex flex-col items-center justify-center py-16 text-center"
      >
        <p class="text-lg font-medium text-slate-900">No case studies found</p>
        <p class="mt-2 text-sm text-muted">
          Try adjusting your filters to see more results.
        </p>
        <button
          class="mt-4 rounded-full bg-slate-100 px-5 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200"
          @click="
            activeStatus = 'all';
            activeCategory = 'all';
          "
        >
          Clear filters
        </button>
      </div>
    </div>
  </section>
</template>

