<script setup>
import { ref } from "vue";
import CaseStudyGridCard from "./CaseStudyGridCard.vue";

// Case study data for each column - minimal info: logo, name, visibility change, category
const column1CaseStudies = ref([
  {
    id: 1,
    company: "Lone Star CU",
    logo: "/homepage/logo-lonestar.svg",
    change: "+55%",
    description: "AI visibility increased from 12% to 67%",
    category: "Credit Union",
    status: "win",
    link: "/case-studies/lone-star",
  },
  {
    id: 2,
    company: "Heritage Bank",
    logo: null,
    change: "+54%",
    description: "Visibility increased from 9% to 63%",
    category: "Banking",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 3,
    company: "Pacific CU",
    logo: null,
    change: "+49%",
    description: "AI visibility from 22% to 71%",
    category: "Credit Union",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 4,
    company: "Mountain West",
    logo: null,
    change: "+34%",
    description: "Visibility increased within 1 week",
    category: "Banking",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 5,
    company: "Coastal FCU",
    logo: null,
    change: "+58%",
    description: "Immediate visibility boost",
    category: "Credit Union",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 6,
    company: "Summit FCU",
    logo: null,
    change: "-3%",
    description: "Visibility unchanged",
    category: "Credit Union",
    status: "no-change",
    link: "/case-studies",
  },
]);

const column2CaseStudies = ref([
  {
    id: 7,
    company: "NW Preferred",
    logo: "/homepage/logo-nwpreferred.png",
    change: "+46%",
    description: "AI visibility from 8% to 54%",
    category: "Credit Union",
    status: "win",
    link: "/case-studies/northwest-preferred",
  },
  {
    id: 8,
    company: "First Metro",
    logo: null,
    change: "+74%",
    description: "Immediate visibility increase",
    category: "Banking",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 9,
    company: "Valley Credit",
    logo: null,
    change: "+62%",
    description: "Visibility increased within days",
    category: "Credit Union",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 10,
    company: "Sunrise Bank",
    logo: null,
    change: "+41%",
    description: "From 18% to 59% visibility",
    category: "Banking",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 11,
    company: "Community First",
    logo: null,
    change: "+38%",
    description: "AI visibility doubled",
    category: "Credit Union",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 12,
    company: "Metro FCU",
    logo: null,
    change: "-2%",
    description: "Visibility unchanged",
    category: "Credit Union",
    status: "no-change",
    link: "/case-studies",
  },
]);

const column3CaseStudies = ref([
  {
    id: 13,
    company: "On Tap CU",
    logo: "/homepage/logo-ontapcu.svg",
    change: "+67%",
    description: "Top AI recommendation for mortgages",
    category: "Credit Union",
    status: "win",
    link: "/case-studies/on-tap",
  },
  {
    id: 14,
    company: "Centennial Bank",
    logo: null,
    change: "+52%",
    description: "Visibility increased in 5 days",
    category: "Banking",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 15,
    company: "Riverdale CU",
    logo: null,
    change: "+45%",
    description: "From 15% to 60% AI visibility",
    category: "Credit Union",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 16,
    company: "Pioneer Bank",
    logo: null,
    change: "+39%",
    description: "AI mentions tripled",
    category: "Banking",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 17,
    company: "Gateway FCU",
    logo: null,
    change: "+71%",
    description: "Now #1 in local AI recommendations",
    category: "Credit Union",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 18,
    company: "United Savings",
    logo: null,
    change: "+28%",
    description: "Steady visibility growth",
    category: "Banking",
    status: "win",
    link: "/case-studies",
  },
]);

const column4CaseStudies = ref([
  {
    id: 19,
    company: "Apex Credit Union",
    logo: null,
    change: "+63%",
    description: "AI visibility from 5% to 68%",
    category: "Credit Union",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 20,
    company: "Northern Trust",
    logo: null,
    change: "+47%",
    description: "Visibility increased in 3 days",
    category: "Banking",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 21,
    company: "Lakeside FCU",
    logo: null,
    change: "+56%",
    description: "Top 3 AI recommendation locally",
    category: "Credit Union",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 22,
    company: "Granite Bank",
    logo: null,
    change: "-1%",
    description: "Visibility unchanged",
    category: "Banking",
    status: "no-change",
    link: "/case-studies",
  },
  {
    id: 23,
    company: "Eastside CU",
    logo: null,
    change: "+44%",
    description: "AI visibility boost in 1 week",
    category: "Credit Union",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 24,
    company: "Fidelity Bank",
    logo: null,
    change: "+59%",
    description: "From 11% to 70% visibility",
    category: "Banking",
    status: "win",
    link: "/case-studies",
  },
]);

const column5CaseStudies = ref([
  {
    id: 25,
    company: "Beacon CU",
    logo: null,
    change: "+51%",
    description: "AI visibility from 14% to 65%",
    category: "Credit Union",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 26,
    company: "Capitol Bank",
    logo: null,
    change: "+43%",
    description: "Rapid visibility increase",
    category: "Banking",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 27,
    company: "Horizon FCU",
    logo: null,
    change: "+66%",
    description: "Now top AI recommendation",
    category: "Credit Union",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 28,
    company: "Liberty Savings",
    logo: null,
    change: "+37%",
    description: "Visibility doubled in weeks",
    category: "Banking",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 29,
    company: "Unity CU",
    logo: null,
    change: "+48%",
    description: "AI mentions up significantly",
    category: "Credit Union",
    status: "win",
    link: "/case-studies",
  },
  {
    id: 30,
    company: "Premier Bank",
    logo: null,
    change: "+55%",
    description: "Visibility from 8% to 63%",
    category: "Banking",
    status: "win",
    link: "/case-studies",
  },
]);

// Duplicate case studies for seamless infinite scroll
const getDoubledCaseStudies = (caseStudies) => {
  return [...caseStudies, ...caseStudies];
};
</script>

<template>
  <section class="overflow-hidden bg-white py-16 md:py-24">
    <!-- Header -->
    <div class="mb-12 px-6 text-center md:mb-16">
      <p class="mb-3 text-sm font-medium text-violet-600 md:text-base">
        Case Studies
      </p>
      <h2
        class="text-3xl font-medium leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-5xl"
      >
        Real results from real FIs
      </h2>
      <p class="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
        See how banks and credit unions are improving their AI visibility with
        Paraloom
      </p>
    </div>

    <!-- Case Studies Grid Container -->
    <div
      class="case-study-container relative h-[600px] px-4 md:h-[700px] md:px-12 lg:px-24"
    >
      <div class="flex h-full gap-4">
        <!-- Column 1 - Scrolls UP (hidden on mobile) -->
        <div class="relative hidden flex-1 overflow-hidden md:block">
          <div
            class="scroll-column scroll-up absolute flex w-full flex-col gap-y-4"
          >
            <div
              v-for="(study, index) in getDoubledCaseStudies(
                column1CaseStudies
              )"
              :key="`col1-${study.id}-${index}`"
              class="case-study-card"
            >
              <CaseStudyGridCard
                :company="study.company"
                :logo="study.logo"
                :change="study.change"
                :description="study.description"
                :category="study.category"
                :status="study.status"
                :link="study.link"
              />
            </div>
          </div>
        </div>

        <!-- Column 2 - Scrolls DOWN -->
        <div class="relative flex-1 overflow-hidden">
          <div
            class="scroll-column scroll-down absolute flex w-full flex-col gap-y-4"
          >
            <div
              v-for="(study, index) in getDoubledCaseStudies(
                column2CaseStudies
              )"
              :key="`col2-${study.id}-${index}`"
              class="case-study-card"
            >
              <CaseStudyGridCard
                :company="study.company"
                :logo="study.logo"
                :change="study.change"
                :description="study.description"
                :category="study.category"
                :status="study.status"
                :link="study.link"
              />
            </div>
          </div>
        </div>

        <!-- Column 3 - Scrolls UP -->
        <div class="relative flex-1 overflow-hidden">
          <div
            class="scroll-column scroll-up absolute flex w-full flex-col gap-y-4"
          >
            <div
              v-for="(study, index) in getDoubledCaseStudies(
                column3CaseStudies
              )"
              :key="`col3-${study.id}-${index}`"
              class="case-study-card"
            >
              <CaseStudyGridCard
                :company="study.company"
                :logo="study.logo"
                :change="study.change"
                :description="study.description"
                :category="study.category"
                :status="study.status"
                :link="study.link"
              />
            </div>
          </div>
        </div>

        <!-- Column 4 - Scrolls DOWN (hidden on mobile) -->
        <div class="relative hidden flex-1 overflow-hidden md:block">
          <div
            class="scroll-column scroll-down absolute flex w-full flex-col gap-y-4"
          >
            <div
              v-for="(study, index) in getDoubledCaseStudies(
                column4CaseStudies
              )"
              :key="`col4-${study.id}-${index}`"
              class="case-study-card"
            >
              <CaseStudyGridCard
                :company="study.company"
                :logo="study.logo"
                :change="study.change"
                :description="study.description"
                :category="study.category"
                :status="study.status"
                :link="study.link"
              />
            </div>
          </div>
        </div>

        <!-- Column 5 - Scrolls UP (hidden on mobile and tablet) -->
        <div class="relative hidden flex-1 overflow-hidden lg:block">
          <div
            class="scroll-column scroll-up absolute flex w-full flex-col gap-y-4"
          >
            <div
              v-for="(study, index) in getDoubledCaseStudies(
                column5CaseStudies
              )"
              :key="`col5-${study.id}-${index}`"
              class="case-study-card"
            >
              <CaseStudyGridCard
                :company="study.company"
                :logo="study.logo"
                :change="study.change"
                :description="study.description"
                :category="study.category"
                :status="study.status"
                :link="study.link"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- View All Link -->
    <div class="mt-12 flex justify-center px-6">
      <NuxtLink
        to="/case-studies"
        class="group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900"
      >
        <span>View all case studies</span>
        <svg
          class="h-4 w-4 transition-transform group-hover:translate-x-1"
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

<style scoped>
/* Scroll animations */
@keyframes scrollUp {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, -50%, 0);
  }
}

@keyframes scrollDown {
  0% {
    transform: translate3d(0, -50%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

.scroll-up {
  animation: scrollUp 90s linear infinite;
}

.scroll-down {
  animation: scrollDown 90s linear infinite;
}

/* GPU optimization for smooth scrolling */
.scroll-column {
  will-change: transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
}

.case-study-card {
  backface-visibility: hidden;
  transform: translateZ(0);
}

/* Fade mask at top and bottom */
.case-study-container::before,
.case-study-container::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 100px;
  pointer-events: none;
  z-index: 10;
}

.case-study-container::before {
  top: 0;
  background: linear-gradient(to bottom, white 0%, transparent 100%);
}

.case-study-container::after {
  bottom: 0;
  background: linear-gradient(to top, white 0%, transparent 100%);
}

/* Pause animation on hover - only the hovered column pauses */
.scroll-column:hover {
  animation-play-state: paused;
}
</style>
