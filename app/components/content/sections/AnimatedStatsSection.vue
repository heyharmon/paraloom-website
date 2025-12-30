<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  eyebrow: {
    type: String,
    default:
      "Join millions of entrepreneurs who run their business on Squarespace.",
  },
  stats: {
    type: Array,
    default: () => [
      {
        prefix: "",
        digits: [1, 4],
        suffix: "M+",
        label: "Entrepreneurs Served",
        ariaLabel: "14M+",
      },
      {
        prefix: "$",
        digits: [3, 6],
        suffix: "B+",
        label: "Earned by Entrepreneurs",
        ariaLabel: "$36B+",
      },
      {
        prefix: "",
        digits: [2, 0, 0],
        suffix: "+",
        label: "Countries & Territories",
        ariaLabel: "200+",
      },
    ],
  },
});

// Animation state
const isVisible = ref(false);
const sectionRef = ref(null);

// Track digit positions for each stat
const digitPositions = ref(props.stats.map((stat) => stat.digits.map(() => 0)));

let observer = null;

const animateDigits = () => {
  props.stats.forEach((stat, statIndex) => {
    stat.digits.forEach((target, digitIndex) => {
      const delay = (statIndex * stat.digits.length + digitIndex) * 80;
      setTimeout(() => {
        digitPositions.value[statIndex][digitIndex] = target;
      }, delay);
    });
  });
};

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          setTimeout(animateDigits, 300);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

// Generate digits 0-9 for roller
const digitRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// Stagger delays for cards
const getCardDelay = (index) => {
  const delays = ["delay-100", "delay-[250ms]", "delay-[400ms]"];
  return delays[index] || "";
};
</script>

<template>
  <section
    ref="sectionRef"
    class="bg-page flex flex-col items-center justify-center px-6 md:px-10 py-24 md:py-32"
  >
    <!-- Eyebrow Text -->
    <p
      :class="[
        'text-muted text-lg font-normal leading-relaxed text-center mb-16 max-w-2xl',
        'transition-all duration-800 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
      ]"
    >
      {{ eyebrow }}
    </p>

    <!-- Stats Row -->
    <div
      class="flex justify-center items-start gap-12 md:gap-16 lg:gap-24 max-md:flex-col max-md:items-center max-md:gap-12"
    >
      <!-- Stat Cards -->
      <div
        v-for="(stat, statIndex) in stats"
        :key="statIndex"
        :class="[
          'flex flex-col items-center text-center min-w-[153px]',
          'transition-all duration-800 ease-out',
          getCardDelay(statIndex),
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
        ]"
      >
        <!-- Stat Number -->
        <div
          class="text-slate-900 text-[clamp(48px,9vw,72px)] font-medium leading-[1.05] tracking-[-0.04em] flex items-baseline h-[1.1em] overflow-hidden"
          :aria-label="stat.ariaLabel"
        >
          <!-- Prefix -->
          <span v-if="stat.prefix" class="inline-block">{{ stat.prefix }}</span>

          <!-- Digit Rollers -->
          <template
            v-for="(targetDigit, digitIndex) in stat.digits"
            :key="digitIndex"
          >
            <!-- Comma separator before this digit if specified -->
            <span
              v-if="stat.separators?.includes(digitIndex)"
              class="inline-block"
              >,</span
            >
            <span class="inline-flex flex-col h-[1em] overflow-hidden relative">
              <span
                v-for="digit in digitRange"
                :key="digit"
                class="h-[1em] flex items-center justify-center shrink-0 transition-transform duration-2000 ease-out-expo"
                :style="{
                  transform: `translateY(-${digitPositions[statIndex][digitIndex]}em)`,
                }"
              >
                {{ digit }}
              </span>
            </span>
          </template>

          <!-- Suffix -->
          <span class="inline-block">{{ stat.suffix }}</span>
        </div>

        <!-- Stat Label -->
        <p
          class="text-muted text-base font-normal leading-relaxed mt-4 tracking-wide"
        >
          {{ stat.label }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Custom easing for digit animation - expo out */
.ease-out-expo {
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

/* Duration utilities not available in Tailwind by default */
.duration-800 {
  transition-duration: 800ms;
}

.duration-2000 {
  transition-duration: 2000ms;
}

/* Custom delay */
.delay-100 {
  transition-delay: 100ms;
}
</style>
