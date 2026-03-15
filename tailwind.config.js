/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        mist: "#F8FAFC",
        brand: {
          50: "#eef9f7",
          100: "#d6f2ed",
          200: "#aee5db",
          300: "#7ad1c2",
          400: "#43b5a3",
          500: "#239684",
          600: "#17786a",
          700: "#145f55",
          800: "#144c45",
          900: "#153f3a",
        },
        sand: "#FFF8EE",
        coral: "#FF8A66",
      },
      boxShadow: {
        soft: "0 16px 40px rgba(15, 23, 42, 0.12)",
        float: "0 20px 45px rgba(35, 150, 132, 0.16)",
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
