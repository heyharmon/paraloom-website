# SEO Implementation Documentation

This document outlines the technical and programmatic SEO practices implemented on this Nuxt website, including schema markup, meta tag management, and content-driven SEO strategies.

---

## Technical SEO

### URL Structure & Routing

**Implementation:** The site uses Nuxt 4's file-based routing system combined with Nuxt Content module for programmatic page generation.

- **Dynamic Routes:** The catch-all route `app/pages/[...slug].vue` handles all content pages dynamically based on markdown files in the `/content/` directory
- **URL Pattern:** Content files map directly to URLs (e.g., `content/csv-to-markdown.md` → `/csv-to-markdown`)
- **Homepage:** Handled by `app/pages/index.vue` which also loads content from `/content/index.md`
- **Base URL:** Configured in `nuxt.config.js` with production URL `https://www.domain.com`

**Reference:** `app/pages/[...slug].vue`, `nuxt.config.js` (app.baseURL)

---

### Canonical URLs

**Implementation:** Canonical URLs are set dynamically for every page to prevent duplicate content issues.

- **Homepage:** Hardcoded to `https://www.domain.com/` in `app/pages/index.vue`
- **Content Pages:** Generated dynamically using the route path: `https://www.domain.com{path}` in `app/pages/[...slug].vue`
- **Method:** Uses Nuxt's `useHead()` composable with computed `link` array containing canonical href

**Reference:** `app/pages/index.vue` (line 262), `app/pages/[...slug].vue` (lines 64-69)

---

### Meta Tags

**Implementation:** Meta tags are dynamically generated from content front matter using Nuxt's `useHead()` composable.

**Standard Meta Tags:**

- `title`: Pulled from content file front matter `title` field
- `description`: Pulled from content file front matter `description` field
- Default fallbacks provided if front matter values are missing

**Open Graph Tags:**

- `og:title`: Uses page title from front matter
- `og:description`: Uses page description from front matter
- `og:type`: Set to `"website"` for all pages
- `og:url`: Configured globally in `nuxt.config.js` (can be overridden per-page)
- `og:image`: Set to `https://www.domain.com/og_image.png` for all pages (shared social preview image)
- `og:site_name`: Set to `"Website Name"` for branding in social shares
- `og:locale`: Set to `"en_US"` for language/locale identification

**Image File Location:** The Open Graph image (`og_image.png`) is stored in the `public/` directory and served at the root URL path.

**Twitter Card Tags:**

- `twitter:card`: Set to `"summary_large_image"` for all pages
- `twitter:title`: Uses page title from front matter
- `twitter:description`: Uses page description from front matter
- `twitter:image`: Set to `https://www.domain.com/og_image.png` for all pages (shared social preview image)

**Global Meta Configuration:**

- Default meta tags defined in `nuxt.config.js` under `app.head.meta`
- Page-specific meta tags override global defaults via `useHead()` in individual pages

**Reference:** `nuxt.config.js` (lines 49-60), `app/pages/index.vue` (lines 236-262), `app/pages/[...slug].vue` (lines 38-70)

---

### Security Headers (SEO Impact)

**Implementation:** Security headers are configured via the `nuxt-security` module, which can positively impact SEO by improving site trustworthiness and security scores.

**Key Headers:**

- **Content Security Policy (CSP):** Restricts resource loading to same-origin and specific trusted sources
- **Strict Transport Security (HSTS):** Forces HTTPS connections with 1-year max-age, includes subdomains, and preload enabled
- **X-Frame-Options:** Set to `DENY` to prevent clickjacking
- **X-Content-Type-Options:** Set to `nosniff` to prevent MIME type sniffing
- **Referrer Policy:** Set to `strict-origin-when-cross-origin`
- **Permissions Policy:** Restricts camera, microphone, and geolocation access

**Reference:** `nuxt.config.js` (lines 15-44)

---

### robots.txt

**Implementation:** The robots.txt is dynamically generated using the `@nuxtjs/robots` module.

- **URL:** `/robots.txt`
- **Module:** `@nuxtjs/robots` in `nuxt.config.js`
- **Production:** Allows all user agents (`User-Agent: *`) and disallows nothing (`Disallow:`)
- **Non-Production:** Automatically blocks all indexing to prevent duplicate content issues
- **Sitemap Reference:** Automatically includes reference to XML sitemap

**Reference:** `nuxt.config.js` (modules), `docs/robots/README.md`

---

### XML Sitemap

**Implementation:** The XML sitemap is dynamically generated using the `@nuxtjs/sitemap` module with Nuxt Content v3 integration.

- **Module:** `@nuxtjs/sitemap` in `nuxt.config.js`
- **URL:** Available at `/sitemap.xml`
- **Content Integration:** Uses `asSitemapCollection()` in `content.config.js` to auto-discover content pages
- **Content Included:**
  - Homepage (`/`) with priority 1.0 and weekly changefreq
  - All content pages from `/content/` directory with priority 0.8 and weekly changefreq
- **Exclusions:** Template files excluded via `exclude: ["/template-*"]` config
- **robots.txt Integration:** Automatically referenced by `@nuxtjs/robots` module

**Reference:** `nuxt.config.js`, `content.config.js`, `docs/sitemap/README.md`

---

## Schema.org Structured Data (JSON-LD)

**Implementation:** Schema.org structured data is implemented using two approaches:

1. **`nuxt-schema-org` module** - Provides site identity (Organization) and base WebSite schema automatically
2. **Manual JSON-LD** - Custom schemas (FAQPage, HowTo, SoftwareApplication) defined in content frontmatter and rendered via `useHead()`

**Module Configuration:** The site identity is configured in `nuxt.config.js` under `schemaOrg.identity`.

### Supported Schema Types

**1. WebPage Schema**

- **Always Included:** Every page includes a WebPage schema with basic page information
- **Properties:** `name`, `description`, `url`, `isPartOf` (WebSite reference)
- **Purpose:** Helps search engines understand page structure and site hierarchy

**2. FAQPage Schema**

- **Conditional:** Included when `meta.schema.faqPage.questions` array exists in front matter
- **Structure:** Maps questions and answers from front matter to Schema.org Question/Answer format
- **Purpose:** Enables rich snippets in search results (FAQ rich results)

**3. HowTo Schema**

- **Conditional:** Included when `meta.schema.howTo.steps` array exists in front matter
- **Structure:** Converts front matter steps into HowToStep items with position, name, and text
- **Purpose:** Enables rich snippets for step-by-step instructions (HowTo rich results)

**4. SoftwareApplication Schema**

- **Conditional:** Included when `meta.schema.softwareApplication` object exists in front matter
- **Properties:** `name`, `applicationCategory`, `operatingSystem`, `offers` (pricing information)
- **Purpose:** Helps search engines understand the site as a web application, potentially enabling app-related rich results

### Implementation Details

- **Generation:** Schema objects are computed from front matter data in both `app/pages/index.vue` and `app/pages/[...slug].vue`
- **Injection:** Multiple schema types can be included on a single page (e.g., WebPage + FAQPage + HowTo)
- **Format:** All schemas use `@context: "https://schema.org"` and proper `@type` declarations
- **URLs:** Absolute URLs are used (`https://www.domain.com`) for all schema properties requiring URLs

**Reference:** `app/pages/index.vue` (lines 148-233), `app/pages/[...slug].vue` (lines 72-163), `content/index.md` (lines 105-136)

---

## Programmatic SEO

### Content-Driven Page Generation

**Implementation:** The site uses Nuxt Content module to generate pages programmatically from markdown files in the `/content/` directory.

**Content Structure:**

- **Location:** All content files stored in `/content/` directory
- **Format:** Markdown files with YAML front matter
- **Collection:** Configured in `content.config.js` as a single `content` collection with type `page`
- **Routing:** File paths map directly to URL paths (e.g., `content/csv-to-markdown.md` → `/csv-to-markdown`)

**Front Matter Structure:**
Each content file includes:

- `title`: Page title (used for meta tags and schema)
- `description`: Page description (used for meta tags and schema)
- `layout`: Layout template (typically `default`)
- `sections`: Array of section objects for rendering page components
- `meta.schema`: Schema.org structured data configuration

**Dynamic Page Rendering:**

- Pages fetch content using `queryCollection("content").path(path).first()` API
- Content is rendered using `<ContentRenderer>` component for markdown body
- Sections from front matter are rendered using `<SectionRenderer>` component
- 404 handling: Missing content throws a 404 error via `createError()`

**Reference:** `content.config.js`, `app/pages/[...slug].vue`, `content/index.md`, `content/csv-to-markdown.md`

---

### SEO-Friendly Content Patterns

**URL Naming Convention:**

- Uses descriptive, keyword-rich URLs (e.g., `/csv-to-markdown`, `/pdf-to-markdown`)
- Follows `[source]-to-[target]` pattern for conversion pages
- Hyphenated, lowercase, readable URLs

**Content Organization:**

- Each conversion format has its own dedicated page
- Homepage (`/content/index.md`) serves as a pillar page with links to all conversion types
- Content sections are modular and reusable across pages

**Internal Linking:**

- Homepage includes a conversions section linking to all format-specific pages
- Links use descriptive anchor text and proper href attributes
- Cross-linking between related conversion pages (could be expanded)

**Reference:** `content/index.md` (lines 6-46), individual conversion pages in `/content/` directory

---

## Nuxt Content Module Integration

**Module:** `@nuxt/content` (v3.8.2)

**Configuration:**

- Single collection named `content` defined in `content.config.js`
- Collection type: `page`
- Source pattern: `**/*.md` (all markdown files)

**Usage:**

- Content queries use `queryCollection("content")` API
- Path-based queries: `.path(path).first()` to fetch specific content
- Content rendering: `<ContentRenderer>` component for markdown body
- Front matter access: Available via `page.value.meta` and `page.value.title`, etc.

**SEO Benefits:**

- Enables programmatic page generation from markdown files
- Supports front matter for SEO metadata
- Provides structured content API for dynamic meta tag generation
- Allows content-driven schema markup configuration

**Reference:** `content.config.js`, `app/pages/[...slug].vue` (lines 19-24), `app/pages/index.vue` (lines 140-142)

---

## Accessibility & SEO

**NuxtRouteAnnouncer:**

- Included in `app/app.vue` to announce route changes to screen readers
- Improves accessibility and can positively impact SEO by demonstrating accessibility compliance

**Reference:** `app/app.vue` (line 3)

---

## Performance Considerations

**Font Loading:**

- Uses `@nuxt/fonts` module for optimized Google Fonts loading
- Font: Instrument Sans from Google Fonts
- Optimized loading can improve Core Web Vitals scores

**Client-Side Processing:**

- All file conversion happens client-side (no server uploads)
- Reduces server load and improves perceived performance
- Privacy-first approach (no data leaves user's device)

**Reference:** `nuxt.config.js` (lines 9-13)

---

## Future SEO Enhancements

**Potential Additions:**

- Additional schema types (BreadcrumbList, Organization, etc.)
- Structured data for conversion tools (Tool schema type)
- Add internationalization using Nuxt i18n package (https://content.nuxt.com/docs/integrations/i18n)
- hreflang tags if internationalization is added
- RSS feed for content updates

---

## Summary

This Nuxt website implements a comprehensive SEO strategy combining:

1. **Technical SEO:** Clean URLs, canonical tags, security headers, robots.txt, XML sitemap
2. **On-Page SEO:** Dynamic meta tags from content front matter
3. **Structured Data:** Multiple Schema.org types (WebPage, FAQPage, HowTo, SoftwareApplication)
4. **Programmatic SEO:** Content-driven page generation via Nuxt Content
5. **Social SEO:** Open Graph and Twitter Card meta tags with shared preview images

All SEO metadata is managed through content front matter, making it easy for content creators to maintain SEO best practices without touching code. The sitemap automatically updates as new content files are added to the site.
