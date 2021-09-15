module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gradientColorStops: (theme) => ({
        ...theme('colors'),
        almostBlack: 'rgba(0,0,0,0.7)',
      }),
      maxHeight: {
        '90vh': '90vh',
        27: '110px',
      },
      height: {
        27: '110px',
      },
      width: {
        54: '215px',
      },
      screens: {
        '3xl': '1600px',
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  },
};
