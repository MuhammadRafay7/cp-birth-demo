import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          sage: "#7A9B76",
          "sage-soft": "#E9EFE8",
          forest: "#4A6347",
          "forest-deep": "#3C5139",
          cream: "#F3EEE4",
          "cream-deep": "#E9E1D2",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          muted: "#565B55",
        },
        surface: "#FFFFFF",
        line: {
          DEFAULT: "#E5E5E5",
          strong: "#D2D6CF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-tinos)", "Times New Roman", "serif"],
      },
      borderRadius: {
        card: "1.25rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgb(74 99 71 / 0.06), 0 16px 40px -24px rgb(74 99 71 / 0.28)",
        lift: "0 2px 6px rgb(74 99 71 / 0.08), 0 28px 60px -28px rgb(74 99 71 / 0.4)",
      },
    },
  },
};

export default config;
