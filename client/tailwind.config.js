const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "wannasport-1": "#366B77",
        "wannasport-2": "#06294B",
        "wannasport-3": "#F3F4F5",
        "black-1": "#141414",
      },
    },
  },
  plugins: [],
}