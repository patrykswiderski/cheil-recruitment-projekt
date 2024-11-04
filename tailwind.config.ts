import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: "320px",
        xs: "420px",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        lightGray: "#F8F8F8",
        hoverGray: "#F3F3F3",
        blueButton: "#007AFF",
        descriptionDeviceGray: "#767676",
        ecoGreen: "#009949",
        financingGrey: "#555555",
        chooseButtonBlue: "#1428A0",
        chooseButtonHover: "#1C1C1C",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        samsung: ["SamsungOneArabic", "Arial", "sans-serif"],
      },
      fontSize: {
        "xs+": ["12px", "18px"],
        "sm+": ["14px", "22px"],
        "lg-": ["18px", "22px"],
        "4.5xl": ["40px", "56px"],
        "5xl-": ["40px", "40px"],
      },
      boxShadow: {
        xs: "4px 4px 4px rgba(0, 0, 0, 0.02)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        itemCard: "20px",
      },
      leadingHeight: {
        "4+": "18px",
      },
      letterSpacing: {
        "widest+": "0.13em",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
