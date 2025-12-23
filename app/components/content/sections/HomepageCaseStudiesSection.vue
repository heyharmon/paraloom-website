<template>
  <section class="bg-white py-20 lg:pt-24 lg:pb-[160px] px-6">
    <!-- Section Header -->
    <div class="flex flex-col items-center gap-6 mb-12">
      <h2 class="text-center">
        <span
          class="block text-3xl md:text-4xl lg:text-5xl font-medium text-slate-900 tracking-tight"
          >Real test results</span
        >
        <span
          class="block text-3xl md:text-4xl lg:text-5xl font-medium text-slate-400 tracking-tight"
          >see what works for AI visibility</span
        >
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
          <!-- Mobile Card Wrapper -->
          <div
            class="lg:bg-transparent bg-slate-100 rounded-2xl lg:rounded-none p-6 pt-10 lg:p-0"
          >
            <!-- Client Logo -->
            <div class="mb-6">
              <img
                :src="study.logo"
                :alt="study.client + ' logo'"
                class="h-12 w-auto"
              />
            </div>

            <!-- Client Name & Topic -->
            <!-- <h3 class="text-xl font-medium text-slate-900 mb-4">
              {{ study.client }}
            </h3> -->

            <!-- Description -->
            <p class="text-base leading-relaxed text-slate-600 mb-8">
              {{ study.description }}
            </p>

            <!-- Result Highlight - Before/After -->
            <div class="mb-8">
              <div class="flex items-baseline gap-3 mb-1">
                <span class="text-4xl font-medium leading-none text-slate-400">
                  {{ study.resultBefore }}{{ study.resultUnit }}
                </span>
                <svg
                  class="w-6 h-6 text-slate-400"
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
                <span class="text-5xl font-medium leading-none text-slate-900">
                  {{ study.resultValue }}{{ study.resultUnit }}
                </span>
              </div>
              <p class="text-sm text-slate-400">
                {{ study.resultLabel }}
              </p>
            </div>

            <!-- CTA Link -->
            <NuxtLink
              :to="study.link"
              class="inline-flex items-center gap-2 text-sm font-medium text-slate-900 group"
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
                  <div
                    class="flex flex-col items-start user-message"
                    :class="{
                      'message-visible':
                        mobileDisplayedPrompts[index] ||
                        mobileAnimatedIndices.has(index),
                    }"
                  >
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
                      <span
                        class="font-medium text-white drop-shadow-md text-xs"
                        >You</span
                      >
                    </div>
                    <div
                      class="backdrop-blur-xl bg-white/70 rounded-2xl px-4 py-3 shadow-xl border border-white/50"
                    >
                      <p
                        class="text-sm leading-relaxed text-slate-900 font-normal"
                      >
                        <span class="typing-content">{{
                          mobileDisplayedPrompts[index] || ""
                        }}</span>
                        <span
                          v-if="mobileTypingPrompts[index]"
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
                      'message-visible':
                        mobileAnimatedIndices.has(index) &&
                        mobileShowResponses[index],
                    }"
                  >
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
                      <span
                        class="font-medium text-white drop-shadow-md text-xs"
                        >ChatGPT</span
                      >
                    </div>
                    <div
                      class="backdrop-blur-xl bg-white/70 rounded-2xl px-4 py-3 shadow-xl border border-white/50"
                    >
                      <p
                        class="text-sm leading-relaxed text-slate-900 font-normal"
                      >
                        <span class="typing-content">{{
                          mobileDisplayedResponses[index] || ""
                        }}</span>
                        <span
                          v-if="mobileTypingResponses[index]"
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
                      class="text-xl leading-relaxed text-slate-900 font-normal"
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
                      class="text-lg leading-relaxed text-slate-900 font-normal"
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
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";

const activeIndex = ref(0);
const featureContents = ref([]);
const displayedPrompt = ref("");
const displayedResponse = ref("");
const isTypingPrompt = ref(false);
const isTypingResponse = ref(false);
const showResponse = ref(false);
const animatedConversations = ref(new Set()); // Track which conversations have been animated

// Mobile animation state
const mobileDisplayedPrompts = ref({});
const mobileDisplayedResponses = ref({});
const mobileTypingPrompts = ref({});
const mobileTypingResponses = ref({});
const mobileShowResponses = ref({});
const mobileAnimatedIndices = ref(new Set());

let typingInterval = null;
let responseTimeout = null;
let mobilePromptIntervals = {}; // Track prompt intervals per mobile card
let mobileResponseIntervals = {}; // Track response intervals per mobile card
let mobileResponseTimeouts = {}; // Track timeouts per mobile card

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

// Start the full conversation animation (desktop)
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

// Mobile typing functions
const typeMobilePrompt = (text, index) => {
  // Clear any existing interval first
  if (mobilePromptIntervals[index]) {
    clearInterval(mobilePromptIntervals[index]);
    delete mobilePromptIntervals[index];
  }

  // Reset state
  mobileDisplayedPrompts.value[index] = "";
  mobileTypingPrompts.value[index] = true;

  let charIndex = 0;
  const textLength = text.length;

  mobilePromptIntervals[index] = setInterval(() => {
    if (charIndex < textLength) {
      mobileDisplayedPrompts.value[index] = text.substring(0, charIndex + 1);
      charIndex++;
    } else {
      clearInterval(mobilePromptIntervals[index]);
      mobileTypingPrompts.value[index] = false;
      delete mobilePromptIntervals[index];
    }
  }, 30);
};

const typeMobileResponse = (text, index) => {
  // Clear any existing interval first
  if (mobileResponseIntervals[index]) {
    clearInterval(mobileResponseIntervals[index]);
    delete mobileResponseIntervals[index];
  }

  // Reset state
  mobileDisplayedResponses.value[index] = "";
  mobileTypingResponses.value[index] = true;
  mobileShowResponses.value[index] = true;

  let charIndex = 0;
  const textLength = text.length;

  mobileResponseIntervals[index] = setInterval(() => {
    if (charIndex < textLength) {
      mobileDisplayedResponses.value[index] = text.substring(0, charIndex + 1);
      charIndex++;
    } else {
      clearInterval(mobileResponseIntervals[index]);
      mobileTypingResponses.value[index] = false;
      mobileAnimatedIndices.value.add(index);
      delete mobileResponseIntervals[index];
    }
  }, 25);
};

// Start mobile conversation animation
const startMobileConversation = (index) => {
  const study = caseStudies[index];
  if (!study) return;

  // Clear any existing intervals/timeouts for this index
  if (mobilePromptIntervals[index]) {
    clearInterval(mobilePromptIntervals[index]);
    delete mobilePromptIntervals[index];
  }
  if (mobileResponseIntervals[index]) {
    clearInterval(mobileResponseIntervals[index]);
    delete mobileResponseIntervals[index];
  }
  if (mobileResponseTimeouts[index]) {
    clearTimeout(mobileResponseTimeouts[index]);
    delete mobileResponseTimeouts[index];
  }

  // If already animated, show everything immediately
  if (mobileAnimatedIndices.value.has(index)) {
    mobileDisplayedPrompts.value[index] = study.prompt;
    mobileDisplayedResponses.value[index] = study.response;
    mobileTypingPrompts.value[index] = false;
    mobileTypingResponses.value[index] = false;
    mobileShowResponses.value[index] = true;
    return;
  }

  // Reset state - ensure we start fresh
  mobileDisplayedPrompts.value[index] = "";
  mobileDisplayedResponses.value[index] = "";
  mobileShowResponses.value[index] = false;
  mobileTypingPrompts.value[index] = false;
  mobileTypingResponses.value[index] = false;

  // Start typing immediately
  typeMobilePrompt(study.prompt, index);
  mobileResponseTimeouts[index] = setTimeout(() => {
    typeMobileResponse(study.response, index);
  }, 400);
};

// Watch for active index changes to trigger conversation
watch(activeIndex, (newIndex) => {
  startConversation(newIndex);
});

let mobileObserver = null;

onMounted(async () => {
  // Wait for refs to be set up
  await nextTick();

  // Trigger initial conversation animation (desktop)
  startConversation(0);

  const observerOptions = {
    root: null,
    rootMargin: "-50% 0px -50% 0px",
    threshold: 0,
  };

  // Observer for desktop (updates activeIndex)
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.dataset.index, 10);
        activeIndex.value = index;
      }
    });
  }, observerOptions);

  // Observer for mobile (triggers animations when cards come into view)
  // Use a more lenient rootMargin so it triggers earlier
  const mobileObserverOptions = {
    root: null,
    rootMargin: "0px 0px -30% 0px", // Trigger when 30% from bottom of viewport
    threshold: 0.1, // Trigger when 10% visible
  };

  const mobileAnimating = new Set(); // Track which indices are currently animating

  mobileObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.dataset.index, 10);
        // Only start animation if not already animating or completed
        if (
          !mobileAnimating.has(index) &&
          !mobileAnimatedIndices.value.has(index)
        ) {
          mobileAnimating.add(index);
          startMobileConversation(index);
          // Remove from animating set after animation completes (rough estimate)
          setTimeout(() => {
            mobileAnimating.delete(index);
          }, 5000);
        }
      }
    });
  }, mobileObserverOptions);

  // Set up observers for all sections
  featureContents.value.forEach((section) => {
    if (section) {
      observer.observe(section);
      mobileObserver.observe(section);

      // Check if first section is already visible (for initial load)
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.7 && rect.bottom > 0;
      if (isVisible && parseInt(section.dataset.index, 10) === 0) {
        startMobileConversation(0);
      }
    }
  });
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
  if (mobileObserver) {
    mobileObserver.disconnect();
  }
  if (typingInterval) {
    clearInterval(typingInterval);
  }
  if (responseTimeout) {
    clearTimeout(responseTimeout);
  }
  // Clean up mobile intervals and timeouts
  Object.values(mobilePromptIntervals).forEach((interval) => {
    if (interval) clearInterval(interval);
  });
  Object.values(mobileResponseIntervals).forEach((interval) => {
    if (interval) clearInterval(interval);
  });
  Object.values(mobileResponseTimeouts).forEach((timeout) => {
    if (timeout) clearTimeout(timeout);
  });
});

const setFeatureRef = (el, index) => {
  if (el) {
    featureContents.value[index] = el;
  }
};
</script>
