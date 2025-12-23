<script setup>
import CardsAnimation from "../components/cards-animation/CardsAnimation.vue";

// Use the default layout
definePageMeta({
  layout: "default",
});

// Get the route
const route = useRoute();

// Fetch the content using Nuxt Content v3 API
// Use route.path directly as the key per Nuxt Content best practices
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("content").path(route.path).first();
});

// Get sections from front matter for rendering
// Supports both schema-defined (page.sections) and meta fallback (page.meta.sections)
const sections = computed(
  () => page.value?.sections || page.value?.meta?.sections || []
);

// Set page head meta
useHead({
  title: computed(() => page.value?.title || "Your Website"),
  meta: [
    {
      name: "description",
      content: computed(() => page.value?.description || ""),
    },
    {
      property: "og:title",
      content: computed(() => page.value?.title || "Your Website"),
    },
    {
      property: "og:description",
      content: computed(() => page.value?.description || ""),
    },
    { property: "og:type", content: "website" },
    {
      property: "og:image",
      content: "https://www.domain.com/og_image.png",
    },
    { property: "og:site_name", content: "Your Website" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:image",
      content: "https://www.domain.com/og_image.png",
    },
    {
      name: "twitter:title",
      content: computed(() => page.value?.title || "Your Website"),
    },
    {
      name: "twitter:description",
      content: computed(() => page.value?.description || ""),
    },
  ],
  link: [
    {
      rel: "canonical",
      href: computed(() => `https://www.domain.com${route.path}`),
    },
  ],
});
</script>

<template>
  <NuxtErrorBoundary>
    <div v-if="page">
      <!-- Render sections from front matter -->
      <SectionRenderer
        v-for="(section, index) in sections"
        :key="index"
        :section="section"
      />

      <!-- Render markdown body content if exists -->
      <div
        v-if="page.body?.children?.length"
        class="prose prose-stone max-w-3xl mx-auto px-6 py-16"
      >
        <ContentRenderer :value="page" />
      </div>
    </div>

    <!-- 404 fallback when page not found -->
    <div
      v-else
      class="flex flex-col items-center justify-center min-h-[60vh] px-6"
    >
      <h1 class="text-4xl font-bold text-slate-900 mb-4">Page Not Found</h1>
      <p class="text-lg text-slate-600 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <NuxtLink
        to="/"
        class="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
      >
        Go Home
      </NuxtLink>
    </div>

    <!-- Error boundary fallback -->
    <template #error="{ error }">
      <div class="flex flex-col items-center justify-center min-h-[60vh] px-6">
        <h1 class="text-4xl font-bold text-slate-900 mb-4">
          Something went wrong
        </h1>
        <p class="text-lg text-slate-600 mb-8">{{ error.message }}</p>
        <NuxtLink
          to="/"
          class="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          Go Home
        </NuxtLink>
      </div>
    </template>
  </NuxtErrorBoundary>
</template>
