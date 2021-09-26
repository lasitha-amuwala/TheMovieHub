module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      bg: '#141414',
    }),
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
        '1/2': 'calc(((100vw * 23/25) - 8px * 2) / 2)',
        '1/3': 'calc(((100vw * 23/25) - 8px * 3) / 3)',
        '1/4': 'calc(((100vw * 23/25) - 8px * 4) / 4)',
        '1/5': 'calc(((100vw * 23/25) - 8px * 5) / 5)',
        '1/6': 'calc(((100vw * 23/25) - 8px * 6) / 6)',
        '1/7': 'calc(((100vw * 23/25) - 8px * 7) / 7)',
        '1/8': 'calc(((100vw - 112px) - 8px * 8) / 8)',
      },
      height: {
        27: '110px',
        '16/9': '54vw',
      },
      width: {
        54: '215px',
        '4%': '4%',
      },
      screens: {
        '3xl': '1600px',
      },
      margin: {
        'ml-4%': '0 0 0 4%',
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  },
};
