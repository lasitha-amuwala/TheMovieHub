module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      almostBlack: '#141414',
    }),

    extend: {
      colors: {
        almostBlack: 'var(--primaryBackgroundColor)',
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
      width: {
        '5%': 'calc(5% - 3px)',
        '7%': 'calc(7% - 3px)',
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
  plugins: [require('@tailwindcss/line-clamp')],
};
