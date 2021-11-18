module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		backgroundColor: (theme) => ({
			...theme('colors'),
			almostBlack: '#141414',
		}),
		extend: {
			gradientColorStops: (theme) => ({
				...theme('colors'),
				almostBlack: '#141414',
			}),
			maxHeight: {
				'85vh': '85vh',
				27: '110px',
				'16:9': 'calc(100vw / 1.78)',
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
				'56vw': '56vw',
				'50vh': '50vh',
				'16:9': 'calc(100vw / 1.78)',
			},
			width: {
				54: '215px',
				'5%': 'calc(5% - 3px)',
				'7%': 'calc(7% - 3px)',
			},
			screens: {
				'3xl': '1600px',
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
		},
	},
	variants: {
		extend: {
			zIndex: ['hover'],
			width: ['hover'],
			margin: ['hover'],
			scale: ['hover'],
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
