# About the architecture of this Starter Nuxt Website

This is a starter Nuxt project designed to get you building websites quickly. It combines Nuxt Content for content management with a flexible section-based component system, minimal styling, and production-ready SEO and security configurations.

## How It Works

**Content-Driven Pages:** Pages are created as markdown files in the `/content/` directory. Each file uses json to define page metadata and an array of sections. The sections are automatically rendered using Vue components—no Vue knowledge required to create pages.

**Section Components:** Pages are built by composing reusable section components. Available sections include:

- `hero` - Hero banner with headline, subheadline, badge, and CTA
- `features` - Grid of feature cards with checkmarks
- `howItWorks` - Step-by-step process display
- `faqs` - Expandable FAQ accordion
- `ctaBanner` - Call-to-action banner

**Minimal Styling:** The CSS file (`app/assets/css/main.css`) is intentionally minimal—just 30 lines. It includes only essential base styles (font configuration, smooth scrolling, selection styling). All visual styling comes from Tailwind CSS classes in the components, making it easy to customize for any brand.

## Getting Started

1. **Create a new page:** Add a markdown file to `/content/` (e.g., `content/services.md` → `/services`)
2. **Define sections:** Add a `sections` array in the front matter with section objects
3. **Customize content:** Edit the section data (headlines, descriptions, etc.) in the markdown file
4. **Preview:** Visit `/sections` to see all available sections with sample content

## Adding New Sections

To add a new section component:

1. **Create the component:** Add a new Vue file in `app/components/content/sections/` (e.g., `TestimonialSection.vue`)
2. **Register it:** Add an entry to the `componentMap` in `app/components/content/SectionRenderer.vue`:
   ```js
   testimonial: defineAsyncComponent(
     () => import("./sections/TestimonialSection.vue")
   );
   ```
3. **Use it:** Reference the new section type in your content files:
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
