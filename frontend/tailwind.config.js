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
      maxWidth: {
        '1/2':'calc(100vw / 2)',
        '1/3':'calc(100vw / 3)',
        '1/4':'calc(100vw / 4)',
        '1/5':'calc(100vw / 5)',
        '1/6':'calc(100vw / 6)',
        '1/7':'calc(100vw / 7)',
      },
      height: {
        27: '110px',
        '16/9': '54vw',
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
