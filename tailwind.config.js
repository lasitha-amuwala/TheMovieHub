module.exports = {
	mode: 'jit',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: { almostBlack: '#141414' },
			maxHeight: {
				'85vh': '85vh',
			},
			minWidth: {
				'1/3': '33.34%',
				'1/4': '25%',
				'1/5': '20%',
				'1/6': '16.67%',
				'1/7': '14.29%',
				'1/8': '12.5%',
			},
			width: {
				'5%': 'calc(5% - 3px)',
				'7%': 'calc(7% - 3px)',
				'65%h': 'calc(384px * 0.65)',
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
			aspectRatio: {
				'11/17': '11 / 17',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
