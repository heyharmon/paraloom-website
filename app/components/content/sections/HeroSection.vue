<script setup>
defineProps({
  headline: {
    type: String,
    default: "AI that scales your brand with consistency.",
  },
  subheadline: {
    type: String,
    default: "Always on-brand, owned by you.",
  },
  primaryButtonText: {
    type: String,
    default: "Start for free",
  },
  primaryButtonHref: {
    type: String,
    default: "",
  },
  secondaryButtonText: {
    type: String,
    default: "Book a demo",
  },
  secondaryButtonHref: {
    type: String,
    default: "/book-a-demo",
  },
});
</script>

<template>
  <section
    class="w-full max-w-screen-2xl mx-auto flex flex-col items-center justify-center px-6 pt-48 pb-32 gap-6"
  >
    <h1
      class="text-center text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight max-w-4xl"
    >
      {{ headline }}
    </h1>

    <p class="text-xl text-subheadline">{{ subheadline }}</p>

    <div class="flex flex-row items-center gap-3">
      <Button variant="primary" :href="primaryButtonHref">
        {{ primaryButtonText }}
      </Button>
      <Button variant="secondary" :href="secondaryButtonHref">
        {{ secondaryButtonText }}
      </Button>
    </div>
  </section>
</template>
