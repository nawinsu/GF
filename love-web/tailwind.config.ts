import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#0b0716",
          900: "#120b24",
          800: "#1b1235",
          700: "#2a1c4f",
          600: "#3b2a6b",
        },
        gold: {
          300: "#ffd98a",
          400: "#f7c66b",
          500: "#e9ac4b",
        },
        blush: "#f6b8c8",
      },
      fontFamily: {
        script: ["var(--font-display)", "var(--font-charm)", "Georgia", "serif"],
        thai: ["var(--font-prompt)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(247, 198, 107, 0.35)",
        card: "0 10px 40px rgba(0, 0, 0, 0.45)",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
        shoot: {
          "0%": { transform: "translate(0,0) rotate(-35deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translate(-420px, 280px) rotate(-35deg)", opacity: "0" },
        },
        spinSlow: { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        twinkle: "twinkle 3s ease-in-out infinite",
        shoot: "shoot 2.2s ease-out infinite",
        "spin-slow": "spinSlow 12s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
