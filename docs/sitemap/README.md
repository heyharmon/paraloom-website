# Sitemap Implementation

This document explains how the XML sitemap is configured for this Nuxt Website.

---

## Overview

The sitemap is generated using the [@nuxtjs/sitemap](https://nuxt.com/modules/sitemap) module with Nuxt Content v3 integration.

**URL:** `/sitemap.xml`

---

## Configuration

### Module Setup

The sitemap module must be loaded **before** `@nuxt/content` in `nuxt.config.js` for the v3 integration to work:

```js
modules: [
  "@nuxtjs/sitemap", // Must be BEFORE @nuxt/content
  "@nuxt/content",
  // ... other modules
],
```

### Site URL

The production URL is configured in `nuxt.config.js`:

```js
site: {
  url: "https://www.domain.com",
},
```

### Sitemap Options

```js
sitemap: {
  exclude: ["/template-*"],  // Excludes template pages
  defaults: {
    changefreq: "weekly",
    priority: 0.8,
  },
},
```

---

## Nuxt Content v3 Integration

Content pages are automatically included via the `asSitemapCollection()` wrapper in `content.config.js`:

```js
import { defineCollection, defineContentConfig } from "@nuxt/content";
import { asSitemapCollection } from "@nuxtjs/sitemap/content";

export default defineContentConfig({
  collections: {
    content: defineCollection(
      asSitemapCollection({
        type: "page",
        source: "**/*.md",
      })
    ),
  },
});
```

This automatically adds all markdown files from the `/content` directory to the sitemap.

---

## Customizing Sitemap Entries

### Per-Page Configuration

Add `sitemap` frontmatter to any content file to customize its entry:

```yaml
---
title: My Page
sitemap:
  lastmod: 2025-01-01
  changefreq: weekly
  priority: 0.9
---
```

### Excluding Pages

To exclude a page from the sitemap:

```yaml
---
sitemap: false
---
```

Or use the `exclude` pattern in `nuxt.config.js` for bulk exclusions.

---

## Static Pages

Pages not in the `/content` directory must be manually added to the `urls` array in the sitemap config.

---

## References

- [Nuxt Sitemap Module](https://nuxt.com/modules/sitemap)
- [NuxtSEO Sitemap + Content Guide](https://nuxtseo.com/docs/sitemap/guides/content)
- `nuxt.config.js` - Main configuration
- `content.config.js` - Content collection with sitemap integration
