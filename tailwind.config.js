const colors = require('tailwindcss/colors');

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
          lighter: colors.emerald[500],
          light: colors.emerald[600],
          DEFAULT: colors.emerald[700],
          dark: colors.emerald[800],
          darker: colors.emerald[900],
        },
        error: {
          DEFAULT: colors.red[600],
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
