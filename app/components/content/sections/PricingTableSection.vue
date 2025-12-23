<script setup>
import { ref } from "vue";

const billingPeriod = ref("monthly");

const setBillingPeriod = (period) => {
  billingPeriod.value = period;
};

const pricingPlans = [
  {
    id: "optimize-monthly",
    title: "Optimize Monthly",
    subtitle: "Regular optimization",
    monthlyPrice: "$99",
    monthlyPriceDescription: "/mo",
    yearlyPrice: "$990",
    yearlyPriceDescription: "/year",
    yearlySavings: "Save $198 (2 months free)",
    primaryCta: "Get Started",
    primaryCtaLink: "#",
    highlighted: false,
    features: [
      { label: "2 articles / month", bold: true },
      { label: "2 recommendations / month", bold: true },
      { label: "Prompts: Unlimited", bold: true },
      { label: "Prompt runs: 500 / month", bold: true },
    ],
    secondaryFeatures: [
      { label: "Prompt groups", value: "Unlimited" },
      { label: "Users", value: "Unlimited" },
      { label: "Export prompt responses", value: "Yes" },
      { label: "Competitor tracking", value: "500" },
    ],
    icon: "monthly",
  },
  {
    id: "optimize-weekly",
    title: "Optimize Weekly",
    subtitle: "Weekly optimization",
    monthlyPrice: "$299",
    monthlyPriceDescription: "/mo",
    yearlyPrice: "$2,990",
    yearlyPriceDescription: "/year",
    yearlySavings: "Save $598 (2 months free)",
    primaryCta: "Get Started",
    primaryCtaLink: "#",
    highlighted: true,
    features: [
      { label: "6 articles / month", bold: true },
      { label: "6 recommendations / month", bold: true },
      { label: "Prompts: Unlimited", bold: true },
      { label: "Prompt runs: 1500 / month", bold: true },
    ],
    secondaryFeatures: [
      { label: "Prompt groups", value: "Unlimited" },
      { label: "Users", value: "Unlimited" },
      { label: "Export prompt responses", value: "Yes" },
      { label: "Competitor tracking", value: "500" },
    ],
    icon: "weekly",
  },
  {
    id: "optimize-daily",
    title: "Optimize Daily",
    subtitle: "Maximum optimization",
    monthlyPrice: "$999",
    monthlyPriceDescription: "/mo",
    yearlyPrice: "$9,990",
    yearlyPriceDescription: "/year",
    yearlySavings: "Save $1,998 (2 months free)",
    primaryCta: "Get Started",
    primaryCtaLink: "#",
    highlighted: false,
    features: [
      { label: "30 articles / month", bold: true },
      { label: "30 recommendations / month", bold: true },
      { label: "Prompts: Unlimited", bold: true },
      { label: "Prompt runs: 5000 / month", bold: true },
    ],
    secondaryFeatures: [
      { label: "Prompt groups", value: "Unlimited" },
      { label: "Users", value: "Unlimited" },
      { label: "Export prompt responses", value: "Yes" },
      { label: "Competitor tracking", value: "500" },
    ],
    icon: "daily",
  },
];
</script>

<template>
  <section class="w-full bg-white px-4 md:px-8 py-20 lg:pb-[120px]">
    <div class="w-full max-w-screen-2xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col items-center gap-6 mb-[80px] md:mb-[120px]">
        <!-- Title -->
        <h2 class="text-center">
          <span
            class="block text-3xl md:text-4xl lg:text-5xl font-medium text-slate-900 tracking-tight"
            >Get started for free</span
          >
          <span
            class="block text-3xl md:text-4xl lg:text-5xl font-medium text-slate-400 tracking-tight"
            >and see the possibilities</span
          >
        </h2>

        <!-- Toggle + Savings -->
        <div class="flex flex-col items-center gap-3">
          <!-- Toggle -->
          <div class="flex bg-slate-100/10 rounded-full p-1">
            <button
              :class="[
                'px-5 py-2.5 rounded-full text-sm font-medium transition-all',
                billingPeriod === 'yearly'
                  ? 'bg-white shadow-sm text-slate-900'
                  : 'text-slate-600 hover:text-slate-900',
              ]"
              @click="setBillingPeriod('yearly')"
            >
              Pay yearly
            </button>
            <button
              :class="[
                'px-5 py-2.5 rounded-full text-sm font-medium transition-all',
                billingPeriod === 'monthly'
                  ? 'bg-white shadow-sm text-slate-900'
                  : 'text-slate-600 hover:text-slate-900',
              ]"
              @click="setBillingPeriod('monthly')"
            >
              Pay monthly
            </button>
          </div>

          <!-- Savings Text -->
          <p class="text-sm font-medium">
            <span class="text-violet-600 font-semibold">2 months free</span>
            <span class="text-slate-900"> when you go yearly</span>
          </p>
        </div>
      </div>

      <!-- Pricing Cards Container -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <!-- Pricing Card -->
        <div
          v-for="plan in pricingPlans"
          :key="plan.id"
          class="bg-slate-50 rounded-[40px] p-8 md:p-10 flex flex-col relative"
        >
          <!-- Most Popular Badge -->
          <div
            v-if="plan.highlighted"
            class="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-medium px-4 py-1.5 rounded-full"
          >
            Most Popular
          </div>

          <!-- Icon -->
          <div class="w-[56px] h-[56px] mb-6">
            <!-- Monthly Icon - Single Circle -->
            <svg
              v-if="plan.icon === 'monthly'"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="28" cy="28" r="16" fill="rgba(148, 163, 184, 0.3)" />
            </svg>
            <!-- Weekly Icon - 4 circles in a row -->
            <svg
              v-else-if="plan.icon === 'weekly'"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="7" cy="28" r="5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="21" cy="28" r="5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="35" cy="28" r="5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="49" cy="28" r="5" fill="rgba(148, 163, 184, 0.3)" />
            </svg>
            <!-- Daily Icon - 4 rows of 7 circles -->
            <svg
              v-else-if="plan.icon === 'daily'"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- Row 1 -->
              <circle cx="4" cy="11" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="12" cy="11" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="20" cy="11" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="28" cy="11" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="36" cy="11" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="44" cy="11" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="52" cy="11" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <!-- Row 2 -->
              <circle cx="4" cy="22" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="12" cy="22" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="20" cy="22" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="28" cy="22" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="36" cy="22" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="44" cy="22" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="52" cy="22" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <!-- Row 3 -->
              <circle cx="4" cy="33" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="12" cy="33" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="20" cy="33" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="28" cy="33" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="36" cy="33" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="44" cy="33" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="52" cy="33" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <!-- Row 4 -->
              <circle cx="4" cy="44" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="12" cy="44" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="20" cy="44" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="28" cy="44" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="36" cy="44" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="44" cy="44" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
              <circle cx="52" cy="44" r="2.5" fill="rgba(148, 163, 184, 0.3)" />
            </svg>
          </div>

          <!-- Title & Subtitle -->
          <div class="mb-2">
            <h3 class="text-xl font-medium text-slate-900">
              {{ plan.title }}
            </h3>
            <p class="text-sm text-slate-600">
              {{ plan.subtitle }}
            </p>
          </div>

          <!-- Price -->
          <div class="mb-2">
            <span class="text-4xl font-medium text-slate-900">{{
              billingPeriod === "yearly" ? plan.yearlyPrice : plan.monthlyPrice
            }}</span>
            <span class="text-base text-slate-600">{{
              billingPeriod === "yearly"
                ? plan.yearlyPriceDescription
                : plan.monthlyPriceDescription
            }}</span>
          </div>

          <!-- Savings Badge (yearly only) -->
          <div
            v-if="billingPeriod === 'yearly'"
            class="inline-flex items-center bg-green-50 text-green-800 text-xs font-medium px-3 py-1 rounded-full mb-6 w-fit"
          >
            {{ plan.yearlySavings }}
          </div>
          <div v-else class="mb-6"></div>

          <!-- Primary Features List -->
          <ul class="flex flex-col gap-3 mb-6">
            <li
              v-for="(feature, index) in plan.features"
              :key="index"
              class="text-base text-slate-900 font-medium"
            >
              {{ feature.label }}
            </li>
          </ul>

          <!-- Divider -->
          <div class="border-b border-slate-200 w-full mb-6"></div>

          <!-- Secondary Features List -->
          <ul class="flex flex-col gap-2.5 mb-8">
            <li
              v-for="(feature, index) in plan.secondaryFeatures"
              :key="index"
              class="flex items-center justify-between text-xs"
            >
              <span class="text-slate-600">{{ feature.label }}:</span>
              <span class="text-slate-900">{{ feature.value }}</span>
            </li>
          </ul>

          <!-- CTA -->
          <div class="mt-auto">
            <a
              :href="plan.primaryCtaLink"
              class="inline-flex items-center justify-center text-white text-sm font-medium px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-700 transition-colors"
            >
              {{ plan.primaryCta }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Underline dashed style for secondary links */
.dashed-underline {
  text-decoration: underline;
  text-decoration-style: dashed;
  text-underline-offset: 4px;
}
</style>
