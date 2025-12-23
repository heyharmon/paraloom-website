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
            class="block text-4xl md:text-5xl font-medium text-gray-900 tracking-tight"
            >Get started for free</span
          >
          <span
            class="block text-4xl md:text-5xl font-medium text-[rgba(64,64,64,0.28)] tracking-tight"
            >and see the possibilities</span
          >
        </h2>

        <!-- Toggle + Savings -->
        <div class="flex flex-col items-center gap-3">
          <!-- Toggle -->
          <div class="flex bg-[rgba(124,124,124,0.08)] rounded-full p-[4px]">
            <button
              :class="[
                'px-5 py-[10px] rounded-full text-[14px] font-medium transition-all',
                billingPeriod === 'yearly'
                  ? 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] text-[#1e1e1e]'
                  : 'text-[rgba(64,64,64,0.6)] hover:text-[#1e1e1e]',
              ]"
              @click="setBillingPeriod('yearly')"
            >
              Pay yearly
            </button>
            <button
              :class="[
                'px-5 py-[10px] rounded-full text-[14px] font-medium transition-all',
                billingPeriod === 'monthly'
                  ? 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] text-[#1e1e1e]'
                  : 'text-[rgba(64,64,64,0.6)] hover:text-[#1e1e1e]',
              ]"
              @click="setBillingPeriod('monthly')"
            >
              Pay monthly
            </button>
          </div>

          <!-- Savings Text -->
          <p class="text-[14px] font-medium">
            <span class="text-[#fb411f] font-semibold">2 months free</span>
            <span class="text-[#1e1e1e]"> when you go yearly</span>
          </p>
        </div>
      </div>

      <!-- Pricing Cards Container -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <!-- Pricing Card -->
        <div
          v-for="plan in pricingPlans"
          :key="plan.id"
          class="bg-[#f7f7f7] rounded-[40px] p-8 md:p-10 flex flex-col relative"
        >
          <!-- Most Popular Badge -->
          <div
            v-if="plan.highlighted"
            class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#fb411f] text-white text-[12px] font-medium px-4 py-1.5 rounded-full"
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
              <circle cx="28" cy="28" r="16" fill="rgba(64, 64, 64, 0.2)" />
            </svg>
            <!-- Weekly Icon - 4 circles in a row -->
            <svg
              v-else-if="plan.icon === 'weekly'"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="28" r="6" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="24" cy="28" r="6" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="38" cy="28" r="6" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="52" cy="28" r="6" fill="rgba(64, 64, 64, 0.2)" />
            </svg>
            <!-- Daily Icon - 4 rows of 7 circles -->
            <svg
              v-else-if="plan.icon === 'daily'"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- Row 1 -->
              <circle cx="7" cy="14" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="15" cy="14" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="23" cy="14" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="31" cy="14" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="39" cy="14" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="47" cy="14" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="55" cy="14" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <!-- Row 2 -->
              <circle cx="7" cy="24" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="15" cy="24" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="23" cy="24" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="31" cy="24" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="39" cy="24" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="47" cy="24" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="55" cy="24" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <!-- Row 3 -->
              <circle cx="7" cy="34" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="15" cy="34" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="23" cy="34" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="31" cy="34" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="39" cy="34" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="47" cy="34" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="55" cy="34" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <!-- Row 4 -->
              <circle cx="7" cy="44" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="15" cy="44" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="23" cy="44" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="31" cy="44" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="39" cy="44" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="47" cy="44" r="3" fill="rgba(64, 64, 64, 0.2)" />
              <circle cx="55" cy="44" r="3" fill="rgba(64, 64, 64, 0.2)" />
            </svg>
          </div>

          <!-- Title & Subtitle -->
          <div class="mb-2">
            <h3 class="text-xl font-medium text-gray-900">
              {{ plan.title }}
            </h3>
            <p class="text-[14px] text-[rgba(64,64,64,0.6)]">
              {{ plan.subtitle }}
            </p>
          </div>

          <!-- Price -->
          <div class="mb-2">
            <span class="text-4xl font-medium text-gray-900">{{
              billingPeriod === "yearly" ? plan.yearlyPrice : plan.monthlyPrice
            }}</span>
            <span class="text-[16px] text-[rgba(64,64,64,0.6)]">{{
              billingPeriod === "yearly"
                ? plan.yearlyPriceDescription
                : plan.monthlyPriceDescription
            }}</span>
          </div>

          <!-- Savings Badge (yearly only) -->
          <div
            v-if="billingPeriod === 'yearly'"
            class="inline-flex items-center bg-[#e8f5e9] text-[#2e7d32] text-[13px] font-medium px-3 py-1 rounded-full mb-6 w-fit"
          >
            {{ plan.yearlySavings }}
          </div>
          <div v-else class="mb-6"></div>

          <!-- Primary Features List -->
          <ul class="flex flex-col gap-[12px] mb-6">
            <li
              v-for="(feature, index) in plan.features"
              :key="index"
              class="text-[15px] text-[#1e1e1e] font-medium"
            >
              {{ feature.label }}
            </li>
          </ul>

          <!-- Divider -->
          <div class="dashed-divider w-full mb-6"></div>

          <!-- Secondary Features List -->
          <ul class="flex flex-col gap-[10px] mb-8">
            <li
              v-for="(feature, index) in plan.secondaryFeatures"
              :key="index"
              class="flex items-center justify-between text-[13px]"
            >
              <span class="text-[rgba(64,64,64,0.6)]"
                >{{ feature.label }}:</span
              >
              <span class="text-[#1e1e1e]">{{ feature.value }}</span>
            </li>
          </ul>

          <!-- CTA -->
          <div class="mt-auto">
            <a
              :href="plan.primaryCtaLink"
              class="inline-flex items-center justify-center text-white text-[14px] font-medium px-6 py-3 rounded-full bg-[#fb411f] hover:opacity-90 transition-opacity"
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
/* Dashed divider line */
.dashed-divider {
  background-image: linear-gradient(to right, #1e1e1e 50%, transparent 50%);
  background-size: 8px 1px;
  background-repeat: repeat-x;
  height: 1px;
}

/* Underline dashed style for secondary links */
.dashed-underline {
  text-decoration: underline;
  text-decoration-style: dashed;
  text-underline-offset: 4px;
}
</style>
