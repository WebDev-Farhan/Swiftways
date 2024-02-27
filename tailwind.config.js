/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    fontFamily: {
      comicNeue: "Comic Neue",
      inter: "Inter",
    },
    colors: {
      primary: "#22bbcc",
      dark: "#030712",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
