import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        camp: {
          dust: "#e8d5b7",
          sunset: "#c45c2a",
          night: "#1a0f0a",
          charcoal: "#0f0f0f",
          playa: "#f5eed8",
          dark: "#1a1612",
          steel: "#1f1f1f",
          playaDust: "#c4b89a",
          dusk: "#8b6b6b",
          dragonfly: "#0d9488",
          dragonflyLight: "#2dd4bf",
          ledMagenta: "#e040a0",
          ledTeal: "#20c4b0",
          ledLime: "#a8e64c",
          ledPurple: "#9060e0",
          glow: "#f0b8d8",
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(224, 64, 160, 0.25)",
        glowTeal: "0 0 20px rgba(32, 196, 176, 0.25)",
        glowDragonfly: "0 0 24px rgba(13, 148, 136, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
