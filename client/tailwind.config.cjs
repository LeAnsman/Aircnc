/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F5385D",
        primaryDarken: "#aa2c45",
      },
      animation: {
        fade: "fadeIn 0.2s ease-in",
        fadeTop: "fadeInTop 0.3s ease-in",
      },
      keyframes: {
        fadeIn: {
          "0%": { transform: "translateY(1000px)" },
          "100%": { transform: "translateY(0px)" },
        },
        fadeInTop: {
          "0%": { transform: "translateY(-50px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
