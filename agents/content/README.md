# About how to generate page content

This guide explains how to create and edit content pages for this Nuxt website. It's designed for AI copywriters and content editors who need to add new pages without touching Vue code.

---

## How Content Pages Work

Content pages are built from three layers:

```
┌─────────────────────────────────────────────────────┐
│  1. CONTENT FILE (.json)                              │
│     → Defines page metadata, SEO, and section data  │
│     → Lives in /content/ directory                  │
├─────────────────────────────────────────────────────┤
│  2. SECTION COMPONENTS                              │
│     → Reusable UI blocks (Hero, FAQ, Features...)   │
│     → Rendered based on content file sections       │
└─────────────────────────────────────────────────────┘
```

**Your job as a copywriter:** Create/edit content files. The layouts and components handle the visual rendering automatically.

---

## File Locations

| What               | Where                               |
| ------------------ | ----------------------------------- |
| Content files      | `/content/`                         |
| Section components | `/app/components/content/sections/` |

---

## Content File Structure

Every content page is a JSON file that defines the page.

## Sections

Each section type has specific data fields. Here's a reference for each:

### `hero`

The main banner at the top of the page.

```json
{
  "title": "Welcome to Your Website",
  "description": "A modern, professional website built with Nuxt.",
  "layout": "default",
  "sections": [
    {
      "type": "hero",
      "headline": "AI that scales your brand with consistency.",
      "subheadline": "Always on-brand, owned by you."
    }
  ]
}
```
