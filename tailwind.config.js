module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        almostBlack: '#121212',
        backgroundShadow: '#050505',
        card: '#1e1e1e',
        cardHover: '#323232',
        accentBlue: '#005fa8',
        accentBlueHover: '#007cdb',
        mobileNavButton: '#ffffff',
        borderPrimary: '#474747',
        skeletonColor: '#1e1e1e',
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
  plugins: [require('@tailwindcss/line-clamp'), require('tailwind-scrollbar-hide')],
};
