// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  // devtools: { enabled: true },

  modules: [
    "@nuxtjs/robots",
    "@nuxtjs/sitemap", // Must be BEFORE @nuxt/content for v3 integration
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxtjs/tailwindcss",
    "nuxt-gtag",
  ],

  css: ["~/assets/css/main.css"],

  // Font configuration - https://nuxt.com/modules/fonts
  fonts: {
    families: [
      { name: "Fraunces", provider: "google" },
      { name: "Instrument Serif", provider: "google" },
    ],
    defaults: {
      weights: [100, 400, 700],
      styles: ["normal"],
      display: "swap", // Improve LCP by using swap font-display
    },
  },

  // Google Analytics configuration - https://github.com/johannschopplich/nuxt-gtag
  gtag: {
    id: "",
    enabled: process.env.NODE_ENV === "production",
  },

  // Sitemap configuration - https://nuxt.com/modules/sitemap
  site: {
    url: "https://www.domain.com",
  },

  // Build optimizations for better performance
  vite: {
    build: {
      chunkSizeWarningLimit: 800, // Increase limit for larger chunks
    },
  },

  sitemap: {
    // Disable XSL stylesheet - not needed for SEO and causes 404 in static builds
    xsl: false,
    defaults: {
      changefreq: "weekly",
      priority: 0.8,
    },
  },

  // Nitro configuration for Vercel deployment
  // Nuxt 4 auto-detects Vercel, but explicit preset ensures correct deployment
  nitro: {
    // Prerender all content pages at build time
    // This is required because Nuxt Content v3 uses SQLite which doesn't work
    // in Vercel serverless environments. Prerendering generates static HTML
    // for all pages, eliminating the need for runtime database queries.
    prerender: {
      routes: ["/"],
      crawlLinks: true, // Automatically discover and prerender all linked pages
    },
  },

  app: {
    baseURL: "/",
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "Your Website - Professional Services",
      meta: [
        {
          name: "description",
          content:
            "Professional services and solutions. Customize this description to match your business, services, or project.",
        },
        {
          property: "og:title",
          content: "Your Website - Professional Services",
        },
        {
          property: "og:description",
          content:
            "Professional services and solutions. Customize this description to match your business, services, or project.",
        },
        { property: "og:url", content: "https://www.domain.com" },
        { property: "og:type", content: "website" },
        {
          property: "og:image",
          content: "https://www.domain.com/og_image.png",
        },
        { property: "og:site_name", content: "Your Website" },
        { property: "og:locale", content: "en_US" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Your Website - Professional Services",
        },
        {
          name: "twitter:description",
          content:
            "Professional services and solutions. Customize this description to match your business, services, or project.",
        },
        {
          name: "twitter:image",
          content: "https://www.domain.com/og_image.png",
        },
      ],
      link: [
        { rel: "canonical", href: "https://www.domain.com" },
        // Preconnect to Google Fonts for faster font loading
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        // Nuxt Image handles preloading automatically when preload: true is set
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/favicons/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicons/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicons/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },
});
