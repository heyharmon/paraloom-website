<template>
  <section class="bg-white py-20 lg:pt-24 lg:pb-[160px] px-4 md:px-8">
    <!-- Section Header -->
    <div class="w-full max-w-4xl mx-auto mb-24 text-center">
      <h2 class="text-4xl md:text-5xl font-medium text-gray-900 tracking-tight">
        We're transparently sharing real test results—so you can see what
        actually works for AI visibility.
      </h2>
    </div>

    <div
      class="w-full max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16 xl:gap-24"
    >
      <!-- Left Column - Scrolling Content -->
      <div class="w-full lg:w-[340px] xl:w-[380px] flex-shrink-0">
        <div
          v-for="(study, index) in caseStudies"
          :key="index"
          :ref="(el) => setFeatureRef(el, index)"
          :data-index="index"
          class="min-h-0 lg:min-h-[70vh] flex flex-col justify-center transition-opacity duration-300 ease-out py-8 lg:py-0"
        >
          <!-- Client Logo -->
          <div class="mb-6">
            <img
              :src="study.logo"
              :alt="study.client + ' logo'"
              class="h-14 w-auto"
            />
          </div>

          <!-- Client Name & Topic -->
          <!-- <h3 class="text-xl font-medium text-gray-900 mb-4">
            {{ study.client }}
          </h3> -->

          <!-- Description -->
          <p class="text-base leading-relaxed text-gray-600 mb-8">
            {{ study.description }}
          </p>

          <!-- Result Highlight - Before/After -->
          <div class="mb-8">
            <div class="flex items-baseline gap-3 mb-1">
              <span class="text-4xl font-medium leading-none text-gray-300">
                {{ study.resultBefore }}{{ study.resultUnit }}
              </span>
              <svg
                class="w-6 h-6 text-gray-300"
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
              <span class="text-5xl font-medium leading-none text-gray-900">
                {{ study.resultValue }}{{ study.resultUnit }}
              </span>
            </div>
            <p class="text-sm text-gray-400">
              {{ study.resultLabel }}
            </p>
          </div>

          <!-- CTA Link -->
          <NuxtLink
            :to="study.link"
            class="inline-flex items-center gap-2 text-sm font-medium text-gray-900 group"
          >
            <span
              class="border-b border-gray-900 pb-0.5 group-hover:border-gray-400 transition-colors"
            >
              Read the full case study
            </span>
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

          <!-- Mobile Image Card -->
          <div
            class="lg:hidden mt-8 relative rounded-2xl aspect-[4/3] overflow-hidden"
          >
            <img
              :src="study.image"
              :alt="study.imageAlt"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
            ></div>
            <!-- Mobile Chat Card -->
            <div class="absolute inset-4 flex items-center justify-center">
              <div class="w-full flex flex-col gap-3">
                <!-- User Message -->
                <div class="flex flex-col items-start">
                  <div class="mb-2 flex items-center gap-2 text-sm">
                    <div
                      class="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"
                    >
                      <svg
                        class="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                        />
                      </svg>
                    </div>
                    <span class="font-medium text-white drop-shadow-md text-xs"
                      >You</span
                    >
                  </div>
                  <div
                    class="backdrop-blur-xl bg-white/70 rounded-2xl px-4 py-3 shadow-xl border border-white/50"
                  >
                    <p
                      class="text-sm leading-relaxed text-gray-900 font-normal"
                    >
                      {{ study.prompt }}
                    </p>
                  </div>
                </div>
                <!-- AI Response -->
                <div class="flex flex-col items-start">
                  <div class="mb-2 flex items-center gap-2 text-sm">
                    <div
                      class="w-5 h-5 rounded-full bg-[#10a37f] flex items-center justify-center"
                    >
                      <img
                        src="/logos/logo-chatgpt.svg"
                        alt="ChatGPT"
                        class="w-3 h-3 invert"
                      />
                    </div>
                    <span class="font-medium text-white drop-shadow-md text-xs"
                      >ChatGPT</span
                    >
                  </div>
                  <div
                    class="backdrop-blur-xl bg-white/70 rounded-2xl px-4 py-3 shadow-xl border border-white/50"
                  >
                    <p
                      class="text-sm leading-relaxed text-gray-900 font-normal"
                    >
                      {{ study.response }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Sticky Card with Chat Overlay -->
      <div class="hidden lg:block flex-1 sticky top-[15vh]">
        <div
          class="relative rounded-[32px] aspect-[4/3] min-h-[400px] xl:min-h-[520px] overflow-hidden"
        >
          <!-- Background Images -->
          <div
            v-for="(study, index) in caseStudies"
            :key="'bg-' + index"
            class="absolute inset-0 case-study-image"
            :class="
              activeIndex === index
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            "
          >
            <img
              :src="study.image"
              :alt="study.imageAlt"
              class="w-full h-full object-cover"
            />
            <!-- Subtle gradient overlay for better text contrast -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"
            ></div>
          </div>

          <!-- Chat Conversation Card -->
          <div class="absolute inset-0 flex items-end justify-end p-6">
            <div
              v-for="(study, index) in caseStudies"
              :key="'chat-' + index"
              class="absolute inset-6 flex items-center justify-center chat-card"
              :class="
                activeIndex === index
                  ? 'opacity-100'
                  : 'opacity-0 pointer-events-none'
              "
            >
              <!-- Chat conversation -->
              <div class="w-full max-w-[90%] flex flex-col gap-4">
                <!-- User Message -->
                <div
                  class="flex flex-col items-start user-message"
                  :class="{ 'message-visible': activeIndex === index }"
                >
                  <div class="mb-2 flex items-center gap-2 text-sm">
                    <div
                      class="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"
                    >
                      <svg
                        class="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                        />
                      </svg>
                    </div>
                    <span class="font-medium text-white drop-shadow-md"
                      >You</span
                    >
                  </div>
                  <div
                    class="backdrop-blur-md bg-white/60 rounded-2xl px-6 py-4 shadow-2xl border border-white/50 max-w-full"
                  >
                    <p
                      class="text-xl leading-relaxed text-gray-900 font-normal"
                    >
                      <span class="typing-content">{{
                        activeIndex === index ? displayedPrompt : ""
                      }}</span>
                      <span
                        v-if="activeIndex === index && isTypingPrompt"
                        class="typing-cursor"
                        >|</span
                      >
                    </p>
                  </div>
                </div>

                <!-- AI Response -->
                <div
                  class="flex flex-col items-start ai-response"
                  :class="{
                    'message-visible': activeIndex === index && showResponse,
                  }"
                >
                  <div class="mb-2 flex items-center gap-2 text-sm">
                    <div
                      class="w-6 h-6 rounded-full bg-[#10a37f] flex items-center justify-center"
                    >
                      <img
                        src="/logos/logo-chatgpt.svg"
                        alt="ChatGPT"
                        class="w-4 h-4 invert"
                      />
                    </div>
                    <span class="font-medium text-white drop-shadow-md"
                      >ChatGPT</span
                    >
                  </div>
                  <div
                    class="backdrop-blur-md bg-white/60 rounded-2xl px-6 py-4 shadow-2xl border border-white/50 max-w-full"
                  >
                    <p
                      class="text-lg leading-relaxed text-gray-900 font-normal"
                    >
                      <span class="typing-content">{{
                        activeIndex === index ? displayedResponse : ""
                      }}</span>
                      <span
                        v-if="activeIndex === index && isTypingResponse"
                        class="typing-cursor"
                        >|</span
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.case-study-image {
  transition:
    opacity 500ms ease-out,
    transform 700ms ease-out;
}

.chat-card {
  transition: opacity 300ms ease-out;
}

.user-message,
.ai-response {
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 400ms ease-out,
    transform 400ms ease-out;
}

.user-message.message-visible {
  opacity: 1;
  transform: translateY(0);
}

.ai-response.message-visible {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 100ms;
}

.typing-cursor {
  display: inline-block;
  animation: blink 0.8s infinite;
  margin-left: 2px;
  font-weight: 300;
  color: #111827;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}
</style>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

const activeIndex = ref(0);
const featureContents = ref([]);
const displayedPrompt = ref("");
const displayedResponse = ref("");
const isTypingPrompt = ref(false);
const isTypingResponse = ref(false);
const showResponse = ref(false);
const animatedConversations = ref(new Set()); // Track which conversations have been animated
let typingInterval = null;
let responseTimeout = null;

const caseStudies = [
  {
    client: "Lone Star Credit Union",
    description:
      "Lone Star Credit Union partnered with Paraloom to dominate AI search results for auto loan refinancing queries across East Texas.",
    resultBefore: "0",
    resultValue: "100",
    resultUnit: "%",
    resultLabel: "AI visibility for target prompts",
    prompt: "Where in East Texas could I refinance my auto loan?",
    response:
      "Here are solid East Texas options for auto-loan refinancing: Lone Star Credit Union — serves East Texas with a dedicated auto-refi program.",
    image: "homepage/chat-bg-lonestar.png",
    imageAlt: "Lone Star Credit Union case study",
    logo: "/homepage/logo-lonestar.svg",
    link: "/research",
  },
  {
    client: "On Tap Credit Union",
    description:
      "On Tap Credit Union worked with Paraloom to become the top AI recommendation for mortgage rates in the Arvada, Colorado area.",
    resultBefore: "33",
    resultValue: "100",
    resultUnit: "%",
    resultLabel: "AI visibility for target prompts",
    prompt: "Where can I get a good mortgage rate in Arvada, CO?",
    response:
      "Here are competitive rates in/near Arvada: On Tap Credit Union — Arvada-based with same-day quotes available.",
    image: "homepage/chat-bg-ontapcu.png",
    imageAlt: "On Tap Credit Union case study",
    logo: "/homepage/logo-ontapcu.svg",
    link: "/research",
  },
  {
    client: "Northwest Preferred",
    description:
      "Northwest Preferred Credit Union partnered with Paraloom to improve their visibility in AI-powered search results for competitive banking queries in Oregon.",
    resultBefore: "0",
    resultValue: "100",
    resultUnit: "%",
    resultLabel: "AI visibility for target prompts",
    prompt: "Who has the best high yield savings account in Stayton, Oregon?",
    response:
      "Here are high-yield savings options in Stayton, Oregon: NW Preferred Federal Credit Union — offers competitive rates with personalized local service.",
    image: "homepage/chat-bg-nwpreferred.png",
    imageAlt: "Northwest Preferred case study",
    logo: "/homepage/logo-nwpreferred.png",
    link: "/research/northwest-preferred",
  },
];

let observer = null;

// Type the user prompt
const typePrompt = (text, callback) => {
  displayedPrompt.value = "";
  isTypingPrompt.value = true;
  let charIndex = 0;

  typingInterval = setInterval(() => {
    if (charIndex < text.length) {
      displayedPrompt.value += text[charIndex];
      charIndex++;
    } else {
      clearInterval(typingInterval);
      isTypingPrompt.value = false;
      if (callback) callback();
    }
  }, 30); // Typing speed (ms per character)
};

// Type the AI response
const typeResponse = (text, index) => {
  displayedResponse.value = "";
  isTypingResponse.value = true;
  showResponse.value = true;
  let charIndex = 0;

  typingInterval = setInterval(() => {
    if (charIndex < text.length) {
      displayedResponse.value += text[charIndex];
      charIndex++;
    } else {
      clearInterval(typingInterval);
      isTypingResponse.value = false;
      animatedConversations.value.add(index); // Mark conversation as animated
    }
  }, 25); // Slightly faster for the response
};

// Start the full conversation animation
const startConversation = (index) => {
  if (typingInterval) {
    clearInterval(typingInterval);
  }
  if (responseTimeout) {
    clearTimeout(responseTimeout);
  }

  const study = caseStudies[index];
  if (!study) return;

  // If already animated, show everything immediately
  if (animatedConversations.value.has(index)) {
    displayedPrompt.value = study.prompt;
    displayedResponse.value = study.response;
    isTypingPrompt.value = false;
    isTypingResponse.value = false;
    showResponse.value = true;
    return;
  }

  // Reset state
  showResponse.value = false;
  displayedResponse.value = "";

  // Type prompt first, then response after a delay
  typePrompt(study.prompt, () => {
    responseTimeout = setTimeout(() => {
      typeResponse(study.response, index);
    }, 400); // Delay before AI response starts
  });
};

// Watch for active index changes to trigger conversation
watch(activeIndex, (newIndex) => {
  startConversation(newIndex);
});

onMounted(() => {
  // Trigger initial conversation animation
  startConversation(0);

  const observerOptions = {
    root: null,
    rootMargin: "-50% 0px -50% 0px",
    threshold: 0,
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.dataset.index, 10);
        activeIndex.value = index;
      }
    });
  }, observerOptions);

  featureContents.value.forEach((section) => {
    if (section) {
      observer.observe(section);
    }
  });
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
  if (typingInterval) {
    clearInterval(typingInterval);
  }
  if (responseTimeout) {
    clearTimeout(responseTimeout);
  }
});

const setFeatureRef = (el, index) => {
  if (el) {
    featureContents.value[index] = el;
  }
};
</script>
