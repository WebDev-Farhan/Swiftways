/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    fontFamily: {
      comicNeue: "Comic Neue",
      inter: "Inter",
    },

    extend: {
      colors: {
        primaryColor: "#22bbcc",
        dark: "#030712",
      },
    },
  },
  plugins: [require("daisyui")],
};
