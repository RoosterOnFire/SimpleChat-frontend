const colors = require('tailwindcss/colors');

const pimaryColor = colors.emerald;
const errorColor = colors.red;

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  mode: 'jit',
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          lighter: pimaryColor[400],
          light: pimaryColor[500],
          DEFAULT: pimaryColor[600],
          dark: pimaryColor[700],
          darker: pimaryColor[800],
        },
        error: {
          DEFAULT: errorColor[600],
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
