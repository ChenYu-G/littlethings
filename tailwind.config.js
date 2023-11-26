/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				'bg-color': '#022B3A',
				'nav-color': '#BFDBF7',
				'creator-color': '#A2C6CD',
				'primary-500': '#1F628C',
				'primary-600': '#0A485F',
				'card-color': '#071721',
				'secondary-500': '#FFB620',
				'off-white': '#D0DFFF',
				red: '#FF5A5A',
				'dark-1': '#071721',
				'dark-2': '#274053',
				'dark-3': '#2E4A60',
				'dark-4': '#14202A',
				'light-1': '#FFFFFF',
				'light-2': '#EFEFEF',
				'light-3': '#BFDBF7',
				'light-4': '#BFDBF7',
			},
			screens: {
				xs: '480px',
			},
			width: {
				420: '420px',
				465: '465px',
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
