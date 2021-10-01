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
        primary: colors.gray,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
