module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      almostBlack: 'rgb(18,18,18)',
    }),

    extend: {
      colors: {
        almostBlack: 'var(--BackgroundColor)',
        backgroundShadow: 'var(--BackgroundColorShadow)',
        borderPrimary: 'var(--primaryBorder)',
        mobileNavButton: 'var(--mobileNavButton)',
      },
      screens: {
        '3xl': '2100px',
      },
      maxHeight: {
        '40vh': '40vh',
        '85vh': '85vh',
      },
      margin: {
        '5%': '5%',
        '7%': '7%',
      },
      padding: {
        '5%': '5%',
        '7%': '7%',
      },
      inset: {
        '45%': '45%',
        '5%': '5%',
      },
      border: {
        1: '1px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar-hide'),
  ],
};
