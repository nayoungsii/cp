/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        mist: "#F8FAFC",
        brand: {
          50: "#fff1f7",
          100: "#ffd9ea",
          200: "#ffb6d5",
          300: "#ff87ba",
          400: "#ff5aa1",
          500: "#ff2f8a",
          600: "#ea106f",
          700: "#c5075b",
          800: "#a2084e",
          900: "#850c45",
        },
        sand: "#FFF8EE",
        coral: "#FF8A66",
      },
      boxShadow: {
        soft: "0 16px 40px rgba(15, 23, 42, 0.12)",
        float: "0 20px 45px rgba(255, 47, 138, 0.16)",
      },
      fontFamily: {
        sans: ["Pretendard", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulsebar: {
          "0%, 100%": { transform: "scaleX(0.72)", opacity: "0.9" },
          "50%": { transform: "scaleX(1)", opacity: "1" },
        },
        "sheet-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        pulsebar: "pulsebar 2.2s ease-in-out infinite",
        "sheet-up": "sheet-up 0.32s ease-out both",
      },
    },
  },
  plugins: [],
};
