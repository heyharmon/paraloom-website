# Robots.txt Implementation

This document explains how robots.txt is configured for this Nuxt website.

---

## Overview

The robots.txt is generated dynamically using the [@nuxtjs/robots](https://nuxtseo.com/docs/robots/getting-started/introduction) module.

**URL:** `/robots.txt`

---

## Why Use the Module?

According to the [NuxtSEO documentation](https://nuxtseo.com/docs/robots/getting-started/introduction), the module provides:

- **Automatic non-production blocking** - Development and staging environments are automatically blocked from indexing
- **Integration with sitemap** - Automatically references the sitemap URL
- **Route rules support** - Configure indexing per-route
- **Frontmatter support** - Use `robots: false` in content files
- **X-Robots-Tag header** - Adds proper headers for pages that shouldn't be indexed

---

## Configuration

### Module Setup

The module is added to `nuxt.config.js`:

```js
modules: [
  "@nuxtjs/robots",
  "@nuxtjs/sitemap",
  "@nuxt/content",
  // ... other modules
],
```

### Site URL

The module uses the `site.url` configuration (shared with sitemap):

```js
site: {
  url: "https://www.domain.com",
},
```

---

## Default Behavior

### Production

In production, the generated `robots.txt` allows all indexing:

```
User-agent: *
Disallow:

Sitemap: https://www.domain.com/sitemap.xml
```

### Development/Staging

Non-production environments automatically block all indexing:

```
User-agent: *
Disallow: /
```

---

## Excluding Pages

### Via Frontmatter

Add `robots: false` to any content file:

```yaml
---
title: My Private Page
robots: false
---
```

### Via Route Rules

In `nuxt.config.js`:

```js
routeRules: {
  '/admin/**': { robots: false },
}
```

---

## Integration with Other Modules

- **@nuxtjs/sitemap** - Pages marked with `robots: false` are automatically excluded from the sitemap
- **@nuxt/content** - Frontmatter `robots` key is supported

---

## References

- [Nuxt Robots Introduction](https://nuxtseo.com/docs/robots/getting-started/introduction)
- [Nuxt Robots Installation](https://nuxtseo.com/docs/robots/getting-started/installation)
- `nuxt.config.js` - Module configuration
