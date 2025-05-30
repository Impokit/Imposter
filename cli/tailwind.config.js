/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{vue, html,js}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        creepster: ["Creepster", "cursive"],
      },
    },
  },
  plugins: [],
};
