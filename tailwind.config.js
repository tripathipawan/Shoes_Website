/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: '#138695',
        brand: {
          teal: '#138695',
          dark: '#0f6a77',
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        handwriting: ["Merienda", "cursive"]
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem"
        }
      }
    },

  },
  plugins: [],
}