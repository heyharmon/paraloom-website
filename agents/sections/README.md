# Section Component Guidelines

This document outlines best practices and patterns for creating new section components in this Nuxt website website. Following these guidelines ensures consistency, maintainability, and a cohesive user experience across all sections.

## Overview

Section components are reusable Vue components that render page content defined in markdown front matter. They are automatically loaded and rendered by the `SectionRenderer` component, making it easy to build pages without writing Vue code.

---

## 1. Component Structure & Naming

### File Naming

- Use PascalCase: `MyNewSection.vue`
- Place in `/app/components/content/sections/`
- Name should clearly describe the section's purpose
- If component is specialized for a specific domain area of the website, name it aptly

### Basic Structure

```vue
<script setup>
defineProps({
  // Props defined here
});
</script>

<template>
  <section class="py-20 md:py-28 px-6">
    <!-- Section content -->
  </section>
</template>
```

### Registration

After creating a new section component, register it in `SectionRenderer.vue`:

```javascript
myNewSection: defineAsyncComponent(
  () => import("./sections/MyNewSection.vue")
),
```

---

## Props Definition

### Use `defineProps` with Type Definitions

```javascript
defineProps({
  title: String,
  description: String,
  items: {
    type: Array,
    default: () => [],
  },
  showBackground: {
    type: Boolean,
    default: true,
  },
});
```

### Best Practices

- **Provide defaults** for optional props
- **Use descriptive names** that match content front matter
- **Type your props** (String, Number, Array, Object, Boolean)
