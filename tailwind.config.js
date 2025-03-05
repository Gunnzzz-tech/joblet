
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4a6741", // Ayurvedic green
          light: "#6a8960",
          dark: "#324a2d",
        },
        secondary: {
          DEFAULT: "#d4a373", // Earthy brown
          light: "#e9c496",
          dark: "#b08659",
        },
        background: {
          DEFAULT: "#f9f7f3", // Off-white
          dark: "#e6e2d9",
        },
        accent: {
          DEFAULT: "#9c6644", // Deep amber
          light: "#bc8a69",
          dark: "#7c4e30",
        },
      },
    },
  },
  plugins: [],
}
