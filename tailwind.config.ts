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
          bg: "#FAF7F2",
          primary: "#EAD7C5",
          accent: "#C89B7B",
          text: "#2B2B2B",
          secondary: "#E8B4B8",
        },
        cream: {
          50: "#FAF7F2",
          100: "#EAD7C5",
          200: "#D4C4B0",
        },
        blush: {
          50: "#F5F0ED",
          100: "#E8B4B8",
          200: "#DFA0A5",
          300: "#D68B91",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 15px rgba(43, 43, 43, 0.08)",
        "soft-md": "0 8px 24px rgba(43, 43, 43, 0.1)",
        "soft-lg": "0 12px 32px rgba(43, 43, 43, 0.12)",
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(232, 180, 184, 0.15), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(200, 155, 123, 0.08), transparent), radial-gradient(ellipse 50% 30% at 0% 100%, rgba(234, 215, 197, 0.1), transparent)",
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
