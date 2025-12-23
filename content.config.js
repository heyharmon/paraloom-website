import { defineCollection, defineContentConfig, z } from "@nuxt/content";
import { asSitemapCollection } from "@nuxtjs/sitemap/content";

export default defineContentConfig({
  collections: {
    content: defineCollection(
      // Adds sitemap frontmatter support to the collection
      asSitemapCollection({
        type: "page",
        source: "**/*.json",
      })
    ),
  },
});
