<script setup>
import { computed } from "vue";

const props = defineProps({
  title: String,
  items: Array,
});

// Split title for two-tone effect
const titleParts = computed(() => {
  if (!props.title) return { first: "", second: "" };
  
  // Split at "to improve" if it exists, otherwise split at a reasonable point
  const splitIndex = props.title.indexOf(" to improve");
  if (splitIndex > 0) {
    return {
      first: props.title.substring(0, splitIndex),
      second: props.title.substring(splitIndex + 1), // +1 to skip the space
    };
  }
  
  // Fallback: split roughly in the middle
  const words = props.title.split(" ");
  const midPoint = Math.ceil(words.length / 2);
  return {
    first: words.slice(0, midPoint).join(" "),
    second: words.slice(midPoint).join(" "),
  };
});
</script>

<template>
  <section class="py-20 px-6">
    <div class="max-w-screen-2xl mx-auto">
      <!-- Section Header -->
      <div class="flex flex-col items-center gap-6 mb-14">
        <h2
          v-if="title"
          class="text-center"
        >
          <span
            class="block text-4xl md:text-5xl font-medium text-gray-900 tracking-tight"
            >{{ titleParts.first }}</span
          >
          <span
            class="block text-4xl md:text-5xl font-medium text-[rgba(64,64,64,0.28)] tracking-tight"
            >{{ titleParts.second }}</span
          >
        </h2>
      </div>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="rounded-3xl bg-gray-50 p-10"
        >
          <!-- Checkmark Icon -->
          <div
            class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mb-10"
          >
            <svg
              class="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <div class="flex-1">
            <h3 class="text-lg text-gray-900 mb-1.5">
              {{ item.title }}
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
