import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    animation: {
      "float-slow": "float 8s ease-in-out infinite",
      "float-medium": "float 6s ease-in-out infinite 2s",
      "gradient-x": "gradient-x 6s ease infinite",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Base colors for dark theme
        background: "#0A0A0A", // Very dark background
        foreground: "#F5F5F5", // Light text
        card: "#1A1A1A", // Darker card background
        "card-foreground": "#F5F5F5",
        border: "#333333", // Dark border
        input: "#1A1A1A",

        // New Brand Colors
        "accent-primary": {
          DEFAULT: "#12f7d6", // Your --brand-1 color
          foreground: "#0A0A0A", // Dark text on accent
        },
        "accent-secondary": {
          DEFAULT: "#00e0c0", // A slightly darker shade of your brand color for hover/secondary use
          foreground: "#0A0A0A",
        },
        ring: "#12f7d6", // Focus ring color matches brand primary

        // Existing muted and destructive colors
        muted: {
          DEFAULT: "#2A2A2A", // Muted background
          foreground: "#A3A3A3", // Muted text
        },
        destructive: {
          DEFAULT: "#ef4444", // red-500
          foreground: "#F5F5F5",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-20px) translateX(10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        blink: "blink 1s step-end infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;