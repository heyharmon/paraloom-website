<script setup>
import { ref } from "vue";

const billingPeriod = ref("yearly");

const setBillingPeriod = (period) => {
  billingPeriod.value = period;
};

const pricingPlans = [
  {
    id: "e-studio",
    title: "e.studio",
    price: "$108",
    priceDescription: "/ month per seat,",
    priceSubtext: "plus 240 credits included",
    primaryCta: "Start for free",
    primaryCtaLink: "#",
    secondaryCta: "With limited access",
    secondaryCtaLink: "#",
    secondaryCtaStyle: "link",
    features: [
      "240 credits per month",
      "On-brand style sharing",
      "Access to all ai models",
      "Generative tools",
      "Fast priority support",
    ],
    footerNote: "*Custom, on-brand style not included",
    footerLink: null,
    icon: "studio",
  },
  {
    id: "on-brand-style",
    title: "On-brand style",
    price: "$275",
    priceDescription: "/ month per style,",
    priceSubtext: "for the full version",
    primaryCta: "Start for free",
    primaryCtaLink: "#",
    secondaryCta: "With a demo style",
    secondaryCtaLink: "#",
    secondaryCtaStyle: "link",
    features: [
      "No watermarks on images",
      "8K downloads and vectorization",
      "Commercial usage",
      "Secure & private training",
      "Your data protected",
    ],
    footerNote: "*Requires one active e.studio seat",
    footerLink: null,
    icon: "circle",
  },
  {
    id: "custom-solutions",
    title: "Custom solutions",
    price: null,
    priceDescription: "Custom package and",
    priceSubtext: "enterprise features",
    primaryCta: "Contact us",
    primaryCtaLink: "#",
    secondaryCta: "Let's discuss your plan",
    secondaryCtaLink: null,
    secondaryCtaStyle: "text",
    features: [
      "Custom credit allocation",
      "API access",
      "Custom built solutions",
      "SSO",
      "Premium customer support",
    ],
    footerNote: null,
    footerLink: {
      text: "Explore Enterprise solutions",
      href: "#",
    },
    icon: "grid",
  },
];
</script>

<template>
  <section
    class="w-full bg-white px-4 md:px-8 pt-[120px] md:pt-[240px] pb-[80px] md:pb-[120px]"
  >
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
            <span class="text-[#fb411f] font-semibold">Save 20%</span>
            <span class="text-[#1e1e1e]"> on a yearly subscription</span>
          </p>
        </div>
      </div>

      <!-- Pricing Cards Container -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <!-- Pricing Card -->
        <div
          v-for="plan in pricingPlans"
          :key="plan.id"
          class="bg-[#f7f7f7] rounded-[40px] p-8 md:p-10 flex flex-col"
        >
          <!-- Icon -->
          <div class="w-[56px] h-[56px] mb-6">
            <!-- Studio Icon -->
            <svg
              v-if="plan.icon === 'studio'"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 20C12 17.7909 13.7909 16 16 16H28C30.2091 16 32 17.7909 32 20V24C32 26.2091 30.2091 28 28 28H16C13.7909 28 12 26.2091 12 24V20Z"
                fill="rgba(64, 64, 64, 0.15)"
              />
              <path
                d="M20 32C20 29.7909 21.7909 28 24 28H36C38.2091 28 40 29.7909 40 32V36C40 38.2091 38.2091 40 36 40H24C21.7909 40 20 38.2091 20 36V32Z"
                fill="rgba(64, 64, 64, 0.25)"
              />
            </svg>
            <!-- Circle Icon -->
            <svg
              v-else-if="plan.icon === 'circle'"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="28" cy="28" r="16" fill="rgba(64, 64, 64, 0.2)" />
            </svg>
            <!-- Grid Icon -->
            <svg
              v-else-if="plan.icon === 'grid'"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 18C20 16.8954 20.8954 16 22 16H26C27.1046 16 28 16.8954 28 18V22C28 23.1046 27.1046 24 26 24H22C20.8954 24 20 23.1046 20 22V18Z"
                fill="rgba(64, 64, 64, 0.25)"
              />
              <path
                d="M30 18C30 16.8954 30.8954 16 32 16H36C37.1046 16 38 16.8954 38 18V22C38 23.1046 37.1046 24 36 24H32C30.8954 24 30 23.1046 30 22V18Z"
                fill="rgba(64, 64, 64, 0.15)"
              />
              <path
                d="M20 28C20 26.8954 20.8954 26 22 26H26C27.1046 26 28 26.8954 28 28V32C28 33.1046 27.1046 34 26 34H22C20.8954 34 20 33.1046 20 32V28Z"
                fill="rgba(64, 64, 64, 0.15)"
              />
              <path
                d="M30 28C30 26.8954 30.8954 26 32 26H36C37.1046 26 38 26.8954 38 28V32C38 33.1046 37.1046 34 36 34H32C30.8954 34 30 33.1046 30 32V28Z"
                fill="rgba(64, 64, 64, 0.25)"
              />
            </svg>
          </div>

          <!-- Title & Price -->
          <div class="mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              {{ plan.title }}
            </h3>
            <p class="text-[16px] text-[rgba(64,64,64,0.6)] leading-relaxed">
              <span v-if="plan.price">{{ plan.price }}</span>
              {{ plan.priceDescription }}<br />
              {{ plan.priceSubtext }}
            </p>
          </div>

          <!-- CTAs -->
          <div class="flex items-center gap-4 mb-8">
            <a
              :href="plan.primaryCtaLink"
              :class="[
                'inline-flex items-center justify-center text-white text-[14px] font-medium px-6 py-3 rounded-full hover:opacity-90 transition-opacity',
                plan.id === 'custom-solutions'
                  ? 'bg-[#1e1e1e]'
                  : 'bg-[#fb411f]',
              ]"
            >
              {{ plan.primaryCta }}
            </a>
            <a
              v-if="plan.secondaryCtaLink && plan.secondaryCtaStyle === 'link'"
              :href="plan.secondaryCtaLink"
              class="text-[14px] text-[#1e1e1e] dashed-underline"
            >
              {{ plan.secondaryCta }}
            </a>
            <span
              v-else-if="plan.secondaryCtaStyle === 'text'"
              class="text-[14px] text-[#1e1e1e]"
            >
              {{ plan.secondaryCta }}
            </span>
          </div>

          <!-- Divider -->
          <div class="dashed-divider w-full mb-8"></div>

          <!-- Features List -->
          <ul class="flex flex-col gap-[14px] mb-auto">
            <li
              v-for="(feature, index) in plan.features"
              :key="index"
              class="flex items-center gap-3"
            >
              <span
                class="w-[5px] h-[5px] rounded-full bg-[#1e1e1e] flex-shrink-0"
              ></span>
              <span class="text-[14px] text-[#1e1e1e]">{{ feature }}</span>
            </li>
          </ul>

          <!-- Footer Note -->
          <p
            v-if="plan.footerNote"
            class="text-[14px] text-[rgba(64,64,64,0.6)] mt-10"
          >
            {{ plan.footerNote }}
          </p>

          <!-- Footer Link -->
          <a
            v-if="plan.footerLink"
            :href="plan.footerLink.href"
            class="flex items-center gap-2 text-[14px] text-[rgba(64,64,64,0.6)] mt-10 hover:text-[#1e1e1e] transition-colors"
          >
            {{ plan.footerLink.text }}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 4L10 8L6 12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
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
