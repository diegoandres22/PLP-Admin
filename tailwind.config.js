const { heroui } = require("@heroui/react");

/**
 * Los tokens se definen como variables CSS en src/app/globals.css y se
 * exponen aquí como utilidades de Tailwind. Se usan nombres que NO chocan con
 * la paleta de HeroUI (`background`, `foreground`, `primary`...): así los
 * componentes de HeroUI conservan su tema y las utilidades propias conviven
 * sin pisarlo.
 *
 * Disponibles: bg-surface, bg-surface-raised, bg-surface-sunken,
 * text-foreground-muted, text-foreground-subtle, border-hairline.
 */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: token("surface"),
        "surface-raised": token("surface-raised"),
        "surface-sunken": token("surface-sunken"),
        "foreground-muted": token("foreground-muted"),
        "foreground-subtle": token("foreground-subtle"),
        hairline: token("hairline"),
      },
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
