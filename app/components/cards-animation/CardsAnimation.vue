<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from "vue";

const props = defineProps({
  cards: {
    type: Array,
    default: () => [
      {
        title: "Mountain Peak",
        description: "Rise above the clouds",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
      },
      {
        title: "Forest Path",
        description: "Where adventure begins",
        image:
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80",
      },
      {
        title: "Ancient Woods",
        description: "Timeless beauty awaits",
        image:
          "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&q=80",
      },
      {
        title: "Waterfall",
        description: "Nature's pure power",
        image:
          "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&q=80",
      },
      {
        title: "Lake View",
        description: "Serenity reflected",
        image:
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80",
      },
    ],
  },
  scrollHeight: {
    type: String,
    default: "300vh",
  },
  // Embedded mode: no scroll container, uses external progress
  embedded: {
    type: Boolean,
    default: false,
  },
  // External progress value (0-1), used when embedded
  progress: {
    type: Number,
    default: null,
  },
  // Container classes for embedded mode
  containerClass: {
    type: String,
    default: "",
  },
});

const scrollContainer = ref(null);

// Card animation configurations
const cardConfigs = ref([]);

// Initialize card configs with randomization
const initCardConfigs = () => {
  const baseConfigs = [
    { startX: 100, startY: -450, endX: 250, endY: 200, rotation: -3 },
    { startX: 500, startY: -500, endX: 258, endY: 192, rotation: 5 },
    { startX: 300, startY: -480, endX: 242, endY: 205, rotation: -2 },
    { startX: 600, startY: -460, endX: 255, endY: 195, rotation: 4 },
    { startX: 150, startY: -490, endX: 248, endY: 202, rotation: -1 },
  ];

  cardConfigs.value = baseConfigs.map((config) => ({
    ...config,
    endX: config.endX + (Math.random() - 0.5) * 20,
    endY: config.endY + (Math.random() - 0.5) * 15,
    rotation: config.rotation + (Math.random() - 0.5) * 3,
  }));
};

// Card transform states
const cardTransforms = ref(
  props.cards.map(() => ({
    x: 0,
    y: 0,
    rotation: 0,
    scale: 0.9,
    opacity: 0,
  }))
);

const easeOutCubic = (t) => {
  return 1 - Math.pow(1 - t, 3);
};

const lerp = (start, end, t) => {
  return start + (end - start) * t;
};

const calculateTransforms = (scrollProgress) => {
  return props.cards.map((_, index) => {
    const cardStart = index * 0.2;
    const cardEnd = cardStart + 0.25;

    let cardProgress = (scrollProgress - cardStart) / (cardEnd - cardStart);
    cardProgress = Math.max(0, Math.min(1, cardProgress));

    const easedProgress = easeOutCubic(cardProgress);
    const config = cardConfigs.value[index];

    if (!config) return { x: 0, y: 0, rotation: 0, scale: 0.9, opacity: 0 };

    const x = lerp(config.startX, config.endX, easedProgress);
    const y = lerp(config.startY, config.endY, easedProgress);
    const rotation = lerp(0, config.rotation, easedProgress);
    const scale = lerp(0.9, 1, easedProgress);
    const opacity = lerp(0, 1, Math.min(1, easedProgress * 2));

    return { x, y, rotation, scale, opacity, zIndex: index };
  });
};

const updateCards = () => {
  // In embedded mode with external progress, don't calculate from scroll
  if (props.embedded && props.progress !== null) return;

  if (!scrollContainer.value) return;

  const containerRect = scrollContainer.value.getBoundingClientRect();
  const scrollProgress =
    -containerRect.top / (containerRect.height - window.innerHeight);

  cardTransforms.value = calculateTransforms(scrollProgress);
};

// Watch for external progress changes in embedded mode
watch(
  () => props.progress,
  (newProgress) => {
    if (props.embedded && newProgress !== null) {
      cardTransforms.value = calculateTransforms(newProgress);
    }
  },
  { immediate: true }
);

const getCardStyle = (index) => {
  const transform = cardTransforms.value[index];
  return {
    transform: `translate(${transform.x}px, ${transform.y}px) rotate(${transform.rotation}deg) scale(${transform.scale})`,
    opacity: transform.opacity,
    zIndex: transform.zIndex,
    backgroundImage: `url('${props.cards[index].image}')`,
  };
};

onMounted(() => {
  initCardConfigs();

  // In embedded mode with external progress, calculate initial transforms
  if (props.embedded && props.progress !== null) {
    cardTransforms.value = calculateTransforms(props.progress);
  } else {
    updateCards();
    window.addEventListener("scroll", updateCards, { passive: true });
    window.addEventListener("resize", updateCards);
  }
});

onUnmounted(() => {
  if (!props.embedded) {
    window.removeEventListener("scroll", updateCards);
    window.removeEventListener("resize", updateCards);
  }
});
</script>

<template>
  <!-- Embedded mode: just the card container -->
  <div
    v-if="embedded"
    :class="[
      'relative overflow-hidden',
      containerClass ||
        'w-full h-full bg-white/[0.03] border border-white/10 rounded-2xl',
    ]"
  >
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="card absolute w-[300px] h-[400px] rounded-2xl bg-cover bg-center shadow-2xl overflow-hidden will-change-transform"
      :style="getCardStyle(index)"
    >
      <!-- Card overlay gradient -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
      ></div>

      <!-- Card content -->
      <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 class="text-2xl font-semibold mb-2">{{ card.title }}</h3>
        <p class="text-sm opacity-85 leading-relaxed">
          {{ card.description }}
        </p>
      </div>
    </div>
  </div>

  <!-- Standalone mode: scroll container with sticky behavior -->
  <div
    v-else
    ref="scrollContainer"
    class="relative"
    :style="{ height: scrollHeight }"
  >
    <div class="sticky top-0 h-screen flex items-center justify-center">
      <!-- Card container -->
      <div
        class="w-[800px] h-[800px] bg-white/[0.03] border border-white/10 rounded-2xl relative overflow-hidden"
      >
        <div
          v-for="(card, index) in cards"
          :key="index"
          class="card absolute w-[300px] h-[400px] rounded-2xl bg-cover bg-center shadow-2xl overflow-hidden will-change-transform"
          :style="getCardStyle(index)"
        >
          <!-- Card overlay gradient -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
          ></div>

          <!-- Card content -->
          <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 class="text-2xl font-semibold mb-2">{{ card.title }}</h3>
            <p class="text-sm opacity-85 leading-relaxed">
              {{ card.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}
</style>
