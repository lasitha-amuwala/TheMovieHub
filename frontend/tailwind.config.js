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
			minWidth: {
				'1/2': '25%',
			},
			height: {
				27: '110px',
				'50vw': '56vw',
			},
			width: {
				54: '215px',
				'4%': '4%',
				'c-1/2': 'calc(((92vw) - 8px * 4) / 2)',
				'c-1/3': 'calc(((92vw) - 8px * 5) / 3)',
				'c-1/4': 'calc(((92vw) - 8px * 6) / 4)',
				'c-1/5': 'calc(((92vw) - 8px * 7) / 5)',
				'c-1/6': 'calc(((92vw) - 8px * 8) / 6)',
				'c-1/7': 'calc(((92vw) - 8px * 9) / 7)',
				'c-1/8': 'calc(((100vw - 112px) - 8px * 10) / 8)',
			},
			screens: {
				'3xl': '1600px',
			},
			margin: {
				'ml-4%': '0 0 0 4%',
				'mx-4%': '0 4% 0 4%',
			},
			padding: {
				'4%': '4%',
			},
			inset: {
				'45%': '45%',
			},
		},
	},
	variants: {
		extend: {
			zIndex: ['hover'],
			width: ['hover'],
			margin: ['hover'],
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
