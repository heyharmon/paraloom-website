/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Brand color scale - references CSS variables for easy theming
        brand: {
          50: "var(--brand-50)",
          100: "var(--brand-100)",
          200: "var(--brand-200)",
          300: "var(--brand-300)",
          400: "var(--brand-400)",
          500: "var(--brand-500)",
          600: "var(--brand-600)",
          700: "var(--brand-700)",
          800: "var(--brand-800)",
          900: "var(--brand-900)",
          950: "var(--brand-950)",
          DEFAULT: "var(--brand-500)",
        },
        // Semantic text colors
        heading: "var(--color-heading)",
        subheadline: "var(--color-subheadline)",
        body: "var(--color-body)",
        muted: "var(--color-muted)",
        // Semantic background colors (also work for text, border, etc.)
        page: "var(--bg-page)",
        card: "var(--bg-card)",
        inverse: "var(--bg-inverse)",
      },
    },
  },
};
