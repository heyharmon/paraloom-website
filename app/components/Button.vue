<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "secondary"].includes(value),
  },
  href: {
    type: String,
    default: null,
  },
  to: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: "button",
    validator: (value) => ["button", "submit", "reset"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: "",
  },
});

const isLink = computed(() => !!props.href);
const isNuxtLink = computed(() => !!props.to);
const isButton = computed(() => !isLink.value && !isNuxtLink.value);

const buttonClasses = computed(() => {
  const baseClasses =
    "text-base font-medium px-7 py-3.5 rounded-full transition-all inline-flex items-center justify-center";

  const variantClasses = {
    primary: "bg-[#884dff] text-white hover:bg-[#6d3dcc]",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
  };

  const disabledClasses = props.disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  return [
    baseClasses,
    variantClasses[props.variant],
    disabledClasses,
    props.class,
  ]
    .filter(Boolean)
    .join(" ");
});
</script>

<template>
  <component
    :is="isNuxtLink ? 'NuxtLink' : isLink ? 'a' : 'button'"
    :href="isLink ? href : undefined"
    :to="isNuxtLink ? to : undefined"
    :type="isButton ? type : undefined"
    :disabled="isButton ? disabled : undefined"
    :class="buttonClasses"
  >
    <slot />
  </component>
</template>
