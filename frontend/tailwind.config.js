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
				'1/3': '33.34%',
				'1/4': '25%',
				'1/5': '20%',
				'1/6': '16.67%',
				'1/7': '14.29%',
				'1/8': '12.5%',
			},
			height: {
				27: '110px',
				'50vw': '56vw',
			},
			width: {
				54: '215px',
				'5%': 'calc(5% - 3px)',
				'10%': 'calc(7% - 3px)',
			},
			screens: {
				'3xl': '1600px',
			},
			margin: {
				'ml-5%': '0 0 0 5%',
				'ml-5%': '0 0 0 7%',
				'mx-5%': '0 5%',
				'mx-5%': '0 7%',
			},
			padding: {
				'5%': '5%',
				'10%': '7%'
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
