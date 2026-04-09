import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          bg: "#FAF6EE",
          primary: "#ECE2CC",
          accent: "#3F5A2D",
          text: "#2E281F",
          secondary: "#7B6130",
        },
        cream: {
          50: "#FAF6EE",
          100: "#ECE2CC",
          200: "#D8C8A6",
        },
        blush: {
          50: "#F4EEE4",
          100: "#CBB388",
          200: "#A9854A",
          300: "#7B6130",
        },
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "system-ui", "sans-serif"],
        serif: ["var(--font-alegreya)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 4px 15px rgba(43, 43, 43, 0.08)",
        "soft-md": "0 8px 24px rgba(43, 43, 43, 0.1)",
        "soft-lg": "0 12px 32px rgba(43, 43, 43, 0.12)",
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(63, 90, 45, 0.18), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(123, 97, 48, 0.15), transparent), radial-gradient(ellipse 50% 30% at 0% 100%, rgba(236, 226, 204, 0.35), transparent)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "soft-pulse": "softPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        softPulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
      borderRadius: {
        DEFAULT: "0.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
